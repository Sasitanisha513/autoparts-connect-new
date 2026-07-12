import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./VendorLoginPage.css";

import {
  FaEye,
  FaEyeSlash,
  FaStore,
} from "react-icons/fa";

function VendorLoginPage() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({

    email: "",

    password: "",

    remember: false,

  });

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({

      ...formData,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    alert("Vendor Login Successful");

    navigate("/supplier-dashboard");

  };
    return (

    <div className="vendor-login-page">

      <div className="vendor-login-container">

        <div className="vendor-login-header">

          <h1>Vendor Login</h1>

          <p>
            Login to manage your spare parts store.
          </p>

        </div>

        <form
          className="vendor-login-form"
          onSubmit={handleSubmit}
        >

          <div className="login-icon">

            <FaStore />

          </div>

          <h2>Welcome Back</h2>

          <p className="register-text">

            Don't have an account?

            <Link to="/vendor-register">
              Register Here
            </Link>

          </p>

          <div className="form-group">

            <label>Business Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your business email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <div className="password-box">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >

                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}

              </button>

            </div>

          </div>

          <div className="login-options">

            <label>

              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />

              Remember Me

            </label>

            <Link to="#">
              Forgot Password?
            </Link>

          </div>

          <button
            type="submit"
            className="login-btn"
          >

            Login

          </button>

          <div className="login-footer">

            <p>

              Secure Vendor Access for

              <span> AutoParts Connect</span>

            </p>

          </div>

        </form>

      </div>

    </div>

  );

}

export default VendorLoginPage;