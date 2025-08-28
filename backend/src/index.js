import express from 'express'
const router = express.Router()
import { app } from "./database/conection_credentials.js"
const PORT = 3001

router.get('/user', async (req, res) => {
  try {
    const [books] = await db.execute('SELECT * FROM books');
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener libros' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor temporal ejecutándose en: http://localhost:${PORT}`);
  console.log(`📚 Endpoint de libros: http://localhost:${PORT}/api/books`);
  console.log(`🔧 Endpoint de prueba: http://localhost:${PORT}/api/test`);
});

