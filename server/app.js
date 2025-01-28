import { getenv } from "./helpers/helpers.js";
import express from "express";
import fs from "fs";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import { fileURLToPath } from "url";

import cors from "cors";

import session from "express-session";
import MongoStore from "connect-mongo";

getenv();
console.log(process.env.MONGO_URL);

import router from "./routes/routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

console.log(__dirname);
export const imagepath = path.join(__dirname, "avatar");
console.log(imagepath);

app.use("/api/static", express.static(imagepath));

app.use(
  cors({
    origin: "http://localhost:5173/api/", //http://api
    credentials: true,
  })
);

//Session and Cookie
const appsession = session({
  store: new MongoStore({
    mongoUrl: process.env.MONGO_URL,
    ttl: 172800000,
    autoRemove: "native",
  }),
  secret: process.env.COOKIE_SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  name: process.env.COOKIE_SESSION_NAME,
  cookie: {
    secure: false, // if true: only transmit cookie over https, in prod, always activate this
    httpOnly: false, // if true: prevents client side JS from reading the cookie
    maxAge: 172800000, // session max age in milliseconds
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
  morgan.token("sessionid", (req) => {
    return req.sessionID ? req.sessionID : "------";
  });
};

const getSessionUser = () => {
  morgan.token("user", (req) => {
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
app.use(function (req, res, next) {
  res.status(404).json({ msg: "Unable to find the requested resource!" });
});

export default app;
