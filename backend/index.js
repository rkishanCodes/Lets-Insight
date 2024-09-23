import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import session from "express-session";
import cors from "cors"; // Import cors middleware
 // Import express-session

dotenv.config();

const app = express();
const port = process.env.PORT || 5002;

//middlewares
import router from "./routes/authRoutes.js";
import admin_route from "./routes/AdminRoutes.js";
app.use(express.json());

app.use(cors());

connectDB();

app.use(
  session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
   
  })
);

app.use("/api/v0/auth", router);

app.use("/api/v0/admin", admin_route);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
