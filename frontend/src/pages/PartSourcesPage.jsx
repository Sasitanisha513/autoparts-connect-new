import {
  useState,
  useEffect,
} from "react";

import axios from "axios";

import {
  FaSearch,
  FaPlus,
  FaBoxes,
  FaEllipsisV,
  FaTimes,
} from "react-icons/fa";

import SupplierSidebar
  from "../components/SupplierSidebar";

import "./PartSourcesPage.css";


function PartSourcesPage() {

  // ==========================
  // STATES
  // ==========================

  const [sources, setSources] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [activeMenu, setActiveMenu] =
    useState(null);


  // ==========================
  // ADD / EDIT MODAL
  // ==========================

  const [showModal, setShowModal] =
    useState(false);

  const [editingSource, setEditingSource] =
    useState(null);


  // ==========================
  // DELETE MODAL
  // ==========================

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedSource, setSelectedSource] =
    useState(null);


  // ==========================
  // FORM
  // ==========================

  const [formData, setFormData] =
    useState({
      partName: "",
      supplierName: "",
      location: "",
      contact: "",
      purchasePrice: "",
      availability: "Available",
    });


  // ==========================
  // MESSAGE
  // ==========================

  const [message, setMessage] =
    useState({
      show: false,
      text: "",
      type: "success",
    });


  // ==========================
  // SHOW MESSAGE
  // ==========================

  const showMessage = (
    text,
    type = "success"
  ) => {

    setMessage({
      show: true,
      text,
      type,
    });


    setTimeout(() => {

      setMessage({
        show: false,
        text: "",
        type: "success",
      });

    }, 2000);

  };


  // ==========================
  // GET PART SOURCES
  // ==========================

  const getSources = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/part-sources"
        );


      setSources(
        response.data
      );

    } catch (error) {

      console.log(
        "Part sources loading error:",
        error
      );

    }

  };


  useEffect(() => {

    getSources();

  }, []);


  // ==========================
  // HANDLE INPUT
  // ==========================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;


    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );

  };


  // ==========================
  // OPEN ADD MODAL
  // ==========================

  const openAddModal = () => {

    setEditingSource(null);

    setFormData({
      partName: "",
      supplierName: "",
      location: "",
      contact: "",
      purchasePrice: "",
      availability: "Available",
    });

    setShowModal(true);

  };


  // ==========================
  // OPEN EDIT MODAL
  // ==========================

  const openEditModal = (source) => {

    setEditingSource(source);

    setFormData({
      partName:
        source.partName || "",

      supplierName:
        source.supplierName || "",

      location:
        source.location || "",

      contact:
        source.contact || "",

      purchasePrice:
        source.purchasePrice || "",

      availability:
        source.availability ||
        "Available",
    });

    setActiveMenu(null);

    setShowModal(true);

  };


  // ==========================
  // CLOSE FORM MODAL
  // ==========================

  const closeModal = () => {

    setShowModal(false);

    setEditingSource(null);

  };


  // ==========================
  // SAVE SOURCE
  // ==========================

  const saveSource = async (event) => {

    event.preventDefault();


    try {

      if (editingSource) {

        const response =
          await axios.put(

            `http://localhost:5000/api/part-sources/${editingSource._id}`,

            {
              ...formData,

              purchasePrice:
                Number(
                  formData.purchasePrice
                ),
            }

          );


        setSources(
          (previous) =>
            previous.map(
              (source) =>
                source._id ===
                editingSource._id
                  ? response.data.source
                  : source
            )
        );


        showMessage(
          "Part source updated successfully.",
          "success"
        );

      } else {

        const response =
          await axios.post(

            "http://localhost:5000/api/part-sources",

            {
              ...formData,

              purchasePrice:
                Number(
                  formData.purchasePrice
                ),
            }

          );


        setSources(
          (previous) => [
            response.data.source,
            ...previous,
          ]
        );


        showMessage(
          "Part source added successfully.",
          "success"
        );

      }


      closeModal();

    } catch (error) {

      console.log(
        "Part source save error:",
        error
      );


      showMessage(
        error.response?.data?.message ||
          "Part source could not be saved.",
        "error"
      );

    }

  };


  // ==========================
  // OPEN DELETE MODAL
  // ==========================

  const openDeleteModal = (source) => {

    setSelectedSource(source);

    setActiveMenu(null);

    setShowDeleteModal(true);

  };


  // ==========================
  // CLOSE DELETE MODAL
  // ==========================

  const closeDeleteModal = () => {

    setShowDeleteModal(false);

    setSelectedSource(null);

  };


  // ==========================
  // DELETE SOURCE
  // ==========================

  const deleteSource = async () => {

    if (!selectedSource) {
      return;
    }


    try {

      await axios.delete(

        `http://localhost:5000/api/part-sources/${selectedSource._id}`

      );


      setSources(
        (previous) =>
          previous.filter(
            (source) =>
              source._id !==
              selectedSource._id
          )
      );


      closeDeleteModal();


      showMessage(
        "Part source deleted successfully.",
        "success"
      );

    } catch (error) {

      console.log(
        "Part source delete error:",
        error
      );


      closeDeleteModal();


      showMessage(
        error.response?.data?.message ||
          "Part source could not be deleted.",
        "error"
      );

    }

  };


  // ==========================
  // SEARCH
  // ==========================

  const filteredSources =
    sources.filter((source) => {

      const searchText =
        search.toLowerCase();


      return (

        (source.partName || "")
          .toLowerCase()
          .includes(searchText)

        ||

        (source.supplierName || "")
          .toLowerCase()
          .includes(searchText)

        ||

        (source.location || "")
          .toLowerCase()
          .includes(searchText)

      );

    });


  // ==========================
  // AVAILABILITY CLASS
  // ==========================

  const getAvailabilityClass = (
    availability
  ) => {

    if (
      availability ===
      "Available"
    ) {

      return "source-available";

    }


    if (
      availability ===
      "Limited"
    ) {

      return "source-limited";

    }


    return "source-unavailable";

  };


  return (

    <div className="part-sources-page">


      {/* ==========================
          PROFESSIONAL MESSAGE
      ========================== */}

      {message.show && (

        <div className="source-message-overlay">

          <div
            className={
              `source-message-box ${message.type}`
            }
          >

            <div className="source-message-icon">

              {message.type === "success"
                ? "✓"
                : "!"
              }

            </div>


            <p>
              {message.text}
            </p>

          </div>

        </div>

      )}


      {/* SIDEBAR */}

      <SupplierSidebar />


      {/* CONTENT */}

      <div className="part-sources-content">


        {/* ==========================
            HEADER
        ========================== */}

        <div className="part-sources-header">

          <h1>

            <FaBoxes className="source-header-icon" />

            Part Sources

          </h1>


          <p>

            Manage suppliers and sources for your spare parts.

          </p>

        </div>


        {/* ==========================
            TOOLBAR
        ========================== */}

        <div className="part-sources-toolbar">


          <div className="part-sources-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search by Part, Supplier or Location..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />

          </div>


          <button
            className="add-source-btn"
            onClick={openAddModal}
          >

            <FaPlus />

            Add Source

          </button>


        </div>


        {/* ==========================
            TABLE
        ========================== */}

        <div className="part-sources-table">

          <table>

            <thead>

              <tr>

                <th>Part</th>

                <th>Supplier / Source</th>

                <th>Location</th>

                <th>Contact</th>

                <th>Purchase Price</th>

                <th>Availability</th>

                <th></th>

              </tr>

            </thead>


            <tbody>

              {filteredSources.map(
                (source) => (

                  <tr
                    key={
                      source._id
                    }
                  >

                    <td className="source-part-name">

                      {source.partName}

                    </td>


                    <td>

                      {source.supplierName}

                    </td>


                    <td>

                      {source.location}

                    </td>


                    <td>

                      {source.contact ||
                        "Not provided"
                      }

                    </td>


                    <td>

                      LKR{" "}

                      {Number(
                        source.purchasePrice
                      ).toLocaleString()}

                    </td>


                    <td>

                      <span
                        className={
                          `source-status ${getAvailabilityClass(
                            source.availability
                          )}`
                        }
                      >

                        {source.availability}

                      </span>

                    </td>


                    {/* ACTION */}

                    <td className="source-action-column">

                      <div className="source-action-menu">


                        <button
                          className="source-menu-btn"
                          onClick={() =>
                            setActiveMenu(
                              activeMenu ===
                                source._id
                                ? null
                                : source._id
                            )
                          }
                        >

                          <FaEllipsisV />

                        </button>


                        {activeMenu ===
                          source._id && (

                          <div className="source-dropdown-menu">

                            <button
                              onClick={() =>
                                openEditModal(
                                  source
                                )
                              }
                            >

                              Edit

                            </button>


                            <button
                              className="source-delete-btn"
                              onClick={() =>
                                openDeleteModal(
                                  source
                                )
                              }
                            >

                              Delete

                            </button>

                          </div>

                        )}

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>


          {/* NO DATA */}

          {filteredSources.length ===
            0 && (

            <div className="no-sources">

              <h3>
                No Part Sources Found
              </h3>

              <p>
                Add a part source to start managing your suppliers.
              </p>

            </div>

          )}

        </div>

      </div>


      {/* ==========================
          ADD / EDIT MODAL
      ========================== */}

      {showModal && (

        <div
          className="source-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="source-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >


            <div className="source-modal-header">

              <div>

                <h2>

                  {editingSource
                    ? "Edit Part Source"
                    : "Add Part Source"
                  }

                </h2>

                <p>
                  Enter the source details for this part.
                </p>

              </div>


              <button
                className="source-modal-close"
                onClick={closeModal}
              >

                <FaTimes />

              </button>

            </div>


            <form
              onSubmit={saveSource}
              className="source-form"
            >


              <div className="source-form-row">


                <div className="source-form-group">

                  <label>
                    Part Name
                  </label>

                  <input
                    type="text"
                    name="partName"
                    value={
                      formData.partName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter part name"
                    required
                  />

                </div>


                <div className="source-form-group">

                  <label>
                    Supplier / Source Name
                  </label>

                  <input
                    type="text"
                    name="supplierName"
                    value={
                      formData.supplierName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter supplier name"
                    required
                  />

                </div>

              </div>


              <div className="source-form-row">


                <div className="source-form-group">

                  <label>
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={
                      formData.location
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter location"
                    required
                  />

                </div>


                <div className="source-form-group">

                  <label>
                    Contact
                  </label>

                  <input
                    type="text"
                    name="contact"
                    value={
                      formData.contact
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter contact number"
                  />

                </div>

              </div>


              <div className="source-form-row">


                <div className="source-form-group">

                  <label>
                    Purchase Price
                  </label>

                  <input
                    type="number"
                    name="purchasePrice"
                    value={
                      formData.purchasePrice
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter purchase price"
                    min="0"
                    required
                  />

                </div>


                <div className="source-form-group">

                  <label>
                    Availability
                  </label>

                  <select
                    name="availability"
                    value={
                      formData.availability
                    }
                    onChange={
                      handleChange
                    }
                  >

                    <option value="Available">
                      Available
                    </option>

                    <option value="Limited">
                      Limited
                    </option>

                    <option value="Unavailable">
                      Unavailable
                    </option>

                  </select>

                </div>

              </div>


              <div className="source-form-actions">

                <button
                  type="button"
                  className="source-cancel-btn"
                  onClick={closeModal}
                >

                  Cancel

                </button>


                <button
                  type="submit"
                  className="source-save-btn"
                >

                  {editingSource
                    ? "Update Source"
                    : "Save Source"
                  }

                </button>

              </div>


            </form>

          </div>

        </div>

      )}


      {/* ==========================
          DELETE MODAL
      ========================== */}

      {showDeleteModal &&
        selectedSource && (

        <div
          className="source-delete-overlay"
          onClick={closeDeleteModal}
        >

          <div
            className="source-delete-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="source-delete-icon">
              !
            </div>


            <h2>
              Delete Part Source
            </h2>


            <p>
              Are you sure you want to delete this part source?
            </p>


            <h3>
              {selectedSource.supplierName}
            </h3>


            <div className="source-delete-buttons">

              <button
                className="source-delete-cancel"
                onClick={closeDeleteModal}
              >

                Cancel

              </button>


              <button
                className="source-delete-confirm"
                onClick={deleteSource}
              >

                Yes, Delete

              </button>

            </div>

          </div>

        </div>

      )}


    </div>

  );

}


export default PartSourcesPage;