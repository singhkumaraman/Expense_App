Expense Tracker Application
Overview
This is a simple expense tracker application built with Node.js for the backend. The app allows users to manage their income and expenses securely.

Features
User Authentication: Utilizes JSON Web Tokens (JWT) for secure user authentication.
CRUD Operations: Supports creating, reading, updating, and deleting user data including income and expenses.
RESTful API: Backend exposes RESTful APIs for seamless interaction with the database.
Installation
Clone the repository: git clone 
Install dependencies: npm install
Set up environment variables (See .env.example for guidance)
Run the server: npm start
Usage
Register a new user.
Log in with your credentials.
Use the provided API endpoints for managing your income and expenses.
API Endpoints
POST /api/register: Register a new user.
POST /api/login: Log in and receive a JWT.
POST /api/income: Add income for the authenticated user.
POST /api/expenses: Add expenses for the authenticated user.
GET /api/income: Get all income entries for the authenticated user.
GET /api/expenses: Get all expense entries for the authenticated user.
DELETE /api/income/:id: Delete a specific income entry.
DELETE /api/expenses/:id: Delete a specific expense entry.
Environment Variables
PORT: Port on which the server will run.
MONGODB_URI: MongoDB connection URI.
JWT_SECRET: Secret key for JWT token generation.
