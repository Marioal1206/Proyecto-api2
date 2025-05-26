const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *     x-codeSamples:
 *       - lang: cURL
 *         source: |
 *           curl http://localhost:3000/api/usuarios
 *       - lang: JavaScript
 *         label: fetch
 *         source: |
 *           fetch('http://localhost:3000/api/usuarios')
 *             .then(res => res.json())
 *             .then(console.log);
 *       - lang: Python
 *         label: requests
 *         source: |
 *           import requests
 *           response = requests.get('http://localhost:3000/api/usuarios')
 *           print(response.json())
 *       - lang: Node.js
 *         label: axios
 *         source: |
 *           const axios = require('axios');
 *           axios.get('http://localhost:3000/api/usuarios')
 *                .then(res => console.log(res.data));
 */

router.get('/', (req, res) => {
  res.json([{ id: 1, nombre: 'Mario' }]);
});

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan Pérez
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *     x-codeSamples:
 *       - lang: cURL
 *         source: |
 *           curl -X POST http://localhost:3000/api/usuarios \
 *           -H "Content-Type: application/json" \
 *           -d '{"nombre": "Juan Pérez"}'
 *       - lang: JavaScript
 *         label: fetch
 *         source: |
 *           fetch('http://localhost:3000/api/usuarios', {
 *             method: 'POST',
 *             headers: { 'Content-Type': 'application/json' },
 *             body: JSON.stringify({ nombre: 'Juan Pérez' })
 *           }).then(res => res.json()).then(console.log);
 *       - lang: Python
 *         label: requests
 *         source: |
 *           import requests
 *           response = requests.post('http://localhost:3000/api/usuarios', json={'nombre': 'Juan Pérez'})
 *           print(response.json())
 *       - lang: Node.js
 *         label: axios
 *         source: |
 *           const axios = require('axios');
 *           axios.post('http://localhost:3000/api/usuarios', { nombre: 'Juan Pérez' })
 *                .then(res => console.log(res.data));
 */
router.post('/', (req, res) => {
  res.status(201).json({ mensaje: 'Usuario creado', usuario: req.body });
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar usuario por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *     x-codeSamples:
 *       - lang: cURL
 *         source: |
 *           curl -X DELETE http://localhost:3000/api/usuarios/1
 *       - lang: JavaScript
 *         label: fetch
 *         source: |
 *           fetch('http://localhost:3000/api/usuarios/1', {
 *             method: 'DELETE'
 *           }).then(res => res.json()).then(console.log);
 *       - lang: Python
 *         label: requests
 *         source: |
 *           import requests
 *           response = requests.delete('http://localhost:3000/api/usuarios/1')
 *           print(response.json())
 *       - lang: Node.js
 *         label: axios
 *         source: |
 *           const axios = require('axios');
 *           axios.delete('http://localhost:3000/api/usuarios/1')
 *                .then(res => console.log(res.data));
 */
router.delete('/:id', (req, res) => {
  res.json({ mensaje: `Usuario con ID ${req.params.id} eliminado.` });
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Modificar usuario existente
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario a modificar
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Luis Ramírez
 *     responses:
 *       200:
 *         description: Usuario modificado exitosamente
 *     x-codeSamples:
 *       - lang: cURL
 *         source: |
 *           curl -X PUT http://localhost:3000/api/usuarios/1 \
 *           -H "Content-Type: application/json" \
 *           -d '{"nombre": "Luis Ramírez"}'
 *       - lang: JavaScript
 *         label: fetch
 *         source: |
 *           fetch('http://localhost:3000/api/usuarios/1', {
 *             method: 'PUT',
 *             headers: { 'Content-Type': 'application/json' },
 *             body: JSON.stringify({ nombre: 'Luis Ramírez' })
 *           }).then(res => res.json()).then(console.log);
 *       - lang: Python
 *         label: requests
 *         source: |
 *           import requests
 *           response = requests.put('http://localhost:3000/api/usuarios/1', json={'nombre': 'Luis Ramírez'})
 *           print(response.json())
 *       - lang: Node.js
 *         label: axios
 *         source: |
 *           const axios = require('axios');
 *           axios.put('http://localhost:3000/api/usuarios/1', { nombre: 'Luis Ramírez' })
 *                .then(res => console.log(res.data));
 */
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  res.json({
    mensaje: `Usuario con ID ${id} modificado.`,
    usuario: { id, ...datosActualizados }
  });
});

module.exports = router;
