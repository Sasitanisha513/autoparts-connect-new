import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CartPage.css";


const CartPage = () => {
const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

  const savedCart =
    JSON.parse(localStorage.getItem("cart")) || [];

  setCartItems(savedCart);

}, []);

 const increaseQty = (_id) => {

  const updatedCart = cartItems.map((item) =>
    item._id === _id
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );

  setCartItems(updatedCart);

  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );

};

  const decreaseQty = (_id) => {

  const updatedCart = cartItems.map((item) =>
    item._id === _id && item.quantity > 1
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );

  setCartItems(updatedCart);

  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );

};

const removeItem = (_id) => {

  const updatedCart = cartItems.filter(
    (item) => item._id !== _id
  );

  setCartItems(updatedCart);

  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );

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
           <tr key={item._id}>
              <td>
                <button
                  className="delete-btn"
                onClick={() => removeItem(item._id)}
                >
                  X
                </button>
              </td>
              <td>
<img
  src={
    item.image?.startsWith("/uploads")
      ? `http://localhost:5000${item.image}`
      : item.image
  }
  alt={item.name}
  className="cart-item-image"
/>
            </td>
              <td className="part-name-cell">{item.name}</td>
              <td>
                <div className="quantity-control">
                <button onClick={() => decreaseQty(item._id)}>−</button>

<span>{String(item.quantity).padStart(2, "0")}</span>

<button onClick={() => increaseQty(item._id)}>+</button>
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