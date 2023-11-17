/*/IMPORTANT NOTES
In order to route to html from the respective js files,
 js files should be in public folder
-There should be '/' on the file compulsary
  only ('/' for GET) , ('/xyz' for post) */
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
import 'dotenv/config'
import express from "express";
import bodyParser from "body-parser";
import ejs from 'ejs';
import path from "path";import { dirname } from "path";import { fileURLToPath } from "url";const __dirname = dirname(fileURLToPath(import.meta.url));

import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';

const app = express();
const port = 3005;
app.set('view engine', 'ejs');
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

// Configure session
app.use(session({
  secret: 'aL0nG_R@nd0m_S3cr3t_K3y',
  resave: false,
  saveUninitialized: true
}));
// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

//------------------------  Use middleware------------------------ 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/public', express.static(path.join(__dirname, './public')));
 app.use(express.static(path.join(__dirname, '/public')));

app.use(flash());// Use connect-flash 
//------------------------ ------------------------ ------------------------ 

//------------------------  Use routes------------------------ 
import mainLogn from './routes/mainLogin.js';
import popUPpin from './routes/pinPopUp.js'; // for TODO

// import todoDis from './routes/todoDisplay.js';
// import todoHandles from './routes/todoHandleDb.js';
import directions from './routes/nav.js';
import secureit from './routes/securePages.js';

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

//------------------------ required js files ---------------------------------------------------------------------------------
//const db = require("./jsLogic/db.js"); // Import the database connection in CJS
 import db from "./public/jsLogic/database.js"; // Import the database connection in ES
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬


//-----------------------------------------------------------------------------------------------------------------------------
//                          ACTUAL ROUTING BEGINS
//-----------------------------------------------------------------------------------------------------------------------------
app.use('/',directions); //All get requests are here handled
// Define a route to handle login ibbuhussain  -- HERE
 app.use('/login', mainLogn); //from PP to dashbrd // handling POST request
 app.use('/', mainLogn); //from PP to dashbrd for LOGOUT -only'/' for GET , /xyz for post

 app.use('/authenticate-pin', popUPpin); // Middleware for Passport PIN authentication
 app.use('/',secureit); //FOr Security routes



//------------------------ ------------------------ ------------------------- 
//-------------  todoDisplay  HERE -------------  ------------- ------------- 
//------------------------ ------------------------ ------------------------- 

app.get('/api/todos', async (req, res) => {
    try {
        let todo = [];
        const result = await db.query("SELECT * FROM crtable ORDER BY id DESC");
        todo = result.rows;
        //console.log("SELECTQUERY");
        res.json(todo);

    } catch (err) {
        console.log(err);
    }
});

//------------------------ ------------------------ ------------------------- 
//--------Handle POST requests to /addTask  HERE--------------- ------------- 
//------------------------ ------------------------ ------------------------- 
app.post('/addTask', async (req, res) => {
    const { id, name, status, date } = req.body;
  
    try {
      // Perform the database update logic for adding a new task
      await db.query("INSERT INTO crtable (name, status, date) VALUES ($1, $2, $3)", [name, status, date]);
  
      // Redirect after sending the JSON response
      return res.redirect("/secuREtodo");
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//------------------------ ------------------------ ------------------------- 
//--------Handle POST requests to /updateTask HERE--------------- ----------- 
//------------------------ ------------------------ ------------------------- 
  app.post('/updateTask', async (req, res) => {
    const { id, name } = req.body;
      try {
      // Perform the database update logic for updating an existing task
      await db.query("UPDATE crtable SET name = ($1) WHERE id = $2 ", [name, id]);
  
      // Redirect after sending the JSON response
      return res.redirect("/secuREtodo");
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//------------------------ ------------------------ ------------------------- 
//--------Handle POST requests to /deleteTodo HERE--------------- ----------- 
//------------------------ ------------------------ ------------------------- 
app.post('/deleteTodo', async (req, res) => {
    const { id } = req.body;
      try {
      await db.query("DELETE FROM crtable WHERE id = $1", [id]);
      res.redirect("/secuREtodo");
    } catch (err) {
      console.log(err);
    }
  });
//------------------------ ------------------------ ------------------------- 
//--------Handle POST requests to /statusUpdate HERE--------------- --------- 
//------------------------ ------------------------ ------------------------- 
  app.post('/statusUpdate', async (req, res) => {
    const { id, status } = req.body;
      try {
      await db.query("UPDATE crtable SET status = ($1) WHERE id = $2 ", [status, id]);
      res.redirect("/secuREtodo");
    } catch (err) {
      console.log(err);
    }
  });
  

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
////¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬ E N D ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
