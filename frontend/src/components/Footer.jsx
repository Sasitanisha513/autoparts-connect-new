import "./Footer.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-left">
        <h3>Contact Us</h3>

        <p><FaPhoneAlt /> +94 77 123 4567</p>
        <p><FaPhoneAlt /> +94 77 123 4567</p>

        <br />

        <p><FaEnvelope /> info@autoparts.lk</p>
        <p><FaEnvelope /> support@autoparts.lk</p>

        <br />

        <p><FaMapMarkerAlt /> 76, Wadduwa, Kalutara,</p>
        <p>Sri Lanka</p>
      </div>

      <div className="footer-center">
        <h2>
          Find the right <span>part</span>
        </h2>

        <h2>
          From the right <span>supplier</span>
        </h2>
      </div>

      <div className="footer-right">
        <h3>Useful Links</h3>

        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Parts</li>
          <li>Contact</li>
        </ul>

        <div className="socials">
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
          <FaWhatsapp />
        </div>
      </div>

      <div className="copyright">
        © 2026 AutoParts Connect. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;