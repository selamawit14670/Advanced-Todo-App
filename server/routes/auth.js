const crypto = require("crypto");
const transporter = require("../mailer");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pool = require("../db");

const router = express.Router();

/*
-------------------------
REGISTER
-------------------------
*/

router.post(
  "/register",
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const result =
        await pool.query(
          `
          INSERT INTO users
          (
            name,
            email,
            password
          )
          VALUES
          (
            $1,
            $2,
            $3
          )
          RETURNING
          id,
          name,
          email
          `,
          [
            name,
            email,
            hashedPassword,
          ]
        );

      res.json(
        result.rows[0]
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error:
          "Registration failed",
      });
    }
  }
);

/*
-------------------------
LOGIN
-------------------------
*/

router.post(
  "/login",
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      const result =
        await pool.query(
          `
          SELECT *
          FROM users
          WHERE email = $1
          `,
          [email]
        );

      const user =
        result.rows[0];

      if (!user) {
        return res
          .status(400)
          .json({
            error:
              "User not found",
          });
      }

      const validPassword =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!validPassword) {
        return res
          .status(400)
          .json({
            error:
              "Wrong password",
          });
      }

      const token =
        jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error:
          "Login failed",
      });
    }
  }
);

router.post(
  "/forgot-password",
  async (req, res) => {
    try {
      const { email } = req.body;

      const result =
        await pool.query(
          `
          SELECT *
          FROM users
          WHERE email = $1
          `,
          [email]
        );

      const user =
        result.rows[0];

      if (!user) {
        return res.json({
          message:
            "If the account exists, a reset link has been sent.",
        });
      }

      const resetToken =
        crypto
          .randomBytes(32)
          .toString("hex");

      const expiry =
        new Date(
          Date.now() +
            1000 * 60 * 30
        );

      await pool.query(
        `
        UPDATE users
        SET
          reset_token = $1,
          reset_token_expiry = $2
        WHERE id = $3
        `,
        [
          resetToken,
          expiry,
          user.id,
        ]
      );

      const resetLink =
        `http://localhost:5173/reset-password/${resetToken}`;

      await transporter.sendMail({
        from:
          "todo@app.com",

        to: email,

        subject:
          "Password Reset",

        html: `
          <h2>Password Reset</h2>

          <p>
            Click the link below:
          </p>

          <a href="${resetLink}">
            Reset Password
          </a>
        `,
      });

      res.json({
        message:
          "Reset email sent",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error:
          "Failed to send reset email",
      });
    }
  }
);

router.post(
  "/reset-password/:token",
  async (req, res) => {
    try {
      const { token } =
        req.params;

      const { password } =
        req.body;

      const result =
        await pool.query(
          `
          SELECT *
          FROM users
          WHERE reset_token = $1
          AND reset_token_expiry > NOW()
          `,
          [token]
        );

      const user =
        result.rows[0];

      if (!user) {
        return res
          .status(400)
          .json({
            error:
              "Invalid or expired token",
          });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      await pool.query(
        `
        UPDATE users
        SET
          password = $1,
          reset_token = NULL,
          reset_token_expiry = NULL
        WHERE id = $2
        `,
        [
          hashedPassword,
          user.id,
        ]
      );

      res.json({
        message:
          "Password updated successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error:
          "Reset failed",
      });
    }
  }
);

router.get("/test", (req, res) => {
  res.send("Auth routes working");
});



module.exports = router;