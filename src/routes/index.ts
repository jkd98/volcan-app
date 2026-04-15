import express  from "express";
import userRoutes from "./user.routes.js";
import presentationRoutes from  "./presentation.routes.js";

const rootRouter = express.Router();

rootRouter.use('/users',userRoutes);
rootRouter.use('/presentations',presentationRoutes);

export default rootRouter;