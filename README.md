# Riwipedia_Project

This project was developed in collaboration with my teammates as a digital platform for managing and consulting books.

## Project Structure

```
Riwipedia_Project/
│
├── backend/
│   ├── .env
│   ├── package.json
│   └── src/
│       ├── index.js
│       ├── controllers/
│       │   ├── bookController.js
│       │   └── controllers.js
│       ├── database/
│       │   └── conection_credentials.js
│       ├── middleware/
│       │   └── auth.js
│       └── routes/
│           └── endpoints.js
│
├── frontend/
│   ├── public/
│   │   └── img/
│   │       └── [static images]
│   └── src/
│       ├── pages/
│       │   ├── dashboard/
│       │   │   ├── dashboard.html
│       │   │   ├── dashboard.js
│       │   │   └── dashboard.css
│       │   ├── loading-page/
│       │   │   ├── loading-page.html
│       │   │   └── style.css
│       │   ├── login/
│       │   │   ├── login.html
│       │   │   ├── login.js
│       │   │   └── login.css
│       │   └── register/
│       │       ├── register.html
│       │       ├── register.js
│       │       └── register.css
│       └── utils/
│           ├── api.js
│           ├── auth.js
│           ├── authGuard.js
│           ├── config.js
│           ├── modals.css
│           └── modals.js
│
└── README.md
```

## Description

Riwipedia is a web platform that allows users to consult, download, and manage digital books. It includes features for registration, login, user management, favorites, and book administration by users with the administrator role.

### Backend
- RESTful API developed with Node.js.
- Management of users, books, authors, and categories.
- Authentication and authorization with middleware.
- Database connection and use of credentials in `.env`.

### Frontend
- Modern and responsive interface with HTML, CSS, and JavaScript.
- Pages for login, registration, dashboard, and book upload.
- Management of favorites and downloads.
- Integration with Cloudinary for book cover uploads.

## Technologies Used

- Node.js
- Express.js
- MySQL
- JavaScript (ES6+)
- HTML5
- CSS3
- Cloudinary (image management)
- Font Awesome (icons)

## Main Dependencies

### Backend
- express
- mysql2
- dotenv
- bcrypt
- jsonwebtoken
- nodemon (development)

### Frontend
- No npm dependencies required, only external libraries via CDN (Cloudinary, Font Awesome)

## Note

For backend development, **nodemon** is used for automatic server reload.

## Collaborators

- Carlos Ortiz
- Santiago Mendoza
- Santiago Portillo
- Adrian Gutiérrez

## Installation & Usage
1. Clone the repository.
2. Install dependencies in `backend` and `frontend`.
3. Configure environment variables in `.env`.
4. Start the backend with `npm run dev`.
5. Open the frontend in your browser.

## GitHub Repository

[https://github.com/agutierrezreginodev/Riwipedia_Project.git]

---
Thank you for visiting Riwipedia_Project!