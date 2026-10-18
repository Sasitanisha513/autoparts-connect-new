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
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VendorReportsPage from "./pages/VendorReportsPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageVendors from "./pages/admin/ManageVendors";
import ManageVehicles from "./pages/admin/ManageVehicles";
import ManageParts from "./pages/admin/ManageParts";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageBlogs from "./pages/admin/ManageBlogs";
import ManageOrders from "./pages/admin/ManageOrders";
import Reports from "./pages/admin/Reports";

import SupplierDashboard from "./pages/SupplierDashboard";
import InventoryPage from "./pages/InventoryPage";
import PartSourcesPage from "./pages/PartSourcesPage";
import AddProductPage from "./pages/AddProductPage";
import VendorRegisterPage from "./pages/VendorRegisterPage";
import VendorLoginPage from "./pages/VendorLoginPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

import AccessibilityWidget from "./components/AccessibilityWidget";
import Chatbot from "./components/Chatbot";

import { LanguageProvider } from "./context/LanguageContext";


function App() {

  return (

    <LanguageProvider>

      {/* ==========================
          ACCESSIBILITY
      ========================== */}

      <AccessibilityWidget />
<Chatbot />


      {/* ==========================
          ALL ROUTES
      ========================== */}

      <Routes>


        {/* ==========================
            CUSTOMER PAGES
        ========================== */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/parts"
          element={<PartsPage />}
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />

        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />

        <Route
          path="/part-details/:id"
          element={<PartDetailsPage />}
        />


        {/* ==========================
            SUPPLIER PAGES
        ========================== */}

        <Route
          path="/supplier-dashboard"
          element={<SupplierDashboard />}
        />

        <Route
          path="/inventory"
          element={<InventoryPage />}
        />
<Route
  path="/part-sources"
  element={<PartSourcesPage />}
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
          path="/vendor-reports"
          element={<VendorReportsPage />}
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


        {/* ==========================
            OTHER PAGES
        ========================== */}

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


        {/* ==========================
            ADMIN PAGES
        ========================== */}

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/vendors"
          element={<ManageVendors />}
        />

        <Route
          path="/admin/vehicles"
          element={<ManageVehicles />}
        />

        <Route
          path="/admin/orders"
          element={<ManageOrders />}
        />

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

        <Route
          path="/admin/blogs"
          element={<ManageBlogs />}
        />


        {/* ==========================
            ORDER PAGES
        ========================== */}

        <Route
          path="/my-orders"
          element={<MyOrdersPage />}
        />

        <Route
          path="/order-success"
          element={<OrderSuccessPage />}
        />

      </Routes>

    </LanguageProvider>

  );

}

export default App;