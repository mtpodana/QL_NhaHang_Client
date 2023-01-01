import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../config/callApi";

function Edit({ open, close, data }) {
  const { handleSubmit, register } = useForm()



  const onSubmit = (d) => {
    console.log(data.IDPhieuDat);
    console.log(d)
    const date = d.NgayDat + ' ' + d.KhungGio
    const dataFinal = {
      ngay: date,
      tenKhachHang: d.TenNguoiDat,
      soNguoiDat: d.SoNguoi
    }
    console.log(dataFinal)
    fetchCapNhatDatBan(data.IDPhieuDat, dataFinal)
  }

  async function fetchCapNhatDatBan(id, dta) {
    try {
      const resp = await axiosInstance.put('/DatBan/' + id, { data: dta })
      console.log(resp.data);
      if (resp.data.ok)
        close()
      // setDvt(resp.data.result)
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
            <button onClick={close}>X</button>
          </h2>
          <form method="put" action=" " onSubmit={handleSubmit(onSubmit)}>
            <div className="wrap-input">
              <p htmlFor="TenNguoiDat" className="create-label">
                Tên người đặt *
              </p>
              <input
                {...register('TenNguoiDat')}
                type={"text"}
                defaultValue={data?.TenKhachHang}
                name="TenNguoiDat"
                className="create-input"
                placeholder="Hãy nhập tên người đặt..."
              ></input>
            </div>
            <div className="wrap-input">
              <p htmlFor="NgayDat" className="create-label">
                Ngày đặt *
              </p>
              <input
                {...register('NgayDat')}
                defaultValue={data?.ThoiGianDat}
                type={"date"}
                name="NgayDat"
                className="create-input"
              ></input>
            </div>
            <div className="wrap-input">
              <p htmlFor="KhungGio" className="create-label">
                Khung giờ *
              </p>
              <input
                {...register('KhungGio')}
                defaultValue={data?.GioDat}
                type={"time"}
                name="KhungGio"
                className="create-input"
                placeholder="Hãy nhập giá tiền..."
              ></input>
            </div>
            <div className="wrap-input">
              <p htmlFor="SoNguoi" className="create-label">
                Số người
              </p>
              <input
                {...register('SoNguoi')}
                defaultValue={data?.SoNguoiDat}
                type={"text"}
                name="SoNguoi"
                className="create-input"
                placeholder="Hãy nhập số người..."
              ></input>
            </div>
            <input type={'submit'} className="btn-confirm" value={"Xác nhận"} /></form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
