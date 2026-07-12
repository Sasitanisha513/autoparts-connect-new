import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PartsPage from "./pages/PartsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PartDetailsPage from "./pages/PartDetailsPage";
import EditProductPage from "./pages/EditProductPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";
import CustomerProfilePage from "./pages/CustomerProfilePage";
import VehicleListingPage from "./pages/VehicleListingPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ForgotPasswordPage
  from "./pages/ForgotPasswordPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageVendors from "./pages/admin/ManageVendors";
import ManageVehicles from "./pages/admin/ManageVehicles";
import ManageParts from "./pages/admin/ManageParts";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageOrders from "./pages/admin/ManageOrders";
import Reports from "./pages/admin/Reports";
import SupplierDashboard from "./pages/SupplierDashboard";
import InventoryPage from "./pages/InventoryPage";
import AddProductPage from "./pages/AddProductPage";
import VendorRegisterPage from "./pages/VendorRegisterPage";
import VendorLoginPage from "./pages/VendorLoginPage";

function App() {
  return (
    <Routes>

      {/* Customer Pages */}

      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route
  path="/forgot-password"
  element={<ForgotPasswordPage />}
/>

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/parts" element={<PartsPage />} />

      <Route path="/cart" element={<CartPage />} />

<Route path="/checkout" element={<CheckoutPage />} />

      <Route
        path="/part-details/:id"
        element={<PartDetailsPage />}
      />

      {/* Supplier Pages */}
<Route
  path="/supplier-dashboard"
  element={<SupplierDashboard />}
/>
      <Route
        path="/inventory"
        element={<InventoryPage />}
      />

      <Route
        path="/add-product"
        element={<AddProductPage />}
      />
      <Route
  path="/edit-product/:id"
  element={<EditProductPage />}
/>
<Route
  path="/orders"
  element={<OrdersPage />}
/>
<Route
  path="/profile"
  element={<ProfilePage />}
/>
<Route
  path="/customer-profile"
  element={<CustomerProfilePage />}
/>
<Route
  path="/vendor-register"
  element={<VendorRegisterPage />}
/>
<Route
  path="/vendor-login"
  element={<VendorLoginPage />}
/>
<Route
  path="/vehicles"
  element={<VehicleListingPage />}
/>
<Route
  path="/blog"
  element={<BlogPage />}
/>
<Route
  path="/blog/:id"
  element={<BlogDetailsPage />}
/>
<Route
  path="/about"
  element={<AboutPage />}
/>
<Route
  path="/contact"
  element={<ContactPage />}
/>
<Route path="/admin/vendors" element={<ManageVendors />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route path="/admin/vehicles" element={<ManageVehicles />} />
<Route path="/admin/orders" element={<ManageOrders />} />
<Route
  path="/admin/parts"
  element={<ManageParts />}
/> 
<Route
  path="/admin/users"
  element={<ManageUsers />}
/>
<Route
  path="/admin/reports"
  element={<Reports />}
/>
    </Routes>
    
  );
}

export default App;