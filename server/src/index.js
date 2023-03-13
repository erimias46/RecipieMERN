import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { userRouter } from './routes/users.js';
import { recipieRouter } from "./routes/recipes.js";
const app = express()
app.use(cors())
app.use(express.json())
app.use("/auth", userRouter)
app.use('/recipes',recipieRouter)

mongoose.connect(
  "mongodb+srv://erimias46:nrGwKoFEfzM8gqhs@recipies.o3lfz5i.mongodb.net/recipes?retryWrites=true&w=majority"
).then(() => {
    console.log("database connected")
})
    .catch((err) => {
    console.log(err)
})

app.listen(3001, () => {
    console.log("Server in 3001")
})