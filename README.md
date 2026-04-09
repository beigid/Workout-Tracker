# Workout Tracker

A workout tracking application 

## Tech Stack

**Client:** React (Create React App), React Router, Axios

**Server:** Node.js, Express.js

**Database:** MongoDB, Mongoose

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local) or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string
- npm or yarn

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Set up environment variables

Create a `.env` file in the `server` (or root) directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Install dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 4. Run the app

```bash
# Run server (from /server) — uses nodemon for auto-reloading
npm run dev

# Run client (from /client)
npm start
```

The client will run on `http://localhost:3000` and the server on `http://localhost:5000`.

> **Note:** The server uses [nodemon](https://nodemon.io/) to automatically restart on file changes. Install it globally if needed: `npm install -g nodemon`

## Project Structure

```
├── client/               # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
├── server/               # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
└── README.md
```

## API Endpoints

| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| GET    | /api/items       | Get all items        |
| GET    | /api/items/:id   | Get a single item    |
| POST   | /api/items       | Create a new item    |
| PUT    | /api/items/:id   | Update an item       |