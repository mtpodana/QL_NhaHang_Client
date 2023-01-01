import Topbar from "../components/Topbar";
import TonKho from "../components/TonKho/TonKho.js";
function App() {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
    <div className='content'>
      <Topbar></Topbar>
      <div className="container-fluid ">
        <TonKho></TonKho>
      </div>   
    </div>
    </div> 
  );
}

export default App;
