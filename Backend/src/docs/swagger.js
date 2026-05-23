import swaggerJsdoc from "swagger-jsdoc";

const options = {

  definition: {

    openapi: "3.0.0",

    info: {

      title: "Real Estate API",

      version: "1.0.0",

      description: "Real Estate Backend API"

    },

    servers: [
      {
        url: "http://localhost:5000"
      }
    ],

    tags: [

      {
        name: "Auth"
      },

      {
        name: "Properties"
      },

      {
        name: "Upload"
      },

      {
        name: "Inquiries"
      },

      {
        name: "Dashboard"
      },

      {
        name: "Admin"
      }

    ],

    components: {

      securitySchemes: {

        bearerAuth: {

          type: "http",

          scheme: "bearer",

          bearerFormat: "JWT"

        }

      }

    },

    security: [
      {
        bearerAuth: []
      }
    ]

  },

  apis: ["./src/routes/*.js"]

};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;