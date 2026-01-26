import "dotenv/config"
import express from "express"
import rootRouter from "./routes/index.js"
import { errorMiddleware } from "./middlewares/errors.js"

const app = express()
app.use(express.json())
app.use("/api", rootRouter)
app.use(errorMiddleware)

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running")
})