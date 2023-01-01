import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import App from './App';
import Login from './Login'
import reportWebVitals from './reportWebVitals';

import ThanhToanPage from "./pages/ThanhToan";
import ThucDonPage from "./pages/ThucDon";
import HoaDonPage from "./pages/HoaDon";
import ThongKePage from "./pages/ThongKe";
import DatBanPage from "./pages/DatBan";
import TonKhoPage from "./pages/TonKho";
import NhapPage from "./pages/Nhap";
import BanPage from "./pages/Ban";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="/ThanhToan" element={<ThanhToanPage />} ></Route>
        <Route path="/ThucDon" element={<ThucDonPage />} ></Route>
        <Route path="/HoaDon" element={<HoaDonPage />} ></Route>
        <Route path="/ThongKe" element={<ThongKePage />} ></Route>
        <Route path="/DatBan" element={<DatBanPage />} ></Route>
        <Route path="/TonKho" element={<TonKhoPage />} ></Route>
        <Route path="/NhapKho" element={<NhapPage />} ></Route>
        <Route path="/Ban/*" element={<BanPage />} ></Route>
        <Route path="/Ban/:id" element={<ThanhToanPage />} ></Route>
     </Route>
      <Route path="/Login" element={<Login />} ></Route>
    </Routes>
  </BrowserRouter>
 
);

reportWebVitals();
