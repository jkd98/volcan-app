import express  from "express";
import userRoutes from "./user.routes.js";


const rootRouter = express.Router();

rootRouter.use('/users',userRoutes);

export default rootRouter;