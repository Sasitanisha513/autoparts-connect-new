import "./AdminSidebar.css";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import {
  FaChartBar,
  FaTachometerAlt,
  FaStore,
  FaCar,
  FaCogs,
  FaUsers,
  FaShoppingBag,
  FaPowerOff,
  FaHome,
} from "react-icons/fa";


function AdminSidebar() {

  const navigate =
    useNavigate();


  // ==========================
  // LOGOUT MODAL STATE
  // ==========================

  const [
    showLogoutModal,
    setShowLogoutModal,
  ] = useState(false);


  // ==========================
  // ADMIN LOGOUT
  // ==========================

  const handleLogout = () => {

    // Remove saved login details

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    localStorage.removeItem(
      "user"
    );


    // Close popup

    setShowLogoutModal(
      false
    );


    // Go to Login page

    navigate("/login");

  };


  return (

    <>

      <div className="admin-sidebar">


        <div className="admin-logo">

          <h1>
            AutoParts
          </h1>

          <h3>
            Admin Dashboard
          </h3>

        </div>


        <ul className="admin-menu">


          <li>

            <Link
              to="/admin/dashboard"
            >

              <FaTachometerAlt />

              Dashboard

            </Link>

          </li>


          <li>

            <Link
              to="/admin/vendors"
            >

              <FaStore />

              Manage Vendors

            </Link>

          </li>


          <li>

            <Link
              to="/admin/vehicles"
            >

              <FaCar />

              Manage Vehicles

            </Link>

          </li>


          <li>

            <Link
              to="/admin/parts"
            >

              <FaCogs />

              Manage Parts

            </Link>

          </li>


          <li>

            <Link
              to="/admin/users"
            >

              <FaUsers />

              Manage Users

            </Link>

          </li>


          <li>

            <Link
              to="/admin/orders"
            >

              <FaShoppingBag />

              Orders

            </Link>

          </li>


          <li>

            <Link
              to="/admin/reports"
            >

              <FaChartBar />

              Reports

            </Link>

          </li>


          <li>

            <Link
              to="/"
            >

              <FaHome />

              Main Website

            </Link>

          </li>


        </ul>


        {/* LOGOUT BUTTON */}

        <div className="logout-section">


          <button

            type="button"

            className="logout-btn"

            onClick={() =>

              setShowLogoutModal(
                true
              )

            }

          >

            <FaPowerOff />

            Logout

          </button>


        </div>


      </div>


      {/* ==========================
          LOGOUT CONFIRMATION
      ========================== */}


      {

        showLogoutModal && (

          <div
            className=
              "admin-logout-overlay"
          >


            <div
              className=
                "admin-logout-modal"
            >


              <div
                className=
                  "admin-logout-icon"
              >

                <FaPowerOff />

              </div>


              <h2>

                Confirm Logout

              </h2>


              <p>

                Are you sure you want
                to log out of your
                admin account?

              </p>


              <div
                className=
                  "admin-logout-actions"
              >


                <button

                  type="button"

                  className=
                    "admin-logout-cancel"

                  onClick={() =>

                    setShowLogoutModal(
                      false
                    )

                  }

                >

                  Cancel

                </button>


                <button

                  type="button"

                  className=
                    "admin-logout-confirm"

                  onClick={
                    handleLogout
                  }

                >

                  Yes, Logout

                </button>


              </div>


            </div>


          </div>

        )

      }


    </>

  );

}


export default AdminSidebar;