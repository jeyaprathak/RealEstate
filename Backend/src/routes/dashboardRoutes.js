import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import adminMiddleware from "../middlewares/adminMiddleware.js";

import { adminDashboard }
from "../controllers/dashboardController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard APIs
 */

/**
 * @swagger
 * /api/dashboard/admin:
 *   get:
 *     summary: Admin Dashboard Analytics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data fetched successfully
 */
router.get(

  "/admin",

  authMiddleware,

  adminMiddleware,

  adminDashboard

);

export default router;