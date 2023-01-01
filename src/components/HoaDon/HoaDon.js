import "./HoaDon.css";
import Detail from "./Detail";
import Edit from "./Edit";
import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import axiosInstance from "../../config/callApi";
function HoaDon(props) {
  const [isOpenDetail, setOpenDetail] = useState(false);
  const [isOpenEdit, setOpenEdit] = useState(false);
  const [hoaDon, setHoaDon] = useState([]);
  const [current, setCurrent] = useState({});
  const [search, setSearch] = useState();
  const [cookie,setCookie]= useCookies();
  useEffect(() => {
    fetchNguyenLieu(search)
  }, [search])

  async function fetchNguyenLieu(search) {
    try {
      let query =''
      if(search)
        query = '?date=' + search
      const resp = await axiosInstance.get('/HoaDon'+query);
      console.log(resp.data);
      setHoaDon(resp.data.result)
    } catch (err) {
      console.error(err);
    }
  };

  async function xoaHoaDon(id) {
    try {
      const resp = await axiosInstance.delete('/HoaDon/'+id);
      console.log(resp.data);
      if(resp.data.ok)
        fetchNguyenLieu()
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
    {cookie.role == "admin" ? 
    <><div style={{ position: "relative", marginBottom: "20px" }}>
          <h2 style={{ marginLeft: "25px" }}>Hoá đơn</h2>{" "}
          <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search search-form">
            <div className="input-group">
              <input
                type="date"
                className="form-control bg-light border-0 small"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search fa-sm" />
                </button>
              </div>
            </div>
          </form>
        </div><div className="container-fluid">
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
                        <th>Mã HĐ</th>
                        <th>Ngày lập</th>
                        <th>Trạng thái</th>
                        <th>Hình thức</th>
                        <th className="btn-wrapper" />
                      </tr>
                      {hoaDon.map(item => (
                        <tr>
                          <td>{item.IDHoaDon}</td>
                          <td>{item.NgayLap}</td>
                          {item.TrangThai ? <td>Đã trả</td> : <td>Chưa trả</td>}
                          {item.IDBan ? <td>Ở Tiệm</td> : <td>Mang về</td>}
                          <td>
                            <button
                              className="btn-func"
                              onClick={() => {
                                setOpenEdit(true);
                                setCurrent(item);
                              } }
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
                                setCurrent(item);
                              } }
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
                              onClick={() => {
                                xoaHoaDon(item.IDHoaDon);
                              } }
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
          </div><Edit data={current} open={isOpenEdit} close={() => { setOpenEdit(false); fetchNguyenLieu(); } }></Edit><Detail data={current} open={isOpenDetail} close={() => setOpenDetail(false)}></Detail></>
  :<h1>Bạn không có quyền truy cập</h1>}
  </>
  );
}

export default HoaDon;
