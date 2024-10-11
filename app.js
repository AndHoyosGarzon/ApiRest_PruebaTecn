import express from "express";
import connectionDB from "./db/connectionDB.js";
import dotenv from "dotenv";
import router from "./routes/user.routes.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  connectionDB();
  console.log(`Server listening on PORT http://localhost:${PORT}`);
});
