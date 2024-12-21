import { getenv } from "./helpers";
import express from "express";
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";

import cors from "cors";

const session = require("express-session");
const MongoStore = require("connect-mongo");

getenv();

import router from "./routes";

const app = express();

export const imagepath = path.join(__dirname, "avatar");
export const csvpath = path.join(__dirname, "csvdata");

app.use("/api/static/", express.static(path.join(__dirname, "avatar")));
app.use("/api/csv/", express.static(path.join(__dirname, "csvdata")));

app.use(
  cors({
    origin: "http://api",
    credentials: true,
  })
);

//Session and Cookie
const appsession = session({
  store: new MongoStore({
    mongoUrl: process.env.MONGO_URL,
    ttl: 14 * 24 * 60 * 60,
    autoRemove: "native",
  }),
  secret: process.env.COOKIE_SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  name: process.env.COOKIE_SESSION_NAME,
  cookie: {
    secure: false, // if true: only transmit cookie over https, in prod, always activate this
    httpOnly: false, // if true: prevents client side JS from reading the cookie
    maxAge: 1000 * 60 * 30, // session max age in milliseconds
    // explicitly set cookie to lax
    // to make sure that all cookies accept it
    // you should never use none anyway
    sameSite: true,
  },
});

app.use(appsession);

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Helmet (no-cache)
app.use(helmet());

// Logging
// Morgan Logs
//'https://docs.google.com/document/d/124tWSFyct-syLGJHifsbUbtQyv-KTuKfFpV9p3Nu_9c/edit?usp=sharing'
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./logs/access.log"),
  {
    flags: "a",
  }
);

//app.use(morgan("dev"));
app.use(morgan("combined", { stream: accessLogStream }));

const getSessionId = () => {
  morgan.token("sessionid", (req: Request) => {
    return req.sessionID ? req.sessionID : "------";
  });
};

const getSessionUser = () => {
  morgan.token("user", (req: Request) => {
    try {
      const { authUserId } = req.session;
      return authUserId;
    } catch (error) {
      return "-----";
    }
  });
};

getSessionId();
getSessionUser();

app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :user :sessionid'
  )
);

app.use(router);

//Error Handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ msg: "Unable to find the requested resource!" });
});

export default app;
