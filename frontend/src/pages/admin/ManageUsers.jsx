import "./ManageUsers.css";

import {
  useEffect,
  useState,
} from "react";

import AdminSidebar
  from "../../components/admin/AdminSidebar";


function ManageUsers() {

  // ==========================
  // USERS
  // ==========================

  const [
    users,
    setUsers,
  ] = useState([]);


  const [
    search,
    setSearch,
  ] = useState("");


  const [
    loading,
    setLoading,
  ] = useState(true);


  // ==========================
  // VIEW USER
  // ==========================

  const [
    selectedUser,
    setSelectedUser,
  ] = useState(null);


  const [
    showViewModal,
    setShowViewModal,
  ] = useState(false);


  // ==========================
  // EDIT USER
  // ==========================

  const [
    editUser,
    setEditUser,
  ] = useState(null);


  const [
    showEditModal,
    setShowEditModal,
  ] = useState(false);


  // ==========================
  // DELETE USER
  // ==========================

  const [
    deleteUserId,
    setDeleteUserId,
  ] = useState(null);


  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);


  // ==========================
  // SUCCESS / ERROR MESSAGE
  // ==========================

  const [
    toast,
    setToast,
  ] = useState({

    show: false,

    message: "",

    type: "",

  });


  // ==========================
  // SHOW MESSAGE
  // ==========================

  const showToast = (
    message,
    type
  ) => {

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
  // LOAD CUSTOMERS
  // ==========================

  const fetchUsers =
    async () => {

      try {

        setLoading(true);


        const response =
          await fetch(

            "http://localhost:5000/api/admin/users"

          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(

            data.message

            ||

            "Unable to load customers."

          );

        }


        setUsers(data);


      } catch (error) {

        console.error(

          "Customer loading error:",

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
  // LOAD WHEN PAGE OPENS
  // ==========================

  useEffect(() => {

    fetchUsers();

  }, []);


  // ==========================
  // SEARCH CUSTOMERS
  // ==========================

  const filteredUsers =

    users.filter((user) => {

      const searchText =

        search
          .toLowerCase();


      return (

        (user.name || "")

          .toLowerCase()

          .includes(searchText)

        ||

        (user.email || "")

          .toLowerCase()

          .includes(searchText)

        ||

        (user._id || "")

          .toLowerCase()

          .includes(searchText)

      );

    });


  // ==========================
  // FORMAT USER ID
  // ==========================

  const getUserId = (
    user
  ) => {

    if (!user?._id) {

      return "N/A";

    }


    return (

      "U-" +

      user._id
        .slice(-6)
        .toUpperCase()

    );

  };


  // ==========================
  // FORMAT JOINED DATE
  // ==========================

  const formatDate = (
    date
  ) => {

    if (!date) {

      return "N/A";

    }


    return new Date(

      date

    ).toLocaleDateString();

  };


  // ==========================
  // OPEN VIEW MODAL
  // ==========================

  const viewUser = (
    user
  ) => {

    setSelectedUser(user);

    setShowViewModal(true);

  };


  // ==========================
  // OPEN EDIT MODAL
  // ==========================

  const openEditModal = (
    user
  ) => {

    setEditUser({

      ...user,

      status:

        user.status

        ||

        "Active",

    });


    setShowEditModal(true);

  };


  // ==========================
  // UPDATE CUSTOMER
  // ==========================

  const saveUser =
    async () => {

      try {

        if (

          !editUser.name
            .trim()

          ||

          !editUser.email
            .trim()

        ) {

          showToast(

            "Name and email are required.",

            "error"

          );


          return;

        }


        const response =

          await fetch(

            `http://localhost:5000/api/admin/users/${editUser._id}`,

            {

              method:
                "PUT",


              headers: {

                "Content-Type":
                  "application/json",

              },


              body:
                JSON.stringify({

                  name:

                    editUser.name
                      .trim(),

                  email:

                    editUser.email
                      .trim()
                      .toLowerCase(),

                  status:

                    editUser.status,

                }),

            }

          );


        const data =

          await response.json();


        if (!response.ok) {

          throw new Error(

            data.message

            ||

            "Customer update failed."

          );

        }


        setUsers(

          (previousUsers) =>

            previousUsers.map(

              (user) =>

                user._id
                ===
                editUser._id

                  ?

                  data.user

                  :

                  user

            )

        );


        setShowEditModal(
          false
        );


        setEditUser(
          null
        );


        showToast(

          data.message

          ||

          "Customer account updated successfully.",

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
  // OPEN DELETE MODAL
  // ==========================

  const openDeleteModal = (
    id
  ) => {

    setDeleteUserId(id);

    setShowDeleteModal(
      true
    );

  };


  // ==========================
  // DELETE CUSTOMER
  // ==========================

  const deleteUser =
    async () => {

      try {

        const response =

          await fetch(

            `http://localhost:5000/api/admin/users/${deleteUserId}`,

            {

              method:
                "DELETE",

            }

          );


        const data =

          await response.json();


        if (!response.ok) {

          throw new Error(

            data.message

            ||

            "Customer deletion failed."

          );

        }


        setUsers(

          (previousUsers) =>

            previousUsers.filter(

              (user) =>

                user._id

                !==

                deleteUserId

            )

        );


        setShowDeleteModal(
          false
        );


        setDeleteUserId(
          null
        );


        showToast(

          data.message

          ||

          "Customer account deleted successfully.",

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

    <div className="manage-users">


      <AdminSidebar />


      {/* =====================
          TOAST MESSAGE
      ===================== */}

      {

        toast.show && (

          <div

            className={

              `admin-toast ${

                toast.type

              }`

            }

          >


            <div

              className=
                "toast-icon"

            >

              {

                toast.type
                === "success"

                  ? "✓"

                  : "!"

              }

            </div>


            <div

              className=
                "toast-content"

            >


              <strong>

                {

                  toast.type
                  === "success"

                    ? "Success"

                    : "Error"

                }

              </strong>


              <p>

                {toast.message}

              </p>


            </div>


            <button

              type="button"

              className=
                "toast-close"

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

        )

      }


      <div

        className=
          "users-content"

      >


        {/* PAGE HEADING */}

        <div

          className=
            "users-header"

        >


          <div>


            <h1>

              User Account
              Management

            </h1>


            <p>

              View and manage
              customer accounts
              registered on the
              platform.

            </p>


          </div>


        </div>


        {/* SEARCH */}

        <div

          className=
            "users-toolbar"

        >


          <input

            type="text"

            placeholder=
              "Search customers..."

            value={
              search
            }

            onChange={(e) =>

              setSearch(

                e.target.value

              )

            }

          />


        </div>


        {/* USERS TABLE */}

        <table

          className=
            "users-table"

        >


          <thead>


            <tr>


              <th>
                User ID
              </th>


              <th>
                Name
              </th>


              <th>
                Email
              </th>


              <th>
                Joined Date
              </th>


              <th>
                Status
              </th>


              <th>
                Action
              </th>


            </tr>


          </thead>


          <tbody>


            {

              loading

                ? (

                  <tr>


                    <td

                      colSpan="6"

                    >

                      Loading
                      customers...

                    </td>


                  </tr>

                )

                :

                filteredUsers
                  .length
                === 0

                  ? (

                    <tr>


                      <td

                        colSpan="6"

                      >

                        No customer
                        accounts
                        found.

                      </td>


                    </tr>

                  )

                  :

                  filteredUsers.map(

                    (user) => (

                      <tr

                        key={
                          user._id
                        }

                      >


                        <td>

                          {

                            getUserId(
                              user
                            )

                          }

                        </td>


                        <td>

                          {

                            user.name

                          }

                        </td>


                        <td>

                          {

                            user.email

                          }

                        </td>


                        <td>

                          {

                            formatDate(

                              user.createdAt

                            )

                          }

                        </td>


                        <td>


                          <span

                            className={

                              `user-status ${

                                (

                                  user.status

                                  ||

                                  "Active"

                                )

                                  .toLowerCase()

                              }`

                            }

                          >

                            {

                              user.status

                              ||

                              "Active"

                            }

                          </span>


                        </td>


                        <td

                          className=
                            "action-buttons"

                        >


                          <button

                            className=
                              "view-btn"

                            onClick={() =>

                              viewUser(
                                user
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
                                user
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

                                user._id

                              )

                            }

                          >

                            Delete

                          </button>


                        </td>


                      </tr>

                    )

                  )

            }


          </tbody>


        </table>


        {/* =====================
            VIEW USER MODAL
        ===================== */}

        {

          showViewModal

          &&

          selectedUser

          && (

            <div

              className=
                "vehicle-modal-overlay"

              onClick={() =>

                setShowViewModal(
                  false
                )

              }

            >


              <div

                className=
                  "vehicle-modal"

                onClick={(e) =>

                  e.stopPropagation()

                }

              >


                <h2>

                  Customer Details

                </h2>


                <p>

                  <strong>

                    User ID:

                  </strong>

                  {" "}

                  {

                    getUserId(

                      selectedUser

                    )

                  }

                </p>


                <p>

                  <strong>

                    Name:

                  </strong>

                  {" "}

                  {

                    selectedUser
                      .name

                  }

                </p>


                <p>

                  <strong>

                    Email:

                  </strong>

                  {" "}

                  {

                    selectedUser
                      .email

                  }

                </p>


                <p>

                  <strong>

                    Phone:

                  </strong>

                  {" "}

                  {

                    selectedUser
                      .phone

                    ||

                    "Not added"

                  }

                </p>


                <p>

                  <strong>

                    Address:

                  </strong>

                  {" "}

                  {

                    selectedUser
                      .address

                    ||

                    "Not added"

                  }

                </p>


                <p>

                  <strong>

                    Joined Date:

                  </strong>

                  {" "}

                  {

                    formatDate(

                      selectedUser
                        .createdAt

                    )

                  }

                </p>


                <p>

                  <strong>

                    Status:

                  </strong>

                  {" "}

                  {

                    selectedUser
                      .status

                    ||

                    "Active"

                  }

                </p>


                <button

                  className=
                    "close-modal-btn"

                  onClick={() =>

                    setShowViewModal(
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


        {/* =====================
            EDIT USER MODAL
        ===================== */}

        {

          showEditModal

          &&

          editUser

          && (

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

                onClick={(e) =>

                  e.stopPropagation()

                }

              >


                <h2>

                  Edit Customer

                </h2>


                <label>

                  Name

                </label>


                <input

                  type="text"

                  value={

                    editUser.name

                    ||

                    ""

                  }

                  onChange={(e) =>

                    setEditUser({

                      ...editUser,

                      name:

                        e.target
                          .value,

                    })

                  }

                />


                <label>

                  Email

                </label>


                <input

                  type="email"

                  value={

                    editUser.email

                    ||

                    ""

                  }

                  onChange={(e) =>

                    setEditUser({

                      ...editUser,

                      email:

                        e.target
                          .value,

                    })

                  }

                />


                <label>

                  Account Status

                </label>


                <select

                  value={

                    editUser.status

                    ||

                    "Active"

                  }

                  onChange={(e) =>

                    setEditUser({

                      ...editUser,

                      status:

                        e.target
                          .value,

                    })

                  }

                >


                  <option

                    value="Active"

                  >

                    Active

                  </option>


                  <option

                    value="Suspended"

                  >

                    Suspended

                  </option>


                </select>


                <div

                  className=
                    "edit-buttons"

                >


                  <button

                    className=
                      "save-btn"

                    onClick={
                      saveUser
                    }

                  >

                    Save Changes

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


        {/* =====================
            DELETE USER MODAL
        ===================== */}

        {

          showDeleteModal

          && (

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

                onClick={(e) =>

                  e.stopPropagation()

                }

              >


                <h2>

                  Delete Customer

                </h2>


                <p>

                  Are you sure you
                  want to permanently
                  delete this customer
                  account?

                </p>


                <div

                  className=
                    "edit-buttons"

                >


                  <button

                    className=
                      "delete-confirm-btn"

                    onClick={
                      deleteUser
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


export default ManageUsers;