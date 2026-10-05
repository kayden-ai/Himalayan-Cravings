# Database Architecture: Himalayan Cravings

## Overview

The backend utilizes a remote MySQL database hosted via Metropolia. The database follows a relational structure optimized for a restaurant e-commerce flow, separating static menu inventory from dynamic user transactions.

## Tables

### 1. `wsk_menu` (Menu Inventory)

Stores all available restaurant dishes, pricing, and dietary metadata.

- **id**: `INT` (Primary Key, Auto-Increment)
- **name**: `VARCHAR(255)` (Name of the dish)
- **description**: `TEXT` (Ingredients and flavor profile)
- **price**: `DECIMAL(10,2)` (Cost in Euros)
- **category**: `VARCHAR(255)` (Main, Starter, Drink, Dessert)
- **dietary_tags**: `VARCHAR(255)` (Vegan, Gluten-Free, etc.)

### 2. `wsk_orders` (Transaction Records)

Stores incoming checkout payloads submitted by users via the shopping cart.

- **order_id**: `INT` (Primary Key, Auto-Increment)
- **user_id**: `INT` (Foreign Key referencing users)
- **items_json**: `JSON` (Stringified array of purchased items and quantities)
- **total_price**: `DECIMAL(10,2)` (Final calculated cost)
- **status**: `VARCHAR(50)` (Default: 'pending')
- **created_at**: `TIMESTAMP` (Auto-generated timestamp of purchase)

## Integration Testing

The database has been successfully load-tested using Node.js seeding scripts (`seed.js` and `test-order.js`) to verify asynchronous data injection and JSON payload parsing.
