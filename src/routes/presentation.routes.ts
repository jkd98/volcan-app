import express from "express"
import { handle_input_errors } from "../midleware/handle_input_errors.js";
import { createPresentation } from "../controllers/Presentation.Controller.js";
import { create_presentation_validator } from "../validators/presentation_validator.js";


const router = express.Router();

router.route('/')
    .post(create_presentation_validator, handle_input_errors, createPresentation);

export default router;