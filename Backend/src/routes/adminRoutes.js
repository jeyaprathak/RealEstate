import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import adminMiddleware from "../middlewares/adminMiddleware.js";

import {

  getPendingProperties,

  approveProperty,

  rejectProperty

} from "../controllers/adminController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin Management APIs
 */


/**
 * @swagger
 * /api/admin/pending-properties:
 *   get:
 *     summary: Get Pending Properties
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending properties fetched successfully
 */
router.get(

  "/pending-properties",

  authMiddleware,

  adminMiddleware,

  getPendingProperties

);


/**
 * @swagger
 * /api/admin/approve-property/{id}:
 *   put:
 *     summary: Approve Property
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
 *         description: Property approved successfully
 */
router.put(

  "/approve-property/:id",

  authMiddleware,

  adminMiddleware,

  approveProperty

);


/**
 * @swagger
 * /api/admin/reject-property/{id}:
 *   delete:
 *     summary: Reject Property
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
 *         description: Property rejected successfully
 */
router.delete(

  "/reject-property/:id",

  authMiddleware,

  adminMiddleware,

  rejectProperty

);

export default router;