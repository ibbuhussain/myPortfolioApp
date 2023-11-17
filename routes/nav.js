import express from "express";
const router = express.Router();
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));




router.get("/", (req, res) => {
    // Use res.sendFile to send an HTML file
    // res.sendFile(path.join(__dirname, 'views', 'PP.html'));
      res.render('PP.ejs');
});

router.get("/bookmarks", (req, res) => {
    // Use res.sendFile to send an HTML file
    res.sendFile(path.join(__dirname,'..', 'views', 'bookmarks.html'));
}); 

// app.get("/signUp", (req, res) => {
//     // Use res.sendFile to send an HTML file
//     res.sendFile(path.join(__dirname, 'views', 'signUp.html'));
// }); 

/*router.get("/dashbrd", (req, res) => {  //MOVED TO SECURE PAGES ROUTE
    // Use res.sendFile to send an HTML file
    //res.sendFile(path.join(__dirname, 'views', 'dashbrd.html'));
    res.render('dashbrd.ejs');
});//*/

export default router;