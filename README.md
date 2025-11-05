# Journeaze - A Fullstack Travel Booking Application ✈️

**Journeaze** is a complete, full-stack travel booking web application built with the MERN stack. It provides a seamless, responsive, and secure platform for users to search, filter, and book hotel accommodations.

This project demonstrates a modern, end-to-end web development workflow, from a secure RESTful API to a dynamic, component-based React frontend with integrated payment processing.

---

## ✨ Live Demo

Explore the deployed application here:

[![Frontend Deployed](https://img.shields.io/badge/Frontend-Live%20Demo-brightgreen?style=for-the-badge&logo=vercel)](https://travel-booking-app-client.vercel.app/)
[![Backend Deployed](https://img.shields.io/badge/Backend-Live%20API-blue?style=for-the-badge&logo=vercel)](https://travel-booking-app-backend.vercel.app/)

---

## 🚀 Key Features

* **🔒 Secure Authentication:** Complete user registration and login (JWT-based).
* **✈️ Destination Search:** Find properties by destination (address, city, state, or country).
* **🎛️ Advanced Filtering:** Refine searches by Price Range, Rating, Property Type, Bedrooms, Bathrooms, and Beds.
* **❤️ User Wishlist:** Authenticated users can save their favorite properties to a personal wishlist.
* **💳 Secure Payments:** End-to-end booking workflow with **Razorpay** integration.
* **📱 Fully Responsive:** A clean, mobile-first design that works on all devices.
* **📖 Order Management:** View pre-payment order details and a post-payment order summary.

---

## 🛠️ Tech Stack & Architecture

The project follows a decoupled **three-tier architecture**.

### **Frontend (Client)**

* **React.js:** For building the dynamic, component-based user interface.
* **React Context API:** For global state management (auth, filters, wishlist).
* **React Router:** For client-side routing and page navigation.
* **Axios:** For making asynchronous HTTP requests to the backend API.

### **Backend (Server)**

* **Node.js & Express.js:** For building the secure, robust RESTful API.
* **MongoDB:** NoSQL database for storing all user, hotel, and order data.
* **Mongoose:** As the Object Data Modeler (ODM) to manage database schemas.

### **Security & Payments**

* **JSON Web Tokens (JWT):** For securing API routes and managing user sessions.
* **Bcrypt.js:** For one-way hashing and salting of user passwords.
* **Razorpay API:** For processing all payment transactions securely.

### **Deployment**

* **Vercel:** For high-performance, scalable hosting of both the frontend client and the serverless backend.
* **Git & GitHub:** For version control.

---

## 💻 Getting Started: Running Locally

To run this project on your local machine, follow these steps:

### **Prerequisites**

* [Node.js](https://nodejs.org/en/) (v16 or later)
* [MongoDB](https://www.mongodb.com/) (a local instance or a free Atlas cluster)
* A [Razorpay](https://razorpay.com/) account (for test API keys)

### **1. Clone the Repository**

```bash
git clone [https://github.com/prabhjeet2005/travel-booking-app.git](https://github.com/prabhjeet2005/travel-booking-app.git)
cd travel-booking-app