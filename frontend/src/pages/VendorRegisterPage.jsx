import { useState } from "react";
import { Link } from "react-router-dom";
import "./VendorRegisterPage.css";
import axios from "axios";

import {
  FaEye,
  FaEyeSlash,
  FaUpload,
} from "react-icons/fa";

function VendorRegisterPage() {

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [preview, setPreview] = useState("");
  // Selected vendor profile image

const [
  profileImage,
  setProfileImage,
] = useState(null);

  const [message, setMessage] = useState({
  text: "",
  type: "",
});

  const [formData, setFormData] = useState({

    businessName: "",

    registrationNo: "",

    businessAddress: "",

    outletLocation: "",

    fullName: "",

    email: "",

    phone: "",

    nic: "",

    password: "",

    confirmPassword: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

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


  // Save actual image file

  setProfileImage(
    file
  );


  // Show image preview

  setPreview(

    URL.createObjectURL(
      file
    )

  );


  setMessage({

    text: "",

    type: "",

  });

};

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Check whether passwords match
  if (formData.password !== formData.confirmPassword) {
setMessage({
  text: "Passwords do not match.",
  type: "error",
});    return;
  }

  try {
   // Create FormData because
// the profile image is a file

const vendorData =
  new FormData();


vendorData.append(

  "name",

  formData.fullName.trim()

);


vendorData.append(

  "email",

  formData.email
    .trim()
    .toLowerCase()

);


vendorData.append(

  "password",

  formData.password

);


vendorData.append(

  "role",

  "vendor"

);


vendorData.append(

  "businessName",

  formData.businessName.trim()

);


vendorData.append(

  "registrationNo",

  formData.registrationNo.trim()

);


vendorData.append(

  "businessAddress",

  formData.businessAddress.trim()

);


vendorData.append(

  "outletLocation",

  formData.outletLocation

);


vendorData.append(

  "phone",

  formData.phone.trim()

);


vendorData.append(

  "nic",

  formData.nic.trim()

);


// Add profile picture
// only when a picture was selected

if (profileImage) {

  vendorData.append(

    "profileImage",

    profileImage

  );

}


const response =

  await axios.post(

    "http://localhost:5000/api/auth/register",

    vendorData

  );

   setMessage({
  text: "Vendor account created successfully. Please wait for admin approval.",
  type: "success",
});

  } catch (error) {
   setMessage({
  text:
    error.response?.data?.message ||
    error.response?.data?.error ||
    "Vendor registration failed.",
  type: "error",
});
  }
};
   return (
  <>
    {message.text && (
      <div className={`register-message ${message.type}`}>
        <span>
          {message.type === "success" ? "✓" : "!"}
        </span>

        <p>{message.text}</p>

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
    )}

    <div className="vendor-register-page">
      <div className="vendor-register-container">

        <div className="vendor-register-header">

          <h1>Register as a Vendor</h1>

          <p>
            Join AutoParts Connect and start selling your spare parts online.
          </p>

        </div>

        <form
          className="vendor-register-form"
          onSubmit={handleSubmit}
        >

          <h2>Sign Up</h2>

          <p className="login-text">

            Already have an account?

            <Link to="/login">
  Login Here
</Link>

          </p>

          <div className="form-grid">

            <div className="form-group">

              <label>Business Name *</label>

              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Enter your business name"
              />

            </div>

            <div className="form-group">

              <label>Business Registration No *</label>

              <input
                type="text"
                name="registrationNo"
                value={formData.registrationNo}
                onChange={handleChange}
                placeholder="Enter registration number"
              />

            </div>

            <div className="form-group full-width">

              <label>Business Address *</label>

              <input
                type="text"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
                placeholder="Enter business address"
              />

            </div>

            <div className="form-group full-width">
<label>
  Outlet Location <span>*</span>
</label>

<select
  name="outletLocation"
  value={formData.outletLocation}
  onChange={handleChange}
  required
>
  <option value="">
    Select Outlet Location
  </option>

  <option value="Ampara">Ampara</option>
  <option value="Anuradhapura">Anuradhapura</option>
  <option value="Badulla">Badulla</option>
  <option value="Batticaloa">Batticaloa</option>
  <option value="Colombo">Colombo</option>
  <option value="Galle">Galle</option>
  <option value="Gampaha">Gampaha</option>
  <option value="Hambantota">Hambantota</option>
  <option value="Jaffna">Jaffna</option>
  <option value="Kalutara">Kalutara</option>
  <option value="Kandy">Kandy</option>
  <option value="Kegalle">Kegalle</option>
  <option value="Kilinochchi">Kilinochchi</option>
  <option value="Kurunegala">Kurunegala</option>
  <option value="Mannar">Mannar</option>
  <option value="Matale">Matale</option>
  <option value="Matara">Matara</option>
  <option value="Monaragala">Monaragala</option>
  <option value="Mullaitivu">Mullaitivu</option>
  <option value="Nuwara Eliya">Nuwara Eliya</option>
  <option value="Polonnaruwa">Polonnaruwa</option>
  <option value="Puttalam">Puttalam</option>
  <option value="Ratnapura">Ratnapura</option>
  <option value="Trincomalee">Trincomalee</option>
  <option value="Vavuniya">Vavuniya</option>
</select>
            </div>

            <div className="form-group">

              <label>Full Name *</label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />

            </div>

            <div className="form-group">

              <label>Email Address *</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />

            </div>

            <div className="form-group">

              <label>Phone *</label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter contact number"
              />

            </div>

            <div className="form-group">

              <label>Profile Picture</label>

           <div className="profile-upload">

  <label
    htmlFor="vendorImage"
    className="upload-btn-small"
  >
    <FaUpload />
    Upload Photo
  </label>

  <input
    id="vendorImage"
    type="file"
accept=".jpg,.jpeg,.png,.webp"    onChange={handleImage}
    hidden
  />

  {preview ? (
  <img
    src={preview}
    alt="Preview"
    className="preview-small"
  />
) : (
  <div className="preview-empty"></div>
)}

</div>

            </div>

            <div className="form-group full-width">

              <label>NIC Number *</label>

              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                placeholder="Enter NIC Number"
              />

            </div>
                        <div className="form-group password-group">

              <label>Password *</label>

              <div className="password-input">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />

                <span
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </span>

              </div>

            </div>

            <div className="form-group password-group">

              <label>Confirm Password *</label>

              <div className="password-input">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                />

                <span
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </span>

              </div>

            </div>

          </div>

          <div className="terms-box">

            <input
              type="checkbox"
              id="terms"
            />

            <label htmlFor="terms">
              I agree to the Terms &
              Conditions and Privacy Policy.
            </label>

          </div>

          <button
            type="submit"
            className="register-btn"
          >
            Register as Vendor
          </button>
          <div className="register-footer">

  <p>

    By creating an account you agree to our

    <span> Terms & Conditions </span>

    and

    <span> Privacy Policy</span>

  </p>

</div>

        </form>

      </div>

    </div>
  </>
  );

}

export default VendorRegisterPage;