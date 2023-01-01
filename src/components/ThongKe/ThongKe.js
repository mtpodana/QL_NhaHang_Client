import "./ThongKe.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import axiosInstance from "../../config/callApi";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};
const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];


function ThongKe(props) {

const [doanhThu, setDanhThu] = useState([])
const [ngay, setNgay] = useState()
const [thang, setThang] = useState()
const [dem, setDem] = useState()

useEffect(()=>{
  fetchDoanhThu()
  fetchDoanhThuNgay()
  fetchDoanhThuThang()
  fetchDem()
},[])


const data = {
  labels,
  datasets: [
    {
      label: 'Doanh thu',
      data: doanhThu.map(item => item.Tong),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

async function fetchDoanhThu() {
  try {
    const resp = await axiosInstance.get('/ThongKe');
    console.log(resp.data);
    setDanhThu(resp.data.result)
  } catch (err) {
    console.error(err);
  }
}
async function fetchDoanhThuNgay() {
  try {
    const resp = await axiosInstance.get('/ThongKe/Ngay');
    console.log(resp.data);
    setNgay(resp.data.result)
  } catch (err) {
    console.error(err);
  }
}
async function fetchDoanhThuThang() {
  try {
    const resp = await axiosInstance.get('/ThongKe/Thang');
    console.log(resp.data);
    setThang(resp.data.result)
  } catch (err) {
    console.error(err);
  }
}
async function fetchDem() {
  try {
    const resp = await axiosInstance.get('/ThongKe/Dem');
    console.log(resp.data);
    setDem(resp.data.result)
  } catch (err) {
    console.error(err);
  }
}


  return (
    <><h2>Thống kê</h2><div className="row">
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-primary shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Doanh thu (Hôm nay)</div>
                <div className="h5 mb-0 font-weight-bold text-gray-800" id="EarnToday">{ngay?.Tong}</div>
              </div>
              <div className="col-auto">
                <i className="fas fa-calendar fa-2x text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-success shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                  Doanh thu (Tháng)</div>
                <div className="h5 mb-0 font-weight-bold text-gray-800" id="EarnMonth">{thang?.Tong}</div>
              </div>
              <div className="col-auto">
                <i className="fas fa-dollar-sign fa-2x text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-info shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Khách hàng
                </div>
                <div className="row no-gutters align-items-center">
                  <div className="col-auto">
                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50 </div>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-solid fa-user-group fa-2x text-gray-300"></i>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-warning shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                  Hoá đơn</div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">{dem?.tong}</div>
              </div>
              <div className="col-auto">
                <i className="fas fa-clipboard-list fa-2x text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Chi tiết</h6>
            </div>
            <div className="card-body">
            <Line options={options} data={data} />
            </div>
          </div>
         
        </div>
        <div className="col-lg-6 mb-4">
        </div>
      </div>
      </>
      );
}

      export default ThongKe;
