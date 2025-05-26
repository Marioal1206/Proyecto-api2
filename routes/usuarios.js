const express = require('express');
const router = express.Router();
const db = require('../db')
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
  db.query('SELECT * FROM usuarios', (err, resultados) => {
    if (err) {
      console.error('❌ Error en la consulta:', err.message);
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(resultados);
  });
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
  const { nombre, correo } = req.body;

  if (!nombre || !correo) {
    return res.status(400).json({ error: 'Nombre y correo son requeridos' });
  }

  db.query(
    'INSERT INTO usuarios (nombre, correo) VALUES (?, ?)',
    [nombre, correo],
    (err, resultado) => {
      if (err) {
        console.error('❌ Error al insertar usuario:', err.message);
        return res.status(500).json({ error: 'Error al crear usuario' });
      }

      res.status(201).json({
        mensaje: 'Usuario creado',
        usuario: { id: resultado.insertId, nombre, correo }
      });
    }
  );
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
  const id = req.params.id;

  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, resultado) => {
    if (err) {
      console.error('❌ Error al eliminar usuario:', err.message);
      return res.status(500).json({ error: 'Error al eliminar usuario' });
    }

    res.json({ mensaje: `Usuario con ID ${id} eliminado.` });
  });
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
  const { nombre } = req.body;

  db.query('UPDATE usuarios SET nombre = ? WHERE id = ?', [nombre, id], (err, resultado) => {
    if (err) {
      console.error('❌ Error al actualizar usuario:', err.message);
      return res.status(500).json({ error: 'Error al modificar usuario' });
    }

    res.json({
      mensaje: `Usuario con ID ${id} modificado.`,
      usuario: { id, nombre }
    });
  });
});

module.exports = router;
