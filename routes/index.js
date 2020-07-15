const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Story = require('../models/Story');

//whenever you want to use middleware with  a route you add it as a second argument

// login/landing page
router.get('/', ensureGuest, (req, res) => {
  // only someone who is not logged in should see this page
  res.render('login', { layout: 'login' });
});

// dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  //  ensureAuth he is logged so no need to view login page again

  try {
    const stories = await Story.find({ user: req.user.id }).lean(); //Documents returned from queries with the lean option enabled are plain javascript objects, not MongooseDocuments.
    res.render('dashboard', {
      name: req.user.firstName,
      stories,
    });
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
});
module.exports = router;
