import Topbar from "../components/Topbar";
import ThucDon from "../components/ThucDon/ThucDon.js";
import axios from "axios";
import React, { useState,useEffect } from "react";
function App() {
  const [foods,setFoods]= useState();
  var temp=[]
  const getFood =()=>{
        axios.get('http://localhost:4000/ThucDon')
        .then(res => {
         temp=res.data.result
         setFoods(temp);
        })
        .catch(err =>{
          console.log(err);
        })
    }   
      useEffect(()=>getFood(),[]);
    return (
      <div id="content-wrapper" className="d-flex flex-column">
      <div className='content'>
        <Topbar></Topbar>
        <div className="container-fluid ">
         { foods ? <ThucDon props={foods}></ThucDon>: <h1>Loading...</h1> } 
        </div>   
      </div>
      </div> 
    );
  }

export default App;
