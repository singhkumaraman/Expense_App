**Expense Tracker Application**

**Overview:-**
This is a simple expense tracker application built with Node.js for the backend. The app allows users to manage their income and expenses securely.

**Features:-**
1.User Authentication: Utilizes JSON Web Tokens (JWT) for secure user authentication.
2.CRUD Operations: Supports creating, reading, updating, and deleting user data including income and expenses.
3.RESTful API: Backend exposes RESTful APIs for seamless interaction with the database.

**Installation:-**
1.Clone the repository: git clone https://github.com/singhkumaraman/Expense_App.git
2.Install dependencies: npm install
3.Set up environment variables 
4.Run the backend server: npm start.
5.Run the frontend server: npm run dev.

**Usage:-**
1.Register a new user.
2.Log in with your credentials.
3.Use the provided API endpoints for managing your income and expenses.

**API Endpoints:-**
1.POST /api/register: Register a new user.
2.POST /api/login: Log in and receive a JWT.
3.POST /api/income: Add income for the authenticated user.
4.POST /api/expenses: Add expenses for the authenticated user.
5.GET /api/income: Get all income entries for the authenticated user.
6.GET /api/expenses: Get all expense entries for the authenticated user.
7.DELETE /api/income/:id: Delete a specific income entry.
8.DELETE /api/expenses/:id: Delete a specific expense entry.

**Environment Variables:-**
1.PORT: Port on which the server will run.
2.MONGODB_URI: MongoDB connection URI.
3.JWT_SECRET: Secret key for JWT token generation.
