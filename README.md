# Journeaze ✈️
**AI-Powered Full-Stack Travel Discovery & Booking Platform**

Journeaze is a comprehensive, highly optimized MERN-stack web application designed to handle the end-to-end lifecycle of hotel discovery, itinerary planning, and secure reservations. Architected with scalability and user experience in mind, the platform integrates LLM capabilities for dynamic travel generation and utilizes a containerized microservice environment for seamless deployment.

---

## ✨ Core Features

* **🤖 AI-Driven Itinerary Generation:** Integrates the Groq API (LLM) to parse natural language queries, automatically generating personalized, structured 3-day travel itineraries for user destinations.
* **⚡ Highly Optimized State Management:** Architected a multi-parameter search interface utilizing React Reducers. The client-side engine concurrently computes 8 dynamic state constraints (price boundary algorithms, categorical filters, and rating tiers) to deliver instant results while eliminating redundant backend API polling.
* **🛡️ Secure Authentication Pipeline:** Implements stateless session management utilizing HTTP-only, secure JWT cookies. This strictly mitigates Cross-Site Scripting (XSS) vulnerabilities and secures protected routing.
* **💳 Transactional Integrity:** Seamlessly integrates the RazorPay API webhook architecture to validate and process secure end-to-end payment lifecycles for property bookings.
* **🖼️ Resilient UI & Defensive Programming:** Employs automated fallback rendering logic to intercept `404 Not Found` errors from external CDN providers (e.g., Airbnb image servers), replacing broken links with local assets to ensure zero UI degradation.
* **🐳 Containerized Architecture:** Fully containerized utilizing Docker and Docker Compose, isolating frontend and backend environments to guarantee 100% environment consistency across developer machines and deployment pipelines.
* **🛒 User-Centric Features:** Includes persistent wishlist management, dynamic category filtering, comprehensive order history tracking, and interactive hotel exploration pages.

---

## 🛠️ Technical Architecture & Stack

### Frontend (Client Edge)
* **Framework:** React.js (ES6+)
* **State Management:** Context API & React Reducers
* **Routing:** React Router DOM
* **HTTP Client:** Axios (configured with `withCredentials` for cross-origin cookie support)
* **Styling:** Modular CSS

### Backend & Database
* **Runtime Environment:** Node.js
* **Framework:** Express.js (RESTful Architecture)
* **Database:** MongoDB (Mongoose ODM)
* **Security:** Bcrypt (Password Hashing), JSON Web Tokens (JWT), CORS Middleware
* **Payments:** RazorPay Node SDK

### Infrastructure & External APIs
* **Containerization:** Docker & Docker Compose
* **AI Provider:** Groq API
* **Deployment:** Vercel (Frontend), Render/Railway (Backend)

---

## 🚀 Getting Started

### Prerequisites
To run this application locally, ensure you have the following installed:
* [Node.js](https://nodejs.org/en/) (v18 or higher)
* [Docker Desktop](https://www.docker.com/products/docker-desktop) (For containerized setup)
* A MongoDB cluster URI (e.g., MongoDB Atlas)

### Local Development (Standard Setup)

1. **Clone the repository**
  - git clone [https://github.com/Prabhjeet2005/Travel-Booking-App](https://github.com/Prabhjeet2005/Travel-Booking-App)
  - cd Journeaze

2. **Install Backend Dependencies**
```
cd server
npm install
```

3. **Install Frontend Dependencies**
```
cd ../client
npm install --legacy-peer-deps
```

4. **Start the Development Servers**
Open two terminal windows:

- Terminal 1 (Backend): cd server && npm run dev
- Terminal 2 (Frontend): cd client && npm start

---

## 🐳 Docker Containerization (Recommended)
To spin up the entire application in isolated containers with guaranteed environment consistency:

1. Ensure Docker Desktop is running.
2. In the root directory of the project, run:
```
docker compose up --build
```
3. The application will map to your local host:

- Frontend: http://localhost:3001
- Backend: http://localhost:3500

---

## 🔐 Environment Variables
To run this project, you will need to add the following environment variables to your respective .env files.

1. Backend (/server/.env)
```
PORT=3500
MONGO_URI='your_mongodb_connection_string'
JWT_SECRET='your_secure_jwt_secret'
CLIENT_URL='http://localhost:3001'  # Or http://localhost:3000 depending on setup
GROQ_API_KEY='your_groq_llm_api_key'
RAZORPAY_KEY_ID='your_razorpay_key'
RAZORPAY_SECRET_KEY='your_razorpay_secret'
```

2. Frontend (/client/.env)
```
REACT_APP_SERVER_URL='http://localhost:3500/api/'
REACT_APP_KEY='your_razorpay_key'
REACT_APP_EMAIL='test@example.com'
REACT_APP_CONTACT='9999999999'
REACT_APP_NAME='Your Name'
```

---
## 📂 System Design (Directory Structure)
```
Journeaze/
├── client/                  # React Frontend
│   ├── public/              # Static assets and fallback images
│   ├── src/
│   │   ├── Components/      # Reusable UI components (Nav, HotelCards, Filters)
│   │   ├── context/         # Global Context Providers (Auth, Wishlist, Filter)
│   │   ├── Pages/           # Core view layouts
│   │   ├── reducer/         # Complex state transition logic
│   │   └── utils/           # Helper functions and regex validators
│   └── Dockerfile           # Frontend container blueprint
│
├── server/                  # Node.js Backend
│   ├── controllers/         # Core business logic and API handlers
│   ├── middleware/          # JWT verification and route protection
│   ├── models/              # Mongoose database schemas
│   ├── routes/              # Express API routing definitions
│   └── Dockerfile           # Backend container blueprint
│
└── docker-compose.yml       # Microservice orchestration configuration
```

