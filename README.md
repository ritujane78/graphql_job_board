# GraphQL Job Board 

A full-stack **GraphQL Job Board application** built to demonstrate real-world usage of **GraphQL** with **Apollo Server**, **Apollo Client**, and **React**.  
The project focuses on implementing **queries, mutations, custom object types, authentication, pagination**, and relational data handling in a clean, production-style architecture.

---

## Project Background

Initially, **graphql-request** was used as the GraphQL client.  
The project was later migrated to **Apollo Client** to take advantage of its **built-in caching**, state management, and developer tooling.

For better debugging and insight into cache behavior, the **Apollo Client DevTools Chrome extension** can be installed.  
It helps visualize cache updates, active queries, and overall client-side GraphQL state.

---

##  Features

- View all jobs on a central dashboard  
- Drill down into individual job details  
- Navigate from a job to the company that posted it  
- Company-specific authenticated users can post jobs  
- Newly posted jobs appear instantly on the dashboard  
- Pagination support using `offset` and `limit`  
- Clean and responsive UI powered by **Bulma CSS**  

---

##  Tech Stack

### Frontend
- **React** (Vite)
- **Apollo Client**
- **GraphQL**
- **React Router**
- **Bulma CSS**

### Backend
- **Node.js**
- **Express**
- **Apollo Server**
- **GraphQL**
- **SQLite3** (`better-sqlite3`, `knex`)
- **JWT Authentication**
- **DataLoader** (prevents N+1 query issues)

---

## Database Design

The application uses **SQLite3** with the following tables:

- **Users** – authentication (email used as username)
- **Companies** – organizations that post jobs
- **Jobs** – job listings associated with companies

> ⚠️ **Authentication Note**  
> Passwords are stored in plain text **only for learning and readability purposes**.  
> In real-world production systems, passwords must always be **hashed and salted**  
> (e.g. using `bcrypt`).

---

##  Authentication & Authorization

- Login using email  
- JWT-based authentication  
- Only authenticated users belonging to a company can post jobs  
- Public users can view job listings and company details  

---

## Pagination

Pagination is implemented at the GraphQL layer using:

- `offset`
- `limit`

This allows efficient data fetching and scalable list rendering.

---

## Styling

- **Bulma CSS** is used for responsive layout and styling
- Minimal custom CSS required

---

### Backend Scripts

```bash
npm start
```

---

## Getting Started

```bash
git clone <repository-url>
cd graphql-job-board
```

### Install Dependencies

```bash
# Client
cd client
npm install

# Server
cd server
npm install
```

### Run the Application

1. Start the **server**
2. Start the **client**
3. Open the app in your browser

---

## Learning Goals

- GraphQL schema design
- Queries vs mutations
- Apollo Client caching strategies
- JWT-based authentication
- Pagination patterns
- Relational data modeling with GraphQL

---
