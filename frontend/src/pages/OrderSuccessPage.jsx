import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./OrderSuccessPage.css";

function OrderSuccessPage() {

  const location = useLocation();

  const orderId = location.state?.orderId || "N/A";
  const total = location.state?.total || 0;
  const paymentMethod = location.state?.paymentMethod || "Cash on Delivery";

  return (
    <>
      <Header />

      <div className="success-page">

        <div className="success-card">

          <div className="success-icon">✔</div>

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for shopping with
            <strong> AutoParts Connect.</strong>
          </p>

          <div className="success-details">

            <p>
              <strong>Order ID:</strong> #{orderId.slice(-6).toUpperCase()}
            </p>

            <p>
              <strong>Total:</strong> LKR {Number(total).toLocaleString()}
            </p>

            <p>
              <strong>Payment:</strong> {paymentMethod}
            </p>

            <p>
              <strong>Estimated Delivery:</strong> 2-3 Business Days
            </p>

          </div>

          <div className="success-buttons">

            <Link to="/my-orders" className="primary-btn">
              View My Orders
            </Link>

            <Link to="/parts" className="secondary-btn">
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default OrderSuccessPage;