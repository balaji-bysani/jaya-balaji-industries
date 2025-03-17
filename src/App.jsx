import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Login from "./components/login/Login"
import Register from "./components/Register/Register"
import { HashRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Admin from './components/admin'
import Supervisor from './components/supervisor'
import Marker from './components/marker'
import { AppSidebar } from './components/sidebar/sidebar'

import MarkingPage from './components/Marking/Marking'
import NewMarking from './components/Marking/NewMarking'

function App() {
  const [count, setCount] = useState(0)
  const [userstate, setUserState] = useState({});
 return(
 <div>
  {/* <h1>JBI</h1>
  <Button>Click Me!</Button> */}
    <Routes>
      <Route
              path="/"
              element={
                <Login setUserState={setUserState} />
              } 
      ></Route>
       <Route
              path="/Admin"
              element={
                <Admin/>
              } 
      ></Route>
      <Route
              path="/Supervisor"
              element={
                <Supervisor/>
              } 
      ></Route>
      <Route
              path="/Marker"
              element={
                <Marker/>
              } 
      ></Route>
     
      <Route
              path="/Marking"
              element={
                <MarkingPage/>
              } 
      ></Route>
      <Route
              path="/NewMarking"
              element={
                <NewMarking/>
              } 
      ></Route>
     </Routes>

</div>)
}

export default App
