import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";  

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    setLoading(true);

    setError("");

    try {
      const response =
        await fetch(
          "http://localhost:5000/auth/register",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name,
              email,
              password,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error
        );
      }

      navigate("/login");
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  return (
    <div className="auth-page">
      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >
        <h1>Create Account</h1>

        {error && (
          <p className="error-text">
            {error}
          </p>
        )}

        <div className="input-group">
          <FaUser
            className="input-icon"
          />

          <input
           type="text"
           placeholder="Full Name"
           value={name}
           onChange={(e) =>
            setName(e.target.value)
           }
           required
          />
        </div>
          

        <div className="input-group">
  <FaEnvelope
    className="input-icon"
  />

  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
    required
  />
</div>

        <div className="input-group">
  <FaLock
    className="input-icon"
  />

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) =>
      setPassword(e.target.value)
    }
    required
  />
</div>

        <div className="auth-options">
            <label>
              <input type="checkbox" />
              Agree to terms &
              conditions
            </label>
        </div>

        <button
           className="auth-button"
           type="submit"
        >
           {loading
              ? "Creating..."
              : "Register"}
        </button>

        <p className="auth-link">
           Already have an account?
           <span
               onClick={() =>
                  navigate("/login")
               }
           >
             Login
           </span>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;