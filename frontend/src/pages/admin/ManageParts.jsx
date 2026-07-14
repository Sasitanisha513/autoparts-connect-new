import "./ManageParts.css";
import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

function ManageParts() {
  const [parts, setParts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedPart, setSelectedPart] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editPart, setEditPart] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePartId, setDeletePartId] = useState(null);
const [toast, setToast] = useState({
  show: false,
  message: "",
  type: "",
});

const showToast = (message, type) => {
  setToast({
    show: true,
    message: message,
    type: type,
  });

  setTimeout(() => {
    setToast({
      show: false,
      message: "",
      type: "",
    });
  }, 3000);
};
  // ==================================
  // LOAD ALL PARTS FROM MONGODB
  // ==================================

  const fetchParts = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/parts"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load products."
        );
      }

      const data = await response.json();

      setParts(data);

    } catch (error) {
      console.error(
        "Error loading products:",
        error
      );

      alert(
        "Could not load products. Please check whether the backend is running."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  // ==================================
  // SEARCH PRODUCTS
  // ==================================

  const filteredParts = parts.filter(
    (item) => {
      const searchText =
        search.toLowerCase();

      return (
        (item.supplier || "")
          .toLowerCase()
          .includes(searchText) ||

        (item.partName || "")
          .toLowerCase()
          .includes(searchText) ||

        (item.vehicle || "")
          .toLowerCase()
          .includes(searchText) ||

        (item.description || "")
          .toLowerCase()
          .includes(searchText)
      );
    }
  );

  // ==================================
  // VIEW PRODUCT
  // ==================================

  const viewPart = (part) => {
    setSelectedPart(part);
    setShowModal(true);
  };

  // ==================================
  // OPEN EDIT PRODUCT
  // ==================================

  const openEditModal = (part) => {
    setEditPart({
      ...part,
    });

    setShowEditModal(true);
  };

  // ==================================
  // UPDATE PRODUCT IN MONGODB
  // ==================================

  const savePart = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/parts/${editPart._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            sku: editPart.sku,
            partName: editPart.partName,
            category: editPart.category,
            vehicle: editPart.vehicle,
            brand: editPart.brand,
            supplier: editPart.supplier,
            condition: editPart.condition,
            price: editPart.price,
            stockQuantity:
              editPart.stockQuantity,
            description:
              editPart.description,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          "Product update failed."
        );
      }

      setParts((previousParts) =>
        previousParts.map((part) =>
          part._id === editPart._id
            ? data.part
            : part
        )
      );

      setShowEditModal(false);

      showToast(
  "Product updated successfully!",
  "success"
);

    } catch (error) {
      showToast(
  error.message,
  "error"
);
    }
  };

  // ==================================
  // OPEN DELETE CONFIRMATION
  // ==================================

  const openDeleteModal = (id) => {
    setDeletePartId(id);

    setShowDeleteModal(true);
  };

  // ==================================
  // DELETE PRODUCT FROM MONGODB
  // ==================================

  const deletePart = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/parts/${deletePartId}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          "Product deletion failed."
        );
      }

      setParts((previousParts) =>
        previousParts.filter(
          (part) =>
            part._id !== deletePartId
        )
      );

      setShowDeleteModal(false);

      setDeletePartId(null);

      showToast(
  "Product deleted successfully!",
  "success"
);
    } catch (error) {
    showToast(
  error.message,
  "error"
);
    }
  };

  return (
  <div className="manage-parts">

    {/* =========================
        SUCCESS / ERROR TOAST
    ========================= */}

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

    <AdminSidebar />

      <div className="parts-content">

        <div className="parts-header">

          <div>

            <h1>
              Product Catalog Management
            </h1>

            <p>
              View and manage vendor
              products, inventory and
              pricing.
            </p>

          </div>

        </div>

        <div className="parts-toolbar">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

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

            {loading ? (

              <tr>

                <td colSpan="6">

                  Loading products...

                </td>

              </tr>

            ) : filteredParts.length === 0 ? (

              <tr>

                <td colSpan="6">

                  No products found.

                </td>

              </tr>

            ) : (

              filteredParts.map(
                (item) => (

                  <tr key={item._id}>

                    <td>
                      {item.supplier}
                    </td>

                    <td>
                      {item.partName}
                    </td>

                    <td>
                      {item.vehicle}
                    </td>

                    <td>
                      {item.description ||
                        "No description"}
                    </td>

                    <td>

                      LKR{" "}

                      {Number(
                        item.price
                      ).toLocaleString()}

                    </td>

                    <td className="action-buttons">

                      <button
                        className="view-btn"
                        onClick={() =>
                          viewPart(item)
                        }
                      >

                        View

                      </button>

                      <button
                        className="edit-btn"
                        onClick={() =>
                          openEditModal(
                            item
                          )
                        }
                      >

                        Edit

                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          openDeleteModal(
                            item._id
                          )
                        }
                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

        {/* =========================
            VIEW PRODUCT MODAL
        ========================= */}

        {showModal &&
          selectedPart && (

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
                Part Details
              </h2>

              <p>
                <strong>
                  SKU:
                </strong>{" "}

                {selectedPart.sku}
              </p>

              <p>
                <strong>
                  Vendor:
                </strong>{" "}

                {selectedPart.supplier}
              </p>

              <p>
                <strong>
                  Part:
                </strong>{" "}

                {selectedPart.partName}
              </p>

              <p>
                <strong>
                  Category:
                </strong>{" "}

                {selectedPart.category}
              </p>

              <p>
                <strong>
                  Vehicle:
                </strong>{" "}

                {selectedPart.vehicle}
              </p>

              <p>
                <strong>
                  Brand:
                </strong>{" "}

                {selectedPart.brand}
              </p>

              <p>
                <strong>
                  Condition:
                </strong>{" "}

                {selectedPart.condition}
              </p>

              <p>
                <strong>
                  Stock:
                </strong>{" "}

                {
                  selectedPart
                    .stockQuantity
                }
              </p>

              <p>
                <strong>
                  Description:
                </strong>{" "}

                {
                  selectedPart
                    .description
                }
              </p>

              <p>
                <strong>
                  Price:
                </strong>{" "}

                LKR{" "}

                {Number(
                  selectedPart.price
                ).toLocaleString()}

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

       {/* =========================
    EDIT PRODUCT MODAL
========================= */}

{showEditModal && editPart && (

  <div
    className="vehicle-modal-overlay"
    onClick={() =>
      setShowEditModal(false)
    }
  >

    <div
      className="vehicle-modal edit-product-modal"
      onClick={(event) =>
        event.stopPropagation()
      }
    >

      <h2>Edit Product</h2>

      <div className="edit-form">

        <div className="edit-form-group">

          <label>Vendor</label>

          <input
            type="text"
            value={
              editPart.supplier || ""
            }
            onChange={(event) =>
              setEditPart({
                ...editPart,
                supplier:
                  event.target.value,
              })
            }
          />

        </div>

        <div className="edit-form-group">

          <label>Part Name</label>

          <input
            type="text"
            value={
              editPart.partName || ""
            }
            onChange={(event) =>
              setEditPart({
                ...editPart,
                partName:
                  event.target.value,
              })
            }
          />

        </div>

        <div className="edit-form-group">

          <label>Vehicle</label>

          <input
            type="text"
            value={
              editPart.vehicle || ""
            }
            onChange={(event) =>
              setEditPart({
                ...editPart,
                vehicle:
                  event.target.value,
              })
            }
          />

        </div>

        <div className="edit-form-group">

          <label>Condition</label>

          <select
            value={
              editPart.condition || ""
            }
            onChange={(event) =>
              setEditPart({
                ...editPart,
                condition:
                  event.target.value,
              })
            }
          >

            <option value="Brand New">
              Brand New
            </option>

            <option value="Used">
              Used
            </option>

            <option value="Refurbished">
              Refurbished
            </option>

          </select>

        </div>

        <div className="edit-form-group">

          <label>Description</label>

          <textarea
            className="edit-description"
            placeholder="Enter product description..."
            value={
              editPart.description || ""
            }
            onChange={(event) =>
              setEditPart({
                ...editPart,
                description:
                  event.target.value,
              })
            }
          />

        </div>

        <div className="edit-form-row">

          <div className="edit-form-group">

            <label>Price (LKR)</label>

            <input
              type="number"
              min="0"
              value={
                editPart.price || ""
              }
              onChange={(event) =>
                setEditPart({
                  ...editPart,
                  price:
                    event.target.value,
                })
              }
            />

          </div>

          <div className="edit-form-group">

            <label>
              Stock Quantity
            </label>

            <input
              type="number"
              min="0"
              value={
                editPart
                  .stockQuantity ?? ""
              }
              onChange={(event) =>
                setEditPart({
                  ...editPart,
                  stockQuantity:
                    event.target.value,
                })
              }
            />

          </div>

        </div>

      </div>

      <div className="edit-buttons">

        <button
          className="save-btn"
          onClick={savePart}
        >
          Save Changes
        </button>

        <button
          className="cancel-btn"
          onClick={() =>
            setShowEditModal(false)
          }
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}

        {/* =========================
            DELETE CONFIRMATION
        ========================= */}

        {showDeleteModal && (

          <div
            className="vehicle-modal-overlay"
            onClick={() =>
              setShowDeleteModal(
                false
              )
            }
          >

            <div
              className="vehicle-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <h2>
                Delete Product
              </h2>

              <p>

                Are you sure you want
                to permanently delete
                this product?

              </p>

              <div className="edit-buttons">

                <button
                  className="delete-confirm-btn"
                  onClick={
                    deletePart
                  }
                >

                  Yes, Delete

                </button>

                <button
                  className="cancel-btn"
                  onClick={() =>
                    setShowDeleteModal(
                      false
                    )
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

export default ManageParts;