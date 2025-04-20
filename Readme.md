# 🏠 RealEstate

**RealEstate** is a full-stack property listing platform designed to streamline real estate management. It features a robust **role-based access system**, allowing **admins** to manage property listings and **users** to browse them with ease. Built with a strong focus on scalability, modern UI/UX practices, and secure authentication.

---

## 🚀 Tech Stack

### 🔹 Frontend
- **React.js**
- **Tailwind CSS**
- **React Router DOM**
- **React Hot Toast**

### 🔹 Backend
- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **JWT Authentication**

---

## 🌟 What This Application Can Do

The **RealEstate** isn't just a property listing platform—it's a complete solution for modern real estate management. Here's what makes it powerful and user-friendly:

### 🔑 For All Users:
- 🔍 **Browse All Listings:** Discover available properties with clean UI and responsive design.
- 🧭 **Detailed Views:** View full property descriptions, images, prices, and more.
- 📨 **Contact Easily:** Reach out to property managers directly via a built-in contact form.
- 📱 **Mobile-Ready Experience:** Navigate listings seamlessly on phones, tablets, and desktops.
- 🔔 **Live Notifications:** Get instant feedback on login, registration, or form submissions with toast notifications.

### 🛠️ For Admins:
- ➕ **Add New Properties:** Quickly post listings with all essential details.
- ✏️ **Edit Listings:** Update property information effortlessly with form-based editing.
- ❌ **Delete Listings:** Remove properties with a click when they're no longer available.
- 👥 **Manage Users:** View and delete users to maintain platform integrity.
- 🛡️ **Secure Access:** Full role-based control so only admins can modify content.

> Whether you're looking to **buy**, **rent**, or **manage**—RealEstate gives you the tools to do it all.

---

## 👥 Role-Based Access Control (RBAC)

| Role  | Permissions                                                 |
|-------|-------------------------------------------------------------|
| Admin | ✅ Create <br> ✅ Edit <br> ✅ Delete Properties              |
| User  | 👁️ View Property Listings Only                             |

> Admins maintain full control over property listings, while users can only explore available properties.

---

## ✨ Key Features

- 🔐 **JWT Authentication** for secure session management  
- 🏘️ **Admin Dashboard** for property CRUD operations  
- 📱 **Mobile-Responsive UI** for seamless cross-device experience  
- 📌 **Role-Based Routing** to control feature access  
- 📨 **Contact Form Integration** using Web3Forms  
- 🔔 **Toast Notifications** for real-time feedback  

---

## 🗂️ Project Structure

```
RealEstate/
│
├── Backend/
│   ├── config/             # Database & environment config
│   ├── controllers/        # Route logic
│   ├── middleware/         # Auth middlewares
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── index.js            # Server entry point
│   └── .env                # Environment variables
│
├── Frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── app/            # State management setup
│   │   ├── assets/         # Illustrations & media
│   │   └── components/     # UI components & pages
│   │       ├── About.jsx
│   │       ├── AddProperty.jsx
│   │       ├── Contact.jsx
│   │       ├── Dashboard.jsx
│   │       ├── EditProperty.jsx
│   │       ├── Footer.jsx
│   │       ├── Home.jsx
│   │       ├── Login.jsx
│   │       ├── Navbar.jsx
│   │       └── PresentingSponser.jsx
│   └── package.json
```

---

## 📡 API Overview

### 🔐 Auth Endpoints (`/api/auth`)
- `POST /register` – Register a new user  
- `POST /login` – Authenticate and retrieve JWT  

### 🏠 Property Endpoints (`/api/properties`)
- `GET /` – Fetch all properties  
- `GET /:id` – Get a single property by ID  
- `POST /` – Add a property *(Admin only)*  
- `PUT /:id` – Update property *(Admin only)*  
- `DELETE /:id` – Delete property *(Admin only)*  

### 🛡️ Admin Endpoints (`/api/admin`)
- `GET /users` – Retrieve all users *(Admin only)*  
- `DELETE /user/:id` – Remove a user *(Admin only)*  

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/realestate-app.git
cd realestate-app
```

---

### 2. Backend Setup
```bash
cd Backend
npm install
npm start
```

Create a `.env` file in the `/Backend` directory and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

### 3. Frontend Setup

If not already initialized, create the frontend using Vite:

```bash
npm create vite@latest Frontend --template react
cd Frontend
```

Then install the required dependencies:

```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-router-dom react-hot-toast
```

Configure Tailwind in `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },


Add Tailwind to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Finally, run the development server:

```bash
npm run dev
```

---

## 📬 Contact

For queries, suggestions, or collaborations:  
📧 **neetusingh99590@gmail.com**

---

## 📄 License

This project is open-source and available under the **MIT License**.  
Feel free to use and modify it for personal or commercial purposes.
