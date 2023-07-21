import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("api/blog", blogRouter);

mongoose
  .connect(
    "mongodb+srv://Admin:yEt5hhj8TrGlEWxh@cluster0.9en11o2.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(8000))
  .then(() =>
    console.log("connected To Database and listening To localhost 8000")
  )
  .catch((err) => console.log(err));
