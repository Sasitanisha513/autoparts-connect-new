import "./ManageVendors.css";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import AdminSidebar
  from "../../components/admin/AdminSidebar";

import {
  FaCheck,
  FaTimes,
  FaExclamation,
} from "react-icons/fa";


function ManageVendors() {

  const [
    vendors,
    setVendors,
  ] = useState([]);


  const [
    selectedVendor,
    setSelectedVendor,
  ] = useState(null);


  const [
    showModal,
    setShowModal,
  ] = useState(false);


  const [
    search,
    setSearch,
  ] = useState("");


  const [
    filter,
    setFilter,
  ] = useState("All");


  // ==========================
  // PROFESSIONAL MESSAGE
  // ==========================

  const [
    message,
    setMessage,
  ] = useState({

    show: false,

    type: "",

    title: "",

    text: "",

  });


  // ==========================
  // SHOW MESSAGE
  // ==========================

  const showMessage = (
    type,
    title,
    text
  ) => {

    setMessage({

      show: true,

      type,

      title,

      text,

    });

  };


  // ==========================
  // CLOSE MESSAGE
  // ==========================

  const closeMessage = () => {

    setMessage({

      show: false,

      type: "",

      title: "",

      text: "",

    });

  };


  // ==========================
  // GET PENDING VENDORS
  // ==========================

  useEffect(() => {

    const getPendingVendors =
      async () => {

        try {

          const response =
            await axios.get(

             "http://localhost:5000/api/admin/vendors"

            );


          const formattedVendors =

            response.data.map(

              (vendor) => ({

                id:
                  vendor._id,


                business:

                  vendor.businessName ||

                  "Not provided",


                owner:

                  vendor.name ||

                  "Not provided",


                email:

                  vendor.email,


                phone:

                  vendor.phone ||

                  "Not provided",


                status:

                  vendor.approvalStatus

                    ? vendor
                        .approvalStatus
                        .charAt(0)
                        .toUpperCase() +

                      vendor
                        .approvalStatus
                        .slice(1)

                    : "Pending",


                registrationNo:

                  vendor
                    .registrationNo ||

                  "Not provided",


                businessAddress:

                  vendor
                    .businessAddress ||

                  "Not provided",


                outletLocation:

                  vendor
                    .outletLocation ||

                  "Not provided",


                nic:

                  vendor.nic ||

                  "Not provided",

              })

            );


          setVendors(

            formattedVendors

          );


        } catch (error) {

          console.error(

            "Error loading vendors:",

            error

          );


          showMessage(

            "error",

            "Unable to Load Vendors",

            "Vendor information could not be loaded. Please make sure the backend server is running."

          );

        }

      };


    getPendingVendors();


  }, []);


  // ==========================
  // SEARCH AND FILTER
  // ==========================

  const filteredVendors =

    vendors.filter(

      (vendor) => {


        const matchesSearch =

          vendor.business

            .toLowerCase()

            .includes(

              search.toLowerCase()

            )

          ||

          vendor.owner

            .toLowerCase()

            .includes(

              search.toLowerCase()

            )

          ||

          vendor.email

            .toLowerCase()

            .includes(

              search.toLowerCase()

            );


        const matchesFilter =

          filter === "All"

          ||

          vendor.status ===
            filter;


        return (

          matchesSearch

          &&

          matchesFilter

        );

      }

    );


 // ==========================
// APPROVE VENDOR
// ==========================

const approveVendor = async (id) => {

  try {

    const response = await axios.put(

      `http://localhost:5000/api/admin/approve-vendor/${id}`

    );


    // Change vendor status
    // without removing the vendor

    setVendors((previousVendors) =>

      previousVendors.map((vendor) =>

        vendor.id === id

          ? {

              ...vendor,

              status: "Approved",

            }

          : vendor

      )

    );


    showMessage(

      "success",

      "Vendor Approved",

      response.data.message ||

      "The vendor account has been approved successfully. The vendor can now log in to the Vendor Dashboard."

    );


  } catch (error) {

    showMessage(

      "error",

      "Approval Failed",

      error.response
        ?.data
        ?.message

      ||

      "The vendor account could not be approved. Please try again."

    );

  }

};


 // ==========================
// REJECT VENDOR
// ==========================

const rejectVendor = async (id) => {

  try {

    const response = await axios.put(

      `http://localhost:5000/api/admin/reject-vendor/${id}`

    );


    // Change vendor status
    // without removing the vendor

    setVendors((previousVendors) =>

      previousVendors.map((vendor) =>

        vendor.id === id

          ? {

              ...vendor,

              status: "Rejected",

            }

          : vendor

      )

    );


    showMessage(

      "success",

      "Vendor Rejected",

      response.data.message ||

      "The vendor application has been rejected successfully."

    );


  } catch (error) {

    showMessage(

      "error",

      "Rejection Failed",

      error.response
        ?.data
        ?.message

      ||

      "The vendor application could not be rejected. Please try again."

    );

  }

};

  // ==========================
  // OPEN VENDOR DETAILS
  // ==========================

  const viewVendor = (
    vendor
  ) => {

    setSelectedVendor(

      vendor

    );


    setShowModal(

      true

    );

  };


  return (

    <div
      className=
        "manage-vendors"
    >


      <AdminSidebar />


      <div
        className=
          "vendors-content"
      >


        <div
          className=
            "vendors-header"
        >


          <div>


            <h1>

              Manage Vendors

            </h1>


            <p>

              Approve, reject and
              manage registered
              vendors.

            </p>


          </div>


        </div>


        <div
          className=
            "vendors-toolbar"
        >


          <input

            type="text"

            placeholder=
              "Search vendors..."

            value={
              search
            }

            onChange={
              (e) =>

                setSearch(

                  e.target.value

                )
            }

          />


          <select

            value={
              filter
            }

            onChange={
              (e) =>

                setFilter(

                  e.target.value

                )
            }

          >


            <option>

              All

            </option>


            <option>

              Pending

            </option>


            <option>

              Approved

            </option>


            <option>

              Rejected

            </option>


          </select>


        </div>


        <table
          className=
            "vendors-table"
        >


          <thead>


            <tr>


              <th>
                Business
              </th>


              <th>
                Owner
              </th>


              <th>
                Email
              </th>


              <th>
                Phone
              </th>


              <th>
                Status
              </th>


              <th>
                Actions
              </th>


            </tr>


          </thead>


          <tbody>


            {

              filteredVendors
                .length > 0

                ? (


                  filteredVendors

                    .map(

                      (
                        vendor
                      ) => (


                        <tr
                          key={
                            vendor.id
                          }
                        >


                          <td>

                            {
                              vendor
                                .business
                            }

                          </td>


                          <td>

                            {
                              vendor
                                .owner
                            }

                          </td>


                          <td>

                            {
                              vendor
                                .email
                            }

                          </td>


                          <td>

                            {
                              vendor
                                .phone
                            }

                          </td>


                          <td>


                            <span

                              className={

                                `status-badge ${

                                  vendor

                                    .status

                                    .toLowerCase()

                                }`

                              }

                            >


                              {
                                vendor
                                  .status
                              }


                            </span>


                          </td>


                          <td>


                            <button

                              type=
                                "button"

                              className=
                                "approve-btn"

                              onClick={
                                () =>

                                  approveVendor(

                                    vendor.id

                                  )
                              }

                            >


                              Approve


                            </button>


                            <button

                              type=
                                "button"

                              className=
                                "reject-btn"

                              onClick={
                                () =>

                                  rejectVendor(

                                    vendor.id

                                  )
                              }

                            >


                              Reject


                            </button>


                            <button

                              type=
                                "button"

                              className=
                                "view-btn"

                              onClick={
                                () =>

                                  viewVendor(

                                    vendor

                                  )
                              }

                            >


                              View


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


                      No pending
                      vendors found.


                    </td>


                  </tr>


                )

            }


          </tbody>


        </table>


        {/* =====================
            VENDOR DETAILS
        ====================== */}


        {

          showModal

          &&

          selectedVendor

          && (


            <div

              className=
                "vendor-modal-overlay"

              onClick={
                () =>

                  setShowModal(

                    false

                  )
              }

            >


              <div

                className=
                  "vendor-modal"

                onClick={
                  (e) =>

                    e
                      .stopPropagation()
                }

              >


                <h2>

                  Vendor Details

                </h2>


                <p>

                  <strong>
                    Business :
                  </strong>

                  {" "}

                  {
                    selectedVendor
                      .business
                  }

                </p>


                <p>

                  <strong>
                    Owner :
                  </strong>

                  {" "}

                  {
                    selectedVendor
                      .owner
                  }

                </p>


                <p>

                  <strong>
                    Email :
                  </strong>

                  {" "}

                  {
                    selectedVendor
                      .email
                  }

                </p>


                <p>

                  <strong>
                    Phone :
                  </strong>

                  {" "}

                  {
                    selectedVendor
                      .phone
                  }

                </p>


                <p>

                  <strong>

                    Registration No :

                  </strong>

                  {" "}

                  {
                    selectedVendor
                      .registrationNo
                  }

                </p>


                <p>

                  <strong>

                    Business Address :

                  </strong>

                  {" "}

                  {
                    selectedVendor
                      .businessAddress
                  }

                </p>


                <p>

                  <strong>

                    Outlet Location :

                  </strong>

                  {" "}

                  {
                    selectedVendor
                      .outletLocation
                  }

                </p>


                <p>

                  <strong>

                    NIC Number :

                  </strong>

                  {" "}

                  {
                    selectedVendor
                      .nic
                  }

                </p>


                <p>

                  <strong>
                    Status :
                  </strong>

                  {" "}

                  {
                    selectedVendor
                      .status
                  }

                </p>


                <button

                  type="button"

                  className=
                    "close-modal-btn"

                  onClick={
                    () =>

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


      </div>


      {/* =====================
          PROFESSIONAL MESSAGE
      ====================== */}


      {

        message.show

        && (


          <div

            className=
              "vendor-message-overlay"

          >


            <div

              className={

                `vendor-message-modal ${

                  message.type

                }`

              }

            >


              <div

                className=
                  "vendor-message-icon"

              >


                {

                  message.type
                    === "success"

                    ? (

                      <FaCheck />

                    )

                    : (

                      <FaExclamation />

                    )

                }


              </div>


              <h2>

                {
                  message.title
                }

              </h2>


              <p>

                {
                  message.text
                }

              </p>


              <button

                type="button"

                onClick={
                  closeMessage
                }

              >


                Done


              </button>


              <span

                className=
                  "vendor-message-close"

                onClick={
                  closeMessage
                }

              >


                <FaTimes />


              </span>


            </div>


          </div>


        )

      }


    </div>

  );

}


export default ManageVendors;