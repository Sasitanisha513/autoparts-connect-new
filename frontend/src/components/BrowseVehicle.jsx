import { useNavigate } from "react-router-dom";
import "./BrowseVehicle.css";

import bmwImage from "../assets/images/bmw3.jpg";
import toyotaImage from "../assets/images/toyota.jpg";
import hondaImage from "../assets/images/honda.jpg";

import { useLanguage } from "../context/LanguageContext";

function BrowseVehicle() {

  const navigate = useNavigate();

  const { t } = useLanguage();

  return (

    <section className="browse-section">

      <h2>
        {t("browsePartsByVehicle")}
      </h2>

      <p className="browse-subtitle">
        {t("selectCarModel")}
      </p>

      <div className="vehicle-grid">

        {/* BMW */}

        <div className="vehicle-card">

          <img
            src={bmwImage}
            alt="BMW"
          />

          <h3>
            BMW 5 - Series
          </h3>

          <p>
            2016
          </p>

          <p>
            {t("petrol")}
          </p>

          <button
            onClick={() => navigate("/vehicles")}
          >
            {t("viewParts")}
          </button>

        </div>


        {/* Toyota */}

        <div className="vehicle-card">

          <img
            src={toyotaImage}
            alt="Toyota"
          />

          <h3>
            Toyota Corolla
          </h3>

          <p>
            2018
          </p>

          <p>
            {t("petrol")}
          </p>

          <button
            onClick={() => navigate("/vehicles")}
          >
            {t("viewParts")}
          </button>

        </div>


        {/* Honda */}

        <div className="vehicle-card">

          <img
            src={hondaImage}
            alt="Honda"
          />

          <h3>
            Honda Civic
          </h3>

          <p>
            2019
          </p>

          <p>
            {t("petrol")}
          </p>

          <button
            onClick={() => navigate("/vehicles")}
          >
            {t("viewParts")}
          </button>

        </div>

      </div>


      <div
        className="see-more"
        onClick={() => navigate("/vehicles")}
      >
        {t("seeMore")} →
      </div>

    </section>

  );
}

export default BrowseVehicle;