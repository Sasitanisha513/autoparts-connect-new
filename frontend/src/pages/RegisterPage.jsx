import {
  FaCamera,
} from "react-icons/fa";

import "./RegisterPage.css";

import {
  useState,
} from "react";

import axios from "axios";

import {
  Link,
} from "react-router-dom";


function RegisterPage() {

    

  // ==========================
  // FORM DATA
  // ==========================

  const [
    formData,
    setFormData,
  ] = useState({

    name: "",

    username: "",

    email: "",

    phone: "",

    address: "",

    password: "",

    confirmPassword: "",

  });


  // ==========================
// PROFILE IMAGE PREVIEW
// ==========================

// Image preview URL
const [
  imagePreview,
  setImagePreview,
] = useState("");


// Selected actual image file
const [
  profileImage,
  setProfileImage,
] = useState(null);

  // ==========================
  // TERMS CHECKBOX
  // ==========================

  const [
    agreedToTerms,
    setAgreedToTerms,
  ] = useState(false);


  // ==========================
  // MESSAGE
  // ==========================

  const [
    message,
    setMessage,
  ] = useState({

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
  // HANDLE PROFILE IMAGE
  // ==========================

  const handleImage = (e) => {

    const file =

      e.target.files[0];


    if (!file) {

      return;

    }


    const allowedTypes = [

      "image/jpeg",

      "image/jpg",

      "image/png",

      "image/webp",

    ];


    if (

      !allowedTypes.includes(
        file.type
      )

    ) {

      setMessage({

        text:
          "Please select a JPG, PNG or WEBP image.",

        type:
          "error",

      });


      e.target.value = "";


      return;

    }
setProfileImage(
  file
);

    setImagePreview(

      URL.createObjectURL(
        file
      )

    );


    setMessage({

      text: "",

      type: "",

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

        !formData.username.trim()

        ||

        !formData.email.trim()

        ||

        !formData.phone.trim()

        ||

        !formData.address.trim()

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


      // Check password length

      if (

        formData.password.length
        < 6

      ) {

        setMessage({

          text:
            "Password must contain at least 6 characters.",

          type:
            "error",

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

        // Create FormData because
// an image file is being uploaded

const registerData =
  new FormData();


registerData.append(

  "name",

  formData.name.trim()

);


registerData.append(

  "username",

  formData.username.trim()

);


registerData.append(

  "email",

  formData.email
    .trim()
    .toLowerCase()

);


registerData.append(

  "password",

  formData.password

);


registerData.append(

  "phone",

  formData.phone.trim()

);


registerData.append(

  "address",

  formData.address.trim()

);


registerData.append(

  "role",

  "customer"

);


// Add profile picture
// only if an image was selected

if (profileImage) {

  registerData.append(

    "profileImage",

    profileImage

  );

}


const response =

  await axios.post(

    "http://localhost:5000/api/auth/register",

    registerData

  );


        setMessage({

          text:

            response.data.message

            ||

            "Your customer account was created successfully.",

          type:
            "success",

        });


        // Clear form

        setFormData({

          name: "",

          username: "",

          email: "",

          phone: "",

          address: "",

          password: "",

          confirmPassword: "",

        });


        setImagePreview("");
        setProfileImage(
  null
);


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


        <div className="register-header">

          <h1>

            Create an Account

          </h1>

          <p>

            Choose how you want to use
            AutoParts Connect

          </p>

        </div>


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


          <form
            onSubmit={
              handleSubmit
            }
          >


            {/* NAME AND USERNAME */}

            <div className="row">


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


              <div className="input-group">

                <label>

                  Username

                  <span> *</span>

                </label>


                <input

                  type="text"

                  name="username"

                  placeholder=
                    "Enter your username"

                  value={
                    formData.username
                  }

                  onChange={
                    handleChange
                  }

                  required

                />

              </div>


            </div>


            {/* EMAIL */}

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


            {/* PHONE AND IMAGE */}

            <div className="row">


              <div className="input-group">

                <label>

                  Phone

                  <span> *</span>

                </label>


                <input

                  type="text"

                  name="phone"

                  placeholder=
                    "Enter your contact number"

                  value={
                    formData.phone
                  }

                  onChange={
                    handleChange
                  }

                  required

                />

              </div>


              <div
                className=
                  "register-image-group"
              >


                <label>

                  Profile Picture

                </label>


                <label

                  htmlFor=
                    "profileImage"

                  className=
                    "register-image-upload"

                >


                  {

                    imagePreview

                      ? (

                        <img

                          src={
                            imagePreview
                          }

                          alt=
                            "Profile Preview"

                          className=
                            "register-image-preview"

                        />

                      )

                      : (

                        <div

                          className=
                            "register-upload-content"

                        >


                          <FaCamera />


                          <span>

                            Upload Profile Photo

                          </span>


                          <small>

                            JPG, PNG or WEBP

                          </small>


                        </div>

                      )

                  }


                </label>


                <input

                  id="profileImage"

                  type="file"

                  accept=
                    ".jpg,.jpeg,.png,.webp"

                  onChange={
                    handleImage
                  }

                  hidden

                />


              </div>


            </div>


            {/* ADDRESS */}

            <div className="input-group">

              <label>

                Address

                <span> *</span>

              </label>


              <input

                type="text"

                name="address"

                placeholder=
                  "Enter your address"

                value={
                  formData.address
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

                minLength="6"

                required

              />

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="input-group">

              <label>

                Confirm Password

                <span> *</span>

              </label>


              <input

                type="password"

                name=
                  "confirmPassword"

                placeholder=
                  "Confirm your password"

                value={
                  formData
                    .confirmPassword
                }

                onChange={
                  handleChange
                }

                minLength="6"

                required

              />

            </div>


            {/* TERMS */}

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


            {/* REGISTER BUTTON */}

            <button
              type="submit"
            >

              Create Account

            </button>


          </form>


          <div className="register-footer">


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