import "./SupplierSidebar.css";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import {
  FaThLarge,
  FaBoxes,
  FaShoppingCart,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";


function SupplierSidebar() {

  const navigate =
    useNavigate();


  // ==========================
  // LOGOUT CONFIRMATION
  // ==========================

  const [
    showLogoutModal,
    setShowLogoutModal,
  ] = useState(false);


  // ==========================
  // CONFIRM LOGOUT
  // ==========================

  const handleLogout = () => {

    // Remove login information

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    localStorage.removeItem(
      "user"
    );


    // Close confirmation

    setShowLogoutModal(
      false
    );


    // Go to Login page

    navigate("/login");

  };


  return (

    <>

      <div className="supplier-sidebar">


        <div className="sidebar-top">


          <div className="sidebar-logo">

            <h1>
              AutoParts
            </h1>

            <p>
              Vendor Dashboard
            </p>

          </div>


          <ul className="sidebar-menu">


            <li>

              <NavLink

                to="/supplier-dashboard"

                className={
                  ({ isActive }) =>

                    isActive

                      ? "menu-link active"

                      : "menu-link"

                }

              >

                <FaThLarge
                  className="menu-icon"
                />

                <span>
                  Dashboard
                </span>

              </NavLink>

            </li>


            <li>

              <NavLink

                to="/inventory"

                className={
                  ({ isActive }) =>

                    isActive

                      ? "menu-link active"

                      : "menu-link"

                }

              >

                <FaBoxes
                  className="menu-icon"
                />

                <span>
                  Inventory
                </span>

              </NavLink>

            </li>


            <li>

              <NavLink

                to="/orders"

                className={
                  ({ isActive }) =>

                    isActive

                      ? "menu-link active"

                      : "menu-link"

                }

              >

                <FaShoppingCart
                  className="menu-icon"
                />

                <span>
                  Orders
                </span>

              </NavLink>

            </li>


            <li>

              <NavLink

                to="/profile"

                className={
                  ({ isActive }) =>

                    isActive

                      ? "menu-link active"

                      : "menu-link"

                }

              >

                <FaUserCircle
                  className="menu-icon"
                />

                <span>
                  Profile
                </span>

              </NavLink>

            </li>


          </ul>


        </div>


        <div className="sidebar-bottom">


          <button

            type="button"

            className="logout-btn"

            onClick={() =>

              setShowLogoutModal(
                true
              )

            }

          >

            <FaSignOutAlt />

            <span>
              Logout
            </span>

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
              "vendor-logout-overlay"
          >


            <div
              className=
                "vendor-logout-modal"
            >


              <div
                className=
                  "vendor-logout-icon"
              >

                <FaSignOutAlt />

              </div>


              <h2>

                Confirm Logout

              </h2>


              <p>

                Are you sure you want
                to log out of your
                vendor account?

              </p>


              <div
                className=
                  "vendor-logout-actions"
              >


                <button

                  type="button"

                  className=
                    "vendor-logout-cancel"

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
                    "vendor-logout-confirm"

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


export default SupplierSidebar;