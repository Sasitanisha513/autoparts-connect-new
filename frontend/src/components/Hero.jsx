import "./Hero.css";

import heroImage from "../assets/images/hero.jpg";

import { useNavigate } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";


function Hero() {

  const navigate = useNavigate();

 const { t, language } = useLanguage();

  return (

    <section
      className={`hero hero-${language}`}
      style={{
        backgroundImage: `linear-gradient(
          rgba(0,0,0,.55),
          rgba(0,0,0,.55)
        ),url(${heroImage})`,
      }}
    >

      <div className="hero-content">

        <h1>

          {t("findTheRight")}{" "}

          <span>
            {t("autoParts")}
          </span>

        </h1>


        <h2>

          <span>
            {t("compare")}
          </span>{" "}

          {t("prices")}

        </h2>


        <h2>
          {t("instantly")}
        </h2>


        <p>

          {t("searchCompatibleParts")}{" "}

          <span>
            {t("verified")}
          </span>{" "}

          {t("suppliers")}.

          <br />

          <span>
            {t("compare")}
          </span>{" "}

          {t("newAndReconditioned")}.

          <br />

          {t("pickupMadeEasy")}.

        </p>


        <button
          onClick={() =>
            navigate("/vehicles")
          }
        >

          {t("browseVehicles")}

        </button>

      </div>

    </section>

  );

}


export default Hero;