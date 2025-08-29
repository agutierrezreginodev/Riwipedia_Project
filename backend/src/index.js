
import express from 'express'
const router = express.Router()
import { app } from "./database/conection_credentials.js"
const PORT = 3001

router.get('/api/books', async (req, res) => {
  try {
      console.log("usserName");
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener libros' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor temporal ejecutándose en: http://localhost:${PORT}`);
  console.log(`📚 Endpoint de libros: http://localhost:${PORT}/api/books`);
  console.log(`🔧 Endpoint de prueba: http://localhost:${PORT}/api/test`);
});

