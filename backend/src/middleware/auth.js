// AUTHENTICATION MIDDLEWARE
/*Authentication middleware is a piece of software that is inserted into the HTTP request processing cycle to check 
if a user is logged in and has the necessary permissions to access a resource. 
It acts as a guard or filter that intercepts incoming requests before they reach the controllers, 
validating credentials, tokens, or the active session. If authentication fails, 
it can redirect the user to a login page, while if it succeeds, 
it allows the request to continue to the desired controller or route.*/

import jwt from 'jsonwebtoken';
import promisePool from '../database/conection_credentials.js';

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Access denied. Token required.' 
            });
        }

    // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
    // Check if the user still exists in the database
        const [users] = await promisePool.execute(
            'SELECT id, email, rol FROM users WHERE id = ?',
            [decoded.id]
        );

        if (users.length === 0) {
            return res.status(401).json({ 
                success: false, 
                message: 'User does not exist.' 
            });
        }

        req.user = users[0];
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(403).json({ 
            success: false, 
            message: 'Invalid or expired token.' 
        });
    }
};

export default authenticateToken;