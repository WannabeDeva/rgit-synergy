import express from "express";
import userRouter from "./routes/userRoute.js"; // Adjust the path if necessary

const app = express();

app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS
app.use("/api/user", userRouter); // Mount user routes

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
