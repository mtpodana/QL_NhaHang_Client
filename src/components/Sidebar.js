import ThanhToanPage from "../pages/ThanhToan";
import ThucDonPage from "../pages/ThucDon";
import HoaDonPage from "../pages/HoaDon";
import ThongKePage from "../pages/ThongKe";
import DatBanPage from "../pages/DatBan";
import TonKhoPage from "../pages/TonKho";
import NhapPage from "../pages/Nhap";
import BanPage from "../pages/Ban";
import { Routes, Route,Link } from "react-router-dom";

function Sidebar(props) {
  const toggleSidebar = () => {
    document.body.classList.toggle("sidebar-toggled");
    document.querySelector(".sidebar").classList.toggle("toggled");
    if (document.querySelector(".sidebar").classList.contains("toggled")) {
      document.querySelector(".sidebar .collapse").collapse("hide");
    }
  };
  return (
    <div id="wrapper">
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href=" "
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-solid fa-bowl-food" />
          </div>
          <div className="sidebar-brand-text mx-3">Nhóm 1</div>
        </a>
        <li className="nav-item">
          <Link className="nav-link" to="/ThanhToan">
            <i className="fas fa-solid fa-cash-register" />
            <span>Thanh toán</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item">
          <Link className="nav-link" to="/DatBan">
            <i className="fas fa-solid fa-calendar-days" />
            <span>Đặt bàn</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item">
          <Link className="nav-link" to="/ThongKe">
            <i className="fas fa-solid fa-chart-line" />
            <span>Thống kê</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item">
          <Link className="nav-link" to="/ThucDon ">
            <i className="fas fa-solid fa-burger" />
            <span>Thực đơn</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item">
          <Link className="nav-link" to="/HoaDon">
            <i className="fas fa-solid fa-file-lines" />
            <span>Hoá đơn</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href=" "
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <i className="fas fa-solid fa-box" />
            <span>Kho</span>
          </a>
          <div
            id="collapsePages"
            className="collapse"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/TonKho">
                Tồn kho
              </Link>
              <Link className="collapse-item" to="/NhapKho">
                Nhập kho
              </Link>
            </div>
          </div>
        </li>
        <hr className="sidebar-divider d-none d-md-block" />
        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
            onClick={toggleSidebar}
          />
        </div>
      </ul>
      <Routes>
        <Route path="/ThanhToan" element={<ThanhToanPage />} ></Route>
        <Route path="/ThucDon" element={<ThucDonPage />} ></Route>
        <Route path="/HoaDon" element={<HoaDonPage />} ></Route>
        <Route path="/ThongKe" element={<ThongKePage />} ></Route>
        <Route path="/DatBan" element={<DatBanPage />} ></Route>
        <Route path="/TonKho" element={<TonKhoPage />} ></Route>
        <Route path="/NhapKho" element={<NhapPage />} ></Route>
        <Route path="/Ban/*" element={<BanPage />} ></Route>
        <Route path="/Ban/:id" element={<ThanhToanPage />} ></Route>
    </Routes>
    </div>
    
  );
}

export default Sidebar;
