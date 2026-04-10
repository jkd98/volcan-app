import express from "express";
import {
    createUser
} from "../controllers/UserController.js"
import { create_user_validator } from "../validators/user_validator.js";
import { handle_input_errors } from "../midleware/handle_input_errors.js";

const router = express.Router();

router.route('/')
    .post(create_user_validator, handle_input_errors ,createUser);

export default router;