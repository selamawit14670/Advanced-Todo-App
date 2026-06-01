import { useState } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

function ResetPasswordPage() {
  const { token } =
    useParams();

  const navigate =
    useNavigate();

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    const response =
      await fetch(
        `http://localhost:5000/auth/reset-password/${token}`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            password,
          }),
        }
      );

    const data =
      await response.json();

    if (response.ok) {
      setMessage(
        "Password updated!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setMessage(data.error);
    }
  }

  return (
    <div className="auth-page">
      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >
        <h1>
          New Password
        </h1>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button type="submit">
          Update Password
        </button>

        {message && (
          <p>{message}</p>
        )}
      </form>
    </div>
  );
}

export default ResetPasswordPage;