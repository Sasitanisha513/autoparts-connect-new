import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import Header from "../components/Header";

import "./VehicleListingPage.css";

import {
  FaCarSide,
  FaSearch,
} from "react-icons/fa";

import car1 from "../assets/images/vehicles/car1.jpg";
import car2 from "../assets/images/vehicles/car2.jpg";
import car3 from "../assets/images/vehicles/car3.jpg";
import car4 from "../assets/images/vehicles/car4.jpg";
import car5 from "../assets/images/vehicles/car5.jpg";
import car6 from "../assets/images/vehicles/car6.jpg";


function VehicleListingPage() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [fuel, setFuel] = useState("");


  const vehicles = [

    {
      id: 1,
      image: car1,
      brand: "BMW",
      model: "BMW 5 Series",
      year: "2016",
      fuel: "Petrol",
    },

    {
      id: 2,
      image: car2,
      brand: "BMW",
      model: "BMW X5",
      year: "2018",
      fuel: "Diesel",
    },

    {
      id: 3,
      image: car3,
      brand: "Toyota",
      model: "Toyota Corolla",
      year: "2020",
      fuel: "Petrol",
    },

    {
      id: 4,
      image: car4,
      brand: "Honda",
      model: "Honda Civic",
      year: "2019",
      fuel: "Petrol",
    },

    {
      id: 5,
      image: car5,
      brand: "Audi",
      model: "Audi A4",
      year: "2021",
      fuel: "Diesel",
    },

    {
      id: 6,
      image: car6,
      brand: "Mercedes",
      model: "Mercedes C200",
      year: "2022",
      fuel: "Hybrid",
    },

  ];


  // Vehicle search and filters

  const filteredVehicles =
    vehicles.filter((vehicle) => {

      return (

        vehicle.model
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

        &&

        (
          brand === ""
          ||
          vehicle.brand === brand
        )

        &&

        (
          year === ""
          ||
          vehicle.year === year
        )

        &&

        (
          fuel === ""
          ||
          vehicle.fuel === fuel
        )

      );

    });


  return (

    <>

      {/* Website Header */}

      <Header />


      <section className="vehicle-page">

        <div className="vehicle-container">


          {/* Breadcrumb */}

          <div className="vehicle-breadcrumb">

            <Link to="/">
              Home
            </Link>

            <span>
              ›
            </span>

            <span>
              Vehicles
            </span>

          </div>


          {/* Page Title */}

          <div className="vehicle-title">

            <FaCarSide />

            <h1>
              Browse Vehicles
            </h1>

            <p>
              Select your vehicle to view
              compatible spare parts.
            </p>

          </div>


          {/* Vehicle Filters */}

          <div className="vehicle-filters">


            {/* Brand Filter */}

            <select

              value={brand}

              onChange={(e) =>
                setBrand(
                  e.target.value
                )
              }

            >

              <option value="">
                Brand
              </option>

              <option>
                BMW
              </option>

              <option>
                Honda
              </option>

              <option>
                Toyota
              </option>

              <option>
                Audi
              </option>

              <option>
                Mercedes
              </option>

            </select>


            {/* Year Filter */}

            <select

              value={year}

              onChange={(e) =>
                setYear(
                  e.target.value
                )
              }

            >

              <option value="">
                Year
              </option>

              <option>
                2016
              </option>

              <option>
                2018
              </option>

              <option>
                2019
              </option>

              <option>
                2020
              </option>

              <option>
                2021
              </option>

              <option>
                2022
              </option>

            </select>


            {/* Fuel Filter */}

            <select

              value={fuel}

              onChange={(e) =>
                setFuel(
                  e.target.value
                )
              }

            >

              <option value="">
                Fuel
              </option>

              <option>
                Petrol
              </option>

              <option>
                Diesel
              </option>

              <option>
                Hybrid
              </option>

            </select>


            {/* Vehicle Search */}

            <div className="search-box">

              <FaSearch />

              <input

                type="text"

                placeholder=
                  "Search vehicle..."

                value={search}

                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }

              />

            </div>

          </div>


          {/* Vehicle Cards */}

          <div className="vehicle-grid">


            {filteredVehicles.map(
              (vehicle) => (

                <div

                  className=
                    "vehicle-card"

                  key={vehicle.id}

                >


                  <img

                    src={
                      vehicle.image
                    }

                    alt={
                      vehicle.model
                    }

                  />


                  <div className="vehicle-info">


                    <h3>

                      {
                        vehicle.model
                      }

                    </h3>


                    <p>

                      {
                        vehicle.year
                      }

                    </p>


                    <span>

                      {
                        vehicle.fuel
                      }

                    </span>


                    <button

                      onClick={() =>

                        navigate(

                          `/parts?vehicle=${

                            encodeURIComponent(

                              vehicle.model

                            )

                          }`

                        )

                      }

                    >

                      View Parts

                    </button>


                  </div>

                </div>

              )

            )}


            {/* No Vehicle Message */}

            {

              filteredVehicles.length
              === 0

              &&

              (

                <div className="no-vehicles">

                  <h2>

                    No Vehicles Found

                  </h2>

                  <p>

                    Try another search
                    or filter.

                  </p>

                </div>

              )

            }


          </div>

        </div>

      </section>

    </>

  );

}


export default VehicleListingPage;