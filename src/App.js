import { Layout } from "antd"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import MainPage from "./pages/MainPage";
import MapDirections from "./pages/MapDirections";
import BusSchedulePage from "./admin/BusSchedulePage";
import CustomerBus from "./pages/CustomerBus";
import AdminLogin from "./admin/Login"

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/hospital/maps-directions" element={<MapDirections />} />
          <Route path="/hospital/admin-bus" element={<BusSchedulePage />} />
          <Route path="/hospital/bus" element={<CustomerBus />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;