import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import {
  createProperty,
  getProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
  getSimilarProperties
} from "../controllers/propertyController.js";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Property Management APIs
 */


/**
 * @swagger
 * /api/properties:
 *   post:
 *     summary: Create Property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Luxury Villa"
 *             description: "Beautiful villa with swimming pool"
 *             city: "Chennai"
 *             location: "OMR"
 *             price: 5000000
 *             bedrooms: 4
 *             bathrooms: 3
 *             propertyType: "Villa"
 *             image: "https://example.com/image.jpg"
 *     responses:
 *       201:
 *         description: Property created successfully
 */
router.post(
  "/",
  authMiddleware,
  createProperty
);


/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Get All Properties
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *       - in: query
 *         name: propertyType
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Properties fetched successfully
 */
router.get("/", getProperties);


/**
 * @swagger
 * /api/properties/featured:
 *   get:
 *     summary: Get Featured Properties
 *     tags: [Properties]
 *     responses:
 *       200:
 *         description: Featured properties fetched successfully
 */
router.get(
  "/featured",
  getFeaturedProperties
);


/**
 * @swagger
 * /api/properties/{id}:
 *   get:
 *     summary: Get Single Property
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Property fetched successfully
 */
router.get(
  "/:id",
  getSingleProperty
);


/**
 * @swagger
 * /api/properties/{id}:
 *   put:
 *     summary: Update Property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Updated Villa"
 *             price: 7000000
 *     responses:
 *       200:
 *         description: Property updated successfully
 */
router.put(
  "/:id",
  authMiddleware,
  updateProperty
);


/**
 * @swagger
 * /api/properties/{id}:
 *   delete:
 *     summary: Delete Property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Property deleted successfully
 */
router.delete(
  "/:id",
  authMiddleware,
  deleteProperty
);


/**
 * @swagger
 * /api/properties/similar/{id}:
 *   get:
 *     summary: Get Similar Properties
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Similar properties fetched successfully
 */
router.get(
  "/similar/:id",
  getSimilarProperties
);

export default router;