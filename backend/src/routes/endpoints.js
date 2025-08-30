import express from 'express';
import { registerUser, loginUser } from '../controllers/controllers.js';

const router = express.Router();

// Ruta de registro
router.post('/register', registerUser);

// Ruta de login
router.post('/login', loginUser);

// Ruta de prueba de conexión
router.get('/test', async (req, res) => {
    try {
        res.json({ 
            success: true, 
            message: 'Conexión exitosa a la API' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error de conexión' 
        });
    }
});

export default router;