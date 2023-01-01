import Create from "./Create";
import Detail from "./Detail";
import Edit from "./Edit";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/callApi";
function HoaDon(props) {
  const [isOpenCreate, setOpenCreate] = useState(false);
  const [isOpenDetail, setOpenDetail] = useState(false);
  const [isOpenEdit, setOpenEdit] = useState(false);
  const [nhapKho, setNhapKho] = useState([])
  const [idCurrent, setIdCurrent] = useState()
  const [search, setSearch] = useState()

  useEffect(() => {
    fetchNhapKho(search)
  }, [search])

  async function fetchNhapKho() {
    try {
      let query="";
      if(search)
        query = '?date='+search;
      console.log("Search date", search)
      const resp = await axiosInstance.get('/NhapKho'+query);
      console.log(resp.data);
      setNhapKho(resp.data.result)
    } catch (err) {
      console.error(err);
    }
  }

  const xoaPhieuNhap = async (id) => {
    const data = await fetchChiTietPhieuNhap(id)
    console.log(data, id)
    try {
      const res = await axiosInstance.delete('/NhapKho/' + id, { data })
      if (res.data.ok)
        fetchNhapKho()
    }
    catch (err) {
      console.log(err)
    }
  }

  async function fetchChiTietPhieuNhap(id) {
    try {
      const resp = await axiosInstance.get('/NhapKho/ChiTiet/' + id);
      console.log(resp.data);
      return resp.data
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <h2 style={{ marginLeft: "25px" }}>Phiếu nhập</h2><button
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
              type="date"
              className="form-control bg-light border-0 small"
              placeholder="Tim kiem"
              aria-label="Search"
              aria-describedby="basic-addon2"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
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
                    <th>Mã phiếu</th>
                    <th>Ngày nhập</th>

                    <th className="btn-wrapper" />
                  </tr>
                  {nhapKho.map(item => (
                    <tr>
                      <td>{item.IDPhieuNhap}</td>
                      <td>{item.NgayNhap}</td>
                      <td>
                        <button
                          className="btn-func"
                          onClick={() => {
                            setOpenEdit(true);
                            setIdCurrent(item.IDPhieuNhap)
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
                        <button
                          className="btn-func"
                          onClick={() => {
                            setOpenDetail(true);
                            setIdCurrent(item.IDPhieuNhap)
                          }}
                          style={{
                            outline: "none",
                            border: "none",
                            background: "none",
                          }}
                        >
                          <i className="fas fa-solid fa-info" />
                          <span className="toolTip">Chi tiết</span>
                        </button>
                        |
                        <button
                          className="btn-func"
                          style={{
                            outline: "none",
                            border: "none",
                            background: "none",
                          }}
                          onClick={() => xoaPhieuNhap(item.IDPhieuNhap)}
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
      <Create open={isOpenCreate} close={() => { setOpenCreate(false); fetchNhapKho() }}></Create>
      <Edit id={idCurrent} open={isOpenEdit} close={() => setOpenEdit(false)}></Edit>
      <Detail id={idCurrent} open={isOpenDetail} close={() => setOpenDetail(false)}></Detail>
    </>
  );
}

export default HoaDon;
