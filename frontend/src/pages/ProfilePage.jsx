import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import SupplierSidebar
  from "../components/SupplierSidebar";

import "./ProfilePage.css";

import {
  FaUserCircle,
  FaCamera,
  FaSave,
} from "react-icons/fa";


function ProfilePage() {

  // ==========================
  // PROFILE IMAGE
  // ==========================

  const [
    profileImage,
    setProfileImage,
  ] = useState("");


  const [
    selectedImage,
    setSelectedImage,
  ] = useState(null);


  // ==========================
  // MESSAGE
  // ==========================

  const [
    message,
    setMessage,
  ] = useState({

    show: false,

    text: "",

    type: "success",

  });


  // ==========================
  // VENDOR DETAILS
  // ==========================

  const [
    formData,
    setFormData,
  ] = useState({

    businessName: "",

    ownerName: "",

    email: "",

    phone: "",

    registrationNo: "",

    nic: "",

    businessAddress: "",

    outletLocation: "",

    description: "",

  });


  // ==========================
  // PROFESSIONAL MESSAGE
  // ==========================

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

    }, 2200);

  };


  // ==========================
  // GET VENDOR PROFILE
  // ==========================

  useEffect(() => {

    const getProfile =
      async () => {

        try {

          const token =

            localStorage.getItem(
              "token"
            );


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


          const vendor =

            response.data;


          setFormData({

            businessName:

              vendor.businessName
              || "",

            ownerName:

              vendor.name
              || "",

            email:

              vendor.email
              || "",

            phone:

              vendor.phone
              || "",

            registrationNo:

              vendor.registrationNo
              || "",

            nic:

              vendor.nic
              || "",

            businessAddress:

              vendor.businessAddress
              || "",

            outletLocation:

              vendor.outletLocation
              || "",

            description:

              vendor.description
              || "",

          });


          if (
            vendor.profileImage
          ) {

            setProfileImage(

              `http://localhost:5000${vendor.profileImage}`

            );

          }


        } catch (error) {

          console.log(

            "Vendor profile loading error:",

            error

          );


          showMessage(

            error.response
              ?.data
              ?.message

            ||

            "Vendor profile could not be loaded.",

            "error"

          );

        }

      };


    getProfile();


  }, []);


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
  // UPDATE VENDOR PROFILE
  // ==========================

  const handleSubmit =
    async (e) => {

      e.preventDefault();


      if (

        !formData.businessName ||

        !formData.ownerName ||

        !formData.email

      ) {

        showMessage(

          "Please complete the required profile details.",

          "error"

        );


        return;

      }


      try {

        const token =

          localStorage.getItem(
            "token"
          );


        // Update profile details

        await axios.put(

          "http://localhost:5000/api/auth/profile",

          {

            businessName:

              formData.businessName,

            name:

              formData.ownerName,

            email:

              formData.email,

            phone:

              formData.phone,

            registrationNo:

              formData.registrationNo,

            nic:

              formData.nic,

            businessAddress:

              formData.businessAddress,

            outletLocation:

              formData.outletLocation,

            description:

              formData.description,

          },

          {

            headers: {

              Authorization:

                `Bearer ${token}`,

            },

          }

        );


        // Update profile image
        // only if a new image
        // was selected

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


          setProfileImage(

            `http://localhost:5000${

              imageResponse
                .data
                .profileImage

            }`

          );


          setSelectedImage(
            null
          );

        }


        showMessage(

          "Vendor profile updated successfully.",

          "success"

        );


      } catch (error) {

        console.log(

          "Vendor profile update error:",

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

          "Vendor profile could not be updated.",

          "error"

        );

      }

    };


  return (

    <div className="profile-page">


      {/* PROFESSIONAL MESSAGE */}

      {

        message.show && (

          <div
            className=
              "vendor-profile-message-overlay"
          >


            <div

              className={

                `vendor-profile-message ${

                  message.type

                }`

              }

            >


              <div
                className=
                  "vendor-profile-message-icon"
              >

                {

                  message.type
                  === "success"

                    ? "✓"

                    : "!"

                }

              </div>


              <h2>

                {

                  message.type
                  === "success"

                    ? "Profile Updated"

                    : "Unable to Update"

                }

              </h2>


              <p>

                {message.text}

              </p>


            </div>


          </div>

        )

      }


      <SupplierSidebar />


      <div className="profile-content">


        <div className="profile-header">


          <h1>

            <FaUserCircle
              className="header-icon"
            />

            Vendor Profile

          </h1>


          <p>

            Manage your business
            information and account
            settings.

          </p>


        </div>


        <form

          className="profile-form"

          onSubmit={
            handleSubmit
          }

        >


          <div
            className=
              "profile-image-section"
          >


            <label
              htmlFor="profileImage"
            >


              {

                profileImage

                  ? (

                    <img

                      src={
                        profileImage
                      }

                      alt=
                        "Vendor Profile"

                      className=
                        "profile-image"

                    />

                  )

                  : (

                    <div
                      className=
                        "profile-placeholder"
                    >

                      <FaUserCircle />

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


            <button

              type="button"

              className=
                "change-photo-btn"

              onClick={() =>

                document
                  .getElementById(
                    "profileImage"
                  )
                  .click()

              }

            >

              <FaCamera />

              Change Photo

            </button>


          </div>


          <div className="profile-grid">


            <div className="form-group">

              <label>
                Business Name *
              </label>

              <input

                type="text"

                name=
                  "businessName"

                value={
                  formData
                    .businessName
                }

                onChange={
                  handleChange
                }

              />

            </div>


            <div className="form-group">

              <label>
                Owner Name *
              </label>

              <input

                type="text"

                name="ownerName"

                value={
                  formData
                    .ownerName
                }

                onChange={
                  handleChange
                }

              />

            </div>


            <div className="form-group">

              <label>
                Email *
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


            <div className="form-group">

              <label>
                Phone
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

              />

            </div>


            <div className="form-group">

              <label>
                Registration Number
              </label>

              <input

                type="text"

                name=
                  "registrationNo"

                value={
                  formData
                    .registrationNo
                }

                onChange={
                  handleChange
                }

              />

            </div>


            <div className="form-group">

              <label>
                NIC
              </label>

              <input

                type="text"

                name="nic"

                value={
                  formData.nic
                }

                onChange={
                  handleChange
                }

              />

            </div>


            <div
              className=
                "form-group full-width"
            >

              <label>
                Business Address
              </label>

              <input

                type="text"

                name=
                  "businessAddress"

                value={
                  formData
                    .businessAddress
                }

                onChange={
                  handleChange
                }

              />

            </div>


            <div
              className=
                "form-group full-width"
            >

              <label>
                Outlet Location
              </label>

              <input

                type="text"

                name=
                  "outletLocation"

                value={
                  formData
                    .outletLocation
                }

                onChange={
                  handleChange
                }

              />

            </div>


            <div
              className=
                "form-group full-width"
            >

              <label>

                Business Description

              </label>


              <textarea

                rows="6"

                name="description"

                value={
                  formData
                    .description
                }

                onChange={
                  handleChange
                }

              />

            </div>


          </div>


          <div className="profile-buttons">


            <button

              type="submit"

              className=
                "save-profile-btn"

            >

              <FaSave />

              Save Changes

            </button>


          </div>


        </form>


      </div>


    </div>

  );

}


export default ProfilePage;