// 1. Import dependencies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import endpoints from './routes/endpoints.js';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });


// 2. server cofiguration 
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());



// 3. routes conection
app.use('/api', endpoints);

// test route
app.get('/', (req, res) => {
    res.json({ message: 'library API working' });
});

// Error targeting
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
    });
});

// Server initilization
app.listen(PORT, () => {
    console.log(`✅ server running on http://localhost:${PORT}`);
    console.log(`📋 Routes:`);
    console.log(`   - GET  http://localhost:${PORT}/api/test`);
    console.log(`   - POST http://localhost:${PORT}/api/register`);
    console.log(`   - POST http://localhost:${PORT}/api/login`);
});

export default app;