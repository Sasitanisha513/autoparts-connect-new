import "./AdminDashboard.css";
import AdminSidebar from "../../components/admin/AdminSidebar";

import {
  FaUsers,
  FaStore,
  FaCar,
  FaShoppingCart,
  FaArrowUp,
} from "react-icons/fa";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">

      <AdminSidebar />

      <div className="dashboard-content">

        {/* Top Header */}

        <div className="dashboard-header">

          <div>
            <h1>Admin Dashboard</h1>
            <p>
              Welcome back! Here's an overview of your AutoParts Connect system.
            </p>
          </div>

          <button className="admin-profile-btn">
            Admin
          </button>

        </div>

        {/* Dashboard Cards */}

        <div className="dashboard-cards">

          <div className="dashboard-card">

            <div className="card-icon orange">
              <FaStore />
            </div>

            <div className="card-details">
              <h2>120</h2>
              <p>Total Vendors</p>
            </div>

            <span className="card-growth">
              <FaArrowUp /> 12%
            </span>

          </div>

          <div className="dashboard-card">

            <div className="card-icon blue">
              <FaUsers />
            </div>

            <div className="card-details">
              <h2>860</h2>
              <p>Total Customers</p>
            </div>

            <span className="card-growth">
              <FaArrowUp /> 8%
            </span>

          </div>

          <div className="dashboard-card">

            <div className="card-icon green">
              <FaCar />
            </div>

            <div className="card-details">
              <h2>520</h2>
              <p>Vehicle Models</p>
            </div>

            <span className="card-growth">
              <FaArrowUp /> 5%
            </span>

          </div>

          <div className="dashboard-card">

            <div className="card-icon red">
              <FaShoppingCart />
            </div>

            <div className="card-details">
              <h2>342</h2>
              <p>Total Orders</p>
            </div>

            <span className="card-growth">
              <FaArrowUp /> 18%
            </span>

          </div>

        </div>

        {/* Statistics Section */}

        <div className="statistics-section">

          <div className="statistics-card">

            <h2>Monthly Overview</h2>

            <div className="chart-placeholder">

              <div className="chart-bar bar1"></div>
              <div className="chart-bar bar2"></div>
              <div className="chart-bar bar3"></div>
              <div className="chart-bar bar4"></div>
              <div className="chart-bar bar5"></div>
              <div className="chart-bar bar6"></div>

            </div>

          </div>
                    <div className="recent-activity">

            <h2>Recent Activities</h2>

            <table>

              <thead>
                <tr>
                  <th>User</th>
                  <th>Activity</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>Nimal Perera</td>
                  <td>Registered as Vendor</td>
                  <td><span className="status pending">Pending</span></td>
                </tr>

                <tr>
                  <td>Kasun Silva</td>
                  <td>Added New Vehicle</td>
                  <td><span className="status success">Completed</span></td>
                </tr>

                <tr>
                  <td>Auto Lanka</td>
                  <td>Added New Spare Part</td>
                  <td><span className="status success">Completed</span></td>
                </tr>

                <tr>
                  <td>BMW Center</td>
                  <td>Received New Order</td>
                  <td><span className="status processing">Processing</span></td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;