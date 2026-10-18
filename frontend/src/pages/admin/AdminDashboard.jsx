import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import AdminSidebar from "../../components/admin/AdminSidebar";

import {
  FaUsers,
  FaStore,
  FaCar,
  FaShoppingCart,
  FaArrowUp,
} from "react-icons/fa";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {

  const [dashboard, setDashboard] = useState({
  totalVendors: 0,
  totalCustomers: 0,
  totalVehicles: 0,
  totalOrders: 0,
});
const [activities, setActivities] = useState([]);
const [chartData, setChartData] = useState({
  labels: [],
  datasets: [],
});


const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Number of Orders",
      },
      ticks: {
        precision: 0,
      },
    },
    x: {
      title: {
        display: true,
        text: "Month",
      },
    },
  },
};

useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {

    const dashboardRes = await axios.get(
      "http://localhost:5000/api/admin/dashboard"
    );

    setDashboard(dashboardRes.data);

    const activityRes = await axios.get(
      "http://localhost:5000/api/admin/recent-activities"
    );

    setActivities(activityRes.data);
const chartRes = await axios.get(
  "http://localhost:5000/api/admin/monthly-orders"
);

setChartData({
  labels: chartRes.data.labels,
  datasets: [
    {
      label: "Orders",
      data: chartRes.data.data,
      backgroundColor: "#f9a61a",
      borderRadius: 8,
    },
  ],
});

  } catch (error) {

    console.error(error);

  }
};


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
            <h2>{dashboard.totalVendors}</h2>
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
            <h2>{dashboard.totalCustomers}</h2>
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
             <h2>{dashboard.totalVehicles}</h2>
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
              <h2>{dashboard.totalOrders}</h2>
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

<Bar
  data={chartData}
  options={chartOptions}
/>

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

  {activities.map((item, index) => (

    <tr key={index}>

      <td>{item.user}</td>

      <td>{item.activity}</td>

      <td>

        <span className={`status ${item.status}`}>

         {item.status.charAt(0).toUpperCase() + item.status.slice(1)}

        </span>

      </td>

    </tr>

  ))}

</tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;