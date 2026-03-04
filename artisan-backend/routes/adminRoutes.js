import express from "express";
import { getAllActions, getTopWishlisted, getTopCarted } from "../controllers/adminController.js"; // Note the .js

const router = express.Router();

router.get("/actions", getAllActions);
router.get("/top-wishlisted", getTopWishlisted);
router.get("/top-carted", getTopCarted);

export default router; // ✅ ESM
