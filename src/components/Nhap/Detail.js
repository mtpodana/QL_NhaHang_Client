import { useEffect, useState } from "react";
import axiosInstance from "../../config/callApi";

function Detail({ open, close, id }) {
  const [chiTiet, setChiTiet] = useState({})

  useEffect(() => {
    if (open)
      if (id)
        fetchChiTietPhieuNhap(id)
  }, [open])

  async function fetchChiTietPhieuNhap(id) {
    try {
      const resp = await axiosInstance.get('/NhapKho/ChiTiet/' + id);
      console.log("Chi tiet phieu nhap", resp.data);
      setChiTiet(resp.data.result)
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
            Chi tiết
            <button onClick={close}>X</button>
          </h2>
          <form method="put" action=" "><div className="wrap-input">
            <p htmlFor="NgayNhap" className="create-label">
              Ngày nhập *
            </p>
            <input
              value={chiTiet.NgayNhap}
              type={"date"}
              name="NgayNhap"
              className="create-input"

            ></input>
          </div>
            <div className="wrap-input" id="Items">
              <p
                htmlFor="Items"
                className="create-label"
                style={{ fontSize: "20px" }}
              >
                Nguyên liệu
              </p>

              {chiTiet.list?.map(item => (
                <div id="NguyenLieu" style={{ marginLeft: "-20px" }}>
                  <div className="wrap-input">
                    <p htmlFor="NguyenLieu" className="create-label">
                      Nguyên liệu
                    </p>
                    <input
                      type={"text"}
                      value={item.TenNguyenLieu}
                      name="NguyenLieu"
                      className="create-input"
                      placeholder="Nguyên liệu..."
                      style={{ width: "250px" }}
                      list="suggest"
                    ></input>
                  </div>
                  <div className="wrap-input">
                    <p htmlFor="SoLuong" className="create-label">
                      Số lượng
                    </p>
                    <input
                      value={item.SoLuong}
                      type={"text"}
                      name="SoLuong"
                      className="create-input"
                      placeholder="Số lượng..."
                      style={{ width: "200px" }}
                    ></input>
                  </div>
                  <div className="wrap-input">
                    <p htmlFor="GiaNhap" className="create-label">
                      Giá nhập
                    </p>
                    <input
                      value={item.GiaNhap}
                      type={"text"}
                      name="GiaNhap"
                      className="create-input"
                      placeholder="Giá nhập..."
                      style={{ width: "200px" }}
                    ></input>
                  </div>
                  <div>

                  </div>

                </div>
              ))}

            </div>
            <input type={'submit'} className="btn-confirm" value={"Xác nhận"} /></form>
        </div>
      </div>
    </div>
  );
}

export default Detail;
