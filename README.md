# 🥟 Himalayan Cravings - Restaurant Ordering System

## Project Overview

"Himalayan Cravings" is a full-stack, fast-casual online ordering application for an authentic Nepali restaurant located near the university campus. The platform allows students and locals to easily browse traditional Himalayan cuisine, filter by dietary restrictions, and place pick-up orders.

## Core Features

- **Role-Based Access Control:** Secure JWT authentication separating `Customer` and `Admin` users.
- **Dynamic Menu & Cart:** Browse dishes (e.g., Momo, Dal Bhat), filter by dietary tags (Vegan, Gluten-Free), and manage a shopping cart.
- **Admin Dashboard:** Secure backend access for restaurant staff to perform CRUD operations on daily menu items.
- **Smart Transit Integration:** Embedded HSL Routing API widget to help customers find the fastest public transit route for food pick-up.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL (Metropolia Servers)
- **Frontend:** React.js (Vite)
- **Authentication:** JSON Web Tokens (JWT) & bcrypt

## Team Members & Roles

- **Ayush Shah:** Lead Full-Stack Developer (API Architecture, Database, Authentication)
- **Sujal Malakar and Ayush Shah:** UI/UX Design & Front-End Layout Planning
- **Aashiq Rana and kabir Chaudhary:** Data & Content Manager (Menu JSON structuring, Image Sourcing)
- **Milan Nepali and Kabir CHaudhary:** Project Management (Trello, Backlog) & Open API Research

## Getting Started (Backend)

1. Clone the repository:
   ```bash
   git clone <your-github-repo-link>
   ```

## How to run this on your computer

After cloning Open your terminal in this folder and install the packages by typing:

```bash
npm install
```

Setup you .env file in .env example and rename it as .env and runt this command:

```bash
npm run dev
```
