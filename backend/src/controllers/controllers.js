import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import promisePool from '../database/conection_credentials.js';

// Function to check if email exists
async function checkEmailExists(email) {
    try {
        const [rows] = await promisePool.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );
        return rows.length > 0;
    } catch (error) {
        console.error('Error checking email:', error);
        throw error;
    }
}

// Registration controller
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

    console.log('Received registration data:', { email });

        // Validate empty fields
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email and password are required' 
            });
        }

        // Check if the email already exists
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            return res.status(400).json({ 
                success: false, 
                message: 'The email is already registered' 
            });
        }

    // Password hash
        const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user in the database
        const [result] = await promisePool.execute(
            'INSERT INTO users (username, email, user_password, rol) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, 'user']
        );

    console.log('User registered successfully:', username);

        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully',
            username: username
        });

    } catch (error) {
    console.error('Registration error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
};

// Login controller
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

    console.log('Trying to login with:', email);

        // Validate empty fields
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email and password are required' 
            });
        }

    // Search user in the database
        const [users] = await promisePool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({ 
                success: false, 
                message: 'Incorrect credentials' 
            });
        }

        const user = users[0];

    // Check password
        const validPassword = await bcrypt.compare(password, user.user_password);
        if (!validPassword) {
            return res.status(401).json({ 
                success: false, 
                message: 'Incorrect credentials' 
            });
        }

    // Generate JWT token
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email,
                rol: user.rol 
            },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

    console.log('Successful login for user:', user.username);

        res.json({ 
            success: true, 
            message: 'Login successful',
            token: token,
            user: { 
                id: user.id, 
                email: user.email, 
                rol: user.rol 
            }
        });

    } catch (error) {
    console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
};

// Export functions
export { registerUser, loginUser };