const express = require('express');
const app = express();
const specs = require('./swagger');
const usuariosRouter = require('./routes/usuarios');

app.use(express.json());
const puerto = 3000;

// Ruta API
app.use('/api/usuarios', usuariosRouter);

// Servir el archivo OpenAPI JSON
app.get('/openapi.json', (req, res) => {
  res.json(specs);
});
console.log('Conectando a DB en:', process.env.DB_HOST);

// Interfaz de documentación con RapiDoc
app.get('/docs', (req, res) => {
  res.send(`
    <!doctype html>
    <html>
      <head>
        <title>Documentación API - RapiDoc</title>
        <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
      </head>
      <body>
        <rapi-doc
          spec-url="/openapi.json"
          theme="light"
          render-style="focused"
          show-header="true"
          heading-text="API de Usuarios"
        ></rapi-doc>
      </body>
    </html>
  `);
});

app.listen(puerto, () => {
  console.log(`API corriendo en http://localhost:${puerto}`);
  console.log(`Documentación en http://localhost:${puerto}/docs`);
});
