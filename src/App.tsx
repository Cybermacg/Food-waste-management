import Login from "./pages/login/login"
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route } from 'react-router'
import Register from "./pages/login/register"
import OrganizationRegister from "./pages/login/regOrg"
import Layout from "./pages/Layout"
import Organization from "./pages/Organization"
import MenuItems from "./pages/MenuItems"
import Inventory from "./pages/Inventory"
import WasteTracking from "./pages/WasteTracking"
import Calender from "./pages/Calender"
import SalesRecord from "./pages/SalesRecord"
import AiForecasting from "./pages/AiForecasting"
import Analytics from "./pages/Analytics"
import Overview from "./pages/Overview"
import Settings from "./pages/Settings"
import Support from "./pages/Support"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OrganizationRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Layout />}>
            <Route path="/dashboard/overview" element={<Overview />} />
            <Route path="/dashboard/organization" element={<Organization />} />
            <Route path="/dashboard/menu-items" element={<MenuItems />} />
            <Route path="/dashboard/inventory" element={<Inventory />} />
            <Route path="/dashboard/waste-tracking" element={<WasteTracking />} />
            <Route path="/dashboard/calender" element={<Calender />} />
            <Route path="/dashboard/sales-record" element={<SalesRecord />} />
            <Route path="/dashboard/forecasting" element={<AiForecasting />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/support" element={<Support />} />
          </Route>

        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </>
  )
}
export default App