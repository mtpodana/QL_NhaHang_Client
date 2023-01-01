import { useEffect, useState } from "react";
import axiosInstance from "../../config/callApi";

function Edit({ open, close, data }) {


  const [inputList, setInputList] = useState([])
  const [hoaDon, setHoaDon] = useState([])
  const [PTTT, setPTTT] = useState([])
  const [monAn, setMonAn] = useState([])
  const [banAn, setBanAn] = useState([])


  const onSubmit = (e) => {
    e.preventDefault()
    // console.log(data.hoaDon.IDHoaDon,idBanAn,idPTTT,ngayLap)

    const list = document.querySelectorAll('#MonAn')
    const id = data.IDHoaDon

    const date = new Date(document.querySelector('.NgayLap').value)

    const dataUpdate = {
      idBanAn: document.querySelector('.IDBanAn').value,
      idPTTT: document.querySelector('.PTTT').value,
      ngayLap: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    }

    const chiTiet = []
    list.forEach(el => {
      chiTiet.push({
        idMonAn: el.querySelector(".IDMonAn").value,
        soLuong: el.querySelector(".SoLuong").value,
      })
    })
    // console.log(dataUpdate, chiTiet)
    dataUpdate.chiTiet = chiTiet
    console.log("Data ", dataUpdate)
    fetchUpdateHoaDon(id, dataUpdate)
  }

  async function fetchUpdateHoaDon(id, dataUpdate) {
    try {
      const resp = await axiosInstance.put('/HoaDon/' + id, { data: dataUpdate });
      console.log(resp.data);
      if (resp.data.ok) {
        close()
      }
    } catch (err) {
      console.error(err);
    }
  }

  const addMonAn = () => {
    setInputList(inputList.concat(<MonAn xuLyXoa={xuLyXoa} dsMon={monAn} />))
  };
  const xuLyXoa = (e) => {
    e.preventDefault();
    const list = document.querySelectorAll('#MonAn')
    if (list.length == 1) return
    e.target.parentNode.parentNode.remove()
  }

  useEffect(() => {
    if (open) {
      fetchChiTiet(data.IDHoaDon)
      fetchPTTT()
      fetchMonAn()
      fetchBanAn()
    }

  }, [open])

  async function fetchChiTiet(id) {
    try {
      const resp = await axiosInstance.get('/HoaDon/' + id);
      console.log(resp.data);
      setHoaDon(resp.data.result)
    } catch (err) {
      console.error(err);
    }
  }
  async function fetchPTTT() {
    try {
      const resp = await axiosInstance.get('/HoaDon/PhuongThuc');
      console.log(resp.data);
      setPTTT(resp.data.result)
    } catch (err) {
      console.error(err);
    }
  }
  async function fetchBanAn() {
    try {
      const resp = await axiosInstance.get('/HoaDon/DanhSachBan');
      console.log(resp.data);
      setBanAn(resp.data.result)
    } catch (err) {
      console.error(err);
    }
  }
  async function fetchMonAn() {
    try {
      const resp = await axiosInstance.get('/HoaDon/MonAn');
      console.log(resp.data);
      setMonAn(resp.data.result)
    } catch (err) {
      console.error(err);
    }
  }

  if (!open) return null;
  return (
    <div>
      <div className="overlay">
        <div className="form-create">
          <h2
            style={{
              color: "white",
              background: "#4e73df",
              fontWeight: "700",
            }}
          >
            Cập nhật
            <button onClick={() => { close(); setInputList([]) }}>X</button>
          </h2>
          <form method="put" action=" " onSubmit={(e) => onSubmit(e)}>
            <div className="wrap-input">
              <p htmlFor="KhachHang" className="create-label">
                Khách hàng *
              </p>
              <input
                type={"text"}
                name="TenMon"
                className="create-input"
                placeholder="Hãy nhập tên khách hàng..."
              ></input>
            </div>
            <div className="wrap-input">
              <p htmlFor="HinhThuc" className="create-label">
                Phân loại *
              </p>
              <select name="HinhThuc" className="create-input IDBanAn" defaultValue={data.IDBanAn}>
                {banAn.map(item => (
                  <option key={item.IDBanAn} value={item.IDBanAn} >{item.SoBan}</option>
                ))}
              </select>
            </div>
            <div className="wrap-input">
              <p htmlFor="NgayLap" className="create-label">
                Ngày lập *
              </p>
              <input
                defaultValue={data.NgayLapFormat}
                type={"date"}
                style={{ lineHeight: "20px !important" }}
                name="NgayLap"
                className="create-input NgayLap"
                placeholder="Hãy nhập giá tiền..."
              ></input>
            </div>
            <div className="wrap-input">
              <p htmlFor="PhuongThuc" className="create-label">
                Phương thức thanh toán *
              </p>
              <select defaultValue={data.IDPT} name="PhuongThuc" className="create-input PTTT">
                {PTTT.map(item => (
                  <option value={item.IDPhuongThuc} key={item.IDPhuongThuc} >{item.PhuongThuc}</option>
                ))}
              </select>
            </div>
            <div className="wrap-input" id="ThucDon">
              <p className="create-label" style={{ fontSize: "20px" }}>
                Thực đơn
                <input type={"button"} onClick={addMonAn} value={"+"} />
              </p>
              {hoaDon.map(item => (
                <MonAn dsMon={monAn} key={item.IDMon} MonAn={item} xuLyXoa={xuLyXoa} />
              ))}
              {inputList}
            </div>
            <input type={"submit"} className="btn-confirm" value={"Xác nhận"} />
          </form>
        </div>
      </div>
    </div>
  );
}

function MonAn({ MonAn, dsMon, xuLyXoa, banAn }) {
  return (
    <div id="MonAn" style={{ marginLeft: "-20px" }}>
      <div className="wrap-input">
        <p htmlFor="MonAn" className="create-label">
          Món ăn
        </p>
        <select
          key={`${Math.floor(Math.random() * 1000)}-min`}
          defaultValue={MonAn?.IDMon}
          type={"text"}
          className="create-input IDMonAn"
        >
          {dsMon?.map(item => (
            <option key={item.IDMon} value={item.IDMon}>{item.TenMon}</option>
          ))}

        </select>

      </div>
      <div className="wrap-input">
        <p htmlFor="SoLuong" className="create-label">
          Số lượng
        </p>
        <input
          key={`${Math.floor(Math.random() * 1000)}-min`}
          defaultValue={MonAn?.SoLuong}
          type={"text"}
          name="Số lượng"
          className="create-input SoLuong"
          placeholder="Số lượng..."
        ></input>
      </div>
      <div className="wrap-input">
        <button onClick={(e) => xuLyXoa(e)}>XXX</button>
      </div>
    </div>
  )
}

export default Edit;
