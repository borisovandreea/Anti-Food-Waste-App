# Anti Food Waste App

## Overview
The Anti Food Waste App helps users reduce food waste by tracking fridge items, sharing products, and claiming items from friends. It includes a RESTful backend, a relational database via ORM, and a React.js SPA frontend. The app also integrates with the Spoonacular API to suggest recipes based on available ingredients.

## Features
- **Product Inventory**: Track items in your fridge with details and expiration dates
- **Product Sharing**: Mark items as shareable to help friends reduce their food waste
- **Zero-Waste Recipe Finder**: Suggests recipes based on leftover ingredients using the Spoonacular API
- **Responsive UI**: Clean, intuitive React-based frontend for seamless user experience

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: SQLite with Sequelize ORM
- **Frontend**: React.js
- **HTTP Client**: Axios
- **External API**: Spoonacular Recipe API

## Getting Started

### Server (backend)
- **Location**: `server/`
- **Installation & Setup**:
  ```bash
  cd server
  npm install
  ```
- **Environment Configuration**:
  Create a `.env` file in the `server/` directory with the following variables:
  ```
  PORT=4000
  NODE_ENV=development
  DATABASE_STORAGE=./database.sqlite
  SPOONACULAR_API_KEY=your_api_key_here
  ```
  **Important**: Obtain your free Spoonacular API key from [https://spoonacular.com/food-api](https://spoonacular.com/food-api) and replace `your_api_key_here` with your actual key.

- **Start Development Server**:
  ```bash
  npm run dev
  ```
- **Health Check**: http://localhost:4000/health

### Client (frontend)
- **Location**: `client/`
- **Installation & Setup**:
  ```bash
  cd client
  npm install
  ```
- **Start Development Server**:
  ```bash
  npm run dev
  ```
- **Open in Browser**: http://localhost:5173/

## API Endpoints

### Products
- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Fetch a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `PATCH /api/products/:id/share` - Toggle shareable status

### Recipes
- `GET /api/recipes?ingredients=tomato,cheese` - Find recipes by comma-separated ingredients

## External Service Integration

The Recipe Finder feature integrates with the **Spoonacular API** to search for recipes based on user-provided ingredients. The architecture follows a **backend-proxy pattern** for security and maintainability. When a user enters ingredients on the frontend, a request is sent to the local Node.js/Express backend (`GET /api/recipes?ingredients=...`), which securely forwards the request to Spoonacular's `findByIngredients` endpoint using the `SPOONACULAR_API_KEY` stored in environment variables. This approach prevents exposing the API key to the frontend and allows the backend to implement caching, rate-limiting, and error handling at a central location. The API returns an array of recipes with metadata including recipe title, image URL, and count of missed ingredients, which the React frontend displays in a responsive grid layout with hover effects and real-time loading feedback.

## Database

- Backend uses SQLite and Sequelize. Tables are auto-created on first run.
- For production or external database use, set `DATABASE_STORAGE` environment variable to a path or configure Postgres (update Sequelize config in `src/models/index.js`).
