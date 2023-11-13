import 'dotenv/config'
import express from "express";
const router = express.Router();


// Define a route to handle login ibbuhussain
router.post('/', (req, res) => {
    const { full_name, password } = req.body;
  //Login check via Dummy user data stored in an array
  const users = [
    { username: process.env.LOCAL_USER, password: process.env.PASSWORD } // Add more users here
  ];
      // Check if the entered credentials match a user in the array
      const user = users.find(u => u.username === full_name && u.password === password);
  
      if (user) {
        // Login successful, store user in local storage
          res.redirect("dashbrd");
      } 
      else {
        // Login failed
        res.render('PP', { error: 'Invalid Username or Password' });
        // Use EJS file to display the error
        }
      
    
  });

  //module.exports = router; commomjs
  export default router;