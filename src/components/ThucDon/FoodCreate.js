import "./Modal.css";
import axios from 'axios';
import React, { useState,useEffect} from "react";
function FoodCreate({ open, close,props }) {
  const [TenMon, setTenMon] = useState('')
  const [GiaBan, setGiaBan] = useState('')
  const [GiaTien, setGiaTien] = useState('')
  const [IDPhanLoai, setIDPhanLoai] = useState(1)
  const [Image, setImage] = useState('')
  const [nguyenlieu,setNguyenLieu]= useState();
  const [category,setCategory]= useState();
  
  const addCongThuc = () => {
    let NguyenLieu = document.querySelector("#NguyenLieu").cloneNode(true);
    document.getElementById("CongThuc").appendChild(NguyenLieu);
  };
  var lastID= -1;
  const getLastID = () =>{
    axios.get('http://localhost:4000/ThucDon/LastID')
    .then(res => {
        lastID = Number(res.data.result.Length);
    })
    .catch(err =>{
     console.log(err);
    })
  }
  const getNguyenLieu = () =>{
    axios.get('http://localhost:4000/ThucDon/NguyenLieu')
        .then(res => {
         setNguyenLieu(res.data.result)
        })
        .catch(err =>{
          console.log(err);
        })
  }
  const getPhanLoai = () =>{
    axios.get('http://localhost:4000/ThucDon/PhanLoai')
        .then(res => {
         setCategory(res.data.result)
        })
        .catch(err =>{
          console.log(err);
        })
  }
  const displayNL = (data) =>{
    return Object.keys(data).map((item, i) => {
      return(
          <option key={nguyenlieu[item].IDNguyenLieu} value={nguyenlieu[item].IDNguyenLieu}>{nguyenlieu[item].TenNguyenLieu} ({nguyenlieu[item].DonViTinh})</option>
      );
    })
  }
  const displayPL =(data)=>{
    return Object.keys(data).map((item, i) => {
      return ( 
        <option value={category[item].IDPhanLoai}>{category[item].TenPhanLoai}</option>
      )
  })};
  const createFood = (event) =>{
    let CongThuc = []
    let NguyenLieu = document.querySelectorAll(".NguyenLieu")
    let SoLuong = document.querySelectorAll(".SoLuong")
    for( let i=0;i<NguyenLieu.length;i++){
      if(NguyenLieu[i].value !== '' && SoLuong[i].value !== ''){
        let temp={NguyenLieu:NguyenLieu[i].value,SoLuong:Number(SoLuong[i].value)}
        CongThuc.push(temp);
      }      
    }
    for(let i=0; i<CongThuc.length-1;i++){
      for(let j=i+1; j<CongThuc.length;j++){
        if(CongThuc[i].NguyenLieu===CongThuc[j].NguyenLieu){
          CongThuc[i].SoLuong+=CongThuc[j].SoLuong;
          CongThuc.splice(j,1);
        }
      }
    }
    let formData = new FormData();
    formData.append("TenMon",TenMon)
            formData.append("GiaBan",GiaBan)
            formData.append("GiaTien",GiaTien)
            formData.append("IDPhanLoai",IDPhanLoai)
            formData.append("Image",Image) 
            formData.append("CongThuc",JSON.stringify(CongThuc))
            formData.append("LastID",lastID)
    const config={
      headers:{
        'content-type':'multipart/form-data'
      }
    }
    axios.post('http://localhost:4000/ThucDon/Create',formData,config)
    .then(res =>{
      window.location.reload();
      alert("Them thanh cong")
    }).catch(error => console.log(error.response.data))
  }
  useEffect(()=>{getNguyenLieu();getLastID();getPhanLoai()},[]);
  if (!open) return null;
  if (!nguyenlieu) return null;
  return (
    <div>
      <div className="overlay">
        <div className="form-create">
          <h2
            style={{ color: "white", background: "#4e73df", fontWeight: "700" }}
          >
            Tạo mới
            <button onClick={close}>X</button>
          </h2>
          <form onSubmit={e=>createFood(e)}><div className="wrap-input">
            <p htmlFor="TenMon" className="create-label">
              Tên món *
            </p>
            <input
              type={"text"}
              name="TenMon"
              required
              onChange={(e)=>{
              setTenMon(e.target.value)}
              }
              className="create-input"
              placeholder="Hãy nhập tên món..."
            ></input>
          </div>
          <div className="wrap-input">
            <p htmlFor="PhanLoai" className="create-label">
              Phân loại *
            </p>
            <select name="IDPhanLoai"      
                    onChange={(e)=>setIDPhanLoai(e.target.value)} 
                    className="create-input">
             {displayPL(category)}
            </select>
          </div>
          <div className="wrap-input">
            <p htmlFor="GiaTien" className="create-label">
              Giá tiền *
            </p>
            <input
              type={"number"}
              name="GiaTien"
              min="1"
              required
              onChange={(e)=>setGiaTien(e.target.value)}
              className="create-input"
              placeholder="Hãy nhập giá tiền..."
            ></input>
          </div>
          <div className="wrap-input">
            <p htmlFor="GiaBan" className="create-label">
              Giá bán *
            </p>
            <input
              type={"number"}
              min="1"
              name="GiaBan"
              required
              onChange={(e)=>setGiaBan(e.target.value)}
              className="create-input"
              placeholder="Hãy nhập giá bán..."
            ></input>
          </div>
          <div className="wrap-input" style={{ margin: "10px 0" }}>
            <span htmlFor="Image" className="create-label">
              Hình ảnh *
            </span>
            <input type={"file"}  onChange={(e)=>{setImage(e.target.files[0]);}} 
                   name="Image" className="create-input"  accept="image/*" required></input>
          </div>
          <div className="wrap-input" id="CongThuc">
            <p
              htmlFor="CongThuc"
              className="create-label"
              style={{ fontSize: "20px" }}
            >
              Công thức
              <input type={'button'}  onClick={addCongThuc} value={"+"} />
            </p>
            <div id="NguyenLieu" style={{marginLeft:"-20px"}}>
              <div className="wrap-input">
                <p htmlFor="NguyenLieu" className="create-label">
                  Nguyên liệu
                </p>
                <select
                  name="NguyenLieu"
                  className="create-input NguyenLieu"
                >{displayNL(nguyenlieu)}</select>
              </div>
              <div className="wrap-input">
                <p htmlFor="SoLuong" className="create-label">
                  Số lượng
                </p>
                <input
                  type={"number"}
                  name="SoLuong"
                  min="0"
                  className="create-input SoLuong"
                  placeholder="Số lượng..."
                ></input>
              </div>
            </div>
          </div>
          <input type={'submit'} className="btn-confirm" value={"Xác nhận"} /></form>    
        </div>
      </div>
    </div>
  );
}

export default FoodCreate;
