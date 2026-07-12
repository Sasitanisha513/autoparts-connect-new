import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import SupplierSidebar from "../components/SupplierSidebar";
import "./AddProductPage.css";

import {
  FaPlusCircle,
  FaUpload,
  FaSave,
  FaTimes,
} from "react-icons/fa";

function AddProductPage() {

  const navigate = useNavigate();

  // Selected image file
  const [image, setImage] = useState(null);

  // Image preview
  const [preview, setPreview] = useState("");

  // Professional message
  const [message, setMessage] = useState({
    show: false,
    text: "",
    type: "success",
  });

  // Product form details
  const [formData, setFormData] = useState({
    sku: "",
    partName: "",
    category: "",
    vehicle: "",
    brand: "",
    supplier: "",
    condition: "New",
    price: "",
    stock: "",
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

    }, 2000);

  };


  // ==========================
  // HANDLE IMAGE
  // ==========================

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Check image type
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

    // Save actual image file
    setImage(file);

    // Show selected image preview
    setPreview(
      URL.createObjectURL(file)
    );

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
  // SAVE PRODUCT TO MONGODB
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // Check required details

    if (
      !formData.sku ||
      !formData.partName ||
      !formData.category ||
      !formData.vehicle ||
      !formData.brand ||
      !formData.supplier ||
      formData.price === "" ||
      formData.stock === ""
    ) {

      showMessage(
        "Please complete all required product details.",
        "error"
      );

      return;

    }


    // Check image

    if (!image) {

      showMessage(
        "Please upload a product image.",
        "error"
      );

      return;

    }


    try {

      // FormData is required for image upload

      const productData =
        new FormData();


      productData.append(
        "sku",
        formData.sku
      );


      productData.append(
        "partName",
        formData.partName
      );


      productData.append(
        "category",
        formData.category
      );


      productData.append(
        "vehicle",
        formData.vehicle
      );


      productData.append(
        "brand",
        formData.brand
      );


      productData.append(
        "supplier",
        formData.supplier
      );


      productData.append(
        "condition",
        formData.condition
      );


      productData.append(
        "price",
        formData.price
      );


      productData.append(
        "stock",
        formData.stock
      );


      productData.append(
        "availability",
        Number(
          formData.stock
        ) > 0
      );


      productData.append(
        "description",
        formData.description
      );


      // Add actual image file

      productData.append(
        "image",
        image
      );


      // Send product and image
      // to the backend

      await axios.post(

        "http://localhost:5000/api/parts/add",

        productData

      );


      showMessage(
        "Product and image saved successfully.",
        "success"
      );


      // Go to inventory after
      // showing success message

      setTimeout(() => {

        navigate("/inventory");

      }, 2000);


    } catch (error) {

      console.log(
        "Product save error:",
        error
      );


      showMessage(

        error.response?.data?.message ||

        error.response?.data?.error ||

        "Product could not be saved.",

        "error"

      );

    }

  };


  return (

    <div className="add-product-page">


      {/* PROFESSIONAL MESSAGE */}

      {message.show && (

        <div className="product-message-overlay">

          <div

            className={
              `product-message-box ${message.type}`
            }

          >

            <div className="product-message-icon">

              {
                message.type === "success"

                  ? "✓"

                  : "!"
              }

            </div>


            <p>

              {message.text}

            </p>


          </div>

        </div>

      )}


      <SupplierSidebar />


      <div className="add-product-content">


        <div className="add-header">

          <h1>

            <FaPlusCircle />

            Add New Product

          </h1>


          <p>

            Fill the information below
            to add a new spare part.

          </p>

        </div>


        <form

          className="add-product-form"

          onSubmit={handleSubmit}

          encType="multipart/form-data"

        >


          <div className="top-section">


            <div className="image-upload">


              <label htmlFor="image">


                {preview ? (

                  <img

                    src={preview}

                    alt="Product Preview"

                  />

                ) : (

                  <div className="upload-box">


                    <FaUpload />


                    <p>

                      Upload Product Image

                    </p>


                    <small>

                      JPG, PNG or WEBP

                    </small>


                  </div>

                )}


              </label>


              <input

                id="image"

                type="file"

                accept=".jpg,.jpeg,.png,.webp"

                onChange={handleImage}

                hidden

              />


            </div>


            <div className="form-grid">


              <div className="form-group">

                <label>

                  SKU *

                </label>


                <input

                  type="text"

                  name="sku"

                  value={formData.sku}

                  onChange={handleChange}

                  placeholder="WM-2024-001"

                />

              </div>


              <div className="form-group">

                <label>

                  Part Name *

                </label>


                <input

                  type="text"

                  name="partName"

                  value={
                    formData.partName
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Brake Pad"

                />

              </div>


              <div className="form-group">

                <label>

                  Category *

                </label>


                <input

                  type="text"

                  name="category"

                  value={
                    formData.category
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Braking System"

                />

              </div>


              <div className="form-group">

                <label>

                  Vehicle *

                </label>


                <input

                  type="text"

                  name="vehicle"

                  value={
                    formData.vehicle
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="BMW 5 Series"

                />

              </div>


              <div className="form-group">

                <label>

                  Brand *

                </label>


                <input

                  type="text"

                  name="brand"

                  value={
                    formData.brand
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Bosch"

                />

              </div>


              <div className="form-group">

                <label>

                  Supplier *

                </label>


                <input

                  type="text"

                  name="supplier"

                  value={
                    formData.supplier
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="ABC Auto Parts"

                />

              </div>


              <div className="form-group">

                <label>

                  Condition

                </label>


                <select

                  name="condition"

                  value={
                    formData.condition
                  }

                  onChange={
                    handleChange
                  }

                >


                  <option value="New">

                    Brand New

                  </option>


                  <option value="Used">

                    Used

                  </option>


                </select>

              </div>


              <div className="form-group">

                <label>

                  Price (LKR) *

                </label>


                <input

                  type="number"

                  name="price"

                  min="0"

                  value={
                    formData.price
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="25000"

                />

              </div>


              <div className="form-group">

                <label>

                  Stock Quantity *

                </label>


                <input

                  type="number"

                  name="stock"

                  min="0"

                  value={
                    formData.stock
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="50"

                />

              </div>


            </div>


          </div>


          <div
            className=
              "form-group description-box"
          >


            <label>

              Description

            </label>


            <textarea

              rows="6"

              name="description"

              value={
                formData.description
              }

              onChange={
                handleChange
              }

              placeholder=
                "Enter product description..."

            />


          </div>


          <div className="button-group">


            <button

              type="button"

              className="cancel-btn"

              onClick={() =>

                navigate(
                  "/inventory"
                )

              }

            >


              <FaTimes />


              Cancel


            </button>


            <button

              type="submit"

              className="save-btn"

            >


              <FaSave />


              Save Product


            </button>


          </div>


        </form>


      </div>


    </div>

  );

}


export default AddProductPage;