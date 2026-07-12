import "./Hero.css";
import heroImage from "../assets/images/hero.jpg";

function Hero() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)),url(${heroImage})`,
      }}
    >
      <div className="hero-content">

        <h1>
          Find the Right <span>Auto Parts</span>
        </h1>

        <h2>
          <span>Compare</span> Prices
        </h2>

        <h2>Instantly.</h2>

        <p>
          Search compatible vehicle parts from
          <span> verified </span>
          suppliers.
          <br />
          <span>Compare</span> new and reconditioned parts.
          <br />
          Pickup made easy.
        </p>

        <button>Browse Vehicles</button>

      </div>
    </section>
  );
}

export default Hero;