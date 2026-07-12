import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import axios from "axios";

import SupplierSidebar
  from "../components/SupplierSidebar";

import "./EditProductPage.css";

import {
  FaEdit,
  FaUpload,
  FaSave,
  FaTimes,
} from "react-icons/fa";


function EditProductPage() {

  const navigate = useNavigate();

  const { id } = useParams();


  // ==========================
  // IMAGE STATES
  // ==========================

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");


  // ==========================
  // MESSAGE STATE
  // ==========================

  const [message, setMessage] =
    useState({

      show: false,

      text: "",

      type: "success",

    });


  // ==========================
  // PRODUCT FORM
  // ==========================

  const [formData, setFormData] =
    useState({

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
  // GET PRODUCT FROM MONGODB
  // ==========================

  useEffect(() => {

    const getProduct = async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/parts/${id}`

          );


        const product =
          response.data;


        setFormData({

          sku:
            product.sku || "",

          partName:
            product.partName || "",

          category:
            product.category || "",

          vehicle:
            product.vehicle || "",

          brand:
            product.brand || "",

          supplier:
            product.supplier || "",

          condition:
            product.condition || "New",

          price:
            product.price || "",

          stock:
            product.stock ?? "",

          description:
            product.description || "",

        });


        // Display current product image

        if (product.image) {

          if (
            product.image.startsWith(
              "/uploads/"
            )
          ) {

            setPreview(

              `http://localhost:5000${product.image}`

            );

          } else {

            setPreview(
              product.image
            );

          }

        }


      } catch (error) {

        console.log(

          "Product loading error:",

          error

        );


        showMessage(

          "Product details could not be loaded.",

          "error"

        );

      }

    };


    getProduct();


  }, [id]);


  // ==========================
  // HANDLE NEW IMAGE
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


    // Store actual image

    setImage(file);


    // Display new image preview

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
  // UPDATE PRODUCT
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (

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


    try {


      // Create FormData because
      // an image may be included

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


      // Add image only when
      // a new image is selected

      if (image) {

        productData.append(

          "image",

          image

        );

      }


      await axios.put(

        `http://localhost:5000/api/parts/${id}`,

        productData

      );


      showMessage(

        "Product updated successfully.",

        "success"

      );


      setTimeout(() => {

        navigate(
          "/inventory"
        );

      }, 2000);


    } catch (error) {


      console.log(

        "Product update error:",

        error

      );


      showMessage(

        error.response?.data?.message ||

        error.response?.data?.error ||

        "Product could not be updated.",

        "error"

      );

    }

  };


  return (

    <div className="add-product-page">


      {/* PROFESSIONAL MESSAGE */}

      {message.show && (

        <div
          className=
            "product-message-overlay"
        >


          <div

            className={

              `product-message-box ${message.type}`

            }

          >


            <div
              className=
                "product-message-icon"
            >

              {

                message.type ===
                "success"

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


      <div
        className=
          "add-product-content"
      >


        <div className="add-header">


          <h1>

            <FaEdit />

            Edit Product

          </h1>


          <p>

            Update your product
            information.

          </p>


        </div>


        <form

          className=
            "add-product-form"

          onSubmit={
            handleSubmit
          }

          encType=
            "multipart/form-data"

        >


          <div className="top-section">


            <div
              className=
                "image-upload"
            >


              <label
                htmlFor="image"
              >


                {preview ? (

                  <img

                    src={preview}

                    alt=
                      "Product Preview"

                  />

                ) : (

                  <div
                    className=
                      "upload-box"
                  >


                    <FaUpload />


                    <p>

                      Upload Product
                      Image

                    </p>


                  </div>

                )}


              </label>


              <input

                id="image"

                type="file"

                accept=
                  ".jpg,.jpeg,.png,.webp"

                onChange={
                  handleImage
                }

                hidden

              />


            </div>


            <div className="form-grid">


              <div className="form-group">


                <label>

                  SKU

                </label>


                <input

                  type="text"

                  name="sku"

                  value={
                    formData.sku
                  }

                  onChange={
                    handleChange
                  }

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


                  <option
                    value="New"
                  >

                    Brand New

                  </option>


                  <option
                    value="Used"
                  >

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

              rows="8"

              name="description"

              value={
                formData.description
              }

              onChange={
                handleChange
              }

            />


          </div>


          <div className="button-group">


            <button

              type="button"

              className=
                "cancel-btn"

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

              className=
                "save-btn"

            >


              <FaSave />


              Update Product


            </button>


          </div>


        </form>


      </div>


    </div>

  );

}


export default EditProductPage;