import http from "http";
import { connectDB } from "./helpers";
import app from "./app";

const server = http.createServer(app);

const PORT = process.env.SERVER_PORT || 7242;

console.log(process.env.MONGO_URL);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    server.listen(PORT, () => {
      console.log(
        `Server is running in ${process.env.NODE_ENV} mode on Port ${PORT} (^_^)`
      );
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

start();
