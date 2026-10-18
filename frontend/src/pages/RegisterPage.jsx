import "./RegisterPage.css";

import {
  useState,
} from "react";

import axios from "axios";

import {
  Link,
} from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";


function RegisterPage() {

  // ==========================
  // SHOW / HIDE PASSWORD
  // ==========================

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);


  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);


  // ==========================
  // FORM DATA

  const [
    formData,
    setFormData,
  ] = useState({

    name: "",

    email: "",

    password: "",

    confirmPassword: "",

  });


  // ==========================
  // TERMS CHECKBOX
  // ==========================

  const [
    agreedToTerms,
    setAgreedToTerms,
  ] = useState(false);


  // ==========================
  // SUCCESS / ERROR MESSAGE
  // ==========================

  const [
    message,
    setMessage,
  ] = useState({

    text: "",

    type: "",

  });

  // ==========================
// STRONG PASSWORD VALIDATION
// ==========================

const isStrongPassword = (password) => {

  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_\-])[A-Za-z\d@$!%*?&.#^()_\-]{8,}$/;

  return strongPassword.test(password);

};

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
  // CUSTOMER REGISTER
  // ==========================

  const handleSubmit =
    async (e) => {

      e.preventDefault();


      // Check required fields

      if (

        !formData.name.trim()

        ||

        !formData.email.trim()

        ||

        !formData.password

        ||

        !formData.confirmPassword

      ) {

        setMessage({

          text:
            "Please complete all required fields.",

          type:
            "error",

        });


        return;

      }


      // Check strong password

if (!isStrongPassword(formData.password)) {

  setMessage({

    text:
      "Password must be at least 8 characters and include one uppercase letter, one lowercase letter, one number and one special character.",

    type: "error",

  });

  return;

}

      // Check matching passwords

      if (

        formData.password

        !==

        formData.confirmPassword

      ) {

        setMessage({

          text:
            "Passwords do not match.",

          type:
            "error",

        });


        return;

      }


      // Check terms

      if (!agreedToTerms) {

        setMessage({

          text:
            "Please agree to the Terms and Policy.",

          type:
            "error",

        });


        return;

      }


      try {

        // Send only the required
        // customer registration details

        const response =

          await axios.post(

            "http://localhost:5000/api/auth/register",

            {

              name:
                formData.name
                  .trim(),

              email:
                formData.email
                  .trim()
                  .toLowerCase(),

              password:
                formData.password,

              role:
                "customer",

            }

          );


        // Show success message

        setMessage({

          text:

            response.data.message

            ||

            "Your customer account was created successfully.",

          type:
            "success",

        });


        // Clear registration form

        setFormData({

          name: "",

          email: "",

          password: "",

          confirmPassword: "",

        });


        // Clear terms checkbox

        setAgreedToTerms(
          false
        );


      } catch (error) {


        console.log(

          "Registration error:",

          error

        );


        console.log(

          "Backend response:",

          error.response?.data

        );


        setMessage({

          text:

            error.response
              ?.data
              ?.message

            ||

            error.response
              ?.data
              ?.error

            ||

            "Registration failed. Please make sure the backend server is running.",

          type:
            "error",

        });

      }

    };


  return (

    <>

      {/* ==========================
          SUCCESS / ERROR MESSAGE
      ========================== */}

      {

        message.text && (

          <div

            className={

              `register-message ${

                message.type

              }`

            }

          >


            <span>

              {

                message.type
                === "success"

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


      <div className="register-page">


        {/* PAGE HEADING */}

        <div className="register-header">

          <h1>

            Create an Account

          </h1>

          <p>

            Create your AutoParts
            customer account

          </p>

        </div>


        {/* REGISTER CARD */}

        <div className="register-card">


          <h2>

            Sign Up

          </h2>


          <p className="login-text">

            Do you already have an
            account?{" "}


            <Link

              to="/login"

              className="login-link"

            >

              Log In Here

            </Link>

          </p>


          {/* REGISTER FORM */}

          <form

            onSubmit={
              handleSubmit
            }

          >


            {/* CUSTOMER NAME */}

            <div className="input-group">

              <label>

                Name

                <span> *</span>

              </label>


              <input

                type="text"

                name="name"

                placeholder=
                  "Enter your name"

                value={
                  formData.name
                }

                onChange={
                  handleChange
                }

                required

              />

            </div>


            {/* EMAIL ADDRESS */}

            <div className="input-group">

              <label>

                Email Address

                <span> *</span>

              </label>


              <input

                type="email"

                name="email"

                placeholder=
                  "Enter your email address"

                value={
                  formData.email
                }

                onChange={
                  handleChange
                }

                required

              />

            </div>


            {/* PASSWORD */}

            <div className="input-group">

              <label>

                Password

                <span> *</span>

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

    minLength="6"

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
<small className="password-hint">
  Password must contain at least 8 characters, one uppercase letter,
  one lowercase letter, one number and one special character.
</small>
            </div>


            {/* CONFIRM PASSWORD */}

            <div className="input-group">

              <label>

                Confirm Password

                <span> *</span>

              </label>

<div className="password-input-wrapper">

  <input

    type={
      showConfirmPassword
        ? "text"
        : "password"
    }

    name="confirmPassword"

    placeholder="Confirm your password"

    value={
      formData.confirmPassword
    }

    onChange={
      handleChange
    }

    minLength="6"

    required

  />


  <button

    type="button"

    className="password-eye-btn"

    onClick={() =>

      setShowConfirmPassword(
        !showConfirmPassword
      )

    }

  >

    {
      showConfirmPassword

        ? <FaEyeSlash />

        : <FaEye />
    }

  </button>

</div>
            </div>


            {/* TERMS AND POLICY */}

            <div className="checkbox-area">


              <label>


                <input

                  type="checkbox"

                  checked={
                    agreedToTerms
                  }

                  onChange={(e) =>

                    setAgreedToTerms(

                      e.target.checked

                    )

                  }

                />


                I agree to the{" "}


                <b>

                  Term & Policy

                </b>


              </label>


            </div>


            {/* CREATE ACCOUNT */}

            <button

              type="submit"

            >

              Create Account

            </button>


          </form>


          {/* REGISTER FOOTER */}

          <div

            className=
              "register-footer"

          >


            <p>

              By clicking the
              "Create Account" button,
              you create an

              <strong>

                {" "}
                AutoParts Connect
                {" "}

              </strong>

              account, and you agree to

            </p>


            <p>


              <strong>

                AutoParts Connect's

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


export default RegisterPage;