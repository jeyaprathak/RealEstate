import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import adminMiddleware from "../middlewares/adminMiddleware.js";

import { featureProperty } from "../controllers/featureController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin Management APIs
 */

/**
 * @swagger
 * /api/admin/feature-property/{id}:
 *   put:
 *     summary: Feature Property
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Property ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Property featured successfully
 *       404:
 *         description: Property not found
 */
router.put(

  "/feature-property/:id",

  authMiddleware,

  adminMiddleware,

  featureProperty

);

export default router;