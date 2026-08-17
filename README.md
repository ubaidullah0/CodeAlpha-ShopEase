# ShopEase E-commerce Store

A complete, professional, responsive Simple E-commerce Store built for CodeAlpha project submission.

## Tech Stack
- Frontend: HTML5, CSS3, Vanilla JS
- Backend: Node.js, Express.js
- Database: PostgreSQL

## Features
- Product listing and details
- Shopping cart
- User registration and login
- Checkout processing
- User order history
- Responsive UI

## Setup Instructions

### Backend Setup
1. Open the `backend` directory.
2. Install dependencies: `npm install`.
3. Create a `.env` file based on `.env.example` and fill in your PostgreSQL credentials and JWT secret.
4. Run the database schema to set up your tables: `psql -d your_db -f ../database/schema.sql`.
5. Start the server: `npm start`.

### Frontend Setup
1. The frontend requires no build steps. Just open `frontend/index.html` in your browser.
2. Optionally, run a local development server in the `frontend` folder.
3. Update `API_BASE_URL` in `frontend/js/api.js` if your backend is hosted somewhere other than localhost.

## Deployment
- The backend is configured for deployment to platforms like Render. Set the environment variables in your deployment dashboard.
- The frontend is ready for Vercel deployment. Ensure you link the `API_BASE_URL` environment variable to point to the deployed backend URL during build (or manually change it in `api.js` before deploying).
