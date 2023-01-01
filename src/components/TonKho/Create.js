import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/callApi";

const schema = yup.object({
  TenNguyenLieu: yup.string().required("Ten Nguuyen Lieu la bat buoc"),
  DonGia: yup.number().typeError('you must specify a number').required("Don Gia la bat buoc"),
  SoLuongTon: yup.number().required(),
  IDDVT: yup.number().required()
})


function Create({ open, close }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const [dvt, setDvt] = useState([]);

  const onSubmit = (data) => {
    console.log(data)
    createNguyenLieu(data)
  }

  useEffect(() => {
    if (open) {
      console.log("Get API DS DVT")
      fetchDVT()
    }
  }, [open])

  async function fetchDVT() {
    try {
      const resp = await axiosInstance.get('/TonKho/DonViTinh');
      console.log(resp.data);
      setDvt(resp.data.result)
    } catch (err) {
      console.error(err);
    }
  }
  async function createNguyenLieu(data) {
    try {
      const resp = await axiosInstance.post('/TonKho/NguyenLieu', { data })
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
        <div className="form-create" style={{ height: "320px" }}>
          <h2
            style={{ color: "white", background: "#4e73df", fontWeight: "700" }}
          >
            Tạo nguyên liệu
            <button onClick={close}>X</button>
          </h2>
          <form method="put" action=" " onSubmit={handleSubmit(onSubmit)}>
            <div className="wrap-input">
              <p htmlFor="TenNguyenLieu" className="create-label">
                Tên nguyên liệu *
              </p>
              <input
                {...register('TenNguyenLieu')}
                type={"text"}
                name="TenNguyenLieu"
                className="create-input"
                placeholder="Hãy nhập tên nguyên liệu..."
              ></input>
              <p>{errors.TenNguyenLieu?.message}</p>
            </div>
            <div className="wrap-input">
              <p htmlFor="DonGia" className="create-label">
                Đơn giá *
              </p>
              <input
                {...register('DonGia')}
                type={"number"}
                name="DonGia"
                className="create-input"
                placeholder="Hãy nhập đơn giá..."
              ></input>
              <p>{errors.DonGia?.message}</p>
            </div>
            <div className="wrap-input">
              <p htmlFor="SoLuongTon" className="create-label">
                Số người
              </p>
              <input
                {...register('SoLuongTon')}
                type={"text"}
                // name="SoLuongTon"
                className="create-input"
                placeholder="Hãy nhập số lượng..."
              ></input>
            </div>
            <div className="wrap-input">
              <p htmlFor="DonVi" className="create-label">
                Đơn vị *
              </p>
              <select
                {...register('IDDVT')}
                className="create-input" >
                {dvt.map(item => (
                  <option value={item.IDDVT} key={item.IDDVT}>{item.DonViTinh}</option>
                ))}
              </select>
            </div>

            <input type={'submit'} className="btn-confirm" value={"Xác nhận"} /></form>
        </div>
      </div>
    </div>
  );
}

export default Create;
