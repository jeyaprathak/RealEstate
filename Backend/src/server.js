import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import helmet from "helmet";

import morgan from "morgan";

import cookieParser from "cookie-parser";

import swaggerUi from "swagger-ui-express";


// Swagger

import swaggerSpec from "./docs/swagger.js";


// Routes

import authRoutes from "./routes/authRoutes.js";

import propertyRoutes from "./routes/propertyRoutes.js";

import uploadRoutes from "./routes/uploadRoutes.js";

import featureRoutes from "./routes/featureRoutes.js";

import inquiryRoutes from "./routes/inquiryRoutes.js";

import dashboardRoutes from "./routes/dashboardRoutes.js";

import adminRoutes from "./routes/adminRoutes.js";


// Config

dotenv.config();

const app = express();


// Middlewares

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(helmet());

app.use(morgan("dev"));


// Root Route

app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message: "Real Estate API Running Successfully"

  });

});


// API Routes
app.use("/api/admin", featureRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);











// Swagger Docs

app.use(

  "/api-docs",

  swaggerUi.serve,

  swaggerUi.setup(swaggerSpec)

);


// 404 Route

app.use((req, res) => {

  res.status(404).json({

    success: false,

    message: "Route not found"

  });

});

// Server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`🚀 Server running on port ${PORT}`);

  console.log(

    `📄 Swagger Docs: http://localhost:${PORT}/api-docs`

  );

});