import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from "cors";

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect('mongodb+srv://admin:7wqgOjtHBPAa6dlY@cluster0.tdiokko.mongodb.net/BlogApp?retryWrites=true&w=majority'
).then(() => {
   console.log("database connected");
}).catch((err) =>{
   console.log("No connection to database" + err);
});

app.use("/api/user", router);

app.use("/api/blog", blogRouter);

// app.use("/api", (req, res, next) => {
//    res.send("Hello world");
// });

app.listen(port, () =>{
   console.log(`Server is running on port ${port}`);
});