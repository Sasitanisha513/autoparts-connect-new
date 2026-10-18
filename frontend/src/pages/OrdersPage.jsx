import {
  useState,
  useEffect,
  useRef,
} from "react";

import axios from "axios";

import SupplierSidebar from "../components/SupplierSidebar";
import "./OrdersPage.css";

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

const API_URL = "http://localhost:5000";

function OrdersPage() {

  // ==========================
  // ORDERS
  // ==========================

  const [orders, setOrders] = useState([]);

  // ==========================
  // SEARCH
  // ==========================

  const [search, setSearch] = useState("");

  // ==========================
  // STATUS FILTER
  // ==========================

  const [statusFilter, setStatusFilter] = useState("All");

  // ==========================
  // ACTIVE MENU
  // ==========================

  const [activeMenu, setActiveMenu] = useState(null);

  const menuRef = useRef(null);

  // ==========================
  // DETAILS MODAL
  // ==========================

  const [showDetailsModal, setShowDetailsModal] =
    useState(false);

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  // ==========================
  // LOADING
  // ==========================

  const [loading, setLoading] = useState(true);

  // ==========================
  // LOAD ORDERS
  // ==========================

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        `${API_URL}/api/orders`
      );

      setOrders(response.data);

    } catch (error) {

      console.error(
        "Error loading orders:",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  // ==========================
  // CLOSE MENU OUTSIDE CLICK
  // ==========================

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {

        setActiveMenu(null);

      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  // ==========================
  // GET ORDER NUMBER
  // ==========================

  const getOrderNumber = (order) => {

    return `PO-${new Date(
      order.createdAt
    ).getFullYear()}-${String(
      order._id
    ).slice(-3).toUpperCase()}`;

  };

  // ==========================
  // GET PART NAMES
  // ==========================

  const getPartNames = (order) => {

    if (
      !order.items ||
      order.items.length === 0
    ) {

      return "No items";

    }

    return order.items
      .map((item) => item.partName)
      .join(", ");

  };

  // ==========================
  // GET TOTAL QUANTITY
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
  // GET ITEM COUNT
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
  // GET VEHICLE
  // ==========================

  const getVehicleName = (order) => {

    if (
      !order.items ||
      order.items.length === 0
    ) {

      return "";

    }

    const vehicle =
      order.items.find(
        (item) => item.vehicle
      )?.vehicle;

    return vehicle || "";

  };

  // ==========================
  // GET CARD PART DISPLAY
  // ==========================

  const getCardPartDisplay = (order) => {

    const count = getItemCount(order);

    if (count === 0) {

      return {
        title: "No items",
        subtitle: "",
      };

    }

    if (count === 1) {

      return {
        title:
          order.items[0]?.partName ||
          "Part",

        subtitle: "1 Part",
      };

    }

    return {
      title: `${count} Parts`,
      subtitle: getVehicleName(order),
    };

  };

  // ==========================
  // FORMAT DATE
  // ==========================

  const formatDate = (date) => {

    if (!date) {
      return "N/A";
    }

    return new Date(date)
      .toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );

  };

  // ==========================
  // UPDATE STATUS
  // ==========================

  const updateOrderStatus = async (
    orderId,
    newStatus
  ) => {

    try {

      await axios.put(
        `${API_URL}/api/orders/${orderId}`,
        {
          status: newStatus,
        }
      );

      await fetchOrders();

      setActiveMenu(null);

    } catch (error) {

      console.error(
        "Error updating order:",
        error
      );

      alert(
        error.response?.data?.error ||
        "Failed to update order."
      );

    }

  };

  // ==========================
  // VIEW ORDER
  // ==========================

  const handleViewOrder = (order) => {

    setSelectedOrder(order);

    setShowDetailsModal(true);

    setActiveMenu(null);

  };

  // ==========================
  // CLOSE DETAILS MODAL
  // ==========================

  const closeDetailsModal = () => {

    setShowDetailsModal(false);

    setSelectedOrder(null);

  };

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
  // SEARCH + STATUS FILTER
  // ==========================

  const filteredOrders =
    orders.filter((order) => {

      const searchText =
        search
          .toLowerCase()
          .trim();

      const orderNumber =
        getOrderNumber(order)
          .toLowerCase();

      const customer =
        (
          order.customerName ||
          ""
        ).toLowerCase();

      const parts =
        getPartNames(order)
          .toLowerCase();

      const matchesSearch =
        orderNumber.includes(searchText) ||
        customer.includes(searchText) ||
        parts.includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );

    });

  // ==========================
  // SUMMARY COUNTS
  // ==========================

  const totalOrders =
    orders.length;

  const pendingOrders =
    orders.filter(
      (order) =>
        order.status === "Pending"
    ).length;

  const processingOrders =
    orders.filter(
      (order) =>
        order.status === "Processing"
    ).length;

  const readyOrders =
    orders.filter(
      (order) =>
        order.status === "Ready for Pickup"
    ).length;

  const completedOrders =
    orders.filter(
      (order) =>
        order.status === "Completed"
    ).length;

  const cancelledOrders =
    orders.filter(
      (order) =>
        order.status === "Cancelled"
    ).length;

  // ==========================
  // PAGE
  // ==========================

  return (

    <div className="orders-page">

      <SupplierSidebar />

      <div className="orders-content">

        {/* ==========================
            HEADER
        ========================== */}

        <div className="orders-header">

          <h1>

            <FaBoxOpen
              className="orders-header-icon"
            />

            Orders Management

          </h1>

          <p>
            Track and manage customer
            pickup orders.
          </p>

        </div>


        {/* ==========================
            TOOLBAR
        ========================== */}

        <div className="orders-toolbar">

          <div className="orders-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search Order ID, Customer or Part..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="orders-filter">

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
            >

              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Processing">
                Processing
              </option>

              <option value="Ready for Pickup">
                Ready For Pickup
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </div>


          <button
            type="button"
            className="orders-date-btn"
          >

            <FaCalendarAlt />

            From - To

          </button>

        </div>


        {/* ==========================
            ORDER CARDS
        ========================== */}

        {loading ? (

          <div className="orders-empty">

            <FaBoxOpen />

            <h3>
              Loading orders...
            </h3>

          </div>

        ) : filteredOrders.length === 0 ? (

          <div className="orders-empty">

            <FaBoxOpen />

            <h3>
              No Orders Found
            </h3>

            <p>
              Try searching using
              another keyword.
            </p>

          </div>

        ) : (

          <div className="orders-card-grid">

            {filteredOrders.map(
              (order) => {

                const partDisplay =
                  getCardPartDisplay(order);

                return (

                  <div
                    className="order-card"
                    key={order._id}
                  >

                    {/* ==========================
                        CARD HEADER
                    ========================== */}

                    <div className="order-card-header">

                      <div>

                        <h3>
                          {getOrderNumber(order)}
                        </h3>

                        <div className="customer-name">

                          <span className="customer-dot">
                            ●
                          </span>

                          {order.customerName ||
                            "Customer"}

                        </div>

                      </div>


                      <div className="order-card-actions">

                        <span
                          className={`order-status ${getStatusClass(
                            order.status
                          )}`}
                        >

                          {getStatusIcon(
                            order.status
                          )}

                          {order.status}

                        </span>


                        <div
                          className="order-menu"
                          ref={
                            activeMenu === order._id
                              ? menuRef
                              : null
                          }
                        >

                          <button
                            type="button"
                            className="order-menu-btn"
                            onClick={() =>
                              setActiveMenu(
                                activeMenu ===
                                order._id
                                  ? null
                                  : order._id
                              )
                            }
                          >

                            <FaEllipsisV />

                          </button>


                          {/* ==========================
                              DROPDOWN MENU
                          ========================== */}

                          {activeMenu ===
                            order._id && (

                            <div className="order-dropdown">

                              {/* VIEW DETAILS */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleViewOrder(
                                    order
                                  )
                                }
                              >
                                View Details
                              </button>


                              {/* MARK AS PICKUP */}

                              {order.status !==
                                "Ready for Pickup" &&
                                order.status !==
                                "Completed" &&
                                order.status !==
                                "Cancelled" && (

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateOrderStatus(
                                      order._id,
                                      "Ready for Pickup"
                                    )
                                  }
                                >
                                  Mark as Pickup
                                </button>

                              )}


                              {/* MARK AS DELIVERED */}

                              {order.status !==
                                "Completed" &&
                                order.status !==
                                "Cancelled" && (

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateOrderStatus(
                                      order._id,
                                      "Completed"
                                    )
                                  }
                                >
                                  Mark as Delivered
                                </button>

                              )}

                            </div>

                          )}

                        </div>

                      </div>

                    </div>


                    {/* ==========================
                        PART INFORMATION
                    ========================== */}

                    <div className="order-part-box">

                      <div className="order-part-icon">

                        <FaBoxOpen />

                      </div>

                      <div className="order-part-text">

                        <strong>
                          {partDisplay.title}
                        </strong>

                        <span>
                          {partDisplay.subtitle}
                        </span>

                      </div>

                    </div>


                    {/* ==========================
                        ORDER INFORMATION
                    ========================== */}

                    <div className="order-info-row">

                      <div className="order-info-item">

                        <div className="info-icon">

                          <FaBoxOpen />

                        </div>

                        <div>

                          <span>
                            Quantity
                          </span>

                          <strong>
                            {getTotalQuantity(order)}
                          </strong>

                        </div>

                      </div>


                      <div className="order-info-divider" />


                      <div className="order-info-item">

                        <div className="info-icon">

                          <FaCalendarAlt />

                        </div>

                        <div>

                          <span>
                            Pickup Date
                          </span>

                          <strong>
                            {formatDate(
                              order.createdAt
                            )}
                          </strong>

                        </div>

                      </div>

                    </div>


                    {/* ==========================
                        VIEW DETAILS
                    ========================== */}

                    <button
                      type="button"
                      className={`view-details-btn ${getStatusClass(
                        order.status
                      )}`}
                      onClick={() =>
                        handleViewOrder(order)
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

      </div>


      {/* ==========================
          ORDER DETAILS MODAL
      ========================== */}

      {showDetailsModal &&
        selectedOrder && (

          <div
            className="order-details-overlay"
            onClick={closeDetailsModal}
          >

            <div
              className="order-details-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <h2>
                Order Details
              </h2>


              <div className="order-details-content">

                <p>

                  <strong>
                    Order ID:
                  </strong>{" "}

                  {getOrderNumber(
                    selectedOrder
                  )}

                </p>


                <p>

                  <strong>
                    Customer:
                  </strong>{" "}

                  {selectedOrder.customerName ||
                    "N/A"}

                </p>


                <p>

                  <strong>
                    Email:
                  </strong>{" "}

                  {selectedOrder.customerEmail ||
                    "N/A"}

                </p>


                <p>

                  <strong>
                    Phone:
                  </strong>{" "}

                  {selectedOrder.customerPhone ||
                    "N/A"}

                </p>


                <p>

                  <strong>
                    Part:
                  </strong>{" "}

                  {getPartNames(
                    selectedOrder
                  )}

                </p>


                <p>

                  <strong>
                    Quantity:
                  </strong>{" "}

                  {getTotalQuantity(
                    selectedOrder
                  )}

                </p>


                <p>

                  <strong>
                    Total:
                  </strong>{" "}

                  LKR{" "}

                  {Number(
                    selectedOrder.totalAmount || 0
                  ).toLocaleString()}

                </p>


                <p>

                  <strong>
                    Payment:
                  </strong>{" "}

                  {selectedOrder.paymentMethod ||
                    "N/A"}

                </p>


                <p>

                  <strong>
                    Status:
                  </strong>{" "}

                  <span
                    className={`modal-status ${getStatusClass(
                      selectedOrder.status
                    )}`}
                  >

                    {selectedOrder.status}

                  </span>

                </p>

              </div>


              <button
                type="button"
                className="order-details-close"
                onClick={closeDetailsModal}
              >

                Close

              </button>

            </div>

          </div>

        )}

    </div>

  );

}

export default OrdersPage;