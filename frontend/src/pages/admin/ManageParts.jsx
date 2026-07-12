import "./ManageParts.css";
import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { FaPlus } from "react-icons/fa";

const partData = [
  {
    id: 1,
    vendor: "Auto Lanka",
    part: "Brake Pad",
    vehicle: "BMW 5 Series",
    description: "High quality compatible brake pads",
    price: "2999",
  },
  {
    id: 2,
    vendor: "City Auto",
    part: "Oil Filter",
    vehicle: "Toyota Corolla",
    description: "Original oil filter",
    price: "1800",
  },
  {
    id: 3,
    vendor: "Prime Motors",
    part: "Air Filter",
    vehicle: "Honda Civic",
    description: "Premium air filter",
    price: "2500",
  },
  {
    id: 4,
    vendor: "Speed Auto",
    part: "Radiator",
    vehicle: "Nissan X-Trail",
    description: "Imported radiator",
    price: "12500",
  },
  {
    id: 5,
    vendor: "Auto Hub",
    part: "Spark Plug",
    vehicle: "Mazda CX-5",
    description: "Iridium spark plug",
    price: "3200",
  },
];

function ManageParts() {

  const [parts, setParts] = useState(partData);
  const [search, setSearch] = useState("");

  const [selectedPart, setSelectedPart] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editPart, setEditPart] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePartId, setDeletePartId] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const [newPart, setNewPart] = useState({
    vendor: "",
    part: "",
    vehicle: "",
    description: "",
    price: "",
  });

  const filteredParts = parts.filter(
    (item) =>
      item.vendor.toLowerCase().includes(search.toLowerCase()) ||
      item.part.toLowerCase().includes(search.toLowerCase()) ||
      item.vehicle.toLowerCase().includes(search.toLowerCase())
  );

  const viewPart = (part) => {
    setSelectedPart(part);
    setShowModal(true);
  };

  const openEditModal = (part) => {
    setEditPart({ ...part });
    setShowEditModal(true);
  };

  const savePart = () => {
    setParts((prev) =>
      prev.map((p) =>
        p.id === editPart.id ? editPart : p
      )
    );

    setShowEditModal(false);
  };

  const openDeleteModal = (id) => {
    setDeletePartId(id);
    setShowDeleteModal(true);
  };

  const deletePart = () => {
    setParts((prev) =>
      prev.filter((p) => p.id !== deletePartId)
    );

    setShowDeleteModal(false);
  };

  const addPart = () => {

    const part = {
      id: Date.now(),
      ...newPart,
    };

    setParts((prev) => [...prev, part]);

    setNewPart({
      vendor: "",
      part: "",
      vehicle: "",
      description: "",
      price: "",
    });

    setShowAddModal(false);
  };

  return (
    <div className="manage-parts">

  <AdminSidebar />

  <div className="parts-content">

    <div className="parts-header">

      <div>

        <h1>Product Catalog Management</h1>

        <p>
          Manage your product database, SKUs and pricing.
        </p>

      </div>

    </div>

    <div className="parts-toolbar">

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        className="add-part-btn"
        onClick={() => setShowAddModal(true)}
      >
        <FaPlus />
        Add Product
      </button>

    </div>

    <table className="parts-table">

      <thead>

        <tr>

          <th>Vendor</th>

          <th>Part</th>

          <th>Vehicle</th>

          <th>Description</th>

          <th>Price</th>

          <th>Action</th>

        </tr>

      </thead>

      <tbody>

        {filteredParts.map((item) => (

          <tr key={item.id}>

            <td>{item.vendor}</td>

            <td>{item.part}</td>

            <td>{item.vehicle}</td>

            <td>{item.description}</td>

            <td>LKR {item.price}</td>

            <td className="action-buttons">

              <button
                className="view-btn"
                onClick={() => viewPart(item)}
              >
                View
              </button>

              <button
                className="edit-btn"
                onClick={() => openEditModal(item)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => openDeleteModal(item.id)}
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
    {/* ================= VIEW MODAL ================= */}

{showModal && selectedPart && (

  <div
    className="vehicle-modal-overlay"
    onClick={() => setShowModal(false)}
  >

    <div
      className="vehicle-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <h2>Part Details</h2>

      <p><strong>Vendor :</strong> {selectedPart.vendor}</p>

      <p><strong>Part :</strong> {selectedPart.part}</p>

      <p><strong>Vehicle :</strong> {selectedPart.vehicle}</p>

      <p><strong>Description :</strong> {selectedPart.description}</p>

      <p><strong>Price :</strong> LKR {selectedPart.price}</p>

      <button
        className="close-modal-btn"
        onClick={() => setShowModal(false)}
      >
        Close
      </button>

    </div>

  </div>

)}

{/* ================= EDIT MODAL ================= */}

{showEditModal && editPart && (

  <div
    className="vehicle-modal-overlay"
    onClick={() => setShowEditModal(false)}
  >

    <div
      className="vehicle-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <h2>Edit Product</h2>

      <input
        type="text"
        value={editPart.vendor}
        onChange={(e) =>
          setEditPart({
            ...editPart,
            vendor: e.target.value,
          })
        }
      />

      <input
        type="text"
        value={editPart.part}
        onChange={(e) =>
          setEditPart({
            ...editPart,
            part: e.target.value,
          })
        }
      />

      <input
        type="text"
        value={editPart.vehicle}
        onChange={(e) =>
          setEditPart({
            ...editPart,
            vehicle: e.target.value,
          })
        }
      />

      <input
        type="text"
        value={editPart.description}
        onChange={(e) =>
          setEditPart({
            ...editPart,
            description: e.target.value,
          })
        }
      />

      <input
        type="number"
        value={editPart.price}
        onChange={(e) =>
          setEditPart({
            ...editPart,
            price: e.target.value,
          })
        }
      />

      <div className="edit-buttons">

        <button
          className="save-btn"
          onClick={savePart}
        >
          Save
        </button>

        <button
          className="cancel-btn"
          onClick={() => setShowEditModal(false)}
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

      <h2>Delete Product</h2>

      <p>Are you sure you want to delete this product?</p>

      <div className="edit-buttons">

        <button
          className="delete-confirm-btn"
          onClick={deletePart}
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

{/* ================= ADD PRODUCT MODAL ================= */}

{showAddModal && (

  <div
    className="vehicle-modal-overlay"
    onClick={() => setShowAddModal(false)}
  >

    <div
      className="vehicle-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <h2>Add Product</h2>

      <input
        type="text"
        placeholder="Vendor"
        value={newPart.vendor}
        onChange={(e) =>
          setNewPart({
            ...newPart,
            vendor: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Part Name"
        value={newPart.part}
        onChange={(e) =>
          setNewPart({
            ...newPart,
            part: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Vehicle"
        value={newPart.vehicle}
        onChange={(e) =>
          setNewPart({
            ...newPart,
            vehicle: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Description"
        value={newPart.description}
        onChange={(e) =>
          setNewPart({
            ...newPart,
            description: e.target.value,
          })
        }
      />

      <input
        type="number"
        placeholder="Price"
        value={newPart.price}
        onChange={(e) =>
          setNewPart({
            ...newPart,
            price: e.target.value,
          })
        }
      />

      <div className="edit-buttons">

        <button
          className="save-btn"
          onClick={addPart}
        >
          Add Product
        </button>

        <button
          className="cancel-btn"
          onClick={() => setShowAddModal(false)}
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

export default ManageParts;