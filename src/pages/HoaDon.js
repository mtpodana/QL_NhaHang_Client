import Topbar from "../components/Topbar";
import HoaDon from "../components/HoaDon/HoaDon";
function App() {
  return (

    <div id="content-wrapper" className="d-flex flex-column">
    <div className='content'>
      <Topbar></Topbar>
      <div className="container-fluid">
        <HoaDon></HoaDon>
      </div>   
    </div>
    </div> 
  );
}

export default App;