import { useForm } from "react-hook-form";
import axiosInstance from "../../config/callApi";

function Xoa({ open, close, id }) {

  const { handleSubmit, register } = useForm()

  const onSubmit = data => {
    console.log(data)
    const finalData = {
      SoLuong: data.SoLuongThem,
      IDNguyenLieu: id
    }
    addNguyenLieu(finalData, data.ChangeAll)
  }

  async function addNguyenLieu(data, changeAll) {
    try {
      let uri = "Xoa"
      if (changeAll) {
        uri = "Thay"
      }
      const resp = await axiosInstance.put('/TonKho/NguyenLieu/' + uri, { ...data })
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
        <div className="form-create" style={{ height: "250px" }}>
          <h2
            style={{
              color: "white",
              background: "#4e73df",
              fontWeight: "700",
            }}
          >
            Xoá
            <button onClick={close}>X</button>
          </h2>
          <form method="put" action=" " onSubmit={handleSubmit(onSubmit)}>
            <div className="wrap-input">
              <p htmlFor="SoLuongThem" className="create-label">
                Số lượng xoá *
              </p>
              <input
                {...register('SoLuongThem')}
                type={"text"}
                name="SoLuongThem"
                className="create-input"
                placeholder="Hãy nhập số lượng..."
              ></input>
            </div>
            <div className="wrap-input">
              <input name="ChangeAll" type={"checkbox"} {...register('ChangeAll')}></input>
              <label htmlFor="ChangeAll" style={{ marginLeft: "10px" }}>Thay đổi tổng số lượng</label>
            </div>
            <input type={"submit"} className="btn-confirm" value={"Xác nhận"} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Xoa;
