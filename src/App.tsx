import Login from "./pages/login/login"
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route } from 'react-router'
import Register from "./pages/login/register"
import OrganizationRegister from "./pages/login/regOrg"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OrganizationRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </>

  )
}
export default App