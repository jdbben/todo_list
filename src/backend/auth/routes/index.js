var router = require("express").Router();
const { requiresAuth } = require("express-openid-connect");

router.get("/", requiresAuth(), function (req, res) {
  res.sendFile("todo.html", {
    root: "/home/jamal/web/todolist/src/backend/auth/public/",
    title: "Auth0 Webapp sample Nodejs",
    isAuthenticated: req.oidc.isAuthenticated(),
    userProfile: JSON.stringify(req.oidc.user, null, 2),
  });
});

router.get("/profile", requiresAuth(), function (req, res) {
  res.render("profile", {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: "Profile page",
  });
});

module.exports = router;
