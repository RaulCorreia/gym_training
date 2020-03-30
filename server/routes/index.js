const express = require('express');
const router = express.Router();

const authMidd = require('../../middleware/auth');
const userController = require('../controllers/userController')


router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/user/:user_id', authMidd.verifyJWT, userController.getUser);

// router.get('/users', (req, res) => {}); //Listar todos
// router.post('/users', (req, res) => {}); // Criar
// router.get('/users/:id', (req, res) => {}); //Buscar
// router.put('/users/:id', (req, res) => {}); //Editar
// router.delete('/users/:id', (req, res) => {}); //Deletar

module.exports = router;