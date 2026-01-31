import "dotenv/config"
import express from "express"
import rootRouter from "./routes/index.js"
import { errorMiddleware } from "./middlewares/errors.js"

const app = express()
app.use(express.json())
import cors from "cors";

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://e-commerce-front-end.pages.dev",
      "https://gear.sidlabs.shop"
    ],
    credentials: true,
  })
);

app.use("/api", rootRouter)
app.use(errorMiddleware)

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running")
})