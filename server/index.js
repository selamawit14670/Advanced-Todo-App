require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
  
const authRoutes =
  require("./routes/auth");

const authMiddleware = require(
  "./middleware/authMiddleware"
);

const pool = require("./db");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/auth",
  authRoutes
);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/*
-----------------------------------
GET ALL TASKS
-----------------------------------
*/

app.get(
  "/tasks",
  authMiddleware,
  async (req, res) => {
    try {
      const user_id = req.user.id;

      const result =
        await pool.query(
          `
          SELECT *
          FROM tasks
          WHERE user_id = $1
          ORDER BY id DESC
          `,
          [user_id]
        );

      res.json(result.rows);
    } catch (error) {
      console.log(error.message);

      res.status(500).json({
        error: "Server error",
      });
    }
  }
);

app.get("/users", async (req, res) => {
  const result =
    await pool.query(
      "SELECT id, name, email FROM users"
    );

  res.json(result.rows);
});

/*
-----------------------------------
CREATE TASK
-----------------------------------
*/

app.post(
  "/tasks",
  authMiddleware,
  async (req, res) => {
  try {
    const {
      title,
      completed,
      deadline,
      estimate,
      priority,
      recurring,
      weekly_day,
      monthly_week,
    } = req.body;

    const user_id = req.user.id;
    
    const result = await pool.query(
      `
      INSERT INTO tasks
      (
        title,
        completed,
        deadline,
        estimate,
        priority,
        recurring,
        weekly_day,
        monthly_week,
        user_id
      )
      VALUES
      (
        $1, $2, $3, $4,
        $5, $6, $7, $8,
        $9
      )
      RETURNING *
      `,
      [
        title,
        completed,
        deadline,
        estimate,
        priority,
        recurring,
        weekly_day,
        monthly_week,
        user_id
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      error: "Server error",
    });
  }
});

/*
-----------------------------------
UPDATE TASK
-----------------------------------
*/

app.put(
  "/tasks/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        title,
        completed,
        deadline,
        estimate,
        priority,
        recurring,
        weekly_day,
        monthly_week,
      } = req.body;

      const result = await pool.query(
        `
        UPDATE tasks
        SET
          title = $1,
          completed = $2,
          deadline = $3,
          estimate = $4,
          priority = $5,
          recurring = $6,
          weekly_day = $7,
          monthly_week = $8
        WHERE id = $9
        AND user_id = $10
        RETURNING *
        `,
        [
          title,
          completed,
          deadline,
          estimate,
          priority,
          recurring,
          weekly_day,
          monthly_week,
          id,
          user_id,
        ]
      );

      res.json(result.rows[0]);
    } catch (error) {
      console.log(error.message);

      res.status(500).json({
        error: "Server error",
      });
    }
  }
);

app.put(
  "/tasks/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id;

      const {
        title,
        completed,
        deadline,
        estimate,
        priority,
        recurring,
        weekly_day,
        monthly_week,
      } = req.body;

      const result = await pool.query(
        `
        UPDATE tasks
        SET
          title = $1,
          completed = $2,
          deadline = $3,
          estimate = $4,
          priority = $5,
          recurring = $6,
          weekly_day = $7,
          monthly_week = $8
        WHERE id = $9
        AND user_id = $10
        RETURNING *
        `,
        [
          title,
          completed,
          deadline,
          estimate,
          priority,
          recurring,
          weekly_day,
          monthly_week,
          id,
          user_id,
        ]
      );

      res.json(result.rows[0]);
    } catch (error) {
      console.log(error.message);

      res.status(500).json({
        error: "Server error",
      });
    }
  }
);

/*
-----------------------------------
DELETE TASK
-----------------------------------
*/

app.delete(
  "/tasks/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;

      const user_id =
        req.user.id;

      await pool.query(
        `
        DELETE FROM tasks
        WHERE id = $1
        AND user_id = $2
        `,
        [id, user_id]
      );

      res.json({
        message: "Task deleted",
      });
    } catch (error) {
      console.log(error.message);

      res.status(500).json({
        error: "Server error",
      });
    }
  }
);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});