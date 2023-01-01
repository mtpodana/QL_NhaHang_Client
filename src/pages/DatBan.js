import Topbar from "../components/Topbar";
import DatBan from "../components/DatBan/DatBan";
function App() {
  return (

    <div id="content-wrapper" className="d-flex flex-column">
    <div className='content'>
      <Topbar></Topbar>
      <div className="container-fluid">
        <DatBan></DatBan>
      </div>   
    </div>
    </div> 
  );
}

export default App;