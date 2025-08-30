import express from 'express';
import { registerUser, loginUser,getAllBooks, insertBook, updateBook, deleteBook } from '../controllers/controllers.js';

const router = express.Router();

// register endpoint
router.post('/register', registerUser);

// login endpoint
router.post('/login', loginUser);

//main endpoint for book recovery
router.get('/books', getAllBooks);

//endpoint for book uploading
router.post('/books', insertBook);

//endpoint for updating book information 
router.put('/books/:id', updateBook);

//endpoint for deleting book information
router.delete('/books/:id', deleteBook);

// Ruta de prueba de conexión
router.get('/test', async (req, res) => {
    try {
        res.json({ 
            success: true, 
            message: 'Conection to the API' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Conection ERROR' 
        });
    }
});

export default router;