import 'dotenv/config'

// Middleware for PIN authentication
const pinAuthentication = (req, res, next) => {
    const enteredPin = req.body.pin;
    // Check if the entered PIN is valid (replace this with your own validation logic)
    const isValidPin = enteredPin === process.env.PIN; // Replace '1234' with your expected PIN
  
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






//-----------------------------------------------------------------------------------------------------------------  
 // module.exports = { pinAuthentication, authenticate };
  export default pinAuthentication;