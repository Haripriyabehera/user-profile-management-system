# User Profile Management API

A RESTful API for managing user profiles, including user registration, login, profile view, and profile updates. The API supports role-based access control for normal users and admin users.


## Features

- User registration and login with JWT authentication  
- Role-based access control (`user`, `admin`)  
- View user profile  
- Update user profile (self and admin update)  
- Data validation using `express-validator`  
- Password hashing with bcryptjs  



## Setup Instructions

-Install dependencies: npm install
-Create a .env file in the root folder and add the following environment variables: 
  MONGO_URL=mongodb://127.0.0.1:27017/user-profile-management-system
  JWT_SECRET=secretKey123
  PORT=3000
-Start MongoDB server locally
-Run the server:  npm run dev
-Test the API endpoints with Postman or any API client.



## API Endpoints

POST ->	/auth/register ->	Register new user ->	{ "firstName": "John", "lastName": "Doe", "email": "john@example.com", "password": "password123" } ->	{ message: "User registered successfully" }

POST ->	/auth/login ->	Login user ->	{ "email": "john@example.com", "password": "password123" } ->	{ token: "<jwt_token>", user: {...} }

GET	-> /user/profile/:id ->	Get user profile by ID ->	Authorization: Bearer <token>	->	{ user: {...} }

PUT ->	/user/updateProfile/:id	 -> Update user profile	 -> Authorization: Bearer <token> ->	{ "firstName": "Jane", "department": "HR" } ->	{ message: "Profile updated successfully", user: {...} }

GET ->	/admin/:id	-> Get any user profile by admin ->	Authorization: Bearer <token>	->	{ user: {...} }

PUT ->	/admin/update/:id ->	Update any user by admin ->	Authorization: Bearer <token> ->	{ "role": "admin", "department": "IT" } ->	{ message: "User updated successfully", user: {...} }



## Assumptions and Design Decisions

-Passwords are hashed using bcryptjs before saving to the database.
-JWT tokens are used for authentication, sent via Authorization header.
-Role-based authorization restricts some routes only to admin users.
-Email is unique for each user.
-Validation is done using express-validator schemas to ensure request data correctness.
-For simplicity, no email verification or password reset flow is implemented.
-MongoDB is used as the database.
