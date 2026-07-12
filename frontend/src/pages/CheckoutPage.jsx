import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

// Import part images (adala parts wala images)
import breakepad from "../assets/images/parts/breakepad.jpg";
import oilfilter from "../assets/images/parts/oilfilter.jpg";
import sparkplug from "../assets/images/parts/sparkplug.jpg";

// Order summary data - meka CartPage eken pass karala ganna puluwan (context/state eken)
const orderItems = [
  {
    id: 1,
    name: "Front Brake Pad – BMW 320i (2018)",
    image: breakepad,
    price: 12500,
    quantity: 2,
  },
  {
    id: 2,
    name: "Oil Filter – BMW 320i (2018)",
    image: oilfilter,
    price: 3500,
    quantity: 1,
  },
  {
    id: 3,
    name: "Spark Plug – BMW 320i (2018)",
    image: sparkplug,
    price: 2800,
    quantity: 4,
  },
];

const shippingFee = 500;

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState(orderItems);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    number: "",
    email: "",
    notes: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [agreed, setAgreed] = useState(false);

  const cartTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const subtotal = cartTotal + shippingFee;

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const adjustQty = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!agreed) {
      alert("Please agree to the Terms & Policy before placing your order.");
      return;
    }
    // order placing logic meka wenas karanna (API call, etc.)
    navigate("/order-success");
  };
return (
  <>
    <Header />

    <div className="checkout-page">
      <div className="checkout-title-section">
        <h1>Checkout</h1>
        <p>Confirm your pickup details and place your order.</p>
      </div>

      <div className="checkout-content">
        {/* Billing Details */}
        <div className="billing-details-card">
          <h2>Billing Details</h2>

          <div className="form-row">
            <div className="form-group">
              <label>
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              Address <span className="required">*</span>
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Number <span className="required">*</span>
              </label>
              <input
                type="text"
                name="number"
                placeholder="Enter your number"
                value={formData.number}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              Notes <span className="required">*</span>
            </label>
            <textarea
              name="notes"
              placeholder="Order notes (Optional)"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary-card">
          <h2>Order Summary</h2>

          <div className="order-items-list">
            {items.map((item) => (
              <div className="order-item" key={item.id}>
                <img src={item.image} alt={item.name} className="order-item-image" />
                <div className="order-item-details">
                  <p className="order-item-name">{item.name}</p>
                  <div className="order-item-qty">
                    <button onClick={() => adjustQty(item.id, -1)}>−</button>
                    <span>{String(item.quantity).padStart(2, "0")}</span>
                    <button onClick={() => adjustQty(item.id, 1)}>+</button>
                    <span className="order-item-price">
                      LKR {(item.price * item.quantity).toLocaleString()}.00
                    </span>
                  </div>
                </div>
                <button
                  className="remove-item-btn"
                  onClick={() => removeItem(item.id)}
                >
                  X
                </button>
              </div>
            ))}
          </div>

          <div className="summary-line">
            <span>Cart Totals</span>
            <span>LKR {cartTotal.toLocaleString()}.00</span>
          </div>

          <div className="summary-line shipping-line">
            <span>Shipping</span>
            <span></span>
          </div>
          <div className="summary-line sub-line">
            <span>Shipping Fee</span>
            <span>LKR {shippingFee.toLocaleString()}.00</span>
          </div>

          <div className="summary-line subtotal-line">
            <span>Subtotal</span>
            <span>LKR {subtotal.toLocaleString()}.00</span>
          </div>

          <div className="payment-methods">
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "pickup"}
                onChange={() => setPaymentMethod("pickup")}
              />
              <span>Pay at Pickup</span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <div>
                <span>Cash on delivery</span>
                <p className="payment-desc">Pay with cash upon delivery.</p>
              </div>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "payhere"}
                onChange={() => setPaymentMethod("payhere")}
              />
              <div>
                <span>PayHere</span>
                <p className="payment-desc">
                  What is <a href="#">PayHere</a>?
                </p>
              </div>
            </label>

            <label className="terms-check">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                I agree to the <a href="#">Term & Policy</a>
              </span>
            </label>
          </div>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
        </div>

    <Footer />
  </>
  );
};

export default CheckoutPage;