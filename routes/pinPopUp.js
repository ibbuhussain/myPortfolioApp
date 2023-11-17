import 'dotenv/config'
import express from "express";
const router = express.Router();

import passport from 'passport';
import session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';

const pinThatIsSet = process.env.PIN
const users4pin = [{ i: 1,PinUser:'abc', pin:'12' }, ];
//-----------------------------------------------------------------------------------------------------------------  

//------------------------ ------------------------ ------------------------ 
// Set up a local strategy for passport
passport.use('pinCheck',new LocalStrategy({
  usernameField:'PinUser',
  passwordField: 'pin',
}, ( _,pin, done) => {
  const userP = users4pin.find(up => up.pin == pin);

  if (userP) {
    return done(null, userP);
  } else {
    return done(null, false, { message: 'Invalid PIN' });
  }
}));
//------------------------ ------------------------ ------------------------ 
// Serialize user to the session
passport.serializeUser((userP, done) => {
  done(null, userP.i);
});

// Deserialize user from the session
passport.deserializeUser((i, done) => {
  const userP = users4pin.find(up => up.i == i);
  done(null, userP);
});
//------------------------ ------------------------ ------------------------ 

// Define a route to handle login
router.post('/', passport.authenticate('pinCheck', {
  failureRedirect: '/todo',
  failureFlash: true // Enable flash messages for authentication failures
}), (req, res) => {
  // This callback will only be called on successful authentication
  res.redirect('/secuREtodo');
});



//------------------------ ------------------------ ------------------------ 

//------------------------ ------------------------ ------------------------ 
/*/ Define a route to handle logout
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
});*/
export default router;//*/
//------------------------ ------------------------ ------------------------ 





//-----------------------------------------------------------------------------------------------------------------  
//-----------------------------------------------------------------------------------------------------------------  
//-----------------------------------------------------------------------------------------------------------------  
//-----------------------------------------------------------------------------------------------------------------  
//-----------------------------------------------------------------------------------------------------------------  





/*/ Middleware for PIN authentication WITHOUT PASSPORT
const pinAuthentication = (req, res, next) => {
    const enteredPin = req.body.pin;
    // Check if the entered PIN is valid (replace this with your own validation logic)
    const isValidPin = enteredPin === pinThatIsSet; // Replace '1234' with your expected PIN
  
    if (isValidPin) {
      // If the PIN is valid, set a flag in the request object to indicate PIN authentication success
      req.pinAuthenticated = true;
      next();
    } else {
      //(" Invalid PIN, you can redirect to an error page or render an error message");
      res.render('todoView.ejs', { error: 'Invalid PIN' });
    }
  };
//-----------------------------------------------------------------------------------------------------------------  

router.post('/', pinAuthentication, (req, res) => { //
  // Redirect to the protected page with authentication query parameter
  //res.redirect('/todo');
  res.redirect('/todo?modalNotDisplayed=true');
});
//-----------------------------------------------------------------------------------------------------------------  
export default router;//*/
