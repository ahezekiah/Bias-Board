# BiasBoard

BiasBoard is a full-stack K-pop idol discovery and personal bias tracking application built with **Next.js, React, Express, PostgreSQL, and JWT authentication**.

Users can browse K-pop idols without an account, create an account, log in, build a personal bias list, rank idols from 1–10, add notes, edit their rankings, and remove idols from their collection.

Administrators receive access to a separate dashboard where they can create, update, search, and delete idols from the catalog.

---

# Project Overview

BiasBoard is designed around a simple idea:

```text
Discover K-pop idols
        ↓
View Idol Profiles
        ↓
Create an Account
        ↓
Add Idols to Your Bias List
        ↓
Rank Your Favorites
        ↓
Write Personal Notes
        ↓
Manage Your Ultimate Lineup
```

The application uses a traditional full-stack architecture:

```text
Next.js Frontend
       ↓
Express REST API
       ↓
PostgreSQL
```

Authentication is handled using:

```text
bcrypt
+
JSON Web Tokens
```

---

# Main Features

BiasBoard currently includes:

* K-pop idol catalog
* Idol search
* Group search
* Detailed idol profile pages
* Birthday information
* MBTI information
* Nationality
* K-pop generation
* Profession information
* Idol biographies
* Instagram links
* User registration
* User login
* Password hashing
* JWT authentication
* Persistent PostgreSQL users
* Personal bias lists
* Bias ranking from 1–10
* Personal notes
* Edit bias ranking
* Edit bias notes
* Remove bias
* Dashboard statistics
* Role-based administrator access
* Admin idol creation
* Admin idol editing
* Admin idol deletion
* Admin idol search
* Responsive custom styling
* Remote idol images

---

# Technology Stack

## Frontend

```text
Next.js 16.3.2
React 19.2.8
React DOM 19.2.8
JavaScript
CSS
Next.js App Router
React Icons
```

## Backend

```text
Node.js
Express 5.2.1
JavaScript ES Modules
CORS
dotenv
```

## Authentication

```text
bcryptjs
jsonwebtoken
JWT Bearer Tokens
```

## Database

```text
PostgreSQL
node-postgres / pg
```

## Development

```text
npm
nodemon
ESLint
```

---

# Architecture

```text
┌───────────────────────────────────┐
│         Next.js Frontend          │
│                                   │
│  Home                             │
│  Idols                            │
│  Idol Details                     │
│  Login                            │
│  Register                         │
│  Bias Dashboard                   │
│  Admin Dashboard                  │
└────────────────┬──────────────────┘
                 │
                 │ HTTP / JSON
                 ▼
┌───────────────────────────────────┐
│          Express REST API         │
│                                   │
│ /api/auth                         │
│ /api/idols                        │
│ /api/favorites                    │
└────────────────┬──────────────────┘
                 │
                 ▼
┌───────────────────────────────────┐
│           PostgreSQL              │
│                                   │
│ users                             │
│ idols                             │
│ favorites                         │
└───────────────────────────────────┘
```

---

# Frontend Routes

The frontend uses the Next.js App Router.

Current routes include:

```text
/
├── /idols
│   └── /idols/[id]
│
├── /login
├── /register
├── /dashboard
└── /admin
```

---

# Home Page

The home page is:

```text
/
```

and implemented in:

```text
frontend/app/page.jsx
```

The page changes depending on whether the visitor is logged in.

---

# Logged-Out Home Page

Visitors see:

```text
YOUR K-POP UNIVERSE

Find your Bias.
Build your Lineup.
```

The page provides:

```text
Explore Idols
Create Account
```

buttons.

---

# Logged-In Home Page

Authenticated users instead see:

```text
Welcome Back, {username}.
Your Biases Are Waiting!
```

and buttons for:

```text
Explore Idols
My Biases
```

Administrators also see:

```text
Admin Dashboard
```

---

# Idol Catalog

The public idol catalog is available at:

```text
/idols
```

and implemented in:

```text
frontend/app/idols/page.jsx
```

The page retrieves idols from:

```http
GET /api/idols
```

Users do not need an account to browse the catalog.

---

# Idol Search

The idol catalog includes client-side search.

Users can search by:

```text
Stage Name
Group Name
```

For example:

```text
Jungkook
```

or:

```text
BTS
```

The current filtering logic is case-insensitive.

---

# Idol Cards

Each idol is displayed using:

```text
frontend/components/IdolCard.jsx
```

Cards include:

```text
Image
Group
Stage Name
Real Name
Position
View Profile
```

Clicking:

```text
View Profile
```

opens:

```text
/idols/{id}
```

---

# Idol Detail Page

Detailed idol profiles are located at:

```text
/idols/[id]
```

and implemented in:

```text
frontend/app/idols/[id]/page.jsx
```

The page loads:

```http
GET /api/idols/:id
```

---

# Idol Information

An idol profile can display:

```text
Stage Name
Real Name
Group
Position
Birthday
MBTI
Nationality
K-pop Generation
Full Profession
Biography
Instagram
Image
```

---

# Instagram Links

If an idol has an Instagram URL, the profile displays:

```text
View Instagram
```

which opens the profile in a new browser tab.

---

# Adding a Bias

Authenticated users can add idols to their personal list directly from an idol detail page.

The form includes:

```text
Ranking
Notes
```

The ranking options are:

```text
10/10
9/10
8/10
7/10
6/10
5/10
4/10
3/10
2/10
1/10
```

---

# Favorite Creation

When submitted, the frontend calls:

```http
POST /api/favorites
```

with data similar to:

```json
{
  "idol_id": 1,
  "ranking": 10,
  "notes": "Ultimate bias."
}
```

The request requires authentication.

---

# Duplicate Bias Protection

The PostgreSQL database includes:

```sql
UNIQUE(user_id, idol_id)
```

which prevents the same user from adding the same idol multiple times.

If the user tries to add an idol twice, the API returns:

```text
That Idol is already in your Bias List!
```

---

# Bias Dashboard

The authenticated user dashboard is:

```text
/dashboard
```

and implemented in:

```text
frontend/app/dashboard/page.jsx
```

The page requires the user to be logged in.

If no user is stored locally, the user is redirected to:

```text
/login
```

---

# Bias Dashboard Features

The dashboard displays:

```text
Username
Total Biases
Perfect 10s
Bias Cards
Rankings
Personal Notes
Edit Controls
Remove Controls
```

---

# Bias Statistics

The dashboard calculates:

```text
Total Biases
```

using:

```js
safeFavorites.length
```

and calculates:

```text
Perfect 10s
```

by counting favorites whose ranking equals:

```text
10
```

---

# Bias Cards

Biases are rendered using:

```text
frontend/components/FavoriteCard.jsx
```

Each card shows:

```text
Image
Group
Stage Name
Ranking
Notes
```

---

# Editing Biases

Users can edit:

```text
Ranking
Notes
```

The frontend sends:

```http
PUT /api/favorites/:id
```

Example:

```json
{
  "ranking": 9,
  "notes": "Still one of my favorites."
}
```

---

# Removing Biases

Users can remove an idol from their bias list.

Before deletion, the application displays a confirmation dialog.

The request uses:

```http
DELETE /api/favorites/:id
```

---

# Favorite Ownership

The backend prevents one user from editing or deleting another user's favorites.

Queries contain:

```sql
WHERE id = $3
AND user_id = $4
```

or equivalent conditions.

This ensures that favorite records are scoped to:

```text
req.user.id
```

---

# Authentication

BiasBoard uses JWT authentication.

The main authentication routes are:

```text
backend/routes/auth.js
```

---

# Register

New users register using:

```http
POST /api/auth/register
```

The frontend page is:

```text
/register
```

The form requires:

```text
Username
Email
Password
```

---

# Registration Validation

The backend checks that all fields exist.

Passwords must contain at least:

```text
6 characters
```

The database also prevents duplicate:

```text
Username
Email
```

values.

---

# Password Hashing

Passwords are not stored as plain text.

The backend uses:

```js
bcrypt.hash(password, 10)
```

before inserting the password into PostgreSQL.

---

# Registration Flow

```text
User fills registration form
         ↓
POST /api/auth/register
         ↓
Validate username/email/password
         ↓
Check duplicate account
         ↓
Hash password with bcrypt
         ↓
Insert PostgreSQL user
         ↓
Generate JWT
         ↓
Return token + user
         ↓
Save to localStorage
         ↓
Redirect to /dashboard
```

---

# Login

Login is available at:

```text
/login
```

and uses:

```http
POST /api/auth/login
```

The form requires:

```text
Username
Password
```

---

# Login Flow

```text
User enters credentials
         ↓
Find PostgreSQL user
         ↓
bcrypt.compare()
         ↓
Generate JWT
         ↓
Return token
         ↓
Store token locally
         ↓
Redirect to Bias Dashboard
```

---

# JWT

JWTs contain:

```text
User ID
Username
Role
```

The backend creates tokens with:

```js
jwt.sign(
    {
        id: user.id,
        username: user.username,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: '2h'
    }
);
```

Tokens expire after:

```text
2 hours
```

---

# Frontend Token Storage

The frontend stores:

```text
token
user
```

inside:

```text
localStorage
```

using:

```js
localStorage.setItem(
    'token',
    data.token
);
```

and:

```js
localStorage.setItem(
    'user',
    JSON.stringify(data.user)
);
```

---

# Authenticated API Requests

Protected API requests send:

```http
Authorization: Bearer <JWT>
```

The helper is located at:

```text
frontend/lib/api.js
```

---

# Authentication Middleware

Protected backend routes use:

```text
backend/middleware/auth.js
```

The middleware:

1. Reads the `Authorization` header.
2. Extracts the Bearer token.
3. Verifies it using `JWT_SECRET`.
4. Stores the decoded user on:

```text
req.user
```

If no token is provided:

```text
401 Authentication Required
```

If the token is invalid or expired:

```text
403 Invalid or expired token.
```

---

# Logout

Logging out removes:

```text
token
user
```

from local storage.

The navbar then redirects the user to:

```text
/
```

---

# Role-Based Authorization

Users have a:

```text
role
```

column.

Default users receive:

```text
user
```

The application also recognizes:

```text
admin
```

---

# Administrator Middleware

Admin-only routes use:

```js
requireAdmin
```

The middleware checks:

```js
req.user.role !== 'admin'
```

If the current user is not an administrator:

```text
403 Admin access required.
```

---

# Admin Dashboard

The administration interface is:

```text
/admin
```

and implemented in:

```text
frontend/app/admin/page.jsx
```

The page allows administrators to:

```text
View Idols
Search Idols
Create Idol
Edit Idol
Delete Idol
```

---

# Admin Search

Administrators can search the catalog by:

```text
Stage Name
Group
```

---

# Creating Idols

The Admin Dashboard includes a form with fields for:

```text
Stage Name
Real Name
Group
Position
Birthday
MBTI
Nationality
Full Profession
Generation
Instagram
Image URL
Biography
```

The backend endpoint is:

```http
POST /api/idols
```

and requires:

```text
Valid JWT
+
Admin role
```

---

# Updating Idols

Administrators can edit idols using:

```http
PUT /api/idols/:id
```

The edit form is implemented in:

```text
frontend/components/AdminIdolCard.jsx
```

---

# Deleting Idols

Administrators can delete idols using:

```http
DELETE /api/idols/:id
```

A browser confirmation dialog is displayed before deletion.

---

# Public Idol API

## Get All Idols

```http
GET /api/idols
```

Returns all idols ordered by:

```text
stage_name
```

---

# Filter Idols by Group

The backend also supports:

```http
GET /api/idols?group=BTS
```

The SQL uses:

```sql
WHERE LOWER(group_name)
LIKE LOWER($1)
```

This provides case-insensitive partial group matching.

---

# Get One Idol

```http
GET /api/idols/:id
```

Example:

```http
GET /api/idols/1
```

Invalid IDs return:

```text
400 Invalid Idol ID.
```

Missing idols return:

```text
404 Idol Not Found.
```

---

# Favorites API

All routes under:

```text
/api/favorites
```

require authentication.

---

## Get User Bias List

```http
GET /api/favorites
```

The API joins:

```text
favorites
+
idols
```

so the frontend receives both favorite information and idol profile data.

Results are sorted by:

```sql
ORDER BY favorites.ranking DESC NULLS LAST
```

---

## Add Favorite

```http
POST /api/favorites
```

---

## Update Favorite

```http
PUT /api/favorites/:id
```

---

## Remove Favorite

```http
DELETE /api/favorites/:id
```

---

# Database

BiasBoard uses PostgreSQL.

The database connection is defined in:

```text
backend/db.js
```

The default database name is:

```text
biasboard
```

---

# Database Tables

The project contains three main tables:

```text
users
idols
favorites
```

---

# Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50)
        UNIQUE NOT NULL,
    email VARCHAR(100)
        UNIQUE NOT NULL,
    password VARCHAR(255)
        NOT NULL,
    role VARCHAR(20)
        NOT NULL DEFAULT 'user',
    created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
);
```

---

# Idols Table

The initial schema contains:

```text
id
stage_name
real_name
group_name
position
image_url
created_at
```

A later migration adds:

```text
birthday
mbti
nationality
full_profession
generation
bio
instagram
```

---

# Favorites Table

```sql
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,

    user_id INTEGER
        NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    idol_id INTEGER
        NOT NULL
        REFERENCES idols(id)
        ON DELETE CASCADE,

    ranking INTEGER
        CHECK (
            ranking BETWEEN 1 AND 10
        ),

    notes TEXT,

    created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(user_id, idol_id)
);
```

---

# Database Relationships

```text
users
  │
  │ 1
  │
  │ many
  ▼
favorites
  ▲
  │ many
  │
  │ 1
idols
```

A user may have many favorites.

An idol may appear in many users' favorites.

The `favorites` table connects the two.

---

# Cascade Delete

The favorite foreign keys use:

```sql
ON DELETE CASCADE
```

This means:

```text
Delete User
   ↓
Their Favorites Are Deleted
```

and:

```text
Delete Idol
   ↓
All Favorites Referencing
That Idol Are Deleted
```

---

# SQL Files

The backend contains:

```text
backend/init.sql
backend/updatedIdols.sql
backend/updatedImages.sql
```

---

# `init.sql`

This file:

```text
Drops existing tables
Creates users
Creates idols
Creates favorites
Seeds initial idols
```

---

# `updatedIdols.sql`

This file:

```text
Adds additional idol profile columns
Updates the original idol records
Adds additional K-pop idols
```

It should be run after:

```text
init.sql
```

---

# `updatedImages.sql`

This file contains later image URL updates for idol records.

---

# Initial Seed Idols

The initial database includes artists such as:

```text
Jungkook
Jennie
Bang Chan
Karina
Yeonjun
Nayeon
```

Additional idols are inserted through:

```text
updatedIdols.sql
```

---

# Project Structure

```text
Bias-Board-main/
│
├── frontend/
│   │
│   ├── app/
│   │   ├── admin/
│   │   │   └── page.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.jsx
│   │   │
│   │   ├── idols/
│   │   │   ├── [id]/
│   │   │   │   └── page.jsx
│   │   │   └── page.jsx
│   │   │
│   │   ├── login/
│   │   │   └── page.jsx
│   │   │
│   │   ├── register/
│   │   │   └── page.jsx
│   │   │
│   │   ├── globals.css
│   │   ├── layout.jsx
│   │   └── page.jsx
│   │
│   ├── components/
│   │   ├── AdminIdolCard.jsx
│   │   ├── FavoriteCard.jsx
│   │   ├── IdolCard.jsx
│   │   └── Navbar.jsx
│   │
│   ├── lib/
│   │   └── api.js
│   │
│   ├── public/
│   │   └── images/
│   │       ├── hero-kpop.png
│   │       └── no-product-image-400x400-1.png
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── next.config.mjs
│   ├── jsconfig.json
│   └── eslint.config.mjs
│
└── backend/
    │
    ├── middleware/
    │   ├── auth.js
    │   └── errorHandler.js
    │
    ├── routes/
    │   ├── auth.js
    │   ├── favorites.js
    │   └── idols.js
    │
    ├── db.js
    ├── server.js
    ├── init.sql
    ├── updatedIdols.sql
    ├── updatedImages.sql
    ├── package.json
    └── package-lock.json
```

---

# Important Files

## `frontend/app/page.jsx`

Controls the personalized homepage.

---

## `frontend/app/idols/page.jsx`

Displays and searches the public idol catalog.

---

## `frontend/app/idols/[id]/page.jsx`

Displays a detailed idol profile and bias creation form.

---

## `frontend/app/dashboard/page.jsx`

Displays the current user's bias collection.

---

## `frontend/app/admin/page.jsx`

Provides administrator CRUD controls.

---

## `frontend/lib/api.js`

Contains:

```text
API base URL
JWT token access
Stored user access
Authenticated fetch helper
```

---

## `backend/routes/auth.js`

Handles:

```text
Registration
Login
bcrypt hashing
JWT generation
```

---

## `backend/routes/idols.js`

Handles:

```text
Public idol browsing
Group filtering
Individual idol retrieval
Admin idol creation
Admin idol editing
Admin idol deletion
```

---

## `backend/routes/favorites.js`

Handles:

```text
User bias retrieval
Add bias
Edit bias
Remove bias
```

---

## `backend/middleware/auth.js`

Handles:

```text
JWT verification
Protected routes
Admin authorization
```

---

## `backend/db.js`

Creates the PostgreSQL connection pool.

---

# Environment Variables

The backend expects environment values similar to:

```env
PORT=5001

DB_USER=postgres
DB_HOST=localhost
DB_NAME=biasboard
DB_PASSWORD=your_postgres_password
DB_PORT=5432

JWT_SECRET=replace_with_a_long_random_secret
```

The frontend may use:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

---

# Recommended Backend `.env`

Create:

```text
backend/.env
```

Example:

```env
PORT=5001

DB_USER=postgres
DB_HOST=localhost
DB_NAME=biasboard
DB_PASSWORD=your_password
DB_PORT=5432

JWT_SECRET=your_secure_random_secret
```

---

# Recommended Frontend `.env.local`

Create:

```text
frontend/.env.local
```

with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

---

# Important Security Note

The current `db.js` contains a fallback password:

```js
password:
    process.env.DB_PASSWORD ||
    'ateez'
```

This should be removed before public deployment.

Prefer:

```js
password:
    process.env.DB_PASSWORD
```

Database passwords should never be committed to source control.

---

# Running the Project Locally

BiasBoard requires:

```text
Node.js
npm
PostgreSQL
Git
```

---

# 1. Clone the Repository

```bash
git clone <YOUR-REPOSITORY-URL>
```

Then:

```bash
cd Bias-Board-main
```

---

# 2. Create PostgreSQL Database

Open PostgreSQL through:

```text
pgAdmin
psql
```

or another PostgreSQL client.

Create:

```sql
CREATE DATABASE biasboard;
```

---

# 3. Initialize the Database

Connect to:

```text
biasboard
```

and run:

```text
backend/init.sql
```

Then run:

```text
backend/updatedIdols.sql
```

and, if needed:

```text
backend/updatedImages.sql
```

The correct order is:

```text
init.sql
    ↓
updatedIdols.sql
    ↓
updatedImages.sql
```

---

# 4. Configure Backend

Create:

```text
backend/.env
```

Example:

```env
PORT=5001
DB_USER=postgres
DB_HOST=localhost
DB_NAME=biasboard
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_secret
```

---

# 5. Install Backend Dependencies

```bash
cd backend
npm install
```

---

# 6. Start Backend

Development:

```bash
npm run dev
```

Production-style:

```bash
npm start
```

The server runs at:

```text
http://localhost:5001
```

The API routes begin at:

```text
http://localhost:5001/api
```

---

# 7. Test the API

Open:

```text
http://localhost:5001
```

Expected response:

```json
{
  "message": "BiasBoard API is Running! 🎤"
}
```

---

# 8. Install Frontend

Open another terminal:

```bash
cd frontend
npm install
```

---

# 9. Configure Frontend

Create:

```text
frontend/.env.local
```

with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

---

# 10. Start Frontend

```bash
npm run dev
```

The application should run at:

```text
http://localhost:3000
```

---

# Recommended Development Setup

Use two terminals.

## Terminal 1 — Backend

```bash
cd backend
npm install
npm run dev
```

## Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

# Frontend Commands

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Production:

```bash
npm start
```

Lint:

```bash
npm run lint
```

---

# Backend Commands

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

# Creating an Administrator

New registrations receive:

```text
role = user
```

by default.

To promote an existing user to administrator, update the PostgreSQL record manually.

For example:

```sql
UPDATE users
SET role = 'admin'
WHERE username = 'your_username';
```

Log out and log back in afterward so a new JWT is issued containing the updated role.

---

# Current API Summary

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

## Idols

```text
GET    /api/idols
GET    /api/idols?group=...
GET    /api/idols/:id
POST   /api/idols
PUT    /api/idols/:id
DELETE /api/idols/:id
```

The write operations require administrator access.

## Favorites

```text
GET    /api/favorites
POST   /api/favorites
PUT    /api/favorites/:id
DELETE /api/favorites/:id
```

All favorites routes require authentication.

---

# Current Issues Found in the Code

There are a few implementation details worth fixing before deployment or final presentation.

---

# Server Logger Middleware

`backend/server.js` currently contains:

```js
app.use((res, req, next) => {
```

The arguments are reversed.

Express middleware should use:

```js
app.use((req, res, next) => {
```

The current code also uses:

```js
req.orginalUrl
```

instead of:

```js
req.originalUrl
```

---

# Authorization Logging

The project currently logs authentication information.

Frontend:

```js
console.log(
    'Stored Token:',
    token
);
```

and:

```js
console.log(
    'Outgoing Headers:',
    headers
);
```

Backend middleware also logs:

```text
Authorization header
```

These logs should be removed before deployment because they may expose JWT credentials in browser or server logs.

---

# Admin Redirect Typo

The admin page contains:

```js
router.replace('/dashbaord');
```

This should be:

```js
router.replace('/dashboard');
```

Otherwise non-admin users may be redirected to a nonexistent page.

---

# Admin Loading Return

The admin page contains:

```js
if (loading) {
    <section>
        Loading Admin Dashboard...
    </section>
}
```

but does not return the JSX.

It should be:

```js
if (loading) {
    return (
        <section className="section">
            Loading Admin Dashboard...
        </section>
    );
}
```

---

# React Icon Import Typo

The idol detail page imports:

```js
FaInsagram
```

from:

```text
react-icons/fa
```

The correct icon name is typically:

```js
FaInstagram
```

The import is also currently unused.

This should be corrected or removed.

---

# Authentication Error String Mismatch

The backend returns:

```text
Authentication Required
```

and:

```text
Invalid or expired token.
```

Some frontend comparisons use slightly different capitalization or punctuation.

A better approach is to use:

```text
HTTP status codes
```

rather than comparing error-message strings.

---

# Next.js Image Configuration

The project currently allows:

```js
hostname: '**'
```

for remote Next.js images.

This makes development convenient because idol images come from many external websites, but production applications should ideally allow only trusted image domains.

---

# Current Limitations

The project currently does not include:

* Password reset
* Email verification
* Refresh tokens
* User profile editing
* User account deletion
* Server-side Next.js authentication
* HTTP-only authentication cookies
* Automated tests
* Pagination
* Idol sorting controls
* Group detail pages
* Favorite drag-and-drop ranking
* Search through favorite notes
* Admin user management
* Database migration tooling
* Docker setup
* Deployment configuration

---

# Recommended Future Improvements

Possible improvements include:

* Move JWTs from localStorage to secure HTTP-only cookies
* Add refresh-token support
* Add logout token invalidation
* Add password reset
* Add user profile pages
* Add profile images
* Add group pages
* Filter idols by group
* Filter idols by generation
* Filter idols by nationality
* Sort idols alphabetically
* Sort biases by ranking
* Add drag-and-drop bias ranking
* Add bias tiers
* Add favorite groups
* Add idol search autocomplete
* Add administrator user management
* Add Prisma or a migration system
* Add automated API tests
* Add React component tests
* Add Docker Compose
* Add production CORS configuration
* Improve responsive design
* Add loading skeletons
* Add toast notifications

---

# Recommended Production Authentication Architecture

The current architecture is:

```text
JWT
 ↓
localStorage
 ↓
Authorization Header
```

A more secure web deployment could use:

```text
Login
 ↓
Backend
 ↓
Secure HTTP-only Cookie
 ↓
Authenticated Requests
```

This reduces exposure of authentication tokens to client-side JavaScript.

---

# Educational Concepts Demonstrated

BiasBoard demonstrates:

```text
Next.js
React
React Hooks
Next.js App Router
Dynamic Routes
Client Components
REST APIs
Express
PostgreSQL
SQL
Foreign Keys
Many-to-Many Relationships
bcrypt
Password Hashing
JWT Authentication
Bearer Tokens
Role-Based Authorization
CRUD Operations
Protected Routes
Local Storage
Async/Await
Fetch API
Error Handling
Form Validation
Search Filtering
Responsive CSS
Environment Variables
Full-Stack Architecture
```

---

# Data Flow

## Public Idol Browsing

```text
/idols
  ↓
GET /api/idols
  ↓
Express
  ↓
PostgreSQL
  ↓
Idol Array
  ↓
React
  ↓
IdolCard
```

---

# Registration

```text
Registration Form
       ↓
POST /api/auth/register
       ↓
Validate
       ↓
bcrypt Hash
       ↓
PostgreSQL User
       ↓
Generate JWT
       ↓
Store User + Token
       ↓
Dashboard
```

---

# Login

```text
Login Form
   ↓
PostgreSQL Lookup
   ↓
bcrypt.compare()
   ↓
Generate JWT
   ↓
localStorage
   ↓
Dashboard
```

---

# Add Bias

```text
Idol Profile
      ↓
Choose Ranking
      ↓
Write Notes
      ↓
POST /api/favorites
      ↓
JWT Verification
      ↓
Insert PostgreSQL Favorite
      ↓
Bias Dashboard
```

---

# Edit Bias

```text
FavoriteCard
      ↓
Edit Ranking / Notes
      ↓
PUT /api/favorites/:id
      ↓
Verify Favorite Ownership
      ↓
Update PostgreSQL
```

---

# Admin Idol Management

```text
Admin Dashboard
       ↓
JWT Verification
       ↓
Role === admin
       ↓
Create / Update / Delete
       ↓
PostgreSQL idols
```

---

# Quick Start

```bash
git clone <YOUR-REPOSITORY-URL>

cd Bias-Board-main
```

Create:

```text
biasboard
```

in PostgreSQL.

Run:

```text
backend/init.sql
backend/updatedIdols.sql
backend/updatedImages.sql
```

Configure:

```text
backend/.env
frontend/.env.local
```

Start backend:

```bash
cd backend
npm install
npm run dev
```

Start frontend:

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# Summary

**BiasBoard** is a full-stack K-pop idol discovery and bias tracking platform built with:

```text
Next.js 16
React 19
Express 5
PostgreSQL
bcrypt
JWT
```

Visitors can:

```text
Browse Idols
Search Idols
View Detailed Idol Profiles
```

Registered users can:

```text
Create an Account
Log In
Add Biases
Rank Biases
Write Notes
Edit Biases
Remove Biases
View Collection Statistics
```

Administrators can:

```text
Add Idols
Edit Idols
Delete Idols
Search the Idol Catalog
```

The core architecture is:

```text
Next.js
   ↓
Express
   ↓
PostgreSQL
```

To run the application locally:

```text
Backend:
npm run dev

Frontend:
npm run dev
```

Then visit:

```text
http://localhost:3000
```
