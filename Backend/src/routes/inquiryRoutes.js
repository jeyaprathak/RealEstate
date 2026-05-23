import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import adminMiddleware from "../middlewares/adminMiddleware.js";

import {

  createInquiry,

  getMyInquiries,

  getAllInquiries,

  deleteInquiry

} from "../controllers/inquiryController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Inquiries
 *   description: Inquiry APIs
 */


/**
 * @swagger
 * /api/inquiries:
 *   post:
 *     summary: Send Inquiry
 *     tags: [Inquiries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - propertyId
 *               - message
 *             properties:
 *               propertyId:
 *                 type: integer
 *                 example: 1
 *               message:
 *                 type: string
 *                 example: I am interested in this property
 *     responses:
 *       201:
 *         description: Inquiry sent successfully
 */
router.post(
  "/",
  authMiddleware,
  createInquiry
);


/**
 * @swagger
 * /api/inquiries/my:
 *   get:
 *     summary: Get My Inquiries
 *     tags: [Inquiries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User inquiries fetched successfully
 */
router.get(
  "/my",
  authMiddleware,
  getMyInquiries
);


/**
 * @swagger
 * /api/inquiries/admin:
 *   get:
 *     summary: Get All Inquiries
 *     tags: [Inquiries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All inquiries fetched successfully
 */
router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  getAllInquiries
);


/**
 * @swagger
 * /api/inquiries/{id}:
 *   delete:
 *     summary: Delete Inquiry
 *     tags: [Inquiries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Inquiry ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inquiry deleted successfully
 */
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteInquiry
);

export default router;