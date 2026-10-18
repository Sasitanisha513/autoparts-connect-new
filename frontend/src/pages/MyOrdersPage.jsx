
import jsPDF from "jspdf";
import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./MyOrdersPage.css";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/orders";

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  // Fetch the current customer's orders
  const fetchOrders = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);

      const customerId = localStorage.getItem("userId");

      if (!customerId) {
        setOrders([]);
        return;
      }

      const response = await fetch(
        `${API_URL}/customer/${encodeURIComponent(customerId)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Unable to load orders."
        );
      }

      if (!Array.isArray(data)) {
        throw new Error("Unexpected order data received from the server.");
      }

      setOrders(data);

      // Keep the details modal in sync with the latest order status
      setSelectedOrder((previous) => {
        if (!previous) return null;

        return (
          data.find((order) => order._id === previous._id) || null
        );
      });
    } catch (error) {
      console.error("Fetch orders error:", error);
      toast.error(error.message || "Unable to load orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders(true);

    // Refresh order statuses periodically
    const intervalId = setInterval(() => {
      fetchOrders();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [fetchOrders]);

  // Cancel an order
  const cancelOrder = async () => {
    if (!cancelOrderId || cancelling) return;

    const orderToCancel = orders.find(
      (order) => order._id === cancelOrderId
    );

    if (!orderToCancel) {
      toast.error("Order not found.");
      setCancelOrderId(null);
      return;
    }

    if (orderToCancel.status !== "Pending") {
      toast.error("Only pending orders can be cancelled.");
      setCancelOrderId(null);
      await fetchOrders();
      return;
    }

    try {
      setCancelling(true);

      const response = await fetch(
        `${API_URL}/cancel/${encodeURIComponent(cancelOrderId)}`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Unable to cancel this order."
        );
      }

      toast.success("Order cancelled successfully.");

      setCancelOrderId(null);

      await fetchOrders();
    } catch (error) {
      console.error("Cancel order error:", error);
      toast.error(error.message || "Failed to cancel order.");
    } finally {
      setCancelling(false);
    }
  };

  // Download invoice as PDF
  const downloadInvoice = (order) => {
    try {
      const doc = new jsPDF();

      const money = (amount) =>
        Number(amount || 0).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("AutoParts Connect", 20, 22);

      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.text("Order Invoice", 20, 33);

      doc.setLineWidth(0.4);
      doc.line(20, 39, 190, 39);

      doc.setFontSize(10);

      const details = [
        `Order ID: ${order._id}`,
        `Customer: ${order.customerName || "N/A"}`,
        `Email: ${order.customerEmail || "N/A"}`,
        `Phone: ${order.customerPhone || "N/A"}`,
        `Payment: ${order.paymentMethod || "N/A"}`,
        `Status: ${order.status || "N/A"}`,
        `Date: ${
          order.createdAt
            ? new Date(order.createdAt).toLocaleDateString("en-GB")
            : "N/A"
        }`,
        `Address: ${order.address || "N/A"}`,
      ];

      let y = 49;

      details.forEach((detail) => {
        const lines = doc.splitTextToSize(detail, 165);

        if (y + lines.length * 6 > 270) {
          doc.addPage();
          y = 20;
        }

        doc.text(lines, 20, y);
        y += lines.length * 6 + 2;
      });

      y += 5;

      if (y > 250) {
        doc.addPage();
        y = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.text("Products", 20, y);
      y += 8;

      doc.setFont("helvetica", "normal");

      (order.items || []).forEach((item) => {
        const line = `${item.partName || "Spare part"} | Qty: ${
          Number(item.quantity || 0)
        } | Unit price: LKR ${money(item.price)}`;

        const lines = doc.splitTextToSize(line, 165);

        if (y + lines.length * 6 > 275) {
          doc.addPage();
          y = 20;
        }

        doc.text(lines, 20, y);
        y += lines.length * 6 + 2;
      });

      y += 8;

      if (y > 275) {
        doc.addPage();
        y = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text(
        `Total: LKR ${money(order.totalAmount)}`,
        20,
        y
      );

      doc.save(`Invoice-${String(order._id).slice(-6)}.pdf`);
    } catch (error) {
      console.error("Invoice error:", error);
      toast.error("Unable to download the invoice.");
    }
  };

  const formatMoney = (amount) =>
    Number(amount || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "N/A";

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status) =>
    String(status || "Pending")
      .toLowerCase()
      .replace(/\s+/g, "-");

  return (
    <>
      <Header />

      <main className="my-orders-page">
        <h1>My Orders</h1>

        {loading ? (
          <p className="my-orders-message">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <div className="my-orders-empty">
            <h2>No orders yet</h2>
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              
              <article className="order-card" key={order._id}>
                <div className="order-header">
                  <h3>
                    Order #{String(order._id).slice(-6).toUpperCase()}
                  </h3>

                  <span
                    className={`status-badge ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status || "Pending"}
                  </span>
                </div>

                <div className="order-body">
                  <p>
                    <strong>Customer:</strong>{" "}
                    {order.customerName || "N/A"}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {order.customerEmail || "N/A"}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {order.customerPhone || "N/A"}
                  </p>

                  <p>
                    <strong>Payment:</strong>{" "}
                    {order.paymentMethod || "N/A"}
                  </p>

                  <p>
                    <strong>Date:</strong> {formatDate(order.createdAt)}
                  </p>

                  <p>
                    <strong>Address:</strong> {order.address || "N/A"}
                  </p>

                  <h3 className="order-total">
                    Total: LKR {formatMoney(order.totalAmount)}
                  </h3>

                  <div className="products-section">
                    <h4>Products</h4>

                    {(order.items || []).map((item, index) => (
                      <div className="product-row" key={item._id || index}>
                        <span className="product-name">
                          {item.partName || "Spare part"}
                        </span>

                        <span className="product-qty">
                          × {Number(item.quantity || 0)}
                        </span>

                        <span className="product-price">
                          LKR {formatMoney(item.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              <div className="order-card-actions">
  <button
    type="button"
    className="view-btn"
    onClick={() => setSelectedOrder(order)}
  >
    View Details
  </button>

  {String(order.status || "").trim().toLowerCase() === "pending" && (
    <button
      type="button"
      className="cancel-btn"
      onClick={() => setCancelOrderId(order._id)}
    >
      Cancel Order
    </button>
  )}
</div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Order details modal */}
      {selectedOrder && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="order-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-details-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="order-details-title">Order Details</h2>

            <p>
              <strong>Order ID:</strong>{" "}
              #{String(selectedOrder._id).slice(-6).toUpperCase()}
            </p>

            <p>
              <strong>Customer:</strong>{" "}
              {selectedOrder.customerName || "N/A"}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {selectedOrder.customerEmail || "N/A"}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {selectedOrder.customerPhone || "N/A"}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {selectedOrder.address || "N/A"}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {selectedOrder.paymentMethod || "N/A"}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {selectedOrder.status || "Pending"}
            </p>

            <p>
              <strong>Date:</strong> {formatDate(selectedOrder.createdAt)}
            </p>

            <h3>Products</h3>

            {(selectedOrder.items || []).map((item, index) => (
              <div className="modal-product" key={item._id || index}>
                <span>{item.partName || "Spare part"}</span>
                <span>× {Number(item.quantity || 0)}</span>
                <span>LKR {formatMoney(item.price)}</span>
              </div>
            ))}

            <h3 className="modal-total">
              Total: LKR {formatMoney(selectedOrder.totalAmount)}
            </h3>

            <button
              type="button"
              className="invoice-btn"
              onClick={() => downloadInvoice(selectedOrder)}
            >
              Download Invoice
            </button>

           {selectedOrder.status?.trim().toLowerCase() === "pending" && (
  <button
    type="button"
    className="cancel-btn modal-cancel-btn"
    onClick={() => {
      setCancelOrderId(selectedOrder._id);
      setSelectedOrder(null);
    }}
  >
    Cancel Order
  </button>
)}

            <button
              type="button"
              className="close-btn"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Cancel confirmation modal */}
      {cancelOrderId && (
        <div
          className="modal-overlay"
          onClick={() => {
            if (!cancelling) setCancelOrderId(null);
          }}
        >
          <div
            className="confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-order-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cancel-warning-icon">!</div>

            <h2 id="cancel-order-title">Cancel Order?</h2>

            <p>
              Are you sure you want to cancel this order? This action
              cannot be undone.
            </p>

            <div className="confirm-buttons">
              <button
                type="button"
                className="yes-btn"
                disabled={cancelling}
                onClick={cancelOrder}
              >
                {cancelling ? "Cancelling..." : "Yes, Cancel"}
              </button>

              <button
                type="button"
                className="no-btn"
                disabled={cancelling}
                onClick={() => setCancelOrderId(null)}
              >
                Keep Order
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default MyOrdersPage;
