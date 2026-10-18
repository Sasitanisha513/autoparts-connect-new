import "./LoginPage.css";
import { useState } from "react";
import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function LoginPage() {

  const navigate = useNavigate();
const [
  showPassword,
  setShowPassword,
] = useState(false);

  const [showSignupModal, setShowSignupModal] = useState(false);

  const [formData, setFormData] = useState({

   

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
localStorage.setItem(
  "userId",
  response.data.userId
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
  className="signup-link"
  onClick={() => setShowSignupModal(true)}
>
  {" "}
  Sign Up Here
</span>
</p>


          {/* LOGIN FORM */}


          <form

            onSubmit={
              handleSubmit
            }

          >


            {/* ACCOUNT TYPE */}


            


           

              
               

            

      



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


            <div className="password-input-wrapper">

  <input

    type={
      showPassword
        ? "text"
        : "password"
    }

    name="password"

    placeholder="Enter your password"

    value={
      formData.password
    }

    onChange={
      handleChange
    }

    required

  />


  <button

    type="button"

    className="password-eye-btn"

    onClick={() =>

      setShowPassword(
        !showPassword
      )

    }

  >

    {

      showPassword

        ? <FaEyeSlash />

        : <FaEye />

    }

  </button>

</div>



          
{/* LOGIN OPTIONS */}
<div className="login-options">
  <label className="terms-checkbox">
    <input
      type="checkbox"
      required
    />

    <span className="terms-checkbox-text">
      I agree to the{" "}
      <b>Terms &amp; Policy</b>
    </span>
  </label>

  <Link
    to="/forgot-password"
    className="forgot-password-link"
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

{/* SIGNUP MODAL */}
{showSignupModal && (
  <div
    className="modal-overlay"
    onClick={() => setShowSignupModal(false)}
  >
    <div
      className="signup-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Create an Account</h2>

      <p>Please select your account type</p>

      <button
        className="signup-btn customer-btn"
        onClick={() => {
          setShowSignupModal(false);
          navigate("/register");
        }}
      >
        Customer Registration
      </button>

      <button
        className="signup-btn vendor-btn"
        onClick={() => {
          setShowSignupModal(false);
          navigate("/vendor-register");
        }}
      >
        Vendor Registration
      </button>

      <button
        className="close-btn"
        onClick={() => setShowSignupModal(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}

    </>

  );

}


export default LoginPage;