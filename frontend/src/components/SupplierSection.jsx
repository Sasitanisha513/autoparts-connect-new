import "./SupplierSection.css";
import supplierImage from "../assets/images/bmw2.png";
import { useNavigate } from "react-router-dom";

function SupplierSection() {
  const navigate = useNavigate();
  return (
    <section className="supplier">
      <div className="supplier-image">
        <img src={supplierImage} alt="BMW" />
      </div>

      <div className="supplier-content">
        <h2>Are You a Spare Parts Supplier?</h2>

        <p className="sub-title">
          Reach more customers. Manage inventory. Track performance.
        </p>

        <h3>
          GROW YOUR <span>SPARE PARTS</span> BUSINESS WITH
          <br />
          AUTOPARTS CONNECT
        </h3>

        <p>
          Join a growing marketplace that connects your inventory with
          verified vehicle owners. List your parts, manage stock
          efficiently, and track monthly performance — all in one
          platform.
        </p>

        <ul>
          <li>✔ Get Verified And Build Trust With Buyers</li>
          <li>✔ Manage Inventory From Your Own Dashboard</li>
          <li>✔ Track Monthly Sales And Revenue Reports</li>
          <li>✔ Reach Customers Searching For Specific Vehicle Parts</li>
        </ul>

       <button
  onClick={() => navigate("/vendor-register")}
>
  Register as a Vendor
</button>

      </div>
    </section>
  );
}

export default SupplierSection;