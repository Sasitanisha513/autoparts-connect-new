import "./Header.css";

import {
  Link,
  NavLink,
} from "react-router-dom";


function Header() {

  // ==========================
  // GET LOGIN DETAILS
  // ==========================

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");


  // ==========================
  // HEADER BUTTON DETAILS
  // ==========================

  let buttonText =
    "Log In";

  let buttonPath =
    "/login";


  if (
    token &&
    role === "customer"
  ) {

    buttonText =
      "My Profile";

    buttonPath =
      "/customer-profile";

  }


  if (
    token &&
    role === "vendor"
  ) {

    buttonText =
      "Vendor Dashboard";

    buttonPath =
      "/supplier-dashboard";

  }


  if (
    token &&
    role === "admin"
  ) {

    buttonText =
      "Admin Dashboard";

    buttonPath =
      "/admin/dashboard";

  }


  return (

    <header className="header">


      {/* LOGO */}

      <div className="logo">

        <Link
          to="/"
          className="logo-link"
        >

          AutoParts

        </Link>

      </div>


      {/* NAVIGATION */}

      <nav>

        <ul className="nav-links">


          <li>

            <NavLink

              to="/"

              className={
                ({ isActive }) =>

                  isActive
                    ? "active"
                    : ""

              }

            >

              Home

            </NavLink>

          </li>


          <li>

            <NavLink

              to="/about"

              className={
                ({ isActive }) =>

                  isActive
                    ? "active"
                    : ""

              }

            >

              About

            </NavLink>

          </li>


          <li>

            <NavLink

              to="/parts"

              className={
                ({ isActive }) =>

                  isActive
                    ? "active"
                    : ""

              }

            >

              Parts

            </NavLink>

          </li>


          <li>

            <NavLink

              to="/blog"

              className={
                ({ isActive }) =>

                  isActive
                    ? "active"
                    : ""

              }

            >

              Blogs

            </NavLink>

          </li>


          <li>

            <NavLink

              to="/contact"

              className={
                ({ isActive }) =>

                  isActive
                    ? "active"
                    : ""

              }

            >

              Contact

            </NavLink>

          </li>


        </ul>

      </nav>


      {/* ROLE-BASED BUTTON */}

      <Link
        to={buttonPath}
      >

        <button
          className="login-btn"
        >

          {buttonText}

        </button>

      </Link>


    </header>

  );

}


export default Header;