# Node.js E-Commerce API

This is a simple Node.js API for an e-commerce application. It provides endpoints for managing products, user registration, and user authentication using JSON Web Tokens (JWT).

## Table of Contents
- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Database](#database)
- [Usage](#usage)
- [Contributing](#contributing)

## Getting Started

To get started, follow these steps:

1. Clone this repository.
2. Install the required Node.js packages using `npm install`.
3. Set up your MySQL database and update the `db/config.js` file with your database configuration.
4. Start the server using `npm start`.
5. The server will run on port 5000 by default.

## Endpoints

Here are the available API endpoints:

- **GET /products/**: Retrieve all products.
- **POST /register**: Register a new user.
- **POST /addproduct**: Add a new product (requires authentication).
- **POST /login**: Login a user and obtain an authentication token.
- **DELETE /delete/:id**: Delete a product by ID (requires authentication).
- **GET /product/:id**: Retrieve a single product by ID (requires authentication).
- **PUT /update/:id**: Update a product by ID (requires authentication).
- **GET /search/:key**: Search for products based on a keyword (requires authentication).

## Authentication

This API uses JSON Web Tokens (JWT) for authentication. To access protected endpoints, you need to include the JWT token in the `Authorization` header of your request. For example:


# Authorization: Bearer YOUR_TOKEN_HERE


The token is obtained by logging in or registering a user through the `/login` or `/register` endpoints.

## Database

This API uses a MySQL database for storing user information and product data. You need to configure the database connection in the `db/config.js` file.

## Usage

You can use tools like Postman or curl to interact with the API. Here's a basic example:

1. Register a user by sending a POST request to `/register`.
2. Log in to obtain a JWT token by sending a POST request to `/login`.
3. Use the obtained token to access protected endpoints like `/addproduct`, `/delete/:id`, `/update/:id`, and `/search/:key`.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to enhance the functionality of this API.

Happy coding!
