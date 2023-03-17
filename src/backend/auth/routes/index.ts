import express from "express";
import { requiresAuth } from "express-openid-connect";
const router = express.Router();

router.get("/", requiresAuth(), function (req, res) {
  res.sendFile("todo.html", {
    root: "/home/jamal/web/todolist/dist/public/frontend/",
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

export default router;
