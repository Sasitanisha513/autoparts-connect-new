import Header from "../components/Header";
import Footer from "../components/Footer";
import "./ContactPage.css";

function ContactPage() {
  return (
    <>
      <Header />

      <div className="contact-page">

        <div className="contact-title">

          <h1>Contact Us</h1>

          <p>
            Have a question or need help? We're here to assist you.
          </p>

        </div>

        <div className="contact-card">

          <h2>Send us a message</h2>

          <form className="contact-form">

            <div className="full-width">

              <label>Name *</label>

              <input
                type="text"
                placeholder="Enter your name"
              />

            </div>

            <div className="two-column">

              <div>

                <label>Phone *</label>

                <input
                  type="text"
                  placeholder="Enter your number"
                />

              </div>

              <div>

                <label>Email *</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                />

              </div>

            </div>

            <div className="full-width">

              <label>Subject *</label>

              <input
                type="text"
                placeholder="Enter your subject"
              />

            </div>

            <div className="full-width">

              <label>Message *</label>

              <textarea
                rows="7"
                placeholder="Enter your message"
              ></textarea>

            </div>

            <button
              type="submit"
              className="send-btn"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default ContactPage;