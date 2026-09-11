# My Express API Project

Hi! This is my final repository for the Express.js backend assignments. It's a fully working REST API that manages users and cats, connected to our school's MySQL database.

## How to run this on your computer

1. Download or clone this code.
2. Open your terminal in this folder and install the packages by typing:
   ```bash
   npm install
   ```

## Step 1:

## Important..

You will need an environment file to make this work. I didn't upload mine to GitHub for security reasons. Please create a file named .env in the main folder and add the database info and a secret key like this:

DB_HOST=mysql.metropolia.fi
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
JWT_SECRET=just_put_any_secret_word_here

(Note: I have also uploaded a file named .env.example in my github for any reference)

## Step 2:

Start up the server by typing:
npm run dev

## What I built in this project:

I followed the instructions all the way through Assignment 7, so this API includes:

1. Database Connection: Reads and writes to the Metropolia MySQL server.
2. Security: Scrambles user passwords using bcrypt so they aren't stored as plain text.
3. Login System: Hands out VIP tokens (jsonwebtoken) when a user logs in successfully.
4. Permissions: Regular users can only edit or delete their own cats, but admins can do whatever they want.
5. File Uploads: You can upload pictures of cats and it automatically creates a thumbnail.
6. Data Checking: Uses express-validator to make sure nobody tries to create a user with a blank email or a tiny password, and returns clean error messages if they try.
