import SupplierSidebar from "../components/SupplierSidebar";
import "./VendorReportsPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaBoxes,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

import { FaChartBar } from "react-icons/fa";

function VendorReportsPage() {
const [report, setReport] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
  });


const [topProducts, setTopProducts] = useState([]);
const [month, setMonth] = useState(
  new Date().getMonth() + 1
);

  useEffect(() => {

  const loadReport = async () => {

    try {

      const response = await axios.get(
  `http://localhost:5000/api/orders/vendor-report?month=${month}`
);

      setReport(response.data);
const top = await axios.get(
  `http://localhost:5000/api/orders/top-selling-parts?month=${month}`
);

setTopProducts(top.data);


    } catch (error) {

      console.log(error);

    }

  };

  loadReport();

}, [month]);

const downloadReport = () => {

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("AutoParts Connect", 14, 20);

  doc.setFontSize(14);
  doc.text("Vendor Monthly Report", 14, 32);
doc.setFontSize(11);

doc.text(
  `Generated On : ${new Date().toLocaleDateString()}`,
  14,
  40
);

doc.text(
  `Selected Month : ${
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][month - 1]
  }`,
  14,
  47
);


  autoTable(doc, {

  startY:55,

    head: [["Report", "Value"]],

    body: [

      ["Total Sales", `LKR ${report.totalSales.toLocaleString()}`],

      ["Total Orders", report.totalOrders],

      ["Total Products", report.totalProducts],

      ["Low Stock Items", report.lowStock],

      ["Out of Stock Items", report.outOfStock],

    ],

  });
  
// Top Selling Products Heading
doc.setFontSize(12);

doc.text(
  "Top Selling Products",
  14,
  doc.lastAutoTable.finalY + 15
);

// Top Selling Products Table
autoTable(doc, {

  startY: doc.lastAutoTable.finalY + 20,

  head: [["Part Name", "Quantity Sold"]],

  body:
    topProducts.length > 0
      ? topProducts.map((item) => [
          item._id,
          item.totalSold,
        ])
      : [["No data available", "-"]],

});

doc.setFontSize(10);

doc.text(
  "AutoParts Connect - Vendor Report",
  14,
  doc.lastAutoTable.finalY + 20
);
  doc.save("Vendor_Report.pdf");

};

  return (

    <div className="inventory-page">

      <SupplierSidebar />

      <div className="inventory-content">

        <div className="inventory-header">

          <h1>

            <FaChartBar className="header-icon" />

            Vendor Reports

          </h1>

          <p>

            Generate monthly sales and inventory reports.

          </p>

          <div className="month-filter">

  <label>Select Month</label>

  <select
    value={month}
    onChange={(e) =>
      setMonth(Number(e.target.value))
    }
  >

    <option value={1}>January</option>
    <option value={2}>February</option>
    <option value={3}>March</option>
    <option value={4}>April</option>
    <option value={5}>May</option>
    <option value={6}>June</option>
    <option value={7}>July</option>
    <option value={8}>August</option>
    <option value={9}>September</option>
    <option value={10}>October</option>
    <option value={11}>November</option>
    <option value={12}>December</option>

  </select>

</div>

        </div>

<div style={{ marginBottom: "25px" }}>

  <button
    className="download-btn"
    onClick={downloadReport}
  >
    Download PDF Report
  </button>

</div>

<div className="report-grid">

  <div className="report-card">
    <FaMoneyBillWave className="report-icon" />
    <h3>Total Sales</h3>
    <h2>LKR {report.totalSales.toLocaleString()}</h2>
  </div> 

  <div className="report-card">
    <FaShoppingCart className="report-icon" />
    <h3>Total Orders</h3>
    <h2>{report.totalOrders}</h2>
  </div>

  <div className="report-card">
    <FaBoxes className="report-icon" />
    <h3>Total Products</h3>
    <h2>{report.totalProducts}</h2>
  </div>

  <div className="report-card">
    <FaExclamationTriangle className="report-icon" />
    <h3>Low Stock</h3>
    <h2>{report.lowStock}</h2>
  </div>

  <div className="report-card">
    <FaTimesCircle className="report-icon" />
    <h3>Out of Stock</h3>
    <h2>{report.outOfStock}</h2>
  </div>

</div>
<div className="report-table">

  <h2>Top Selling Products</h2>

  <table>

    <thead>

      <tr>

        <th>Part Name</th>
        <th>Quantity Sold</th>

      </tr>

    </thead>

    <tbody>

      {topProducts.map((item) => (

        <tr key={item._id}>

          <td>{item._id}</td>

          <td>{item.totalSold}</td>

        </tr>

      ))}

    </tbody>

  </table>

</div>
      </div>

    </div>

  );

}

export default VendorReportsPage;