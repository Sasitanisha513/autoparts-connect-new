import "./AutoCare.css";
import bmwImage from "../assets/images/bmw.jpg";

function AutoCare() {
  return (
    <section className="auto-care">
      <h2>Auto Care Tips & Guides</h2>

      <div className="auto-grid">

        <div className="auto-card">
          <img src={bmwImage} alt="BMW Car" />

          <span className="category">Maintenance</span>

          <h3>
            How to Choose the Right
            <br />
            Brake Pads For Your Vehicle
          </h3>

          <p>
            Choosing the right brake pads ensures
            safety and performance while helping you
            avoid unnecessary costs.
          </p>

          <button>Read More</button>
        </div>

        <div className="auto-card">
          <img src={bmwImage} alt="BMW Car" />

          <span className="category">Maintenance</span>

          <h3>
            How to Choose the Right
            <br />
            Brake Pads For Your Vehicle
          </h3>

          <p>
            Choosing the right brake pads ensures
            safety and performance while helping you
            avoid unnecessary costs.
          </p>

          <button>Read More</button>
        </div>

        <div className="auto-card">
          <img src={bmwImage} alt="BMW Car" />

          <span className="category">Maintenance</span>

          <h3>
            How to Choose the Right
            <br />
            Brake Pads For Your Vehicle
          </h3>

          <p>
            Choosing the right brake pads ensures
            safety and performance while helping you
            avoid unnecessary costs.
          </p>

          <button>Read More</button>
        </div>

      </div>

      <div className="see-more">
        See more »
      </div>
    </section>
  );
}

export default AutoCare;