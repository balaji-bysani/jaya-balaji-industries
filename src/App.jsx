import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import {Login} from "./components/login/Login"
import {Register} from "./components/Register/Register"

function App() {
  const [count, setCount] = useState(0)
  const [userstate, setUserState] = useState({});
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div>
          
          
            <div>
             
              <Routes>
                {/* dashboard  */}
                <Route
                  path="/"
                  element={
                    userstate && userstate._id ? (
                      <Profile
                        setUserState={setUserState}
                        username={userstate.fname}
                      />
                    ) : (
                      <Login setUserState={setUserState} />
                    )
                  }
                ></Route>
                <Route
                  path="/login"
                  element={<Login setUserState={setUserState} />}
                ></Route>
                <Route path="/signup" element={<Register />} />


              </Routes>
            </div>
          
          </div>
        
      </BrowserRouter>
    </div>
  )
}

export default App
