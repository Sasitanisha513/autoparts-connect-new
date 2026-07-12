import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./SupplierDashboard.css";

import SupplierSidebar
  from "../components/SupplierSidebar";


function SupplierDashboard() {

  // ==========================
  // DASHBOARD COUNTS
  // ==========================

  const [totalParts, setTotalParts] =
    useState(0);

  const [inStock, setInStock] =
    useState(0);

  const [lowStock, setLowStock] =
    useState(0);

  const [outOfStock, setOutOfStock] =
    useState(0);


  // ==========================
  // GET PRODUCTS FROM MONGODB
  // ==========================

  useEffect(() => {

    const getDashboardData =
      async () => {

        try {

          const response =
            await axios.get(

              "http://localhost:5000/api/parts"

            );


          const products =
            response.data;


          // Total product count

          setTotalParts(
            products.length
          );


          // In Stock
          // Stock quantity 11 or more

          const inStockProducts =
            products.filter(

              (product) =>

                Number(
                  product.stock
                ) > 10

            );


          setInStock(

            inStockProducts.length

          );


          // Low Stock
          // Stock quantity 1 - 10

          const lowStockProducts =
            products.filter(

              (product) => {

                const stock =
                  Number(
                    product.stock
                  );


                return (

                  stock > 0

                  &&

                  stock <= 10

                );

              }

            );


          setLowStock(

            lowStockProducts.length

          );


          // Out of Stock
          // Stock quantity is 0

          const outOfStockProducts =
            products.filter(

              (product) =>

                Number(
                  product.stock
                ) === 0

            );


          setOutOfStock(

            outOfStockProducts.length

          );


        } catch (error) {

          console.log(

            "Dashboard data loading error:",

            error

          );

        }

      };


    getDashboardData();


  }, []);


  return (

    <div
      className=
        "dashboard-container"
    >


      <SupplierSidebar />


      <div
        className=
          "dashboard-content"
      >


        {/* DASHBOARD HEADER */}

        <div
          className=
            "dashboard-header"
        >


          <h1>

            Dashboard Overview

          </h1>


          <p>

            Welcome back! Here's
            what's happening with
            your store today.

          </p>


        </div>


        {/* REAL INVENTORY COUNTS */}

        <div
          className=
            "summary-cards"
        >


          {/* TOTAL PARTS */}

          <div
            className=
              "summary-card"
          >


            <h3>

              Total Parts Listed

            </h3>


            <h2>

              {totalParts}

            </h2>


          </div>


          {/* IN STOCK */}

          <div
            className=
              "summary-card"
          >


            <h3>

              In Stock

            </h3>


            <h2>

              {inStock}

            </h2>


          </div>


          {/* LOW STOCK */}

          <div
            className=
              "summary-card"
          >


            <h3>

              Low Stock

            </h3>


            <h2>

              {lowStock}

            </h2>


          </div>


          {/* OUT OF STOCK */}

          <div
            className=
              "summary-card"
          >


            <h3>

              Out of Stock

            </h3>


            <h2>

              {outOfStock}

            </h2>


          </div>


        </div>


        {/* ANALYTICS */}

        <div
          className=
            "analytics-section"
        >


          <div
            className=
              "analytics-card"
          >


            <h2>

              Inventory Overview

            </h2>


            <div
              className=
                "chart-placeholder"
            >


              <p>

                Total Products:
                {" "}
                {totalParts}

              </p>


              <p>

                In Stock:
                {" "}
                {inStock}

              </p>


              <p>

                Low Stock:
                {" "}
                {lowStock}

              </p>


              <p>

                Out of Stock:
                {" "}
                {outOfStock}

              </p>


            </div>


          </div>


        </div>


      </div>


    </div>

  );

}


export default SupplierDashboard;