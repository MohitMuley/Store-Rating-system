# FullStack Rating Platform

A web application that allows users to submit ratings for stores. The platform supports multiple user roles with different functionalities: System Administrator, Normal User, and Store Owner.

---

## Tech Stack

- **Backend:** Express.js  
- **Database:** PostgreSQL / MySQL  
- **Frontend:** React.js  
- **Authentication:** JWT  
- **Styling:** Tailwind CSS  

---

## Features & Functionalities

### User Roles

1. **System Administrator**
   - Add new stores, normal users, and admin users.
   - Access to a dashboard displaying:
     - Total number of users
     - Total number of stores
     - Total number of submitted ratings
   - Add new users with details: Name, Email, Password, Address, Role.
   - View a list of stores (Name, Email, Address, Rating).
   - View a list of normal/admin users (Name, Email, Address, Role).
   - create new stores 
   - View user details including Store Owner’s ratings.
   - Logout from the system.

2. **Normal User**
   - Sign up and log in.
   - Update password after logging in.
   - View a list of all registered stores.
   - Search stores by Name and Address.
   - Store listings display:
     - Store Name
     - Address
     - Overall Rating
     - User's Submitted Rating
     - Option to submit or modify rating
   - Submit ratings between 1 to 5 for individual stores.
   - Logout from the system.

3. **Store Owner**
   - Log in to the platform.
   - Update password after logging in.
   - Dashboard functionalities:
     - View a list of users who have submitted ratings for their store.
     - See the average rating of their store.
   - Logout from the system.

---

## Backend

- Framework: Express.js  
- Database: PostgreSQL / MySQL  
- Key Libraries:
  - `bcryptjs` - Password hashing  
  - `jsonwebtoken` - JWT authentication  
  - `pg` - PostgreSQL client  

## Frontend

- Framework: React.js 
- Styling: Tailwind CSS 
- State Management: React Context API  

# API Endpoints

## Auth
- **POST /api/auth/register** - Register new user
- **POST /api/auth/login** - Login user

## Users
- **GET /api/users** - Get all users (admin only)
- **GET /api/users/:id** - Get user details by ID (admin only)
- **PUT /api/users/:id/password** - Update user password (logged-in user or admin)
- **POST /api/users** - Add new user (admin only)

## Stores
- **POST /api/stores** - Add store (admin only)
- **GET /api/stores** - Get all stores
- **GET /api/stores/:id** - Get store by ID

## Dashboard
- **GET /api/dashboard/admin** - Admin dashboard (total users, stores, ratings)
- **GET /api/dashboard/store/:id** - Store owner dashboard (store info, user ratings)

## Ratings
- **POST /api/ratings** - Submit or update rating
- **GET /api/ratings/:storeId** - Get ratings for a store


## Installation

### Backend
**npm install express pg bcryptjs jsonwebtoken dotenv cors**
**npm run dev**

### frontend

 **npm install react react-dom react-router-dom axios**
 **npm tailwindcss postcss autoprefixer**
 **npx tailwindcss init -p**
 **npm start**


