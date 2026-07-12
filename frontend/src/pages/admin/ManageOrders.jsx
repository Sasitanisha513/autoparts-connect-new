import "./ManageOrders.css";
import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

const orderData = [
  {
    id: 1,
    orderNo: "PO-2026-001",
    customer: "John Doe",
    part: "Brake Pad",
    vendor: "Auto Lanka",
    pickupDate: "2026-01-10",
    status: "Delivered",
  },
  {
    id: 2,
    orderNo: "PO-2026-002",
    customer: "Emma Watson",
    part: "Oil Filter",
    vendor: "City Auto",
    pickupDate: "2026-01-12",
    status: "Pending",
  },
  {
    id: 3,
    orderNo: "PO-2026-003",
    customer: "Michael Lee",
    part: "Air Filter",
    vendor: "Prime Motors",
    pickupDate: "2026-01-15",
    status: "Pickup",
  },
  {
    id: 4,
    orderNo: "PO-2026-004",
    customer: "Sarah Smith",
    part: "Radiator",
    vendor: "Speed Auto",
    pickupDate: "2026-01-18",
    status: "Pending",
  },
  {
    id: 5,
    orderNo: "PO-2026-005",
    customer: "David Brown",
    part: "Spark Plug",
    vendor: "Auto Hub",
    pickupDate: "2026-01-20",
    status: "Delivered",
  },
];

function ManageOrders() {

  const [orders, setOrders] = useState(orderData);
  const [search, setSearch] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [editOrder, setEditOrder] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null);

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.part.toLowerCase().includes(search.toLowerCase()) ||
      order.orderNo.toLowerCase().includes(search.toLowerCase())
  );

  const viewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const openStatusModal = (order) => {
    setEditOrder({ ...order });
    setShowStatusModal(true);
  };

  const saveStatus = () => {

    setOrders((prev) =>
      prev.map((o) =>
        o.id === editOrder.id ? editOrder : o
      )
    );

    setShowStatusModal(false);

  };

  const openDeleteModal = (id) => {
    setDeleteOrderId(id);
    setShowDeleteModal(true);
  };

  const deleteOrder = () => {

    setOrders((prev) =>
      prev.filter((o) => o.id !== deleteOrderId)
    );

    setShowDeleteModal(false);

  };
    return (

    <div className="manage-orders">

      <AdminSidebar />

      <div className="orders-content">

        <div className="orders-header">

          <div>

            <h1>Orders Management</h1>

            <p>
              Track and manage customer orders, update order status.
            </p>

          </div>

        </div>

        <div className="orders-toolbar">

          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="date"
          />

        </div>

        <table className="orders-table">

          <thead>

            <tr>

              <th>Order #</th>

              <th>Customer</th>

              <th>Part</th>

              <th>Vendor</th>

              <th>Pickup Date</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredOrders.map((order) => (

              <tr key={order.id}>

                <td>{order.orderNo}</td>

                <td>{order.customer}</td>

                <td>{order.part}</td>

                <td>{order.vendor}</td>

                <td>{order.pickupDate}</td>

                <td>

                  <span
                    className={
                      order.status === "Delivered"
                        ? "status delivered"
                        : order.status === "Pending"
                        ? "status pending"
                        : "status pickup"
                    }
                  >
                    {order.status}
                  </span>

                </td>

                <td className="action-buttons">

                  <button
                    className="view-btn"
                    onClick={() => viewOrder(order)}
                  >
                    View
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() => openStatusModal(order)}
                  >
                    Update
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => openDeleteModal(order.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
        {/* ================= VIEW ORDER MODAL ================= */}

{showModal && selectedOrder && (

  <div
    className="vehicle-modal-overlay"
    onClick={() => setShowModal(false)}
  >

    <div
      className="vehicle-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <h2>Order Details</h2>

      <p><strong>Order # :</strong> {selectedOrder.orderNo}</p>

      <p><strong>Customer :</strong> {selectedOrder.customer}</p>

      <p><strong>Part :</strong> {selectedOrder.part}</p>

      <p><strong>Vendor :</strong> {selectedOrder.vendor}</p>

      <p><strong>Pickup Date :</strong> {selectedOrder.pickupDate}</p>

      <p><strong>Status :</strong> {selectedOrder.status}</p>

      <button
        className="close-modal-btn"
        onClick={() => setShowModal(false)}
      >
        Close
      </button>

    </div>

  </div>

)}

{/* ================= UPDATE STATUS MODAL ================= */}

{showStatusModal && editOrder && (

  <div
    className="vehicle-modal-overlay"
    onClick={() => setShowStatusModal(false)}
  >

    <div
      className="vehicle-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <h2>Update Order Status</h2>

      <p><strong>Order :</strong> {editOrder.orderNo}</p>

      <select
        value={editOrder.status}
        onChange={(e) =>
          setEditOrder({
            ...editOrder,
            status: e.target.value,
          })
        }
      >
        <option value="Pending">Pending</option>
        <option value="Pickup">Pickup</option>
        <option value="Delivered">Delivered</option>
      </select>

      <div className="edit-buttons">

        <button
          className="save-btn"
          onClick={saveStatus}
        >
          Save
        </button>

        <button
          className="cancel-btn"
          onClick={() => setShowStatusModal(false)}
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}

{/* ================= DELETE MODAL ================= */}

{showDeleteModal && (

  <div
    className="vehicle-modal-overlay"
    onClick={() => setShowDeleteModal(false)}
  >

    <div
      className="vehicle-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <h2>Delete Order</h2>

      <p>Are you sure you want to delete this order?</p>

      <div className="edit-buttons">

        <button
          className="delete-confirm-btn"
          onClick={deleteOrder}
        >
          Yes, Delete
        </button>

        <button
          className="cancel-btn"
          onClick={() => setShowDeleteModal(false)}
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