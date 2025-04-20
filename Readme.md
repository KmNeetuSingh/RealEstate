# 🏠 RealEstate App

A full-stack Real Estate platform that enables **Admins** to manage properties and **Users** to browse listings. Built with a focus on **Role-Based Authentication**, intuitive UI, and smooth user experience.

---

## 🚀 Tech Stack

**Frontend:**  
- React  
- Tailwind CSS  
- React Router  
- React Hot Toast  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB  
- JWT (Authentication)

---

## 👥 Role-Based Access Control (RBAC)

| Role  | Permissions                                                |
|-------|------------------------------------------------------------|
| Admin | ✅ Add Property <br> ✅ Edit Property <br> ✅ Delete Property |
| User  | 👁️ View Property listings only                             |

> Admins have full control over listings.  
> Users can only browse the available properties.

---

## 🗂️ Folder Structure

```
RealEstate/
│
├── Backend/
│   ├── config/            # DB & JWT configurations
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Auth middleware
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── Server.js          # Entry point
│   └── .env               # Environment variables
│
├── Frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── app/           # Redux setup or state logic
│   │   ├── assets/        # Images and illustrations
│   │   └── components/    # UI Components
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

## ✨ Features

- 🔐 **JWT Authentication** for secure login
- 📌 **Admin Dashboard** for property management
- 🏘️ **User Portal** for browsing listings
- 📨 **Contact Form** powered by Web3Forms
- 🔔 **Live Feedback** using react-hot-toast
- 📱 **Responsive UI** with Tailwind CSS

---

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/realestate-app.git
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

4. **Environment Variables (Backend)**
   Create a `.env` file in `/Backend` and add:
   ```
   MONGO_URI=your_mongodb_connection
   JWT_SECRET=your_jwt_secret
   ```

---

## 📬 Contact

Have questions or suggestions?  
📧 Email us at: **neetusingh99590@gmail.com**

---

## 📌 License

This project is licensed under the MIT License.  
Feel free to use and customize it for your projects.
```

--