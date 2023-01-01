function FoodDetail({ open, close, props }) {
  if (!open) return null;
  if (!props) return null;
  const displayCongThuc = (data) => {
    return Object.keys(data).map((item, i) => {
      return (
        <div id="NguyenLieu" style={{ marginLeft: "-20px" }}>
          <div className="wrap-input">
            <p htmlfor="NguyenLieu" className="create-label">
              Nguyên liệu
            </p>
            <input
              type='{"text"}'
              name="NguyenLieu"
              className="create-input"
              value={props[1][item].TenNguyenLieu +" ("+ props[1][item].DonViTinh +")"}
              disabled
            />
          </div>
          <div className="wrap-input">
            <p htmlfor="SoLuong" className="create-label">
              Số lượng
            </p>
            <input
              type='{"text"}'
              name="Số lượng"
              className="create-input"
              value={props[1][item].SoLuong}
              disabled
            />
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <div className="overlay">
        <div className="form-create">
          <h2
            style={{ color: "white", background: "#4e73df", fontWeight: "700" }}
          >
            CHI TIẾT
            <button onClick={close}>X</button>
          </h2>
          <form method="put" action=" ">
            <div className="wrap-input">
              <p htmlFor="TenMon" className="create-label">
                Tên món *
              </p>
              <input
                type={"text"}
                name="TenMon"
                className="create-input"
                disabled
                value={props[0].TenMon}
              ></input>
            </div>
            <div className="wrap-input">
              <p htmlFor="PhanLoai" className="create-label">
                Phân loại *
              </p>
              <input
                type={"text"}
                name="TenMon"
                className="create-input"
                disabled
                value={props[0].TenPhanLoai}
              ></input>
            </div>
            <div className="wrap-input">
              <p htmlFor="GiaTien" className="create-label">
                Giá tiền *
              </p>
              <input
                type={"text"}
                name="GiaTien"
                className="create-input"
                disabled
                value={props[0].GiaTien}
              ></input>
            </div>
            <div className="wrap-input">
              <p htmlFor="GiaBan" className="create-label">
                Giá bán *
              </p>
              <input
                type={"text"}
                name="Giá bán"
                className="create-input"
                disabled
                value={props[0].GiaBan}
              ></input>
            </div>
            <div className="wrap-input" style={{ margin: "10px 0" }}>
              <span htmlFor="Image" className="create-label">
                Hình ảnh *
              </span>
              <img
                src={props[0].Image}
                alt="Food"
                style={{ width: "200px", height: "200px" }}
              ></img>
            </div>
            <div className="wrap-input" id="CongThuc">
              <p
                htmlFor="CongThuc"
                className="create-label"
                style={{ fontSize: "20px" }}
              >
                Công thức
              </p>
              {displayCongThuc(props[1])}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FoodDetail;
