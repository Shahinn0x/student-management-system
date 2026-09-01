# Student Management System - RESTful API & Frontend

A full-stack RESTful API and single-page application built with **Node.js**, **Express.js**, **MongoDB (Mongoose)**, and **React**. This application provides complete CRUD (Create, Read, Update, Delete) operations for managing student records with input validation and centralized error handling.

---

## 🚀 Features

- **Full CRUD Functionality**: Create, view, update, and delete student records.
- **Data Validation**: Strict schema checks (10-digit phone numbers, valid email formatting, age limits).
- **Error Handling**: Centralized middleware catching duplicate entries (e.g., unique email) and invalid ObjectIDs.
- **Decoupled Architecture**: Modular Express structure (Config, Controllers, Models, Routes, Middleware).
- **Responsive UI**: React application synced with backend endpoints using Axios.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js (ES Modules)
- **Database**: MongoDB & Mongoose ORM
- **Frontend**: React.js (Vite), Axios
- **API Testing**: Postman

---

## 📁 Project Structure

```text
student-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── studentController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── studentModel.js
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
