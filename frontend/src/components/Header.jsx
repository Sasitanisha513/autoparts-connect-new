import "./Header.css";

import {
  Link,
  NavLink,
} from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";

function Header() {

  // ==========================
  // LANGUAGE
  // ==========================

  const {
    language,
    changeLanguage,
    t,
  } = useLanguage();


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
    t("login");

  let buttonPath =
    "/login";


  if (
    token &&
    role === "customer"
  ) {

    buttonText =
      t("profile");

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


      {/* ==========================
          LOGO
      ========================== */}

      <div className="logo">

        <Link
          to="/"
          className="logo-link"
        >

          AutoParts

        </Link>

      </div>


      {/* ==========================
          NAVIGATION
      ========================== */}

      <nav>

        <ul className="nav-links">


          {/* HOME */}

          <li>

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "active"
                  : ""
              }
            >

              {t("home")}

            </NavLink>

          </li>


          {/* PARTS */}

          <li>

            <NavLink
              to="/parts"
              className={({ isActive }) =>
                isActive
                  ? "active"
                  : ""
              }
            >

              {t("spareParts")}

            </NavLink>

          </li>


          {/* ABOUT */}

          <li>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "active"
                  : ""
              }
            >

              {t("about")}

            </NavLink>

          </li>


          {/* BLOG */}

          <li>

            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? "active"
                  : ""
              }
            >

              {t("blog")}

            </NavLink>

          </li>


          {/* CUSTOMER MY ORDERS */}

          {token &&
            role === "customer" && (

              <li>

                <NavLink
                  to="/my-orders"
                  className={({ isActive }) =>
                    isActive
                      ? "active"
                      : ""
                  }
                >

                  {t("myOrders")}

                </NavLink>

              </li>

            )}


          {/* CONTACT */}

          <li>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "active"
                  : ""
              }
            >

              {t("contact")}

            </NavLink>

          </li>


        </ul>

      </nav>


      {/* ==========================
          RIGHT SIDE
      ========================== */}

      <div className="header-right">


        {/* ==========================
            LANGUAGE SELECTOR
        ========================== */}

        <div className="language-selector">

          <button
            type="button"
            className={
              language === "si"
                ? "language-active"
                : ""
            }
            onClick={() =>
              changeLanguage("si")
            }
          >

            සිංහල

          </button>


          <button
            type="button"
            className={
              language === "ta"
                ? "language-active"
                : ""
            }
            onClick={() =>
              changeLanguage("ta")
            }
          >

            தமிழ்

          </button>


          <button
            type="button"
            className={
              language === "en"
                ? "language-active"
                : ""
            }
            onClick={() =>
              changeLanguage("en")
            }
          >

            English

          </button>

        </div>


        {/* ==========================
            ROLE BASED BUTTON
        ========================== */}

        <Link
          to={buttonPath}
          className="login-btn-link"
        >

          <button
            type="button"
            className="login-btn"
          >

            {buttonText}

          </button>

        </Link>


      </div>


    </header>

  );

}

export default Header;