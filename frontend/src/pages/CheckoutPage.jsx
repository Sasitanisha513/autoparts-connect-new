
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./CheckoutPage.css";

const shippingFee = 500;

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

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

  // LOAD CART ITEMS
  useEffect(() => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      setItems(Array.isArray(savedCart) ? savedCart : []);
    } catch (error) {
      console.error("Unable to load cart:", error);
      setItems([]);
    }
  }, []);

  // CALCULATE TOTALS
  const cartTotal = items.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const subtotal = cartTotal + shippingFee;

  // UPDATE BILLING FORM
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // SAVE CART CHANGES
  const updateCart = (updatedItems) => {
    setItems(updatedItems);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedItems)
    );
  };

  // REMOVE PRODUCT
  const removeItem = (_id) => {
    const updatedItems = items.filter(
      (item) => item._id !== _id
    );

    updateCart(updatedItems);
  };

  // CHANGE PRODUCT QUANTITY
  const adjustQty = (_id, delta) => {
    const updatedItems = items.map((item) => {
      if (item._id === _id) {
        return {
          ...item,
          quantity: Math.max(
            1,
            Number(item.quantity || 1) + delta
          ),
        };
      }

      return item;
    });

    updateCart(updatedItems);
  };

  // PLACE ORDER
  const handlePlaceOrder = async () => {
    // CHECK REQUIRED BILLING DETAILS
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.address.trim() ||
      !formData.number.trim() ||
      !formData.email.trim()
    ) {
      toast.error(
        "Please complete all required billing information."
      );
      return;
    }

    // VALIDATE EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // CHECK CART
    if (items.length === 0) {
      toast.error("Your shopping cart is empty.");
      return;
    }

    // CHECK TERMS
    if (!agreed) {
      toast.error(
        "Please accept the Terms & Conditions."
      );
      return;
    }

    try {
      const orderData = {
        customerId: localStorage.getItem("userId"),

        customerName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,

        customerEmail: formData.email.trim().toLowerCase(),

        customerPhone: formData.number.trim(),

        address: formData.address.trim(),

        items: items.map((item) => ({
          partName: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
        })),

        paymentMethod,
        shippingFee,
        totalAmount: subtotal,
        notes: formData.notes.trim(),
      };

      const response = await fetch(
        "http://localhost:5000/api/orders/place",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Order could not be placed."
        );
      }

      // CLEAR CART AFTER SUCCESS
      localStorage.removeItem("cart");
      setItems([]);

      toast.success("Your order has been placed successfully!");

      navigate("/order-success", {
        state: {
          orderId: data.order?._id,
          total: subtotal,
          paymentMethod,
        },
      });
    } catch (error) {
      console.error("Order error:", error);

      toast.error(
        error.message ||
          "Unable to place your order. Please try again later."
      );
    }
  };

  // IMAGE URL
  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("/uploads")) {
      return `http://localhost:5000${image}`;
    }

    return image;
  };

  return (
    <>
      <Header />

      <main className="checkout-page">
        {/* PAGE TITLE */}
        <div className="checkout-title-section">
          <h1>Checkout</h1>
          <p>
            Confirm your pickup details and place your order.
          </p>
        </div>

        <div className="checkout-content">
          {/* BILLING DETAILS */}
          <section className="billing-details-card">
            <h2>Billing Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">
                  First Name <span className="required">*</span>
                </label>

                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">
                  Last Name <span className="required">*</span>
                </label>

                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">
                Address <span className="required">*</span>
              </label>

              <input
                id="address"
                type="text"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                autoComplete="street-address"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="number">
                  Number <span className="required">*</span>
                </label>

                <input
                  id="number"
                  type="tel"
                  name="number"
                  placeholder="Enter your number"
                  value={formData.number}
                  onChange={handleChange}
                  autoComplete="tel"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email <span className="required">*</span>
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes (Optional)</label>

              <textarea
                id="notes"
                name="notes"
                placeholder="Order notes (Optional)"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </section>

          {/* ORDER SUMMARY */}
          <section className="order-summary-card">
            <h2>Order Summary</h2>

            <div className="order-summary-body">
              {/* PRODUCT LIST */}
              <div className="order-summary-products">
                {items.length === 0 ? (
                  <p className="empty-cart-message">
                    Your shopping cart is empty.
                  </p>
                ) : (
                  <div className="order-items-list">
                    {items.map((item) => (
                      <article
                        className="order-item"
                        key={item._id}
                      >
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name || "Spare part"}
                          className="order-item-image"
                        />

                        <div className="order-item-details">
                          <p className="order-item-name">
                            {item.name}
                          </p>

                          <div className="order-item-qty">
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${item.name}`}
                              onClick={() =>
                                adjustQty(item._id, -1)
                              }
                            >
                              −
                            </button>

                            <span>
                              {String(item.quantity).padStart(2, "0")}
                            </span>

                            <button
                              type="button"
                              aria-label={`Increase quantity of ${item.name}`}
                              onClick={() =>
                                adjustQty(item._id, 1)
                              }
                            >
                              +
                            </button>
                          </div>

                          <p className="order-item-price">
                            LKR{" "}
                            {(
                              Number(item.price || 0) *
                              Number(item.quantity || 0)
                            ).toLocaleString("en-US")}
                            .00
                          </p>
                        </div>

                        <button
                          type="button"
                          className="remove-item-btn"
                          aria-label={`Remove ${item.name} from cart`}
                          onClick={() => removeItem(item._id)}
                        >
                          ×
                        </button>
                      </article>
                    ))}
                  </div>
                )}
              </div>

              {/* TOTALS AND PAYMENT */}
              <div className="order-summary-checkout">
                <div className="summary-line">
                  <span>Cart Total</span>
                  <span>
                    LKR {cartTotal.toLocaleString("en-US")}.00
                  </span>
                </div>

                <div className="summary-line">
                  <span>Shipping Fee</span>
                  <span>
                    LKR {shippingFee.toLocaleString("en-US")}.00
                  </span>
                </div>

                <div className="summary-line subtotal-line">
                  <span>Subtotal</span>
                  <span>
                    LKR {subtotal.toLocaleString("en-US")}.00
                  </span>
                </div>

                {/* PAYMENT OPTIONS */}
                <div className="payment-methods">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="pickup"
                      checked={paymentMethod === "pickup"}
                      onChange={() =>
                        setPaymentMethod("pickup")
                      }
                    />

                    <span>Pay at Pickup</span>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />

                    <div>
                      <span>Cash on Delivery</span>
                      <p className="payment-desc">
                        Pay with cash upon delivery.
                      </p>
                    </div>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="payhere"
                      checked={paymentMethod === "payhere"}
                      onChange={() =>
                        setPaymentMethod("payhere")
                      }
                    />

                    <div>
                      <span>PayHere</span>
                      <p className="payment-desc">
                        What is{" "}
                        <a
                          href="https://www.payhere.lk/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          PayHere
                        </a>
                        ?
                      </p>
                    </div>
                  </label>

                  {/* TERMS */}
                  <label className="terms-check">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) =>
                        setAgreed(e.target.checked)
                      }
                    />

                    <span>
                      I agree to the{" "}
                      <a
                        href="#terms"
                        onClick={(e) => e.preventDefault()}
                      >
                        Terms &amp; Policy
                      </a>
                    </span>
                  </label>
                </div>

                {/* PLACE ORDER */}
                <button
                  type="button"
                  className="place-order-btn"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CheckoutPage;
