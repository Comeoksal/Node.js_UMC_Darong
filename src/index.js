import dotenv from "dotenv"
import cors from "cors"
import express from 'express'
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleStore } from "./controllers/store.controller.js";
import { handleRegion } from "./controllers/region.controller.js";
import { handleReview } from "./controllers/review.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/store", handleStore);
app.post("/api/v1/region", handleRegion);
app.post("/api/v1/review", handleReview);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})