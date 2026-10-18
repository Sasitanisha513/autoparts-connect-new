import { useEffect, useState } from "react";
import axios from "axios";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

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


  const [vehicles, setVehicles] = useState([]);
useEffect(() => {
  fetchVehicles();
}, []);

const fetchVehicles = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/vehicles");
    setVehicles(res.data);
  } catch (error) {
    console.error("Error loading vehicles:", error);
  }
};

// Dynamic Filter Options

const brands = [...new Set(vehicles.map((v) => v.brand))].sort();

const years = [...new Set(vehicles.map((v) => v.year))]
  .sort((a, b) => b - a);

const fuels = [...new Set(vehicles.map((v) => v.fuel))].sort();

// Vehicle search and filters

const filteredVehicles =
  vehicles.filter((vehicle) => {

      return (

        `${vehicle.brand} ${vehicle.model}`
  .toLowerCase()
  .includes(search.toLowerCase())

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
  Number(vehicle.year) === Number(year)
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
  onChange={(e) => setBrand(e.target.value)}
>
  <option value="">Brand</option>

  {brands.map((brand) => (
    <option key={brand} value={brand}>
      {brand}
    </option>
  ))}
</select>


            {/* Year Filter */}

<select
  value={year}
  onChange={(e) => setYear(e.target.value)}
>
  <option value="">Year</option>

  {years.map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ))}
</select>


            {/* Fuel Filter */}

<select
  value={fuel}
  onChange={(e) => setFuel(e.target.value)}
>
  <option value="">Fuel</option>

  {fuels.map((fuel) => (
    <option key={fuel} value={fuel}>
      {fuel}
    </option>
  ))}
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

                 key={vehicle._id}

                >


               <img
  src={
    vehicle.image
      ? `http://localhost:5000/${vehicle.image}`
      : car1
  }
  alt={vehicle.model}
/>
                  <div className="vehicle-info">


                   <h3>
  {vehicle.brand} {vehicle.model}
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
      `/parts?vehicle=${encodeURIComponent(
        `${vehicle.brand} ${vehicle.model}`
      )}`
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
<Footer />
    </>

  );

}


export default VehicleListingPage;