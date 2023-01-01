import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axiosInstance from "../../config/callApi";


const schema = yup.object({
  tenKhachHang: yup.string().required("Vui long nhap day du cac truong"),
  soNguoiDat: yup.number().required("Vui long nhap day du cac truong"),
  NgayDat: yup.date(),
  KhungGioi: yup.string()
})

function Create({ open, close }) {

  const { handleSubmit, register, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    const date = data.NgayDat + ' ' + data.KhungGio
    const dataFinal = {
      ngay: date,
      tenKhachHang: data.tenKhacHang,
      soNguoiDat: data.soNguoiDat
    }
    fetchThemDatBan(dataFinal)
  }

  async function fetchThemDatBan(data) {
    try {
      const resp = await axiosInstance.post('/DatBan', { data })
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
            Tạo mới
            <button onClick={close}>X</button>
          </h2>
          <form method="put" action=" " onSubmit={handleSubmit(onSubmit)}>
            <div className="wrap-input">
              <p htmlFor="TenNguoiDat" className="create-label">
                Tên người đặt *
              </p>
              <input
                {...register('tenKhacHang')}
                type={"text"}
                className="create-input"
                placeholder="Hãy nhập tên người đặt..."
              ></input>
              <p>{errors.tenKhacHang?.message}</p>
            </div>
            <div className="wrap-input">
              <p htmlFor="NgayDat" className="create-label">
                Ngày đặt *
              </p>
              <input
                {...register('NgayDat')}
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
                {...register("KhungGio")}
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
                {...register('soNguoiDat')}
                type={"number"}
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

export default Create;
