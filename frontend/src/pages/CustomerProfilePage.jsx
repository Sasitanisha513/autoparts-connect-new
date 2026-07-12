import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import Header
  from "../components/Header";

import Footer
  from "../components/Footer";

import "./CustomerProfilePage.css";

import {
  FaUserCircle,
  FaCamera,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";


function CustomerProfilePage() {

  const navigate = useNavigate();


  // ==========================
  // PROFILE DETAILS
  // ==========================

  const [formData, setFormData] =
    useState({

      name: "",

      phone: "",

      email: "",

      address: "",

    });


  // ==========================
  // PROFILE IMAGE
  // ==========================

  const [profileImage, setProfileImage] =
    useState("");

  const [selectedImage, setSelectedImage] =
    useState(null);


  // ==========================
  // LOADING
  // ==========================

  const [loading, setLoading] =
    useState(true);


  // ==========================
  // PROFESSIONAL MESSAGE
  // ==========================

  const [message, setMessage] =
    useState({

      show: false,

      text: "",

      type: "success",

    });


  const showMessage = (
    text,
    type = "success"
  ) => {

    setMessage({

      show: true,

      text,

      type,

    });


    setTimeout(() => {

      setMessage({

        show: false,

        text: "",

        type: "success",

      });

    }, 2500);

  };


  // ==========================
  // GET LOGIN TOKEN
  // ==========================

  const token =
    localStorage.getItem("token");


  // ==========================
  // GET CUSTOMER PROFILE
  // ==========================

  useEffect(() => {

    const getProfile =
      async () => {


        if (!token) {

          navigate("/login");

          return;

        }


        try {

          const response =
            await axios.get(

              "http://localhost:5000/api/auth/profile",

              {

                headers: {

                  Authorization:
                    `Bearer ${token}`,

                },

              }

            );


          const user =
            response.data;


          setFormData({

            name:
              user.name || "",

            phone:
              user.phone || "",

            email:
              user.email || "",

            address:
              user.address || "",

          });


          if (
            user.profileImage
          ) {

            setProfileImage(

              `http://localhost:5000${user.profileImage}`

            );

          }


        } catch (error) {

          console.log(

            "Profile loading error:",

            error

          );


          if (
            error.response?.status
            === 401
          ) {

            localStorage.removeItem(
              "token"
            );

            localStorage.removeItem(
              "role"
            );


            navigate("/login");

          } else {

            showMessage(

              "Profile details could not be loaded.",

              "error"

            );

          }


        } finally {

          setLoading(false);

        }


      };


    getProfile();


  }, [
    navigate,
    token,
  ]);


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
  // SELECT PROFILE IMAGE
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

      showMessage(

        "Please select a JPG, PNG or WEBP image.",

        "error"

      );


      return;

    }


    setSelectedImage(
      file
    );


    setProfileImage(

      URL.createObjectURL(
        file
      )

    );

  };


  // ==========================
  // UPDATE PROFILE DETAILS
  // ==========================

  const handleUpdateProfile =
    async () => {


      if (
        !formData.name.trim()
        ||
        !formData.email.trim()
      ) {

        showMessage(

          "Name and email address are required.",

          "error"

        );


        return;

      }


      try {


        // Update profile details

        await axios.put(

          "http://localhost:5000/api/auth/profile",

          {

            name:
              formData.name,

            phone:
              formData.phone,

            email:
              formData.email,

            address:
              formData.address,

          },

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );


        // Upload new image only
        // when an image is selected

        if (
          selectedImage
        ) {


          const imageData =
            new FormData();


          imageData.append(

            "profileImage",

            selectedImage

          );


          const imageResponse =
            await axios.put(

              "http://localhost:5000/api/auth/profile/image",

              imageData,

              {

                headers: {

                  Authorization:
                    `Bearer ${token}`,

                },

              }

            );


          if (
            imageResponse
              .data
              .profileImage
          ) {

            setProfileImage(

              `http://localhost:5000${

                imageResponse
                  .data
                  .profileImage

              }`

            );

          }


          setSelectedImage(
            null
          );

        }


        showMessage(

          "Profile updated successfully.",

          "success"

        );


      } catch (error) {


        console.log(

          "Profile update error:",

          error

        );


        showMessage(

          error.response
            ?.data
            ?.message

          ||

          error.response
            ?.data
            ?.error

          ||

          "Profile could not be updated.",

          "error"

        );


      }

    };


  // ==========================
  // LOGOUT
  // ==========================

  const handleLogout = () => {


    localStorage.removeItem(
      "token"
    );


    localStorage.removeItem(
      "role"
    );


    localStorage.removeItem(
      "user"
    );


    navigate("/login");

  };


  return (

    <>

      <Header />


      {/* PROFESSIONAL MESSAGE */}

      {
        message.show && (

          <div
            className=
              "customer-message-overlay"
          >

            <div

              className={

                `customer-message-box ${message.type}`

              }

            >

              <div
                className=
                  "customer-message-icon"
              >

                {

                  message.type
                  === "success"

                    ? "✓"

                    : "!"

                }

              </div>


              <p>

                {message.text}

              </p>


            </div>

          </div>

        )
      }


      <div
        className=
          "customer-profile-page"
      >


        <div
          className=
            "customer-profile-container"
        >


          <div
            className=
              "customer-profile-header"
          >


            <h1>

              My Profile

            </h1>


            <p>

              Manage your personal
              information

            </p>


          </div>


          {
            loading

            ? (

              <div
                className=
                  "customer-profile-loading"
              >

                Loading profile...

              </div>

            )

            : (

              <div
                className=
                  "customer-profile-card"
              >


                {/* PROFILE IMAGE */}

                <div
                  className=
                    "customer-image-section"
                >


                  {
                    profileImage

                    ? (

                      <img

                        src={
                          profileImage
                        }

                        alt="Profile"

                        className=
                          "customer-profile-image"

                      />

                    )

                    : (

                      <FaUserCircle

                        className=
                          "customer-default-image"

                      />

                    )
                  }


                  <label

                    htmlFor=
                      "customerImage"

                    className=
                      "customer-upload-btn"

                  >

                    <FaCamera />

                    Change Photo

                  </label>


                  <input

                    id=
                      "customerImage"

                    type="file"

                    accept=
                      ".jpg,.jpeg,.png,.webp"

                    hidden

                    onChange={
                      handleImage
                    }

                  />


                </div>


                {/* PROFILE FORM */}

                <div
                  className=
                    "customer-form"
                >


                  <div
                    className=
                      "customer-input-group"
                  >


                    <label>

                      <FaUser />

                      Full Name

                    </label>


                    <input

                      type="text"

                      name="name"

                      value={
                        formData.name
                      }

                      onChange={
                        handleChange
                      }

                    />


                  </div>


                  <div
                    className=
                      "customer-input-group"
                  >


                    <label>

                      <FaPhoneAlt />

                      Phone Number

                    </label>


                    <input

                      type="text"

                      name="phone"

                      value={
                        formData.phone
                      }

                      onChange={
                        handleChange
                      }

                      placeholder=
                        "+94 77 123 4567"

                    />


                  </div>


                  <div
                    className=
                      "customer-input-group"
                  >


                    <label>

                      <FaEnvelope />

                      Email Address

                    </label>


                    <input

                      type="email"

                      name="email"

                      value={
                        formData.email
                      }

                      onChange={
                        handleChange
                      }

                    />


                  </div>


                  <div
                    className=
                      "customer-input-group"
                  >


                    <label>

                      <FaMapMarkerAlt />

                      Address

                    </label>


                    <textarea

                      rows="4"

                      name="address"

                      value={
                        formData.address
                      }

                      onChange={
                        handleChange
                      }

                      placeholder=
                        "Enter your address"

                    />


                  </div>


                  <div
                    className=
                      "customer-button-group"
                  >


                    <button

                      type="button"

                      className=
                        "customer-save-btn"

                      onClick={
                        handleUpdateProfile
                      }

                    >

                      Update Profile

                    </button>


                    <button

                      type="button"

                      className=
                        "customer-logout-btn"

                      onClick={
                        handleLogout
                      }

                    >

                      Logout

                    </button>


                  </div>


                </div>


              </div>

            )
          }


        </div>


      </div>


      <Footer />


    </>

  );

}


export default CustomerProfilePage;