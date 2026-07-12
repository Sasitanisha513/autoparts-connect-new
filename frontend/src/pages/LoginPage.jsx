import "./LoginPage.css";
import { useState } from "react";
import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";


function LoginPage() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({

    role: "customer",

    email: "",

    password: "",

  });


  const [message, setMessage] = useState({

    text: "",

    type: "",

  });


  // ==========================
  // HANDLE INPUT CHANGES
  // ==========================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };


  // ==========================
  // HANDLE LOGIN
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      const response =
        await axios.post(

          "http://localhost:5000/api/auth/login",

          {

            email:
              formData.email,

            password:
              formData.password,

            role:
              formData.role,

          }

        );


      // Save login details

      localStorage.setItem(

        "token",

        response.data.token

      );


      localStorage.setItem(

        "role",

        response.data.role

      );


      // Show success message

      setMessage({

        text:
          response.data.message,

        type:
          "success",

      });


      // Navigate according
      // to account type

      if (
        response.data.role ===
        "admin"
      ) {

        navigate(
          "/admin/dashboard"
        );

      }

      else if (
        response.data.role ===
        "vendor"
      ) {

        navigate(
          "/supplier-dashboard"
        );

      }

      else {

        navigate("/");

      }


    }

    catch (error) {

      setMessage({

        text:

          error.response
            ?.data
            ?.message

          ||

          "Login failed. Please try again.",

        type:
          "error",

      });

    }

  };


  return (

    <>


      {/* ======================
          SIMPLE TOP BAR
      ====================== */}


      <div className="auth-topbar">


        {/* AUTOPARTS LOGO */}


        <Link

          to="/"

          className="auth-logo"

        >

          AutoParts

        </Link>


        {/* BACK TO HOME */}


        <Link

          to="/"

          className="back-home-btn"

        >

          ← Back to Home

        </Link>


      </div>



      {/* ======================
          LOGIN PAGE
      ====================== */}


      <div className="login-page">


        {/* WELCOME SECTION */}


        <div className="welcome">


          <h1>

            Welcome Back

          </h1>


          <p>

            Log in to continue

          </p>


        </div>



        {/* LOGIN CARD */}


        <div className="login-card">


          <h2>

            Log In

          </h2>



          {/* SUCCESS / ERROR
              MESSAGE */}


          {

            message.text && (

              <div

                className={

                  `login-message ${message.type}`

                }

              >


                <span>

                  {

                    message.type ===
                    "success"

                      ? "✓"

                      : "!"

                  }

                </span>


                <p>

                  {message.text}

                </p>


                <button

                  type="button"

                  onClick={() =>

                    setMessage({

                      text: "",

                      type: "",

                    })

                  }

                >

                  ×

                </button>


              </div>

            )

          }



          {/* SIGN-UP LINK */}


          <p className="signup-text">


            New Member?


            <span

              onClick={() => {


                if (

                  formData.role ===
                  "vendor"

                ) {

                  navigate(

                    "/vendor-register"

                  );

                }


                else if (

                  formData.role ===
                  "admin"

                ) {

                  alert(

                    "Admin accounts cannot be registered."

                  );

                }


                else {

                  navigate(

                    "/register"

                  );

                }


              }}

            >

              {" "}

              Signup Here

            </span>


          </p>



          {/* LOGIN FORM */}


          <form

            onSubmit={
              handleSubmit
            }

          >


            {/* ACCOUNT TYPE */}


            <label>

              Account Type

              <span>

                *

              </span>

            </label>


            <select

              name="role"

              value={
                formData.role
              }

              onChange={
                handleChange
              }

            >


              <option

                value="customer"

              >

                Customer

              </option>


              <option

                value="vendor"

              >

                Vendor

              </option>


              <option

                value="admin"

              >

                Admin

              </option>


            </select>



            {/* EMAIL */}


            <label>

              Email

              <span>

                *

              </span>

            </label>


            <input

              type="email"

              name="email"

              placeholder=
                "Enter your email"

              value={
                formData.email
              }

              onChange={
                handleChange
              }

              required

            />



            {/* PASSWORD */}


            <label>

              Password

              <span>

                *

              </span>

            </label>


            <input

              type="password"

              name="password"

              placeholder=
                "Enter your password"

              value={
                formData.password
              }

              onChange={
                handleChange
              }

              required

            />



            {/* LOGIN OPTIONS */}


            <div

              className=
                "login-options"

            >


              <label>


                <input

                  type="checkbox"

                />


                I agree to the{" "}


                <b>

                  Term & Policy

                </b>


              </label>



              <Link

                to=
                  "/forgot-password"

                className=
                  "forgot-password-link"

              >

                Forgotten Password

              </Link>


            </div>



            {/* LOGIN BUTTON */}


            <button

              type="submit"

            >

              Log In

            </button>


          </form>



          {/* TERMS SECTION */}


          <div

            className="terms"

          >


            <p>


              By clicking the

              {" "}

              ‘Log In’

              {" "}

              button, you create an


              <strong>

                {" "}

                AutoParts Connect

                {" "}

              </strong>


              account, and you agree to


            </p>


            <p>


              <strong>

                AutoParts Connect’s

              </strong>


              <span>

                {" "}

                Terms & Conditions

                {" "}

              </span>


              &


              <span>

                {" "}

                Privacy Policy

              </span>


            </p>


          </div>


        </div>


      </div>


    </>

  );

}


export default LoginPage;