import "./WhyChoose.css";

import { useLanguage } from "../context/LanguageContext";

function WhyChoose() {

  const { t } = useLanguage();

  return (
    <section className="why-section">

      <h2>
        {t("whyChooseAutoParts")}
      </h2>

      <div className="why-grid">

        <div className="why-box">
          {t("verifiedVendors")}
        </div>

        <div className="why-box">
          {t("transparentPricing")}
        </div>

        <div className="why-box">
          {t("newAndReconditioned")}
        </div>

        <div className="why-box">
          {t("timeSaving")}
        </div>

        <div className="why-box">
          {t("securePlatform")}
        </div>

      </div>

    </section>
  );
}

export default WhyChoose;