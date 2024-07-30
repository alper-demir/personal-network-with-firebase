import express from "express"
import dotenv from "dotenv"
import router from "./router/router.js";
import db from "./db.js";
import cors from "cors"
const app = express();
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

db();
app.use("/api", router);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
})