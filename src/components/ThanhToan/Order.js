import "./ThanhToan.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
function Order({ props, changeTotal }) {
  const sumMoney = () => {
    changeTotal();
  };
  let { id } = useParams();
  const [foodsChoose, setFoodsChoose] = useState(props[0]);
  const [total, setTotal] = useState(props[1]);
  const [lastID, setLastID] = useState(-1);
  const [voucher,setVoucher]=useState();
  const [sale,setSale]=useState(1);
  const [customer, setCustomer] = useState(0);
  const changeMoneyFormat = (number) => {
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  const getLastID = () => {
    axios
      .get("http://localhost:4000/HoaDon/LastID")
      .then((res) => {
        setLastID(Number(res.data.result.Length));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Increment = (e, GiaBan, i) => {
    let targetElem = e.target.previousElementSibling;
    let total = e.target.parentElement.nextElementSibling;
    let number = Number(targetElem.value);
    targetElem.value = number + 1;
    props[0][i].quantity += 1;
    total.innerText = changeMoneyFormat(
      Number(targetElem.value) * Number(GiaBan)
    );
  };
  const Decrease = (e, GiaBan, i) => {
    let targetElem = e.target.nextElementSibling;
    let total = e.target.parentElement.nextElementSibling;
    let number = Number(targetElem.value);
    if (number > 1) {
      targetElem.value = number - 1;
      props[0][i].quantity -= 1;
      total.innerText = changeMoneyFormat(
        Number(targetElem.value) * Number(GiaBan)
      );
    }
  };
  const changQuantity = (e, i, quantity, GiaBan) => {
    let total = e.target.parentElement.nextElementSibling;
    props[0][i].quantity = quantity;
    total.innerText = changeMoneyFormat(quantity * Number(GiaBan));
  };

  const deleteFood = (e, i) => {
    props[0].splice(i, 1);
    e.target.parentElement.parentElement.remove();
    sumMoney();
  };
  const createHoaDon = (e) => {
    if (props[0].length === 0) {
      alert("Không có món ăn trong bill");
    }
    let CTHoaDon = [];
    for (var i = 0; i < props[0].length; i++) {
      CTHoaDon.push({
        IDMonAn: props[0][i].IDMon,
        quantity: props[0][i].quantity,
        GiaBan: props[0][i].GiaBan,
      });
    }
    let formData = new FormData();
    formData.append("ID", Number(lastID));
    if(id !== undefined){
      formData.append("IDBan", id);
    }
    else{
      formData.append("IDBan", 0);
    }
    formData.append("IDKhachHang", customer);
    formData.append("TrangThai", 1);
    formData.append("PhuongThuc", 1);
    formData.append("NgayLap", Date.now());
    formData.append("Detail", JSON.stringify(CTHoaDon));
    formData.append("DetailFirebase",JSON.stringify(foodsChoose))
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:4000/HoaDon/Create", formData, config)
      .then((res) => {
        if(res){
          window.location.reload();
          alert("Thành công");
          deleteOrder(id);
        }
        
      })
      .catch((error) => console.log(error.response.data));
  };
  const deleteOrder = (id) => {
    axios
      .get("http://localhost:4000/ThanhToan/Delete/" + id)
      .then((res) => {
        window.location.reload();
        alert("Đã xóa");
      })
      .catch((error) => console.log(error.response.data));
  };
  const findCustomer = (cardId)=>{
    let customerName=document.querySelector("#customerName");
    axios.get("http://localhost:4000/ThanhToan/Customer/" + cardId)
    .then((res)=>{
      if(res.data.firstName!== undefined){
        customerName.innerHTML=res.data.firstName+" "+res.data.lastName;
      }
      else{
        customerName.innerHTML= "Not exist";
        setCustomer(0);
      }
    })
  }
  const findVoucher =(voucher,data)=>{
    let voucherSale=document.querySelector("#sale");
    if(voucher==="10DIEM"){
      setSale(0.9);
      Object.keys(data).map((item, i) => {
        props[0][item].GiaBan=props[0][item].GiaBan * sale;
      })
      voucherSale.innerHTML= "-10%";

    }
  }
  const saveOrder = (e) => {
    if (props[0].length === 0) {
      alert("Không có món ăn trong bill");
    }
    let formData = new FormData();
    if (id !== undefined) {
      formData.append("IDBan", id);
    } else {
      formData.append("IDBan", 0);
    }
    formData.append("Detail", JSON.stringify(props[0]));
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:4000/ThanhToan/Save", formData, config)
      .then((res) => {
        alert("Luu thành công");
      })
      .catch((error) => console.log(error.response.data));
  };
  const displayFoodsChoosen = (data) => {
    return Object.keys(data).map((item, i) => {
      return (
        <li key={props[0][item].IDMon} className="order-li">
          <div className="order-item">
            <span className="item-number">{i + 1}.</span>
            <span style={{ width: "100px" }}>
              <span className="item-name">{props[0][item].TenMon}</span>
              <p className="item-price">
                {changeMoneyFormat(props[0][item].GiaBan)}
              </p>
            </span>
            <span className="item-quantity">
              <button
                className="change-quantity"
                id="minus"
                onClick={(e) => {
                  Decrease(e, props[0][item].GiaBan, i);
                  sumMoney();
                }}
              >
                -
              </button>
              {props[0][item].quantity ? (
                <input
                  onChange={(e) => {
                    changQuantity(e, i, e.target.value, props[0][item].GiaBan);
                    sumMoney();
                  }}
                  className="quantity"
                  type="text"
                  name="quantity"
                  min={1}
                  defaultValue={props[0][item].quantity}
                />
              ) : (
                props[0][item].quantity && (
                  <input
                    onChange={(e) => {
                      changQuantity(
                        e,
                        i,
                        e.target.value,
                        props[0][item].GiaBan
                      );
                      sumMoney();
                    }}
                    className="quantity"
                    type="text"
                    name="quantity"
                    min={1}
                    defaultValue={props[0][item].quantity}
                  />
                )
              )}
              <button
                className="change-quantity"
                id="plus"
                onClick={(e) => {
                  Increment(e, props[0][item].GiaBan, i);
                  sumMoney();
                }}
              >
                +
              </button>
            </span>
            <span className="item-total">
              {changeMoneyFormat(props[0][item].GiaBan)}
            </span>
            <span>
              <button
                onClick={(e) => deleteFood(e, i)}
                className="btn-clearfood"
              >
                X
              </button>
            </span>
          </div>
        </li>
      );
    });
  };
  useEffect(() => {
    setFoodsChoose(props[0]);
    getLastID();
  });
  useEffect(() => {
    setTotal(props[1]);
  });
  return (
    <div className="col-lg-5">
      <div className="order-wrapper">
        {id ? (
          <div className="desk">
            <Link to="/Ban">Bàn {id}</Link>
            <i className="fas fa-solid fa-angle-right" />
            <span className="btn-deleteBill">
              <i class="fa-solid fa-trash"></i>
              <Link to="/Ban">
                <input
                  type={"button"}
                  onClick={(e) => {
                    deleteOrder(id);
                  }}
                  value={"Hủy"}
                >
                </input>
              </Link>
            </span>
          </div>
        ) : (
          <div className="desk">
            <Link to="/Ban">Chọn bàn</Link>
            <i className="fas fa-solid fa-angle-right" />
          </div>
        )}

        <hr />
        <div className="order">
          <ul>{displayFoodsChoosen(foodsChoose)}</ul>
        </div>
        <div className="addinfor">
          <label>ID Card:</label>
          <span style={{paddingLeft:"2px",color:"green",overflow:"hidden"}} id="customerName"></span>
          <input type="text" id="cardId" onChange={(e)=> {setCustomer(e.target.value);}}></input>
          <button onClick={ e=> findCustomer(customer)}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="addinfor">
          <label>Mã Voucher:</label>
          <span style={{paddingLeft:"2px",color:"green",overflow:"hidden"}} id="sale"></span>
          <input type="text" id="cardId" onChange={(e)=> {setVoucher(e.target.value)}}></input>
          <button onClick={ e=> findVoucher(voucher,foodsChoose)}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="purchase">
          <span>Thành tiền:</span>
          <span id="total">{changeMoneyFormat(total)}</span>
          <form onSubmit={(e) => createHoaDon(e)} style={{ display: "flex" }}>
            <input
              type={"button"}
              onClick={(e) => saveOrder(e)}
              className="btn-purchase"
              id="save"
              value={"LƯU"}
            ></input>
            <input
              type={"submit"}
              className="btn-purchase"
              id="done"
              value={"THANH TOÁN"}
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Order;
