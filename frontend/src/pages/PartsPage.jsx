import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "./PartPage.css";

import airfilter from "../assets/images/parts/airfilter.jpg";
import battery from "../assets/images/parts/battery.png";
import breakepad from "../assets/images/parts/breakepad.jpg";
import engineoil from "../assets/images/parts/engineoil.jpg";
import headlight from "../assets/images/parts/headlight.jpg";
import oilfilter from "../assets/images/parts/oilfilter.jpg";
import radiator from "../assets/images/parts/radiator.jpg";
import sparkplug from "../assets/images/parts/sparkplug.jpg";

function PartsPage() {
  const [partsData, setPartsData] = useState([]);
  const [search, setSearch] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [condition, setCondition] = useState("");

  const navigate = useNavigate();

  // Match MongoDB image names with frontend images
  const partImages = {
    "battery.png": battery,
    "breakepad.jpg": breakepad,
    "engineoil.jpg": engineoil,
    "oilfilter.jpg": oilfilter,
    "airfilter.jpg": airfilter,
    "radiator.jpg": radiator,
    "sparkplug.jpg": sparkplug,
    "headlight.jpg": headlight,
  };

  // Get parts from MongoDB through backend API
  useEffect(() => {
    const getParts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/parts"
        );

        setPartsData(response.data);
      } catch (error) {
        console.error("Error loading parts:", error);
      }
    };

    getParts();
  }, []);

 // Search, condition filter and price sorting
const filteredParts = partsData
  .filter((part) => {
    const matchesSearch = part.partName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCondition =
      condition === "" ||
      part.condition === condition;

    return matchesSearch && matchesCondition;
  })
  .sort((a, b) => {
    if (priceSort === "low") {
      return a.price - b.price;
    }

    if (priceSort === "high") {
      return b.price - a.price;
    }

    return 0;
  });

  return (
    <>
      <Header />

      <div className="parts-page">
<div className="breadcrumb">

  <Link to="/">
    Home
  </Link>

  <span className="breadcrumb-arrow">
    ›
  </span>

  <span>
    Parts
  </span>

</div>


<div className="parts-title-section">

  <h1>
    Find the Right Parts for Your Vehicle
  </h1>

  <p>
    Browse quality spare parts from trusted vendors
  </p>

</div>

        <div className="filter-bar">

         <div className="filter-group">

  {/* Condition Filter */}
  <select
    className="filter-dropdown"
    value={condition}
    onChange={(e) => setCondition(e.target.value)}
  >
    <option value="">Condition</option>
    <option value="New">Brand New</option>
    <option value="Used">Used</option>
  </select>

  {/* Price Sorting */}
  <select
    className="filter-dropdown"
    value={priceSort}
    onChange={(e) => setPriceSort(e.target.value)}
  >
    <option value="">Price</option>
    <option value="low">Low to High</option>
    <option value="high">High to Low</option>
  </select>


</div>
          <div className="search-box">

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <button className="search-btn">
              🔍
            </button>

          </div>

        </div>

        <div className="parts-grid">

          {filteredParts.map((part) => (

            <div
              className="part-card"
              key={part._id}
            >

            <img
  src={
    partImages[
      part.image
        ?.split("/")
        .pop()
        .split("\\")
        .pop()
    ] ||
    (
      part.image?.startsWith("http")
        ? part.image
        : part.image
          ? `http://localhost:5000${
              part.image.startsWith("/")
                ? part.image
                : `/${part.image}`
            }`
          : airfilter
    )
  }
  alt={part.partName}
  className="part-image"
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = airfilter;
  }}
/>

              <div className="part-info">

                <h3>{part.partName}</h3>

                <p>
                  {part.condition === "New"
                    ? "Brand New"
                    : part.condition}
                </p>

                <p>{part.supplier}</p>

                <p className="part-price">
                  LKR {Number(part.price).toLocaleString()}
                </p>

                <button
                  className="view-details-btn"
                  onClick={() =>
                    navigate(
                      `/part-details/${part._id}`
                    )
                  }
                >
                  View Details
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default PartsPage;