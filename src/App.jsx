import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Loader from './pages/Loader';
import MainScreen from './pages/MainScreen';
import MyOrganizations from './pages/MyOrganizations';
import OrganizationDetails from './pages/OrganizationDetails';
import MyAutopark from './pages/MyAutopark';
import VehicleDetails from './pages/VehicleDetails';
import ReleaseAddress from './pages/ReleaseAddress';
import MyDrivers from './pages/MyDrivers';
import DriverDetails from './pages/DriverDetails';
import RequestForm from './pages/RequestForm';
import MyOrders from "./pages/MyOrders/MyOrders";
import OrderDetails from "./pages/MyOrders/OrderDetails";
import RequestDetails from "./pages/MyOrders/RequestDetails";
import DeliveryForm from './pages/DeliveryForm';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

function RedirectInvalidRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    //console.log(location.pathname)
    if (location.pathname.includes("tgWebAppData")) {
      console.log(location.pathname)
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  return null;
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <RedirectInvalidRoutes />
        <Routes>
          <Route path="/" element={<Loader />} />
          <Route path="/tgWebAppData" element={<Loader />} />
          <Route path="/main" element={<MainScreen />} />
          <Route path="/organizations" element={<MyOrganizations />} />
          <Route path="/organization/:id" element={<OrganizationDetails />} />
          <Route path="/organization/:id/autopark" element={<MyAutopark />} />
          <Route path="/organization/:orgId/vehicle/:vehicleId" element={<VehicleDetails />} />
          <Route path="/organization/:id/drivers" element={<MyDrivers />} />
          <Route path="/organization/:orgId/driver/:driverId" element={<DriverDetails />} />
          <Route path="/organization/:id/release-address" element={<ReleaseAddress />} />
          <Route path="/organization/:id/request-form" element={<RequestForm />} />
          <Route path="/organization/:id/deliveries" element={<DeliveryForm />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
          <Route path="/orders/:orderId/requests/:requestId" element={<RequestDetails />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App
