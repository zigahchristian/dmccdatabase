import cors, { CorsOptions } from "cors";

const whitelist = new Set(["http://localhost:8081", "*"]);
const corsOptions: CorsOptions = {
  optionsSuccessStatus: 200,
  origin: (origin, callback) => {
    if (whitelist.has(origin ?? "")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

export default cors(corsOptions);
