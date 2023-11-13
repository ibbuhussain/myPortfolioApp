todos SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON

import express from "express";
const router = express.Router();

// Import your database connection (assuming 'db' is your database connection)
import db from "../public/jsLogic/database.js"; // Import the database connection in ES


//`¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬Handle POST requests to /addTask  HERE¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
// Handle POST requests to /addTask
router.post('/addTask', async (req, res) => {
  const { id, name, status, date } = req.body;

  try {
    // Perform the database update logic for adding a new task
    await db.query("INSERT INTO crtable (name, status, date) VALUES ($1, $2, $3)", [name, status, date]);

    // Redirect after sending the JSON response
    return res.redirect("/todo");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  //`¬¬¬¬¬¬¬¬¬¬¬¬ Handle POST requests to /updateTask HERE¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
// Handle POST requests to /updateTask
router.post('/updateTask', async (req, res) => {
  const { id, name } = req.body;

  try {
    // Perform the database update logic for updating an existing task
    await db.query("UPDATE crtable SET name = ($1) WHERE id = $2 ", [name, id]);

    // Redirect after sending the JSON response
    return res.redirect("/todo");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  //`¬¬¬¬¬¬¬¬¬¬¬¬ Handle POST requests to /deleteTask HERE¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
// Handle POST requests to /deleteTodo
router.post('/deleteTodo', async (req, res) => {
  const { id } = req.body;

  try {
    await db.query("DELETE FROM crtable WHERE id = $1", [id]);
    res.redirect("/todo");
  } catch (err) {
    console.log(err);
  }
});

  //`¬¬¬¬¬¬¬¬¬¬¬¬ Handle POST requests to /statusUpdate HERE¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
// Handle POST requests to /statusUpdate
router.post('/statusUpdate', async (req, res) => {
  const { id, status } = req.body;

  try {
    await db.query("UPDATE crtable SET status = ($1) WHERE id = $2 ", [status, id]);
    res.redirect("/todo");
  } catch (err) {
    console.log(err);
  }
});

export default router;