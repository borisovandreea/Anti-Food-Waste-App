# Anti Food Waste App

## Overview
The Anti Food Waste App helps users reduce food waste by tracking fridge items, sharing products, and claiming items from friends. It includes a RESTful backend, a relational database via ORM, and a React.js SPA frontend.

Server (backend)
- Location: server/
- Start:
  cd server
  npm install
  cp .env.example .env   # optional
  npm run dev
- Health check: http://localhost:4000/health
- API base: http://localhost:4000/api/products

Client (frontend)
- Location: client/
- Start:
  cd client
  npm install
  npm run dev
- Open: http://localhost:3000

Notes
- Backend uses SQLite and Sequelize. Tables are auto-created on first run.
- For production or external DB use, set DATABASE_STORAGE env var to path or use Postgres (update sequelize config).
=======
# Anti Food Waste App

## Overview
The Anti Food Waste App helps users reduce food waste by tracking fridge items, sharing products, and claiming items from friends. 
It includes a RESTful backend, a relational database via ORM, and a React.js SPA frontend.
>>>>>>> 4fed71db87331d48815e0b27fb95778544da9200
