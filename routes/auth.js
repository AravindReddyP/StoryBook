const express = require('express');
const passport = require('passport');
const router = express.Router();

// login with google auth  GET/auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// google auth callback     GET/auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// logout user    /auth/logout
router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/'); // this will take us to header partial i.e it is being inserted into another view
});

module.exports = router;
