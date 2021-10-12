import express from "express";

import { getUsers } from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", getUsers);
// router.get('/user/register', register)

export default router;
