const swaggerJsdoc = require('swagger-jsdoc');

// Configuración de OpenAPI
const opciones = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuarios',
      version: '1.0.0',
      description: 'Documentación de la API usando RapiDoc',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Rutas documentadas con comentarios Swagger
};

const specs = swaggerJsdoc(opciones);

module.exports = specs;
