import { useNavigate } from "react-router-dom";
import "./BrowseVehicle.css";
import bmwImage from "../assets/images/bmw3.jpg";

function BrowseVehicle() {
    const navigate = useNavigate();
  return (
    <section className="browse-section">

      <h2>Browse Parts by Vehicle</h2>

      <p className="browse-subtitle">
        Select your car model to see compatible parts
      </p>

      <div className="vehicle-grid">

        <div className="vehicle-card">
          <img
            src={bmwImage}
            alt="BMW"
          />

          <h3>BMW 5 - Series</h3>

          <p>2016</p>

          <p>Petrol</p>

          <button
  onClick={() => navigate("/vehicles")}
>
  View Parts
</button>
        </div>

        <div className="vehicle-card">
          <img
            src={bmwImage}
            alt="BMW"
          />

          <h3>BMW 5 - Series</h3>

          <p>2016</p>

          <p>Petrol</p>

          <button>View Parts</button>
        </div>

        <div className="vehicle-card">
          <img
            src={bmwImage}
            alt="BMW"
          />

          <h3>BMW 5 - Series</h3>

          <p>2016</p>

          <p>Petrol</p>

          <button>View Parts</button>
        </div>

      </div>

      <div
  className="see-more"
  onClick={() => navigate("/vehicles")}
>
  See More →
</div>

    </section>
  );
}

export default BrowseVehicle;