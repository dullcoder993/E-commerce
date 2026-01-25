🛒 ShopX – Full Stack E-Commerce Application 

 ShopX is a full-stack e-commerce web application built with a strong focus on backend logic, authentication, role-based access, and real-world cart handling.
 It supports admin and customer roles, multiple carts per user, and a secure admin dashboard.

 This project was built end-to-end including frontend, backend, authentication, and admin management.

🚀 Features
 👤 Authentication & Authorization

 - User registration & login

 - JWT-based authentication using HTTP-only cookies

 - Persistent login using /me route

 - Role-based access control (Admin / Customer)

 - Secure logout

🛍️ Products

 - Product listing

 - Product details page

 - Product images support

 - Category-based products

🛒 Cart System (Advanced)

 - Users can create multiple carts (up to a limit)

 - One active cart at a time

 - Add product to selected cart

 - Cart items with quantity control (+ / -)

 - Auto-remove item when quantity becomes zero

🧑‍💼 Admin Dashboard

 - Admin-only protected route

 - Add new products (image upload + category selection)

 - Delete products

 - View all users

 - Delete users (except admin)

 - Clean admin UI with tabs

🧠 Tech Stack
  Frontend
  
  - React
  
  - React Router
  
  - Context API
  
  - Axios
  
  - Tailwind CSS
  
Backend
  
  - Node.js
  
  - Express.js
  
  - MongoDB
  
  - Mongoose
  
  - JWT Authentication
  
  - Multer (file upload)
  
  - Custom middleware (Auth, Admin)

🔐 Roles

Customer

  - Browse products

  - View product details

  - Create and manage carts

  - Add/remove cart items

  - Manage profile

Admin

  - Access admin dashboard

  - Add & delete products

  - View all users
  
  - Delete users

📸 Screenshots

Screenshots are intentionally separated to clearly show functionality.

🔑 Authentication
<img width="1080" height="847" alt="image" src="https://github.com/user-attachments/assets/fe75f7bb-9366-4003-b0b4-9b2ed0608f5e" />
<img width="837" height="565" alt="image" src="https://github.com/user-attachments/assets/610d49aa-19ef-4831-bac9-33cdef4b2349" />

🛒 Cart & Cart Items
<img width="1602" height="776" alt="image" src="https://github.com/user-attachments/assets/1b7bb8c3-02f0-41aa-90ad-f7acf1c5e599" />

🧑‍💼 Admin – Product Management
<img width="1650" height="922" alt="image" src="https://github.com/user-attachments/assets/350b5c80-862f-405e-98ef-4f210dc1c67b" />


👥 Admin – User Management
<img width="1686" height="899" alt="image" src="https://github.com/user-attachments/assets/3783a39f-ec8f-4135-b2be-5f2a72da69bc" />


📁 Folder Structure (High Level)
frontend/
  ├─ components/
  ├─ pages/
  ├─ context/
  └─ routes/

backend/
  ├─ controllers/
  ├─ models/
  ├─ routes/
  ├─ middlewares/
  └─ utils/

  🧑‍💻 Author

Prathmesh Kulkarni

