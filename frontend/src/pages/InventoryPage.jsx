import {
  useState,
  useEffect,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import "./InventoryPage.css";

import SupplierSidebar
  from "../components/SupplierSidebar";

import {
  FaSearch,
  FaPlus,
  FaBoxOpen,
  FaEllipsisV,
} from "react-icons/fa";


function InventoryPage() {

  const navigate = useNavigate();


  // ==========================
  // STATES
  // ==========================

  const [inventory, setInventory] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [activeMenu, setActiveMenu] =
    useState(null);


  // DELETE MODAL STATES

  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState(null);


  // MESSAGE STATE

  const [message, setMessage] =
    useState({

      show: false,

      text: "",

      type: "success",

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
  // GET PRODUCTS
  // ==========================

  const getProducts = async () => {

    try {

      const response =
        await axios.get(

          "http://localhost:5000/api/parts"

        );


      setInventory(

        response.data

      );


    } catch (error) {

      console.log(

        "Products loading error:",

        error

      );

    }

  };


  useEffect(() => {

    getProducts();

  }, []);


  // ==========================
  // OPEN DELETE MODAL
  // ==========================

  const openDeleteModal = (
    product
  ) => {

    setSelectedProduct(
      product
    );

    setShowDeleteModal(
      true
    );

    setActiveMenu(
      null
    );

  };


  // ==========================
  // CLOSE DELETE MODAL
  // ==========================

  const closeDeleteModal = () => {

    setShowDeleteModal(
      false
    );

    setSelectedProduct(
      null
    );

  };


  // ==========================
  // DELETE PRODUCT
  // ==========================

  const deleteProduct = async () => {

    if (!selectedProduct) {

      return;

    }


    try {

      await axios.delete(

        `http://localhost:5000/api/parts/${selectedProduct._id}`

      );


      // Remove product from table

      setInventory(

        (previousProducts) =>

          previousProducts.filter(

            (product) =>

              product._id !==
              selectedProduct._id

          )

      );


      closeDeleteModal();


      showMessage(

        "Product deleted successfully.",

        "success"

      );


    } catch (error) {

      console.log(

        "Product delete error:",

        error

      );


      closeDeleteModal();


      showMessage(

        error.response
          ?.data
          ?.message

        ||

        error.response
          ?.data
          ?.error

        ||

        "Product could not be deleted.",

        "error"

      );

    }

  };


  // ==========================
  // SEARCH PRODUCTS
  // ==========================

  const filteredInventory =

    inventory.filter(

      (item) => {


        const searchText =

          search.toLowerCase();


        return (

          (item.partName || "")

            .toLowerCase()

            .includes(
              searchText
            )


          ||


          (item.sku || "")

            .toLowerCase()

            .includes(
              searchText
            )


          ||


          (item.vehicle || "")

            .toLowerCase()

            .includes(
              searchText
            )

        );

      }

    );


  // ==========================
  // STOCK STATUS
  // ==========================

  const getStockStatus = (
    stock
  ) => {

    if (stock === 0) {

      return "Out of Stock";

    }


    if (stock <= 10) {

      return "Low Stock";

    }


    return "In Stock";

  };


  // ==========================
  // STATUS CSS CLASS
  // ==========================

  const getStatusClass = (
    stock
  ) => {

    if (stock === 0) {

      return "out-of-stock";

    }


    if (stock <= 10) {

      return "low-stock";

    }


    return "in-stock";

  };


  return (

    <div className="inventory-page">


      {/* PROFESSIONAL MESSAGE */}

      {
        message.show && (

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

        )
      }


      <SupplierSidebar />


      <div
        className=
          "inventory-content"
      >


        {/* HEADER */}

        <div
          className=
            "inventory-header"
        >


          <h1>

            <FaBoxOpen
              className=
                "header-icon"
            />

            Product Catalog Management

          </h1>


          <p>

            Manage your spare parts
            inventory efficiently.

          </p>


        </div>


        {/* TOOLBAR */}

        <div
          className=
            "inventory-toolbar"
        >


          <div
            className=
              "inventory-search"
          >


            <FaSearch />


            <input

              type="text"

              placeholder=
                "Search by SKU, Part or Vehicle..."

              value={
                search
              }

              onChange={

                (event) =>

                  setSearch(

                    event.target.value

                  )

              }

            />


          </div>


          <button

            className=
              "add-product-btn"

            onClick={() =>

              navigate(

                "/add-product"

              )

            }

          >


            <FaPlus />


            Add Product


          </button>


        </div>


        {/* PRODUCT TABLE */}

        <div
          className=
            "inventory-table"
        >


          <table>


            <thead>


              <tr>

                <th>Image</th>

                <th>SKU</th>

                <th>Part</th>

                <th>Vehicle</th>

                <th>Stock</th>

                <th>Status</th>

                <th>Price</th>

                <th></th>

              </tr>


            </thead>


            <tbody>


              {

                filteredInventory.map(

                  (item) => (


                    <tr
                      key={
                        item._id
                      }
                    >


                      {/* IMAGE */}

                      <td>


                        {

                          item.image

                            ? (

                              <img

                                src={

                                  `http://localhost:5000${item.image}`

                                }

                                alt={

                                  item.partName

                                }

                                className=

                                  "inventory-image"

                              />

                            )

                            : (

                              <div

                                className=

                                  "inventory-image"

                              />

                            )

                        }


                      </td>


                      {/* SKU */}

                      <td>

                        {

                          item.sku

                        }

                      </td>


                      {/* PART NAME */}

                      <td
                        className=
                          "part-name"
                      >

                        {

                          item.partName

                        }

                      </td>


                      {/* VEHICLE */}

                      <td>

                        {

                          item.vehicle

                        }

                      </td>


                      {/* STOCK */}

                      <td>

                        {

                          item.stock

                        }

                      </td>


                      {/* STATUS */}

                      <td>


                        <span

                          className={

                            `status ${

                              getStatusClass(

                                Number(

                                  item.stock

                                )

                              )

                            }`

                          }

                        >

                          {

                            getStockStatus(

                              Number(

                                item.stock

                              )

                            )

                          }

                        </span>


                      </td>


                      {/* PRICE */}

                      <td>

                        LKR{" "}

                        {

                          Number(

                            item.price

                          )

                            .toLocaleString()

                        }

                      </td>


                      {/* ACTION MENU */}

                      <td
                        className=
                          "action-column"
                      >


                        <div
                          className=
                            "action-menu"
                        >


                          <button

                            className=
                              "menu-btn"

                            onClick={() =>

                              setActiveMenu(

                                activeMenu ===
                                item._id

                                  ? null

                                  : item._id

                              )

                            }

                          >


                            <FaEllipsisV />


                          </button>


                          {

                            activeMenu ===
                            item._id

                            && (


                              <div

                                className=

                                  "dropdown-menu"

                              >


                                <button

                                  onClick={() =>

                                    navigate(

                                      `/edit-product/${item._id}`

                                    )

                                  }

                                >

                                  Edit

                                </button>


                                <button

                                  onClick={() =>

                                    navigate(

                                      `/part-details/${item._id}`

                                    )

                                  }

                                >

                                  View

                                </button>


                                <button

                                className="inventory-delete-btn"

                                  onClick={() =>

                                    openDeleteModal(

                                      item

                                    )

                                  }

                                >

                                  Delete

                                </button>


                              </div>


                            )

                          }


                        </div>


                      </td>


                    </tr>


                  )

                )

              }


            </tbody>


          </table>


          {

            filteredInventory.length ===
            0

            && (


              <div
                className=
                  "no-products"
              >


                <h3>

                  No Products Found

                </h3>


                <p>

                  Try searching using
                  another keyword.

                </p>


              </div>


            )

          }


        </div>


      </div>


      {/* DELETE CONFIRMATION MODAL */}

      {

        showDeleteModal

        &&

        selectedProduct

        && (


          <div

            className=

              "delete-modal-overlay"

            onClick={

              closeDeleteModal

            }

          >


            <div

              className=

                "delete-modal"

              onClick={

                (event) =>

                  event.stopPropagation()

              }

            >


              <div

                className=

                  "delete-modal-icon"

              >

                !

              </div>


              <h2>

                Delete Product

              </h2>


              <p>

                Are you sure you want
                to delete this product?

              </p>


              <h3>

                {

                  selectedProduct
                    .partName

                }

              </h3>


              <div

                className=

                  "delete-modal-buttons"

              >


                <button

                  className=

                    "delete-cancel-btn"

                  onClick={

                    closeDeleteModal

                  }

                >

                  Cancel

                </button>


                <button

                  className=

                    "delete-confirm-btn"

                  onClick={

                    deleteProduct

                  }

                >

                  Yes, Delete

                </button>


              </div>


            </div>


          </div>


        )

      }


    </div>

  );

}


export default InventoryPage;