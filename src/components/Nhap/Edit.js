import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/callApi";
function Edit({ open, close, id }) {

  const [inputList, setInputList] = useState([])
  const [chiTiet, setChiTiet] = useState({})
  const [nguyenLieu, setNguyenLieu] = useState([])



  useEffect(() => {
    if (open) {
      console.log("ID Update", id)
      if (id) {
        fetchChiTietPhieuNhap(id)
        fetchNguyenLieu()
      }

    }

  }, [open])

  async function fetchNguyenLieu() {
    try {
      const resp = await axiosInstance.get('/TonKho/NguyenLieu');
      console.log(resp.data);
      setNguyenLieu(resp.data.result)
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchChiTietPhieuNhap(id) {
    try {
      const resp = await axiosInstance.get('/NhapKho/ChiTiet/' + id);
      console.log(resp.data);
      setChiTiet(resp.data.result)
    } catch (err) {
      console.error(err);
    }
  }


  const addNguyenLieu = () => {
    console.log("Add nguyen lieu", inputList)
    setInputList(inputList.concat(<NguyenLieu xuLyXoa={xuLyXoa} nguyenLieu={nguyenLieu} />))
  }

  const xuLyXoa = (e) => {
    e.preventDefault();
    const list = document.querySelectorAll('#NguyenLieu')
    if (list.length == 1) return
    e.target.parentNode.parentNode.remove()
  }

  const capNhatPhieuNhap = (e) => {
    e.preventDefault()
    const list = document.querySelectorAll('#NguyenLieu')
    const NgayNhap = document.querySelector('.NgayNhap').value

    const date = new Date(NgayNhap)

    const dataNguyenLieu = []

    list.forEach(item => {
      dataNguyenLieu.push({
        IDNguyenLieu: item.querySelector('.IDNguyenLieu').value,
        SoLuong: item.querySelector('.SoLuong').value,
        GiaNhap: item.querySelector('.GiaNhap').value,
      })
    })

    const data = {
      NgayNhap: (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear(),
      dataNguyenLieu,
      dataLast: chiTiet
    }

    fetchcapNhatPhieuNhap(data)

  }

  async function fetchcapNhatPhieuNhap(data) {
    try {
      const resp = await axiosInstance.put('/NhapKho/' + id, { data });
      console.log(resp.data);
      if (resp.data.ok)
        close()
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
            style={{ color: "white", background: "#4e73df", fontWeight: "700" }}
          >
            Cập nhật
            <button onClick={() => { close(); setInputList([]); }}>X</button>
          </h2>
          <form method="put" action=" " onSubmit={(e) => capNhatPhieuNhap(e)}><div className="wrap-input">
            <p htmlFor="NgayNhap" className="create-label">
              Ngày nhập *
            </p>
            <input
              defaultValue={chiTiet.NgayNhap}
              type={"date"}
              name="NgayNhap"
              className="create-input NgayNhap"

            ></input>
          </div>
            <div className="wrap-input" id="Items">
              <p
                htmlFor="Items"
                className="create-label"
                style={{ fontSize: "20px" }}
              >
                Nguyên liệu
                <input type={'button'} onClick={addNguyenLieu} value={"+"} />
              </p>
              {chiTiet.list?.map(item => (
                <NguyenLieu data={item} nguyenLieu={nguyenLieu} xuLyXoa={xuLyXoa} />
              ))}
              {inputList}
            </div>
            <input type={'submit'} className="btn-confirm" value={"Xác nhận"} /></form>
        </div>
      </div>
    </div>
  );
}


function NguyenLieu({ data, nguyenLieu, xuLyXoa }) {

  return (<div id="NguyenLieu" style={{ marginLeft: "-20px" }}>
    <div className="wrap-input">
      <p htmlFor="NguyenLieu" className="create-label">
        Nguyên liệu
      </p>
      <select
        defaultValue={data?.IDNguyenLieu}

        className="create-input IDNguyenLieu"

        style={{ width: "250px" }}
      >
        {nguyenLieu.map(item => (
          <option key={item.IDNguyenLieu} value={item.IDNguyenLieu}>{item.TenNguyenLieu}</option>
        ))}

      </select>

    </div>
    <div className="wrap-input">
      <p htmlFor="SoLuong" className="create-label">
        Số lượng
      </p>
      <input
        defaultValue={data?.SoLuong}
        type={"text"}
        name="SoLuong"
        className="create-input SoLuong"
        placeholder="Số lượng..."
        style={{ width: "200px" }}
      ></input>
    </div>
    <div className="wrap-input">
      <p htmlFor="GiaNhap" className="create-label">
        Giá nhập
      </p>
      <input
        defaultValue={data?.GiaNhap}
        type={"text"}
        name="GiaNhap"
        className="create-input GiaNhap"
        placeholder="Giá nhập..."
        style={{ width: "200px" }}
      ></input>
    </div>
    <div className="wrap-input">
      <button onClick={(e) => xuLyXoa(e)}>X</button>
    </div>
    <div>

    </div>

  </div>)
}

export default Edit;
