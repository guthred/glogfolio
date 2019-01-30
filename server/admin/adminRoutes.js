const passport = require("passport");

module.exports = app => {
  app.post(
    "/api/login",
    passport.authenticate("local", { failureFlash: true }),
    (req, res) => {
      res.sendStatus(200);
    }
  );

  app.post("/api/logout", (req, res) => {
    req.logout();
    res.sendStatus(200);
  });

  app.get("/api/current_user", (req, res) => {
    if (!req.user) {
      res.sendStatus(201);
    } else {
      res.status(200).send(req.user);
    }
  });
};
