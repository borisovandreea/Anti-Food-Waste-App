# Anti Food Waste App – Specifications and Project Plan

## 1. General Objective
Develop a web application to reduce food waste. The app will include:

- A RESTful backend implemented in Node.js  
- Data stored in a relational database accessed via an ORM  
- Optional integration with an external service  
- SPA frontend built with React.js components  

The app will allow users to:

- Track items in their fridge  
- Mark items as available for sharing  
- Claim items shared by friends  
- Manage friend groups  

---

## 2. Technological Constraints

- Frontend: React.js (component-based SPA)  
- Backend: Node.js with REST API  
- Database: Relational database (SQLite or PostgreSQL)  
- ORM: Sequelize (optional)  
- Version Control: Git repository with incremental commits and clear messages  
- Deployment: Optional on a free-tier cloud service (Render, Vercel, AWS, Azure)  

---

## 3. Functional Requirements

Users can:

1. Add products with name, category, and expiration date  
2. View products grouped by category  
3. Mark products as available to share  
4. View shared products from friends  
5. Claim shared products  
6. Manage a list of friends and optionally invite them  

Optional features:  

- Notifications for products nearing expiration  
- Social media sharing  

---

## 4. Non-Functional Requirements / Code Quality

- Code must be organized, readable, and use camelCase variable names  
- Code must be indented and properly structured  
- Functions and components should include comments  
- Git commits should be incremental with descriptive messages  
- Optional: unit tests or integration tests for backend or frontend  

---

## 5. System Architecture

React SPA (frontend) <--> Node.js REST API (backend) <--> Relational Database via ORM  

**Minimum backend routes:**

- GET /products – list all products  
- POST /products – add a product  
- PATCH /products/:id/share – mark a product as shared  
- POST /claims – claim a product  
- GET /friends – list friends (optional)  

**Minimum frontend pages/components:**

- My Fridge (list of products)  
- Add Product (form)  
- Shared Items (list of shared products)  
- Optional: Friends list  

---

## 6. Project Timeline

**Week 8 – Deliverable 1:**

- SPEC.md + project plan  
- Project structure (`server/`, `client/`)  
- Minimal backend with `/health` route  
- Minimal React frontend  
- GitHub repo with first commit  

**Week 9–10 – Backend Core:**

- ORM models for Product, SharedItem, Claims, Friends  
- CRUD operations for products  
- Optional claims table  
- API endpoints fully functional  

**Week 11 – Deliverable 2:**

- Functional REST API  
- Database connection and ORM integration  
- Documentation for running backend  

**Week 12–13 – Frontend Development:**

- Connect frontend to backend  
- Build React components and pages  
- Forms for adding products and claiming items  
- Optional CSS styling  

**Week 14 – Final Submission:**

- Complete integrated frontend + backend  
- Optional deployment to free-tier cloud service  
- README with instructions  
- End-to-end testing  

---

## 7. Deliverables Overview

**Deliverable 1 (Week 8):**

- SPEC.md  
- Project folder structure (`server/` + `client/`)  
- Minimal backend and frontend  
- GitHub repository with initial commit  

**Deliverable 2 (Week 11):**

- Fully functional REST API  
- Database setup with ORM  
- Backend documentation  

**Final Deliverable (Week 14):**

- Complete frontend + backend  
- Integrated, tested  
- Optional deployment  
- README.md with instructions  


