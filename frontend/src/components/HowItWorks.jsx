import "./HowItWorks.css";

import {
  FaCar,
  FaBalanceScale,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { useLanguage } from "../context/LanguageContext";


function HowItWorks() {

  const { t } = useLanguage();


  return (

    <section className="how-it-works">


      {/* SECTION HEADING */}

      <h2>
        {t("howItWorks")}
      </h2>


      <p className="how-subtitle">

        {t("findPartsThreeSteps")}

      </p>


      {/* THREE STEP CARDS */}

      <div className="how-cards">


        {/* STEP 01 */}

        <div className="how-card">

          <div className="how-card-title">

            <FaCar />

            <h3>
              {t("chooseYourVehicle")}
            </h3>

          </div>


          <div className="how-card-content">

            <p>
              {t("make")}
            </p>

            <p>
              {t("year")}
            </p>

            <p>
              {t("model")}
            </p>

            <p>
              {t("fuelType")}
            </p>

          </div>

        </div>


        {/* STEP 02 */}

        <div className="how-card">

          <div className="how-card-title dark">

            <FaBalanceScale />

            <h3>
              {t("compareParts")}
            </h3>

          </div>


          <div className="how-card-content orange">

            <p>
              {t("new")}
            </p>

            <span>
              VS
            </span>

            <p>
              {t("reconditioned")}
            </p>

            <p>
              {t("from")}
            </p>

            <p>
              {t("multipleSuppliers")}
            </p>

          </div>

        </div>


        {/* STEP 03 */}

        <div className="how-card">

          <div className="how-card-title dark">

            <FaMapMarkerAlt />

            <h3>
              {t("pickupWithConfidence")}
            </h3>

          </div>


          <div className="how-card-content orange">

            <p>
              {t("chooseSupplier")}
            </p>

            <p>
              +
            </p>

            <p>
              {t("schedulePickup")}
            </p>

          </div>

        </div>


      </div>


    </section>

  );

}


export default HowItWorks;