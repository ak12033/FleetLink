# 🚛 FleetLink - Smart Logistics Vehicle Booking System

FleetLink is a modern full-stack logistics vehicle booking system built with the MERN stack. It allows users to:

- Search for available logistics vehicles by capacity, route, and time.
- Book vehicles instantly.
- Add and manage fleet vehicles.
- View and cancel bookings via the dashboard.

## ✨ Features

- 🔍 Real-time vehicle availability search
- 🚀 One-click vehicle booking with status feedback
- 🧾 Booking dashboard with cancellation support
- ➕ Admin vehicle addition form
- ⚡️ Animated UI, gradients, icons, and loading spinners
- 🌐 RESTful API powered by Express + MongoDB

---

## 🔧 Tech Stack

- **Frontend:** React, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Tools:** Axios, React Hot Toast, React Router

---

## 🚀 Deployment —  Vercel

- **Backend:** Vercel  
- **Frontend:** Vercel  

---

## 🚀 Live Demo

🌐 Click this: [click](https://fleet-link-xsys.vercel.app/)

---

## Getting Started

To get started with the Fleet-Link project, follow these steps:

1. Clone the repository from GitHub:

2. **Set Environment Variables**: Navigate to the `frontend` and `backend` folders and add necessary environment variables. You may need to create a `.env` file and configure it with required variables:
   In the backend/.env file:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string_here
   ```

   In the frontend/.env file:

   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```

3. **Install Dependencies**: Install dependencies in the `frontend` and `backend` folders using npm or yarn:

   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

4. **Start the Backend Server**: In the `backend` folder, start the development server using npm:

   ```
   npm run server
   ```

