import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import Login from "./components/login/Login";
import Register from "./components/Register/Register";
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Admin from "./components/admin";
import Supervisor from "./components/supervisor";
import Marker from "./components/marker";
import { AppSidebar } from "./components/sidebar/sidebar";

import MarkingPage from "./components/Marking/Marking";
import NewMarking from "./components/Marking/NewMarking";
import Quarry from "./components/Quarry/Quarry";
import NewQuarry from "./components/Quarry/NewQuarry";


// Import Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling

function App() {
  const [count, setCount] = useState(0);
  const [userstate, setUserState] = useState({});
  return (
    <div>
      {/* <h1>JBI</h1>
  <Button>Click Me!</Button> */}
      
  <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <Routes>
        
        <Route path="/" element={<Login setUserState={setUserState} />}></Route>
        <Route path="/Admin" element={<Admin />}></Route>
        <Route path="/Supervisor" element={<Supervisor />}></Route>
        <Route path="/Marker" element={<Marker />}></Route>

        <Route path="/Marking" element={<MarkingPage />}></Route>
        <Route path="/NewMarking" element={<NewMarking />}></Route>

        <Route path="/Quarry" element={<Quarry />}></Route>
        <Route path="/NewQuarry" element={<NewQuarry />}></Route>
      </Routes>
    </div>
  );
}

export default App;
