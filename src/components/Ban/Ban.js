
import "./Ban.css";
import React, { useState} from "react";
import ThanhToanPage from "../../pages/ThanhToan"
import { Routes, Route,Link } from "react-router-dom";
import axios from "axios";
function Ban(props) {
  const [soBan, setSoBan] = useState(props.props[0]);
  const [orders,setOrders]= useState(props.props[1])
  const displayBan = () => {
    let table=[];
    for (let i = 1; i <= Number(soBan); i++) {
      if(orders[i] == null){
        table.push(
          <div className="col-lg-3 dining" key={i}>
          <Link to={'/Ban/'+i}><div className="dining-inner"></div>
            <img
              src={process.env.PUBLIC_URL + "/restaurant.png"}
              alt="table"
            ></img>   
            <p>Bàn {i}</p></Link>
            
          </div>
        );
      }
      else{
        table.push(
          <div className="col-lg-3 dining" key={i}>
          <div className="using">Đang sử dụng</div>
          <Link to={'/Ban/'+i}><div className="dining-inner"></div>
            <img
              src={process.env.PUBLIC_URL + "/restaurant.png"}
              alt="table"
            ></img>   
            <p>Bàn {i}</p></Link>
            
          </div>
        );
      }
    }
    return table;
  };
  const themBan =()=>{
    axios.post("http://localhost:4000/ThanhToan/AddTable")
    window.location.reload();
  }
  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <div className="row">
          {displayBan()}
          <div  style={{display:"flex",alignItems:"center",justifyContent:"center"}} className="col-lg-3 dining" >
          <div  onClick={e=>themBan()} className="dining-inner"></div>
          <a>   
            <p>THÊM BÀN </p>
          </a>    
          </div>
        </div>
      </div>
      <Routes>
        <Route path="Ban/:id" element={<ThanhToanPage />}></Route>
      </Routes>

    </div>  
  );
}
export default Ban;
