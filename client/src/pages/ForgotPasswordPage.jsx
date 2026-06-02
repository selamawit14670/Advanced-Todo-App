import { useState } from "react";

function ForgotPasswordPage() {
  const [email, setEmail] =
    useState("");

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    const response = await fetch(
      "https://advanced-todo-app-wm53.onrender.com/auth/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();
    console.log(data);
    alert(data.message ||
    data.error ||
    "Request completed");
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
}

  return (
    <div className="auth-page">
      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >
        <h1>Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <button type="submit">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;