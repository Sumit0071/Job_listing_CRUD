


# JOB LISTING API

## Description

A web application built with Node.js and Express that includes user management, job applications, and role-based access control. Users can apply for jobs, and only admins can create new jobs.

## Features

- **User Authentication**: Sign up, login, and JWT-based authentication.
- **Job Management**: View available jobs and apply for them.
- **Role-Based Access Control**: Only admin users can create new jobs.
- **User Management**: View users, like users to increase points.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- dotenv

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB instance (local or remote)
- Git

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository
   ```

2. Install Dependencies

   Make sure you are in the project root directory, then run:

   ```bash
   npm install
   ```

3. Set Up Environment Variables

   Create a `.env` file in the root directory of the project and add the following environment variables:

  A `sampleEnv.txt` is in the project directory

   Replace `your_jwt_secret_key` with a secure key for JWT signing and `your_mongodb_connection_string` with your MongoDB connection string.


5. Start the Server

   ```bash
   npm run dev
   ```

   The server should now be running on `http://localhost:5000` (or another port if configured).

## API Endpoints

### User Routes

- **GET /users**: Get a list of all users.
- **POST /users**: Create a new user. Requires `name`, `githubLink`, and `password`.
- **POST /users/:id/like**: Like a user by their `id`.

### Job Routes

- **GET /jobs**: Get a list of all jobs.
- **POST /jobs**: Create a new job. Requires `link` and `title`. Only accessible to admin users.
- **POST /jobs/:id/apply**: Apply for a job by its `id`. Requires JWT authentication.

## Middleware

### `protect`

Ensures that the user is authenticated by verifying the JWT token and adding user details to the request object.

## Testing

You can write and run tests using a testing framework of your choice (e.g., Mocha, Chai, Jest).

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Test your changes.
5. Submit a pull request.

