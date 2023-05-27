const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUser, updateUser, deleteUser, getUserByTempId } = require('../controllers/users.controller');

// Crear un nuevo usuario
router.post('/user', createUser);

// Obtener usuarios
router.get('/user', getAllUsers);

// Obtener un usuario por ID
router.get('/user/:userId', getUser);

router.get('/user-active/:tempId', getUserByTempId);

// Actualizar un usuario por ID
router.put('/user/:id', updateUser);

// Eliminar un usuario por ID
router.delete('/user/:id', deleteUser);

module.exports = router;
