todos SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON


import express from "express";
const router = express.Router();
import db from "../public/jsLogic/database.js"; // Import the database connection in ES

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------####################


router.get("/", async (req, res) => {
    //res.sendFile(path.join(__dirname, 'views', 'todoView.html'));
    res.render('todoView.ejs');

});

router.get('/api/todos', async (req, res) => {
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

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------####################
export default router;