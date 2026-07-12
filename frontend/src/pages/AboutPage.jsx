import "./AboutPage.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import car1 from "../assets/images/vehicles/car1.jpg";

import {
  FaClipboardCheck,
  FaBullseye,
  FaEye,
  FaPlusSquare,
  FaCheckDouble,
  FaCircle,
} from "react-icons/fa";

function AboutPage() {

  return (

    <>

      <Header />

      <section className="about-hero">

        <div className="about-overlay">

          <h1>
            Connecting Vehicle Owners with
            <br />
            <span>Trusted</span> Spare Parts
            <br />
            Suppliers
          </h1>

         <p>
  AutoParts Connect is an online <span>marketplace</span> designed
  to simplify the way vehicle owners <span>find</span> and{" "}
  <span>compare</span> spare parts from trusted suppliers.
</p>
        </div>

      </section>

      <section className="story-section">

        <div className="container">

          <h2>AutoParts Connect Story</h2>

          <div className="story-content">

            <img
              src={car1}
              alt="BMW"
            />

            <div className="story-text">

              <p>
                <b>
                AutoParts Connect was created to bridge the gap
                between vehicle owners searching for reliable
                spare parts and trusted suppliers looking to
                reach the right customers.
</b>
              </p>

              <p>
<b>
                Many vehicle owners struggle to find compatible
                parts, compare prices, or verify supplier
                credibility. At the same time, suppliers often
                lack a digital platform to showcase their
                inventory effectively.
</b>
              </p>

              <p>
<b>
                Our platform brings both sides together in one
                secure, transparent and efficient marketplace.
</b>
              </p>

            </div>

          </div>

          <div className="mission-grid">

            <div className="mission-card">

              <FaBullseye />

              <h3>Our Mission</h3>

              <p>

                To create a transparent and accessible digital marketplace that simplifies spare part discovery, comparison, and purchasing for vehicle owners.
             
              </p>

            </div>

            <div className="vision-card">

              <FaEye />

              <h3>Our Vision</h3>

              <p>
To become a trusted and scalable automotive marketplace that supports suppliers and serves vehicle owners with accuracy, reliability, and efficiency.

              </p>

            </div>

          </div>

        </div>

      </section>
            <section className="offer-section">

        <div className="container">

          <h2>What AutoParts Connect Offer</h2>

          <div className="offer-content">

            <div className="offer-list">

              <div className="offer-item">
                <FaPlusSquare />
                <div>
                  <h4>Smart Vehicle-Based Search</h4>
                  <p>Find compatible spare parts using vehicle brand, model, year and fuel type.</p>
                </div>
              </div>

              <div className="offer-item">
                <FaPlusSquare />
                <div>
                  <h4>Price Comparison</h4>
                  <p>Compare prices from multiple trusted suppliers in one place.</p>
                </div>
              </div>

              <div className="offer-item">
                <FaPlusSquare />
                <div>
                  <h4>New & Reconditioned Parts</h4>
                  <p>Choose genuine brand-new or quality reconditioned spare parts.</p>
                </div>
              </div>

              <div className="offer-item">
                <FaPlusSquare />
                <div>
                  <h4>Vendor Dashboard</h4>
                  <p>Suppliers can manage inventory, products and customer orders.</p>
                </div>
              </div>

              <div className="offer-item">
                <FaPlusSquare />
                <div>
                  <h4>Secure Role-Based Access</h4>
                  <p>Separate access for Customers, Vendors and Administrators.</p>
                </div>
              </div>

            </div>

            <img
              src={car1}
              alt="BMW"
            />

          </div>

        </div>

      </section>

      <section className="about-why-section">

  <div className="container">

    <h2>Why Choose AutoParts Connect</h2>

    <div className="about-why-grid">

      <div className="about-why-item">
        <FaCheckDouble />
        <div className="about-why-text">
          <h4>Transparent Pricing</h4>
          <p>
            Compare prices from multiple suppliers in one place,
            helping you make informed purchasing decisions.
          </p>
        </div>
      </div>

      <div className="about-why-item">
        <FaCheckDouble />
        <div className="about-why-text">
          <h4>Verified Vendors</h4>
          <p>
            All vendors go through a manual approval process to
            ensure reliability and trust.
          </p>
        </div>
      </div>

      <div className="about-why-item">
        <FaCheckDouble />
        <div className="about-why-text">
          <h4>Vehicle Compatibility</h4>
          <p>
            Find parts tailored specifically to your vehicle's
            make, model, year and fuel type.
          </p>
        </div>
      </div>

      <div className="about-why-item">
        <FaCheckDouble />
        <div className="about-why-text">
          <h4>New & Reconditioned Options</h4>
          <p>
            Choose between brand-new and cost-effective
            reconditioned parts based on your needs.
          </p>
        </div>
      </div>

      <div className="about-why-item">
        <FaCheckDouble />
        <div className="about-why-text">
          <h4>Secure Role-Based System</h4>
          <p>
            Separate access for Customers, Vendors and Admin
            ensures controlled and secure platform operations.
          </p>
        </div>
      </div>

      <div className="about-why-item">
        <FaCheckDouble />
        <div className="about-why-text">
          <h4>Performance & Inventory Insights</h4>
          <p>
            Vendors can generate monthly sales and inventory
            reports for better business decisions.
          </p>
        </div>
      </div>

    </div>

  </div>

</section>

      <section className="work-section">

        <div className="container">

          <h2>How AutoParts Connect Works</h2>

          <p className="work-subtitle">
            A simple and transparent process for customers and suppliers.
          </p>

          <div className="work-grid">

            <div className="work-card">

              <FaCircle />

              <h3>Select Your Vehicle</h3>

              <p>
                Browse available vehicles or search by brand,
                year and fuel type to find compatible parts.
              </p>

            </div>

            <div className="work-card">

              <FaCircle />

              <h3>Compare Parts & Suppliers</h3>

              <p>
                Compare prices, availability and supplier ratings
                before making a purchase.
              </p>

            </div>

            <div className="work-card">

              <FaCircle />

              <h3>Arrange Pickup</h3>

              <p>
                Select your preferred supplier and arrange
                pickup with confidence.
              </p>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </>

  );

}

export default AboutPage;
