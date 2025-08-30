import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Import MySQL connection pool (promise-based)
import promisePool from '../database/conection_credentials.js';

// Function to verify if email exists
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

// Register controller
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log('Data recieved in register:', { email });

        // Validate empty fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email y contraseña son obligatorios'
            });
        }

        // Check if email already exists
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: 'email already registered'
            });
        }

        // Password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into DB
        const [result] = await promisePool.execute(
            'INSERT INTO users (username, email, user_password, rol) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, 'user']
        );

        console.log('Usuario registrado exitosamente:', username);

        res.status(201).json({
            success: true,
            message: 'user registered succesfully',
            username: username
        });

    } catch (error) {
        console.error('Register Error:', error);
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

        console.log('Trying log in with:', email);

        // Validate empty fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and pasword are mandatory'
            });
        }

        // Find user in DB
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

        // Verify password
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

        console.log('succesfull login for user:', user.username);

        res.json({
            success: true,
            message: 'succesfull login',
            token: token,
            user: {
                id: user.id,
                email: user.email,
                rol: user.rol
            }
        });

    } catch (error) {
        console.error('log in error:', error);
        res.status(500).json({
            success: false,
            message: 'server error'
        });
    }
};


/**
 * Function to acces database in clever cloud
 * to obtain current books and store them temporarily
 */
const getAllBooks = async (req, res) => {
    try {
        const [books] = await promisePool.execute('SELECT * FROM books');
        res.json({ success: true, data: books });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

/**
 * book insertion into database to store them,
 * and make use of them later on
*/
const insertBook = async (req, res) => {
    try {
        const { is_favorite, portrait_url, book_url, book_language, download_count, id_author, id_category } = req.body;

        // Sql for the book injection 
        const [result] = await promisePool.execute(
            `INSERT INTO books 
            (is_favorite, portrait_url, book_url, book_language, download_count, id_author, id_category) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [is_favorite, portrait_url, book_url, book_language, download_count, id_author, id_category]
        );
    } catch (error) {
        console.error('Error inserting book:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


/**
 * Book update sorting by ID, and letting 
 * you update all especifications of the book
*/
const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const { is_favorite, portrait_url, book_url, book_language, download_count, id_author, id_category } = req.body;
        
        //SQL query
        const [result] = await promisePool.execute(
            `UPDATE books SET 
            is_favorite = ?, portrait_url = ?, book_url = ?, book_language = ?, 
            download_count = ?, id_author = ?, id_category = ? WHERE id = ?`,
            [is_favorite, portrait_url, book_url, book_language, download_count, id_author, id_category, bookId]
        );

    //error message if book none existent
    if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Book not found' });
    }
    
    alert("book updated")
} catch (error) {
    console.error('Error updating book:', error);
    alert("Error updating book")
}
};


/**
 * Book deletion via ID
*/

const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        
        const [result] = await promisePool.execute(`DELETE FROM books WHERE id = ?`, [bookId]);
        
        if (result.affectedRows === 0) {
            alert("BOOK NOT FOUND")
        }

    } catch (error) {
        console.error('Error deleting book:', error);
        alert("SERVER ERROR")
    }
};

// functions Export
export { registerUser, loginUser,getAllBooks, insertBook, updateBook, deleteBook };