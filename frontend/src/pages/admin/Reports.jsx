import "./Reports.css";
import AdminSidebar from "../../components/admin/AdminSidebar";

function Reports() {

  return (

    <div className="reports-page">

      <AdminSidebar />

      <div className="reports-content">

        {/* Header */}

        <div className="reports-header">

          <h1>Reports & Analytics</h1>

          <p>
            Monitor system performance and business insights.
          </p>

        </div>
{/* Statistics Cards */}

<div className="stats-grid">

  <div className="stat-card">

    <span className="stat-icon">👥</span>

    <h4>Total Users</h4>

    <h2>1,254</h2>

  </div>

  <div className="stat-card">

    <span className="stat-icon">🚗</span>

    <h4>Total Vehicles</h4>

    <h2>342</h2>

  </div>

  <div className="stat-card">

    <span className="stat-icon">📦</span>

    <h4>Total Orders</h4>

    <h2>865</h2>

  </div>

  <div className="stat-card">

    <span className="stat-icon">💰</span>

    <h4>Total Revenue</h4>

    <h2>LKR 2.5M</h2>

  </div>

</div>
{/* ================= REPORT SECTIONS ================= */}

<div className="reports-grid">

  {/* Monthly Sales */}

  <div className="report-card">

    <h2>Monthly Sales</h2>

    <div className="sales-chart">

      <div className="bar">
        <span>Jan</span>
        <div className="bar-fill jan"></div>
      </div>

      <div className="bar">
        <span>Feb</span>
        <div className="bar-fill feb"></div>
      </div>

      <div className="bar">
        <span>Mar</span>
        <div className="bar-fill mar"></div>
      </div>

      <div className="bar">
        <span>Apr</span>
        <div className="bar-fill apr"></div>
      </div>

      <div className="bar">
        <span>May</span>
        <div className="bar-fill may"></div>
      </div>

      <div className="bar">
        <span>Jun</span>
        <div className="bar-fill jun"></div>
      </div>

    </div>

  </div>

  {/* Order Status */}

  <div className="report-card">

    <h2>Order Status</h2>

    <div className="status-list">

      <div className="status-item">
        <span>Delivered</span>
        <strong>65%</strong>
      </div>

      <div className="status-item">
        <span>Pending</span>
        <strong>20%</strong>
      </div>

      <div className="status-item">
        <span>Pickup</span>
        <strong>15%</strong>
      </div>

    </div>

  </div>

</div>
{/* ================= BOTTOM SECTION ================= */}

<div className="bottom-grid">

  {/* Recent Orders */}

  <div className="report-card">

    <h2>Recent Orders</h2>

    <table className="recent-table">

      <thead>

        <tr>
          <th>Order</th>
          <th>Customer</th>
          <th>Status</th>
        </tr>

      </thead>

      <tbody>

        <tr>
          <td>PO-2026-001</td>
          <td>John Doe</td>
          <td><span className="delivered">Delivered</span></td>
        </tr>

        <tr>
          <td>PO-2026-002</td>
          <td>Emma Watson</td>
          <td><span className="pending">Pending</span></td>
        </tr>

        <tr>
          <td>PO-2026-003</td>
          <td>Michael Lee</td>
          <td><span className="pickup">Pickup</span></td>
        </tr>

      </tbody>

    </table>

  </div>

  {/* Top Selling Parts */}

  <div className="report-card">

    <h2>Top Selling Parts</h2>

    <ul className="top-parts">

      <li>
        <span>Brake Pad</span>
        <strong>340 Sold</strong>
      </li>

      <li>
        <span>Oil Filter</span>
        <strong>280 Sold</strong>
      </li>

      <li>
        <span>Air Filter</span>
        <strong>210 Sold</strong>
      </li>

      <li>
        <span>Radiator</span>
        <strong>180 Sold</strong>
      </li>

    </ul>

  </div>

</div>
      </div>

    </div>

  );

}

export default Reports;