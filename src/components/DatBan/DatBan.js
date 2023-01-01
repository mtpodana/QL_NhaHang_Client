import Edit from "./Edit";
import Create from "./Create";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/callApi";


function HoaDon(props) {
  const [isOpenCreate, setOpenCreate] = useState(false);
  const [isOpenEdit, setOpenEdit] = useState(false);
  const [datBan, setDatBan] = useState([])
  const [id, setId] = useState({})

  const [ten, setTen] = useState()
  const [date, setDate] = useState()


  useEffect(() => {
    fetchDatBan(ten,null)
  }, [ten])
  useEffect(() => {
    fetchDatBan(null,date)
  }, [date])

  async function fetchDatBan(ten,date) {
    try {
      let query = ''
      if(ten)
      query = `?ten=${ten}`
      if(date)
      query = `?date=${date}`
      const resp = await axiosInstance.get('/DatBan'+query);
      console.log(resp.data);
      resp.data.result.forEach(el => {
        const date = new Date(el.ThoiGianDat)
        el.NgayDat = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        el.GioDat = (date.getHours() - 7 < 10 ? '0' - (date.getHours() - 7) : date.getHours() - 7) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        el.ThoiGianDat = date.toISOString().substring(0, 10);
      });

      setDatBan(resp.data.result)
    } catch (err) {
      console.error(err);
    }
  }

  async function handleXoa(id) {
    try {
      const resp = await axiosInstance.delete('/DatBan/' + id);
      console.log(resp.data);
      if (resp.data.ok)
        fetchDatBan()
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <>
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <h2 style={{ marginLeft: "25px" }}>ĐẶT BÀN</h2><button
          className="btn-create"
          onClick={() => {
            setOpenCreate(true);
          }}
          style={{ outline: "none", border: "none" }}
        >
          <i class="fa-solid fa-plus"></i>Tạo mới
        </button>
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search search-form">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Tìm theo tên "
              aria-label="Search"
              aria-describedby="basic-addon2"
              value={ten}
              onChange={(e)=>setTen(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search fa-sm" />
              </button>
            </div>
          </div>
        </form>
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search search-form">
          <div className="input-group">
            <input
              type="date"
              className="form-control bg-light border-0 small"
              placeholder="Tìm theo ngày"
              aria-label="Search"
              aria-describedby="basic-addon2"
              value={date}
              onChange={(e)=>setDate(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search fa-sm" />
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="container-fluid">
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered table-menu"
                id="dataTable"
                width="100%"
                cellSpacing={0}
                style={{ textAlign: "center", lineHeight: 10 }}
              >
                <tbody className="list-result">
                  <tr>
                    <th>Tên người đặt</th>
                    <th>Ngày đặt</th>
                    <th>Khung giờ</th>
                    <th>Số người</th>
                    <th className="btn-wrapper" />
                  </tr>
                  {datBan.map(item => (
                    <tr key={item.IDPhieuDat} className="result">
                      <td>{item.TenKhachHang}</td>
                      <td>{item.NgayDat}</td>
                      <td>{item.GioDat}</td>
                      <td>{item.SoNguoiDat}</td>
                      <td style={{ Width: "250px" }}>
                        <button
                          className="btn-func"
                          onClick={() => {
                            setOpenEdit(true);
                            setId(item)
                          }}
                          style={{
                            outline: "none",
                            border: "none",
                            background: "none",
                          }}
                        >

                          <i className="fas fa-solid fa-pen-to-square" />
                          <span className="toolTip">Cập nhật</span>
                        </button>
                        |
                        {/* <button
                          className="btn-func"
                          style={{
                            outline: "none",
                            border: "none",
                            background: "none",
                          }}
                        >
                          <i class="fas fa-solid fa-pizza-slice"></i>
                          <span className="toolTip">Order</span>
                        </button>
                        | */}
                        <button
                          className="btn-func"
                          style={{
                            outline: "none",
                            border: "none",
                            background: "none",
                          }}
                          onClick={() => handleXoa(item.IDPhieuDat)}
                        >
                          <i className="fa-solid fa-trash" />
                          <span className="toolTip">Xoá</span>
                        </button>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Create open={isOpenCreate} close={() => { setOpenCreate(false); fetchDatBan() }}></Create>
      <Edit data={id} open={isOpenEdit} close={() => { setOpenEdit(false); fetchDatBan() }}></Edit>
    </>
  );
}

export default HoaDon;
