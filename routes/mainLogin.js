import express from "express";
const router = express.Router();

import passport from 'passport';
import session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';

// Dummy user data stored in an array
const users = [
  {id :1, username: process.env.LOCAL_USER, password: process.env.PASSWORD } // Add more users here
];

//------------------------ ------------------------ ------------------------ 
/*/ Configure session SENT GLOBALLY
router.use(session({
  secret: 'aL0nG_R@nd0m_S3cr3t_K3y',
  resave: false,
  saveUninitialized: true
}));*/
/*/ Initialize Passport and session   SENT GLOBALLY
router.use(passport.initialize());
router.use(passport.session());*/

//------------------------ ------------------------ ------------------------ 
// Set up a local strategy for passport
passport.use('Login2Dash',new LocalStrategy({
  usernameField: 'full_name',
  passwordField: 'password',
}, (username, password, done) => {
  // Check if the entered credentials match a user in the array
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    return done(null, user);
  } else {
    return done(null, false, { message: 'Invalid Username or Password' });
  }
}));
//------------------------ ------------------------ ------------------------ 
// Serialize user to the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});
//------------------------ ------------------------ ------------------------ 

// Define a route to handle login
router.post('/', passport.authenticate('Login2Dash', {
  failureRedirect: '/erPP',
  failureFlash: true // Enable flash messages for authentication failures
}), (req, res) => {
  // This callback will only be called on successful authentication
  res.redirect('/dashbrd');
});
// Define a route to handle rendering the login form with flash messages
router.get('/erPP', (req, res) => {
  const error = req.flash('error');
  res.render('PP.ejs', { error });
});
//------------------------ ------------------------ ------------------------ 

//------------------------ ------------------------ ------------------------ 
// Define a route to handle logout
router.get('/logout', (req, res) => {
  // Using req.logout() to log the user out
  req.logout(err => {
    if (err) {
      return res.status(500).send('Error during logout');
    }
    // Clear any cookies or session-related data
    //res.clearCookie('your-cookie-name'); // Replace 'your-cookie-name' with the actual name of your cookie
    // Redirect to the desired location after logout
    res.redirect('/');
  });
});
//------------------------ ------------------------ ------------------------ 


/* Define a route to handle login ibbuhussain Without Passport
router.post('/', (req, res) => {
    const { full_name, password } = req.body;
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
  });//*/
  export default router ;
