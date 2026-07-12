import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import axios from "axios";

import Header from "../components/Header";

import "./PartDetailsPage.css";


function PartDetailsPage() {

  const { id } = useParams();

  const navigate = useNavigate();


  // ==========================
  // PRODUCT STATE
  // ==========================

  const [part, setPart] =
    useState(null);


  // ==========================
  // LOADING STATE
  // ==========================

  const [loading, setLoading] =
    useState(true);


  // ==========================
  // ERROR STATE
  // ==========================

  const [error, setError] =
    useState("");


  // ==========================
  // GET PRODUCT FROM MONGODB
  // ==========================

  useEffect(() => {

    const getPartDetails =
      async () => {

        try {

          setLoading(true);

          setError("");


          const response =
            await axios.get(

              `http://localhost:5000/api/parts/${id}`

            );


          setPart(
            response.data
          );


        } catch (error) {

          console.log(

            "Part loading error:",

            error

          );


          setError(

            error.response?.data?.message ||

            "Product details could not be loaded."

          );


        } finally {

          setLoading(false);

        }

      };


    getPartDetails();


  }, [id]);


  // ==========================
  // IMAGE URL
  // ==========================

  const getImageUrl = (
    image
  ) => {

    if (!image) {

      return "";

    }


    // New uploaded images

    if (
      image.startsWith(
        "/uploads/"
      )
    ) {

      return (

        `http://localhost:5000${image}`

      );

    }


    // Full image URL

    if (

      image.startsWith(
        "http://"
      )

      ||

      image.startsWith(
        "https://"
      )

    ) {

      return image;

    }


    return image;

  };


  // ==========================
  // LOADING PAGE
  // ==========================

  if (loading) {

    return (

      <>

        <Header />


        <div className="details-page">

          <h2>

            Loading product details...

          </h2>

        </div>

      </>

    );

  }


  // ==========================
  // PRODUCT NOT FOUND
  // ==========================

  if (
    error ||
    !part
  ) {

    return (

      <>

        <Header />


        <div className="details-page">

          <h2>

            Part Not Found

          </h2>


          <p>

            {
              error ||
              "This product is unavailable."
            }

          </p>


          <Link to="/parts">

            ← Back to Parts

          </Link>

        </div>

      </>

    );

  }


  // ==========================
  // PRODUCT AVAILABILITY
  // ==========================

  const isAvailable =

    part.availability !== false

    &&

    Number(
      part.stock
    ) > 0;


  return (

    <>

      <Header />


      <div className="details-page">


        {/* BREADCRUMB */}

        <div className="breadcrumb">


          <Link to="/">

            Home

          </Link>


          <span>

            ›

          </span>


          <Link to="/parts">

            Parts

          </Link>


          <span>

            ›

          </span>


          <span>

            {
              part.partName
            }

          </span>


        </div>


        <div className="details-container">


          {/* PRODUCT IMAGE */}

          <div className="details-image">


            {

              part.image

              ? (

                <img

                  src={

                    getImageUrl(
                      part.image
                    )

                  }

                  alt={

                    part.partName

                  }

                />

              )

              : (

                <div>

                  No Product Image

                </div>

              )

            }


          </div>


          {/* PRODUCT DETAILS */}

          <div className="details-content">


            <h1>

              {
                part.partName
              }

            </h1>


            <p className="price">

              LKR{" "}

              {

                Number(

                  part.price

                ).toLocaleString()

              }

            </p>


            <div className="info-box">


              <p>

                <strong>

                  SKU :

                </strong>

                {" "}

                {

                  part.sku ||
                  "Not available"

                }

              </p>


              <p>

                <strong>

                  Condition :

                </strong>

                {" "}

                {

                  part.condition ===
                  "New"

                    ? "Brand New"

                    : part.condition

                }

              </p>


              <p>

                <strong>

                  Brand :

                </strong>

                {" "}

                {

                  part.brand ||
                  "Not available"

                }

              </p>


              <p>

                <strong>

                  Supplier :

                </strong>

                {" "}

                {

                  part.supplier

                }

              </p>


              <p>

                <strong>

                  Category :

                </strong>

                {" "}

                {

                  part.category

                }

              </p>


              <p>

                <strong>

                  Compatible Vehicle :

                </strong>

                {" "}

                {

                  part.vehicle

                }

              </p>


              <p>

                <strong>

                  Available Stock :

                </strong>

                {" "}

                {

                  part.stock

                }

              </p>


              <p>

                <strong>

                  Availability :

                </strong>

                {" "}

                {

                  isAvailable

                    ? "In Stock"

                    : "Out of Stock"

                }

              </p>


            </div>


            {/* DESCRIPTION */}

            <div className="description">


              <h3>

                Description

              </h3>


              <p>

                {

                  part.description

                  ||

                  `${part.partName} suitable for ${part.vehicle}.`

                }

              </p>


            </div>


            {/* BUTTONS */}
{/* CUSTOMER ONLY BUTTONS */}

{localStorage.getItem("role") !== "vendor" && (

  <div className="button-group">

    <button
      className="wishlist-btn"
      disabled={!isAvailable}
      onClick={() => navigate("/cart")}
    >
      {isAvailable
        ? "Add to Cart"
        : "Out of Stock"}
    </button>

    <button
      className="contact-btn"
      disabled={!isAvailable}
      onClick={() => navigate("/checkout")}
    >
      Checkout
    </button>

  </div>

)}

            <Link
  to={
    localStorage.getItem("role") === "vendor"
      ? "/inventory"
      : "/parts"
  }
>
  <button className="back-btn">

    {localStorage.getItem("role") === "vendor"
      ? "← Back to Inventory"
      : "← Back to Parts"}

  </button>
</Link>

          </div>


        </div>


      </div>

    </>

  );

}


export default PartDetailsPage;