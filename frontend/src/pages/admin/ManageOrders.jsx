import "./ManageOrders.css";

import {
  useEffect,
  useState,
} from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";

import {
  FaSearch,
  FaBoxOpen,
  FaCalendarAlt,
  FaEllipsisV,
  FaClock,
  FaCheckCircle,
  FaTruck,
  FaTimesCircle,
} from "react-icons/fa";

function ManageOrders() {
  // ==========================
  // ORDER DATA
  // ==========================

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ==========================
  // VIEW ORDER
  // ==========================

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  // ==========================
  // UPDATE ORDER
  // ==========================

  const [editOrder, setEditOrder] =
    useState(null);

  const [showStatusModal, setShowStatusModal] =
    useState(false);

  // ==========================
  // DELETE ORDER
  // ==========================

  const [deleteOrderId, setDeleteOrderId] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  // ==========================
  // ACTION MENU
  // ==========================

  const [activeMenu, setActiveMenu] =
    useState(null);

  // ==========================
  // TOAST
  // ==========================

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  // ==========================
  // SUMMARY COUNTS
  // ==========================

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const readyOrders = orders.filter(
    (order) => order.status === "Ready for Pickup"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  // ==========================
  // TOAST MESSAGE
  // ==========================

  const showToast = (message, type) => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "",
      });
    }, 3000);
  };

  // ==========================
  // LOAD ORDERS
  // ==========================

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/orders"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to load orders."
        );
      }

      setOrders(data);
    } catch (error) {
      console.error(
        "Order loading error:",
        error
      );

      showToast(
        error.message,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // LOAD PAGE
  // ==========================

  useEffect(() => {
    fetchOrders();
  }, []);

  // ==========================
  // ORDER NUMBER
  // ==========================

  const getOrderNumber = (order) => {
    if (!order?._id) {
      return "N/A";
    }

    return (
      "PO-" +
      order._id
        .slice(-6)
        .toUpperCase()
    );
  };

  // ==========================
  // FORMAT DATE
  // ==========================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================
  // PART NAMES
  // ==========================

  const getPartNames = (order) => {
    if (
      !order.items ||
      order.items.length === 0
    ) {
      return "No products";
    }

    return order.items
      .map((item) => item.partName)
      .join(", ");
  };

  // ==========================
  // TOTAL QUANTITY
  // ==========================

  const getTotalQuantity = (order) => {
    if (
      !order.items ||
      order.items.length === 0
    ) {
      return 0;
    }

    return order.items.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    );
  };

  // ==========================
  // ITEM COUNT
  // ==========================

  const getItemCount = (order) => {
    if (
      !order.items ||
      order.items.length === 0
    ) {
      return 0;
    }

    return order.items.length;
  };

  // ==========================
  // CARD PRODUCT DISPLAY
  // ==========================

  const getCardPartDisplay = (order) => {
    const count = getItemCount(order);

    if (count === 0) {
      return {
        title: "No products",
        subtitle: "",
      };
    }

    if (count === 1) {
      return {
        title:
          order.items[0]?.partName ||
          "Product",
        subtitle: "1 Part",
      };
    }

    return {
      title: `${count} Parts`,
      subtitle: getPartNames(order),
    };
  };

  // ==========================
  // SEARCH ORDERS
  // ==========================

  const filteredOrders = orders.filter(
    (order) => {
      const searchText = search
        .toLowerCase()
        .trim();

      return (
        (order.customerName || "")
          .toLowerCase()
          .includes(searchText) ||
        (order.customerEmail || "")
          .toLowerCase()
          .includes(searchText) ||
        getPartNames(order)
          .toLowerCase()
          .includes(searchText) ||
        getOrderNumber(order)
          .toLowerCase()
          .includes(searchText)
      );
    }
  );

  // ==========================
  // STATUS CLASS
  // ==========================

  const getStatusClass = (status) => {
    return (
      status || ""
    )
      .toLowerCase()
      .replace(/\s/g, "-");
  };

  // ==========================
  // STATUS ICON
  // ==========================

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FaClock />;

      case "Processing":
        return <FaClock />;

      case "Ready for Pickup":
        return <FaTruck />;

      case "Completed":
        return <FaCheckCircle />;

      case "Cancelled":
        return <FaTimesCircle />;

      default:
        return null;
    }
  };

  // ==========================
  // VIEW ORDER
  // ==========================

  const viewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
    setActiveMenu(null);
  };

  // ==========================
  // OPEN STATUS MODAL
  // ==========================

  const openStatusModal = (order) => {
    setEditOrder({
      ...order,
    });

    setShowStatusModal(true);
    setActiveMenu(null);
  };

  // ==========================
  // UPDATE STATUS
  // ==========================

  const saveStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${editOrder._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: editOrder.status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Order status update failed."
        );
      }

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === editOrder._id
            ? data.order
            : order
        )
      );

      setShowStatusModal(false);
      setEditOrder(null);

      showToast(
        data.message ||
          "Order status updated successfully.",
        "success"
      );
    } catch (error) {
      showToast(
        error.message,
        "error"
      );
    }
  };

  // ==========================
  // DELETE MODAL
  // ==========================

  const openDeleteModal = (id) => {
    setDeleteOrderId(id);
    setShowDeleteModal(true);
    setActiveMenu(null);
  };

  // ==========================
  // DELETE ORDER
  // ==========================

  const deleteOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${deleteOrderId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Order deletion failed."
        );
      }

      setOrders((previousOrders) =>
        previousOrders.filter(
          (order) =>
            order._id !== deleteOrderId
        )
      );

      setShowDeleteModal(false);
      setDeleteOrderId(null);

      showToast(
        data.message ||
          "Order deleted successfully.",
        "success"
      );
    } catch (error) {
      showToast(
        error.message,
        "error"
      );
    }
  };

  // ==========================
  // CLOSE MENU
  // ==========================

  const toggleMenu = (id) => {
    setActiveMenu(
      activeMenu === id ? null : id
    );
  };

  return (
    <div className="manage-orders">
      <AdminSidebar />

      {/* ==========================
          TOAST MESSAGE
      ========================== */}

      {toast.show && (
        <div
          className={`admin-toast ${toast.type}`}
        >
          <div className="toast-icon">
            {toast.type === "success"
              ? "✓"
              : "!"}
          </div>

          <div className="toast-content">
            <strong>
              {toast.type === "success"
                ? "Success"
                : "Error"}
            </strong>

            <p>{toast.message}</p>
          </div>

          <button
            type="button"
            className="toast-close"
            onClick={() =>
              setToast({
                show: false,
                message: "",
                type: "",
              })
            }
          >
            ×
          </button>
        </div>
      )}

      <div className="orders-content">

        {/* ==========================
            PAGE HEADER
        ========================== */}

        <div className="orders-header">
          <div>
            <h1>
              Orders Management
            </h1>

            <p>
              Track and manage customer
              orders and update order status.
            </p>
          </div>
        </div>

        {/* ==========================
            SUMMARY CARDS
        ========================== */}

        <div className="order-counts">

          <div className="count-card">
            <h3>{totalOrders}</h3>
            <p>Total Orders</p>
          </div>

          <div className="count-card pending">
            <h3>{pendingOrders}</h3>
            <p>Pending</p>
          </div>

          <div className="count-card processing">
            <h3>{processingOrders}</h3>
            <p>Processing</p>
          </div>

          
          <div className="count-card completed">
            <h3>{completedOrders}</h3>
            <p>Completed</p>
          </div>

          <div className="count-card cancelled">
            <h3>{cancelledOrders}</h3>
            <p>Cancelled</p>
          </div>

        </div>

        {/* ==========================
            SEARCH
        ========================== */}

        <div className="orders-toolbar">
          <div className="orders-search">
            <FaSearch />

            <input
              type="text"
              placeholder="Search Order ID, Customer or Part..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />
          </div>
        </div>

        {/* ==========================
            ORDERS
        ========================== */}

        {loading ? (
          <div className="orders-empty-message">
            Loading orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="orders-empty-message">
            No orders found.
          </div>
        ) : (
          <div className="admin-orders-grid">

            {filteredOrders.map(
              (order) => {
                const partDisplay =
                  getCardPartDisplay(order);

                return (
                  <div
                    className="admin-order-card"
                    key={order._id}
                  >

                    {/* CARD HEADER */}

                    <div className="admin-order-card-header">

                      <div>
                        <h3>
                          {getOrderNumber(
                            order
                          )}
                        </h3>

                        <div className="admin-customer-name">
                          <span>
                            •
                          </span>

                          {order.customerName ||
                            "Customer"}
                        </div>
                      </div>

                      <div className="admin-order-actions">

                        <span
                          className={`admin-order-status ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(
                            order.status
                          )}

                          {order.status}
                        </span>

                        <div className="admin-order-menu">

                          <button
                            type="button"
                            className="admin-menu-btn"
                            onClick={() =>
                              toggleMenu(
                                order._id
                              )
                            }
                          >
                            <FaEllipsisV />
                          </button>

                          {activeMenu ===
                            order._id && (
                            <div className="admin-order-dropdown">

                              <button
                                type="button"
                                onClick={() =>
                                  viewOrder(
                                    order
                                  )
                                }
                              >
                                View Details
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  openStatusModal(
                                    order
                                  )
                                }
                              >
                                Update Status
                              </button>

                              <button
                                type="button"
                                className="dropdown-delete"
                                onClick={() =>
                                  openDeleteModal(
                                    order._id
                                  )
                                }
                              >
                                Delete Order
                              </button>

                            </div>
                          )}

                        </div>

                      </div>

                    </div>

                    {/* PART INFORMATION */}

                    <div className="admin-order-part-box">

                      <div className="admin-order-part-text">

                        <strong>
                          {partDisplay.title}
                        </strong>

                        <span>
                          {partDisplay.subtitle}
                        </span>

                      </div>

                    </div>

                    {/* ORDER INFO */}

                    <div className="admin-order-info-row">

                      <div className="admin-order-info-item">

                        <div className="admin-info-icon">
                          <FaBoxOpen />
                        </div>

                        <div>
                          <span>
                            Quantity
                          </span>

                          <strong>
                            {getTotalQuantity(
                              order
                            )}
                          </strong>
                        </div>

                      </div>

                      <div className="admin-order-info-divider" />

                      <div className="admin-order-info-item">

                        <div className="admin-info-icon">
                          <FaCalendarAlt />
                        </div>

                        <div>
                          <span>
                            Order Date
                          </span>

                          <strong>
                            {formatDate(
                              order.createdAt
                            )}
                          </strong>
                        </div>

                      </div>

                    </div>

                    {/* TOTAL */}

                    <div className="admin-order-total">

                      <span>
                        Total
                      </span>

                      <strong>
                        LKR{" "}
                        {Number(
                          order.totalAmount || 0
                        ).toLocaleString()}
                      </strong>

                    </div>

                    {/* VIEW DETAILS */}

                    <button
                      type="button"
                      className={`admin-view-details-btn ${getStatusClass(
                        order.status
                      )}`}
                      onClick={() =>
                        viewOrder(order)
                      }
                    >
                      View Details

                      <span>
                        →
                      </span>
                    </button>

                  </div>
                );
              }
            )}

          </div>
        )}

        {/* ==========================
            VIEW ORDER MODAL
        ========================== */}

        {showModal &&
          selectedOrder && (
            <div
              className="vehicle-modal-overlay"
              onClick={() =>
                setShowModal(false)
              }
            >
              <div
                className="vehicle-modal"
                onClick={(event) =>
                  event.stopPropagation()
                }
              >

                <h2>
                  Order Details
                </h2>

                <p>
                  <strong>
                    Order #:
                  </strong>{" "}
                  {getOrderNumber(
                    selectedOrder
                  )}
                </p>

                <p>
                  <strong>
                    Customer:
                  </strong>{" "}
                  {selectedOrder.customerName}
                </p>

                <p>
                  <strong>
                    Email:
                  </strong>{" "}
                  {selectedOrder.customerEmail}
                </p>

                <p>
                  <strong>
                    Phone:
                  </strong>{" "}
                  {selectedOrder.customerPhone}
                </p>

                <p>
                  <strong>
                    Address:
                  </strong>{" "}
                  {selectedOrder.address}
                </p>

                <p>
                  <strong>
                    Products:
                  </strong>
                </p>

                {selectedOrder.items?.map(
                  (item) => (
                    <p
                      key={
                        item._id ||
                        item.partName
                      }
                    >
                      {item.partName}
                      {" × "}
                      {item.quantity}
                      {" — LKR "}
                      {Number(
                        item.price *
                          item.quantity
                      ).toLocaleString()}
                    </p>
                  )
                )}

                <p>
                  <strong>
                    Payment:
                  </strong>{" "}
                  {selectedOrder.paymentMethod}
                </p>

                <p>
                  <strong>
                    Total:
                  </strong>{" "}
                  LKR{" "}
                  {Number(
                    selectedOrder.totalAmount ||
                      0
                  ).toLocaleString()}
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  {selectedOrder.status}
                </p>

                <button
                  className="close-modal-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Close
                </button>

              </div>
            </div>
          )}

        {/* ==========================
            UPDATE STATUS MODAL
        ========================== */}

        {showStatusModal &&
          editOrder && (
            <div
              className="vehicle-modal-overlay"
              onClick={() =>
                setShowStatusModal(false)
              }
            >
              <div
                className="vehicle-modal"
                onClick={(event) =>
                  event.stopPropagation()
                }
              >

                <h2>
                  Update Order Status
                </h2>

                <p>
                  <strong>
                    Order:
                  </strong>{" "}
                  {getOrderNumber(
                    editOrder
                  )}
                </p>

                <select
                  value={editOrder.status}
                  onChange={(event) =>
                    setEditOrder({
                      ...editOrder,
                      status:
                        event.target.value,
                    })
                  }
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Processing">
                    Processing
                  </option>

                  <option value="Ready for Pickup">
                    Ready for Pickup
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                </select>

                <div className="edit-buttons">

                  <button
                    className="save-btn"
                    onClick={saveStatus}
                  >
                    Save Changes
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={() =>
                      setShowStatusModal(false)
                    }
                  >
                    Cancel
                  </button>

                </div>

              </div>
            </div>
          )}

        {/* ==========================
            DELETE MODAL
        ========================== */}

        {showDeleteModal && (
          <div
            className="vehicle-modal-overlay"
            onClick={() =>
              setShowDeleteModal(false)
            }
          >
            <div
              className="vehicle-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <h2>
                Delete Order
              </h2>

              <p>
                Are you sure you want to
                permanently delete this
                order?
              </p>

              <div className="edit-buttons">

                <button
                  className="delete-confirm-btn"
                  onClick={deleteOrder}
                >
                  Yes, Delete
                </button>

                <button
                  className="cancel-btn"
                  onClick={() =>
                    setShowDeleteModal(false)
                  }
                >
                  Cancel
                </button>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ManageOrders;