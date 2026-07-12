import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CartPage.css";

// Import part images (adala parts wala images)
import breakepad from "../assets/images/parts/breakepad.jpg";
import oilfilter from "../assets/images/parts/oilfilter.jpg";
import sparkplug from "../assets/images/parts/sparkplug.jpg";

// Cart data - meka witharai wenas karanna one (backend eken ena nam meka ain karala fetch karanna puluwan)
const initialCartItems = [
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

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const navigate = useNavigate();

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

 return (
  <>
    <Header />

    <div className="cart-page">
      <div className="cart-title-section">
        <h1>Your Cart</h1>
        <p>Review your selected spare parts before proceeding.</p>
      </div>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Delete</th>
            <th>Image</th>
            <th>Part Name</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => removeItem(item.id)}
                >
                  X
                </button>
              </td>
              <td>
                <img src={item.image} alt={item.name} className="cart-item-image" />
              </td>
              <td className="part-name-cell">{item.name}</td>
              <td>
                <div className="quantity-control">
                  <button onClick={() => decreaseQty(item.id)}>−</button>
                  <span>{String(item.quantity).padStart(2, "0")}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </td>
              <td className="subtotal-cell">
                LKR {(item.price * item.quantity).toLocaleString()}.00
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {cartItems.length === 0 && (
        <p className="empty-cart-msg">Your cart is empty.</p>
      )}

      <div className="cart-summary-wrapper">
        <table className="cart-summary-table">
          <tbody>
            <tr>
              <td className="summary-label">Cart Totals</td>
              <td></td>
              <td className="summary-value">
                LKR {cartTotal.toLocaleString()}.00
              </td>
            </tr>
            <tr>
              <td className="summary-label">Shipping</td>
              <td>Estimated Pickup</td>
              <td className="summary-value">Free</td>
            </tr>
            <tr>
              <td className="summary-label">Subtotal</td>
              <td></td>
              <td className="summary-value">
                LKR {cartTotal.toLocaleString()}.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="cart-actions">
        <Link to="/parts" className="continue-shopping-btn">
          Continue to shopping
        </Link>
        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout")}
        >
          Proceed to checkout
        </button>
      </div>
       </div>

    <Footer />
  </>
  );
};
export default CartPage;