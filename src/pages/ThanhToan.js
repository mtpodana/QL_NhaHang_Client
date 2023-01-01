import Topbar from "../components/Topbar";
import Menu from "../components/ThanhToan/Menu";
import axios from "axios";
import React, { useState,useEffect } from "react";
function App(props) {
  
  const [foods,setFoods]= useState();
  const [orders,setOrders] = useState();
  const [emptyFoods,setEmptyFoods]= useState();
  const [category,setCategory]=useState();
  const getFood =  async ()=> {
        axios.get('http://localhost:4000/ThucDon')
        .then(res => {
         setFoods(res.data.result);
        })
        .then(
           axios.get('http://localhost:4000/ThucDon/OOS')
          .then(res => {
            setEmptyFoods(res.data.result);
           })
           .catch(err =>{
             console.log(err);
           })
        )
        .catch(err =>{
          console.log(err);
        })
       
    }
    const getPhanLoai = () =>{
      axios.get('http://localhost:4000/ThucDon/PhanLoai')
          .then(res => {
           setCategory(res.data.result)          
          })
          .catch(err =>{
            console.log(err);
          })
    } 
    const getOrders = () =>{
      axios.get('http://localhost:4000/ThanhToan/Order')
          .then(res => {
           setOrders(res.data)         
          })
          .catch(err =>{
            console.log(err);
          })
    }
      useEffect(()=>{getFood();getPhanLoai();getOrders()},[]);
  return (
    <div id="content-wrapper" className="d-flex flex-column">
    <div className='content'>
      <Topbar></Topbar>
      <div className="container-fluid">
      <div className="row">
      { foods  && category && emptyFoods ? <Menu props={[foods,category,emptyFoods,orders]}></Menu>: <h1>Loading...</h1> } 
      </div>
      </div>   
    </div>
    </div> 
  );
}

export default App;
