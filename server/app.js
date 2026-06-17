import express from 'express';
import {connectDB} from "./configs/dbConfig.js"
import Authrouter from './routes/authRoutes.js';
import subscriberRouter from './routes/subscribersRoutes.js';
import contactRouter from "./routes/contactRoutes.js"
import blogRouter from "./routes/blogRouter.js"
import bookingRouter from "./routes/bookingRouter.js"
import tripRouter from "./routes/tripRouter.js"
import userRouter from "./routes/userRouter.js"
import {config} from 'dotenv';
import cors from "cors";

const app = express();
config({path:"./config.env"})

app.use(express.json());
// app.use(authorization);

app.use(cors({
    origin:[process.env.FRONTEND_URI || "http://localhost:5173"],
    methods:["POST","GET","PUT","DELETE" ,"PATCH","OPTIONS"],
    allowedHeaders:["content-Type", "Authorization"]
}));

app.use('/api/auth', Authrouter)
app.use('/api',subscriberRouter )
app.use('/api', contactRouter)
app.use('/api', blogRouter)
app.use('/api', bookingRouter)
app.use("/api", tripRouter)
app.use("/api", userRouter)




connectDB();
export default app;