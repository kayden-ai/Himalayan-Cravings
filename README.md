# Himalayan Cravings

A full-stack restaurant ordering application with an admin dashboard and live public transit integration.

## Features

- User and Admin authentication using JWT
- Interactive menu with shopping cart and order placement
- Admin dashboard to add, edit, and manage menu items
- Live announcement banner with admin CMS capabilities
- Multi-language support (English and Finnish)
- Live HSL transit routing using the Digitransit GraphQL API and Leaflet maps

## Tech Stack

- Frontend: React, Vite, React-Leaflet
- Backend: Node.js, Express.js
- Database: MySQL

## Setup Instructions

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
npm start
```

Navigate to Frontend Directory and install dependencies:

```bash
cd frontend
npm install
npm run dev
```

APIs Used:
Digitransit Geocoding API v1
Digitransit Routing API (OTP2 / GTFS)
