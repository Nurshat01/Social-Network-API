# Social Media API

## Description

This API is designed for a social media startup and is built to handle large amounts of unstructured data using a NoSQL database. It provides endpoints for creating, updating, and deleting users, thoughts, reactions to thoughts, and friends in a user's friend list.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

1. Clone the repository:https://github.com/Nurshat01/Social-Network-API.git


## Usage

- Run the application and use a tool like Insomnia or Postman to test the API endpoints.

- The API provides the following routes:
- GET `/api/users`: Get all users.
- GET `/api/users/:userId`: Get a single user by ID.
- POST `/api/users`: Create a new user.
- PUT `/api/users/:userId`: Update a user by ID.
- DELETE `/api/users/:userId`: Delete a user by ID.

- GET `/api/thoughts`: Get all thoughts.
- GET `/api/thoughts/:thoughtId`: Get a single thought by ID.
- POST `/api/thoughts`: Create a new thought.
- PUT `/api/thoughts/:thoughtId`: Update a thought by ID.
- DELETE `/api/thoughts/:thoughtId`: Delete a thought by ID.

- POST `/api/thoughts/:thoughtId/reactions`: Create a new reaction to a thought.
- DELETE `/api/thoughts/:thoughtId/reactions/:reactionId`: Delete a reaction to a thought.

- POST `/api/users/:userId/friends/:friendId`: Add a friend to a user's friend list.
- DELETE `/api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list.

## Postman View 
![alt text](<postman view/image.png>)
![alt text](<postman view/Addone.png>)
![alt text](<postman view/Create user01.png>)
![alt text](<postman view/Create user02.png>)
![alt text](<postman view/Create user03.png>)
![alt text](<postman view/Get user by Id.png>)
![alt text](<postman view/Give a Thoutht.png>)