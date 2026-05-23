import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import upload from "../middlewares/uploadMiddleware.js";

import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Image Upload APIs
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload Property Image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 */
router.post(

  "/",

  authMiddleware,

  upload.single("image"),

  uploadImage

);

export default router;