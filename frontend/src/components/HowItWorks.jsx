import "./HowItWorks.css";

import {
  FaCar,
  FaBalanceScale,
  FaMapMarkerAlt,
} from "react-icons/fa";


function HowItWorks() {

  return (

    <section className="how-it-works">


      {/* SECTION HEADING */}

      <h2>
        How AutoParts Connect Works
      </h2>


      <p className="how-subtitle">

        Find parts in 3 simple steps

      </p>


      {/* THREE STEP CARDS */}

      <div className="how-cards">


        {/* STEP 01 */}

        <div className="how-card">


          <div className="how-card-title">

            <FaCar />

            <h3>
              Choose Your Vehicle
            </h3>

          </div>


          <div className="how-card-content">

            <p>Make</p>

            <p>Year</p>

            <p>Model</p>

            <p>Fuel Type</p>

          </div>


        </div>


        {/* STEP 02 */}

        <div className="how-card">


          <div className="how-card-title dark">

            <FaBalanceScale />

            <h3>
              Compare Parts
            </h3>

          </div>


          <div className="how-card-content orange">

            <p>New</p>

            <span>VS</span>

            <p>Reconditioned</p>

            <p>from</p>

            <p>Multiple Suppliers</p>

          </div>


        </div>


        {/* STEP 03 */}

        <div className="how-card">


          <div className="how-card-title dark">

            <FaMapMarkerAlt />

            <h3>
              Pickup with Confidence
            </h3>

          </div>


          <div className="how-card-content orange">

            <p>Choose Supplier</p>

            <p>+</p>

            <p>Schedule Pickup</p>

          </div>


        </div>


      </div>


    </section>

  );

}


export default HowItWorks;