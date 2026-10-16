import Login from "./login/login"
import {Toaster} from 'react-hot-toast'
import {BrowserRouter, Routes, Route} from 'react-router'
import Register from "./login/register"
import OrganizationRegister from "./login/regOrg"
function App(){
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrganizationRegister/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

      </Routes>
    </BrowserRouter>
    <Toaster position="top-center"/>
    </>
    
  )
}
export default App