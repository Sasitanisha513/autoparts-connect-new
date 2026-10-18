import "./ManageVehicles.css";
import {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { FaPlus } from "react-icons/fa";

function ManageVehicles() {

  const [vehicles, setVehicles] =
    useState([]);

  const [search, setSearch] =
    useState("");
    const [message, setMessage] = useState({
  show: false,
  text: "",
  type: "success",
});

const showMessage = (text, type = "success") => {
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
  }, 2500);
};

  const [
    selectedVehicle,
    setSelectedVehicle,
  ] = useState(null);

  const [
    showModal,
    setShowModal,
  ] = useState(false);

  const [
    showEditModal,
    setShowEditModal,
  ] = useState(false);

  const [
    editVehicle,
    setEditVehicle,
  ] = useState(null);

  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);

  const [
    deleteVehicleId,
    setDeleteVehicleId,
  ] = useState(null);

  const [
    showAddModal,
    setShowAddModal,
  ] = useState(false);

  const [newVehicle, setNewVehicle] =
  useState({
    sku: "",
    brand: "",
    model: "",
    year: "",
    fuel: "Petrol",
    image: null,
  });

  // ==========================
  // GET VEHICLES FROM MONGODB
  // ==========================

  const getVehicles = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/vehicles"
        );

      setVehicles(
        response.data
      );

    } catch (error) {

      console.error(
        "Vehicle loading error:",
        error
      );

    }

  };


  useEffect(() => {

    getVehicles();

  }, []);


  // ==========================
  // SEARCH VEHICLES
  // ==========================

  const filteredVehicles =
    vehicles.filter((vehicle) => {

      const searchText =
        search.toLowerCase();

      return (

        (vehicle.brand || "")
          .toLowerCase()
          .includes(searchText)

        ||

        (vehicle.model || "")
          .toLowerCase()
          .includes(searchText)

        ||

        (vehicle.sku || "")
          .toLowerCase()
          .includes(searchText)

      );

    });


  // ==========================
  // VIEW VEHICLE
  // ==========================

  const viewVehicle = (vehicle) => {

    setSelectedVehicle(vehicle);

    setShowModal(true);

  };


  // ==========================
  // OPEN EDIT MODAL
  // ==========================

  const openEditModal = (vehicle) => {

    setEditVehicle({
      ...vehicle,
    });

    setShowEditModal(true);

  };


  // ==========================
  // UPDATE VEHICLE
  // ==========================

  const saveVehicle = async () => {

    if (
      !editVehicle.sku ||
      !editVehicle.brand ||
      !editVehicle.model ||
      !editVehicle.year ||
      !editVehicle.fuel
    ) {
showMessage(
  "Please complete all vehicle details.",
  "error"
);

      return;

    }

    try {
const formData = new FormData();

formData.append("sku", editVehicle.sku);
formData.append("brand", editVehicle.brand);
formData.append("model", editVehicle.model);
formData.append("year", Number(editVehicle.year));
formData.append("fuel", editVehicle.fuel);

if (editVehicle.image instanceof File) {
  formData.append("image", editVehicle.image);
}

const response = await axios.put(
  `http://localhost:5000/api/vehicles/${editVehicle._id}`,
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

      setVehicles(
        (previousVehicles) =>

          previousVehicles.map(
            (vehicle) =>

              vehicle._id ===
              editVehicle._id

                ? response.data.vehicle

                : vehicle

          )
      );


      setShowEditModal(false);

      setEditVehicle(null);

     showMessage(
  "Vehicle updated successfully.",
  "success"
);


    } catch (error) {

      showMessage(
  error.response?.data?.message ||
  "Vehicle update failed.",
  "error"
);

    }

  };


  // ==========================
  // OPEN DELETE MODAL
  // ==========================

  const openDeleteModal = (id) => {

    setDeleteVehicleId(id);

    setShowDeleteModal(true);

  };


  // ==========================
  // DELETE VEHICLE
  // ==========================

  const deleteVehicle = async () => {

    try {

      await axios.delete(

        `http://localhost:5000/api/vehicles/${deleteVehicleId}`

      );


      setVehicles(
        (previousVehicles) =>

          previousVehicles.filter(

            (vehicle) =>

              vehicle._id !==
              deleteVehicleId

          )
      );


      setShowDeleteModal(false);

      setDeleteVehicleId(null);

     showMessage(
  "Vehicle deleted successfully.",
  "success"
);


    } catch (error) {

      showMessage(
  error.response?.data?.message ||
  "Vehicle deletion failed.",
  "error"
);

    }

  };


  // ==========================
  // ADD VEHICLE
  // ==========================

  const addVehicle = async () => {
if (
  !newVehicle.sku ||
  !newVehicle.brand ||
  !newVehicle.model ||
  !newVehicle.year ||
  !newVehicle.fuel ||
  !newVehicle.image
) {

     showMessage(
  "Please complete all vehicle details.",
  "error"
);

      return;

    }


    try {

      const formData = new FormData();

formData.append("sku", newVehicle.sku);
formData.append("brand", newVehicle.brand);
formData.append("model", newVehicle.model);
formData.append("year", Number(newVehicle.year));
formData.append("fuel", newVehicle.fuel);
formData.append("image", newVehicle.image);

const response = await axios.post(
  "http://localhost:5000/api/vehicles/add",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);


      setVehicles(
        (previousVehicles) => [

          response.data.vehicle,

          ...previousVehicles,

        ]
      );


     setNewVehicle({
  sku: "",
  brand: "",
  model: "",
  year: "",
  fuel: "Petrol",
  image: null,
});


      setShowAddModal(false);

showMessage(
  "Vehicle added successfully.",
  "success"
);

    } catch (error) {
showMessage(
  error.response?.data?.message ||
  "Vehicle creation failed.",
  "error"
);

    }

  };

return (
  <div className="manage-vehicles">

    {message.show && (
      <div className="vehicle-message-overlay">

        <div
          className={`vehicle-message-box ${message.type}`}
        >

          <div className="vehicle-message-icon">
            {message.type === "success" ? "✓" : "!"}
          </div>

          <p>{message.text}</p>

        </div>

      </div>
    )}

    <AdminSidebar />

      <div className="vehicles-content">


        <div className="vehicles-header">

          <div>

            <h1>
              Vehicle Database Management
            </h1>

            <p>

              Add, update and maintain
              vehicle brands, models and
              compatibility information.

            </p>

          </div>

        </div>


        <div className="vehicles-toolbar">


          <input

            type="text"

            placeholder=
              "Search vehicles..."

            value={search}

            onChange={(event) =>

              setSearch(
                event.target.value
              )

            }

          />


          <button

            className=
              "add-vehicle-btn"

            onClick={() =>

              setShowAddModal(
                true
              )

            }

          >

            <FaPlus />

            Add Vehicle

          </button>


        </div>


        <table className="vehicles-table">


          <thead>

            <tr>

              <th>SKU</th>

              <th>Brand</th>

              <th>Model</th>

              <th>Year</th>

              <th>Fuel Type</th>

              <th>Action</th>

            </tr>

          </thead>


          <tbody>


            {
              filteredVehicles.length > 0

              ? (

                filteredVehicles.map(

                  (vehicle) => (

                    <tr
                      key={
                        vehicle._id
                      }
                    >


                      <td>

                        {
                          vehicle.sku
                        }

                      </td>


                      <td>

                        {
                          vehicle.brand
                        }

                      </td>


                      <td>

                        {
                          vehicle.model
                        }

                      </td>


                      <td>

                        {
                          vehicle.year
                        }

                      </td>


                      <td>

                        {
                          vehicle.fuel
                        }

                      </td>


                      <td
                        className=
                          "action-buttons"
                      >


                        <button

                          className=
                            "view-btn"

                          onClick={() =>

                            viewVehicle(
                              vehicle
                            )

                          }

                        >

                          View

                        </button>


                        <button

                          className=
                            "edit-btn"

                          onClick={() =>

                            openEditModal(
                              vehicle
                            )

                          }

                        >

                          Edit

                        </button>


                        <button

                          className=
                            "delete-btn"

                          onClick={() =>

                            openDeleteModal(
                              vehicle._id
                            )

                          }

                        >

                          Delete

                        </button>


                      </td>


                    </tr>

                  )

                )

              )

              : (

                <tr>

                  <td

                    colSpan="6"

                    style={{

                      textAlign:
                        "center",

                      padding:
                        "30px",

                    }}

                  >

                    No vehicles found.

                  </td>

                </tr>

              )
            }


          </tbody>


        </table>


        {/* VIEW VEHICLE */}


        {
          showModal &&
          selectedVehicle && (

            <div

              className=
                "vehicle-modal-overlay"

              onClick={() =>

                setShowModal(
                  false
                )

              }

            >


              <div

                className=
                  "vehicle-modal"

                onClick={(event) =>

                  event.stopPropagation()

                }

              >


                <h2>
                  Vehicle Details
                </h2>


                <p>

                  <strong>
                    SKU :
                  </strong>

                  {" "}

                  {
                    selectedVehicle
                      .sku
                  }

                </p>


                <p>

                  <strong>
                    Brand :
                  </strong>

                  {" "}

                  {
                    selectedVehicle
                      .brand
                  }

                </p>


                <p>

                  <strong>
                    Model :
                  </strong>

                  {" "}

                  {
                    selectedVehicle
                      .model
                  }

                </p>


                <p>

                  <strong>
                    Year :
                  </strong>

                  {" "}

                  {
                    selectedVehicle
                      .year
                  }

                </p>


                <p>

                  <strong>
                    Fuel :
                  </strong>

                  {" "}

                  {
                    selectedVehicle
                      .fuel
                  }

                </p>


                <button

                  className=
                    "close-modal-btn"

                  onClick={() =>

                    setShowModal(
                      false
                    )

                  }

                >

                  Close

                </button>


              </div>


            </div>

          )
        }


        {/* EDIT VEHICLE */}


        {
          showEditModal &&
          editVehicle && (

            <div

              className=
                "vehicle-modal-overlay"

              onClick={() =>

                setShowEditModal(
                  false
                )

              }

            >


              <div

                className=
                  "vehicle-modal"

                onClick={(event) =>

                  event.stopPropagation()

                }

              >


                <h2>
                  Edit Vehicle
                </h2>


                <input

                  type="text"

                  placeholder="SKU"

                  value={
                    editVehicle.sku
                  }

                  onChange={(event) =>

                    setEditVehicle({

                      ...editVehicle,

                      sku:
                        event
                          .target
                          .value,

                    })

                  }

                />


                <input

                  type="text"

                  placeholder="Brand"

                  value={
                    editVehicle.brand
                  }

                  onChange={(event) =>

                    setEditVehicle({

                      ...editVehicle,

                      brand:
                        event
                          .target
                          .value,

                    })

                  }

                />


                <input

                  type="text"

                  placeholder="Model"

                  value={
                    editVehicle.model
                  }

                  onChange={(event) =>

                    setEditVehicle({

                      ...editVehicle,

                      model:
                        event
                          .target
                          .value,

                    })

                  }

                />


                <input

                  type="number"

                  placeholder="Year"

                  value={
                    editVehicle.year
                  }

                  onChange={(event) =>

                    setEditVehicle({

                      ...editVehicle,

                      year:
                        event
                          .target
                          .value,

                    })

                  }

                />


                <select

                  value={
                    editVehicle.fuel
                  }

                  onChange={(event) =>

                    setEditVehicle({

                      ...editVehicle,

                      fuel:
                        event
                          .target
                          .value,

                    })

                  }

                >


                  <option value="Petrol">

                    Petrol

                  </option>


                  <option value="Diesel">

                    Diesel

                  </option>


                  <option value="Hybrid">

                    Hybrid

                  </option>


                  <option value="Electric">

                    Electric

                  </option>


                </select>
<input
  type="file"
  accept="image/*"
  onChange={(event) =>
    setEditVehicle({
      ...editVehicle,
      image: event.target.files[0],
    })
  }
/>
                <div className="edit-buttons">


                  <button

                    className="save-btn"

                    onClick={
                      saveVehicle
                    }

                  >

                    Save

                  </button>


                  <button

                    className=
                      "cancel-btn"

                    onClick={() =>

                      setShowEditModal(
                        false
                      )

                    }

                  >

                    Cancel

                  </button>


                </div>


              </div>


            </div>

          )
        }


        {/* ADD VEHICLE */}


        {
          showAddModal && (

            <div

              className=
                "vehicle-modal-overlay"

              onClick={() =>

                setShowAddModal(
                  false
                )

              }

            >


              <div

                className=
                  "vehicle-modal"

                onClick={(event) =>

                  event.stopPropagation()

                }

              >


                <h2>
                  Add New Vehicle
                </h2>


                <input

                  type="text"

                  placeholder="SKU"

                  value={
                    newVehicle.sku
                  }

                  onChange={(event) =>

                    setNewVehicle({

                      ...newVehicle,

                      sku:
                        event
                          .target
                          .value,

                    })

                  }

                />


                <input

                  type="text"

                  placeholder="Brand"

                  value={
                    newVehicle.brand
                  }

                  onChange={(event) =>

                    setNewVehicle({

                      ...newVehicle,

                      brand:
                        event
                          .target
                          .value,

                    })

                  }

                />


                <input

                  type="text"

                  placeholder="Model"

                  value={
                    newVehicle.model
                  }

                  onChange={(event) =>

                    setNewVehicle({

                      ...newVehicle,

                      model:
                        event
                          .target
                          .value,

                    })

                  }

                />


                <input

                  type="number"

                  placeholder="Year"

                  value={
                    newVehicle.year
                  }

                  onChange={(event) =>

                    setNewVehicle({

                      ...newVehicle,

                      year:
                        event
                          .target
                          .value,

                    })

                  }

                />


                <select

                  value={
                    newVehicle.fuel
                  }

                  onChange={(event) =>

                    setNewVehicle({

                      ...newVehicle,

                      fuel:
                        event
                          .target
                          .value,

                    })

                  }

                >


                  <option value="Petrol">

                    Petrol

                  </option>


                  <option value="Diesel">

                    Diesel

                  </option>


                  <option value="Hybrid">

                    Hybrid

                  </option>


                  <option value="Electric">

                    Electric

                  </option>


                </select>
<div className="file-upload">
  <input
    type="file"
    accept="image/*"
    onChange={(event) =>
      setNewVehicle({
        ...newVehicle,
        image: event.target.files[0],
      })
    }
  />
</div>

                <div className="edit-buttons">


                  <button

                    className="save-btn"

                    onClick={
                      addVehicle
                    }

                  >

                    Add Vehicle

                  </button>


                  <button

                    className=
                      "cancel-btn"

                    onClick={() =>

                      setShowAddModal(
                        false
                      )

                    }

                  >

                    Cancel

                  </button>


                </div>


              </div>


            </div>

          )
        }


        {/* DELETE VEHICLE */}


        {
          showDeleteModal && (

            <div

              className=
                "vehicle-modal-overlay"

              onClick={() =>

                setShowDeleteModal(
                  false
                )

              }

            >


              <div

                className=
                  "vehicle-modal"

                onClick={(event) =>

                  event.stopPropagation()

                }

              >


                <h2>
                  Delete Vehicle
                </h2>


                <p>

                  Are you sure you want
                  to delete this vehicle?

                </p>


                <div className="edit-buttons">


                  <button

                    className=
                      "delete-confirm-btn"

                    onClick={
                      deleteVehicle
                    }

                  >

                    Yes, Delete

                  </button>


                  <button

                    className=
                      "cancel-btn"

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

          )
        }


      </div>


    </div>

  );

}

export default ManageVehicles;