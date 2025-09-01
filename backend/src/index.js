// 1. Import dependencies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import endpoints from './routes/endpoints.js';

dotenv.config();


// 2. Configure server
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 3. Connect routes
app.use('/api', endpoints);

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Online Library API working' });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
    console.log(`📋 Available routes:`);
    console.log(`   - GET  http://localhost:${PORT}/api/test`);
    console.log(`   - POST http://localhost:${PORT}/api/register`);
    console.log(`   - POST http://localhost:${PORT}/api/login`);
});

export default app;