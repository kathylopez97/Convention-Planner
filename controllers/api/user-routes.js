const router = require("express").Router();
const { User } = require("../../models");

// Post for sign-up on website. Require a session so they stay logged in //
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isCreator: req.body.isCreator,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = dbUserData.username;
      req.session.userID = dbUserData.id;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Similar post to above, but for login instead of sign-up //
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password! Please try again." });
      return;
    }
    // Check password to make sure it agrees to data for email used to sign in //
    const correctPassword = dbUserData.checkPassword(req.body.password);

    if (!correctPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password! Please try again." });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = dbUserData.username;
      req.session.userID = dbUserData.id;

      res
        .status(200)
        .json({ user: dbUserData, message: "Successfully logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout post - cancels current session //
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
