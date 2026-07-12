import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import "./ForgotPasswordPage.css";


function ForgotPasswordPage() {

  const navigate =
    useNavigate();


  const [formData, setFormData] =
    useState({

      email: "",

      newPassword: "",

      confirmPassword: "",

    });


  const [message, setMessage] =
    useState({

      show: false,

      text: "",

      type: "",

    });


  const showMessage = (
    text,
    type
  ) => {

    setMessage({

      show: true,

      text,

      type,

    });

  };


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    if (

      !formData.email ||

      !formData.newPassword ||

      !formData.confirmPassword

    ) {

      showMessage(

        "Please complete all required fields.",

        "error"

      );


      return;

    }


    if (

      formData.newPassword !==

      formData.confirmPassword

    ) {

      showMessage(

        "Passwords do not match.",

        "error"

      );


      return;

    }


    if (

      formData.newPassword.length < 6

    ) {

      showMessage(

        "Password must contain at least 6 characters.",

        "error"

      );


      return;

    }


    try {

      const response =
        await axios.put(

          "http://localhost:5000/api/auth/forgot-password",

          {

            email:
              formData.email,

            newPassword:
              formData.newPassword,

          }

        );


      showMessage(

        response.data.message,

        "success"

      );


      setTimeout(() => {

        navigate("/login");

      }, 2000);


    } catch (error) {

      showMessage(

        error.response
          ?.data
          ?.message ||

        "Password could not be reset.",

        "error"

      );

    }

  };


  return (

    <div className="forgot-page">


      {

        message.show && (

          <div

            className=
              "forgot-message-overlay"

          >


            <div

              className={

                `forgot-message-box ${message.type}`

              }

            >


              <div

                className=
                  "forgot-message-icon"

              >

                {

                  message.type ===
                  "success"

                    ? "✓"

                    : "!"

                }

              </div>


              <h3>

                {

                  message.type ===
                  "success"

                    ? "Password Updated"

                    : "Unable to Continue"

                }

              </h3>


              <p>

                {message.text}

              </p>


              {

                message.type ===
                "error" && (

                  <button

                    type="button"

                    onClick={() =>

                      setMessage({

                        show: false,

                        text: "",

                        type: "",

                      })

                    }

                  >

                    Try Again

                  </button>

                )

              }


            </div>


          </div>

        )

      }


      <div className="forgot-card">


        <h1>

          Forgot Password?

        </h1>


        <p className="forgot-description">

          Enter your registered email
          address and create a new
          password.

        </p>


        <form

          onSubmit={
            handleSubmit
          }

        >


          <div className="forgot-input-group">


            <label>

              Email Address

              <span> *</span>

            </label>


            <input

              type="email"

              name="email"

              placeholder=
                "Enter your registered email"

              value={
                formData.email
              }

              onChange={
                handleChange
              }

            />


          </div>


          <div className="forgot-input-group">


            <label>

              New Password

              <span> *</span>

            </label>


            <input

              type="password"

              name="newPassword"

              placeholder=
                "Enter your new password"

              value={
                formData.newPassword
              }

              onChange={
                handleChange
              }

            />


          </div>


          <div className="forgot-input-group">


            <label>

              Confirm New Password

              <span> *</span>

            </label>


            <input

              type="password"

              name="confirmPassword"

              placeholder=
                "Confirm your new password"

              value={
                formData.confirmPassword
              }

              onChange={
                handleChange
              }

            />


          </div>


          <button

            type="submit"

            className=
              "reset-password-btn"

          >

            Reset Password

          </button>


        </form>


        <Link

          to="/login"

          className=
            "back-login-link"

        >

          ← Back to Login

        </Link>


      </div>


    </div>

  );

}


export default ForgotPasswordPage;