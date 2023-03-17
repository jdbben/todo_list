import express from "express";
import http from "http";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";
import { auth } from "express-openid-connect";
import * as dotenv from "dotenv";
dotenv.config({ path: "/home/jamal/web/todolist/src/backend/auth/.env" });
const app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:3000",
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET,
};

app.use(express.json());
const port = process.env.PORT || 3000;
if (
  !config.baseURL &&
  !process.env.BASE_URL &&
  process.env.PORT &&
  process.env.NODE_ENV !== "production"
) {
  config.baseURL = `http://localhost:${port}`;
}
app.use(auth(config));
// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

app.get("/api/user.json", (req, res) => {
  res.locals.user = req.oidc.user;
  const user = res.locals.user;
  res.json(user);
});
app.use("/", router);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err: Error = new Error("Not Found");
  next(err);
});

// Error handlers
app.use(function (
  err: { status: any; message: any },
  req: any,
  res: {
    status: (arg0: any) => void;
    render: (arg0: string, arg1: { message: any; error: any }) => void;
  },
  next: any
) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: process.env.NODE_ENV !== "production" ? err : {},
  });
});

http.createServer(app).listen(port, () => {
  console.log(`Listening on ${config.baseURL}`);
});
