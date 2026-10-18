import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import "./Reports.css";
import AdminSidebar from "../../components/admin/AdminSidebar";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Reports() {
  const [dashboardData, setDashboardData] = useState({
  totalCustomers: 0,
  totalVendors: 0,
  totalVehicles: 0,
  totalParts: 0,
  totalOrders: 0,
  totalRevenue: 0,
});
const [monthlyData, setMonthlyData] = useState({
  labels: [],
  data: [],
});

const [recentOrders, setRecentOrders] = useState([]);
const [statusSummary, setStatusSummary] = useState([]);
const [topParts, setTopParts] = useState([]);

useEffect(() => {
  fetchDashboardData();
  fetchMonthlyOrders();
  fetchRecentOrders();
  fetchStatusSummary();
  fetchTopSellingParts();
}, []);

const fetchTopSellingParts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/orders/top-selling-parts"
    );

    setTopParts(response.data);
  } catch (error) {
    console.error("Error loading top selling parts:", error);
  }
};

const fetchStatusSummary = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/orders/status-summary"
    );

    setStatusSummary(response.data);
  } catch (error) {
    console.error("Error loading order status:", error);
  }
};

const fetchRecentOrders = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/orders"
    );

    setRecentOrders(response.data);
  } catch (error) {
    console.error("Error loading recent orders:", error);
  }
};

const fetchMonthlyOrders = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/admin/monthly-orders"
    );
console.log(response.data);
    setMonthlyData(response.data);
  } catch (error) {
    console.error("Error loading monthly orders:", error);
  }
};

const chartData = {
  labels: monthlyData.labels,
  datasets: [
    {
      label: "Orders",
      data: monthlyData.data,
      backgroundColor: "#f59e0b",
      borderRadius: 6,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const fetchDashboardData = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/admin/dashboard"
    );

    setDashboardData(response.data);
  } catch (error) {
    console.error("Error loading dashboard data:", error);
  }
};
const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("AutoParts Connect - Reports", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Customer", "Status", "Total (LKR)"]],
    body: recentOrders.map((order) => [
      order.customerName,
      order.status,
      order.totalAmount,
    ]),
  });

  doc.save("Reports.pdf");
};
const exportExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(
    recentOrders.map((order) => ({
      Customer: order.customerName,
      Status: order.status,
      Total: order.totalAmount,
    }))
  );

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Orders"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(file, "Reports.xlsx");
};

  return (

    <div className="reports-page">

      <AdminSidebar />

      <div className="reports-content">

        {/* Header */}

     <div className="reports-header">

  <div>
    <h1>Reports & Analytics</h1>
    <p>Monitor system performance and business insights.</p>
  </div>

  <div className="export-buttons">
   <button
  className="pdf-btn"
  onClick={exportPDF}
>
  📄 Export PDF
</button>

<button
  className="excel-btn"
  onClick={exportExcel}
>
  📊 Export Excel
</button>
  </div>

</div>
{/* Statistics Cards */}

<div className="stats-grid">

  <div className="stat-card">

    <span className="stat-icon">👥</span>

    <h4>Total Users</h4>

  <h2>{dashboardData.totalCustomers + dashboardData.totalVendors}</h2>

  </div>

  <div className="stat-card">

    <span className="stat-icon">🚗</span>

   <h4>Total Parts</h4>

  <h2>{dashboardData.totalParts}</h2>

  </div>

  <div className="stat-card">

    <span className="stat-icon">📦</span>

    <h4>Total Orders</h4>
<h2>{dashboardData.totalOrders}</h2>

  </div>

  <div className="stat-card">

    <span className="stat-icon">💰</span>

    <h4>Total Revenue</h4>

  <h2>LKR {dashboardData.totalRevenue.toLocaleString()}</h2>

  </div>

</div>
{/* ================= REPORT SECTIONS ================= */}

<div className="reports-grid">

  {/* Monthly Sales */}

  <div className="report-card">

    <h2>Monthly Sales</h2>

   <Bar
  data={chartData}
  options={chartOptions}
/>

  </div>

  {/* Order Status */}

  <div className="report-card">

    <h2>Order Status</h2>

   <div className="status-list">
  {statusSummary.map((status) => (
    <div className="status-item" key={status._id}>
      <span>{status._id}</span>
      <strong>{status.count}</strong>
    </div>
  ))}
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
  {recentOrders.slice(0, 5).map((order) => (
    <tr key={order._id}>
      <td>{order._id.slice(-6).toUpperCase()}</td>

      <td>{order.customerName}</td>

      <td>
        <span
          className={
            order.status === "Completed"
              ? "delivered"
              : order.status === "Pending"
              ? "pending"
              : "pickup"
          }
        >
          {order.status}
        </span>
      </td>
    </tr>
  ))}
</tbody>

    </table>

  </div>

  {/* Top Selling Parts */}

  <div className="report-card">

    <h2>Top Selling Parts</h2>

    <div className="top-parts-list">
  {topParts.map((part) => (
    <div className="top-part-item" key={part._id}>
      <span>{part._id}</span>
      <strong>{part.totalSold} Sold</strong>
    </div>
  ))}
</div>

  </div>

</div>
      </div>

    </div>

  );

}

export default Reports;