# 🧭 WanderLust — Full-Stack Accommodation Booking Platform

WanderLust is a full-stack web application inspired by Airbnb. It allows users to explore unique stays, host their own properties with image upload support, search destinations, view interactive maps, and share genuine reviews.

---

## 🚀 Live Demo

🔗 **Live Website:** [WanderLust Live Demo](https://wander-lust-roan-xi.vercel.app)

---

## ✨ Features

- 🔐 **Authentication & Authorization:** Secure Signup, Login, and Session Management with role-based access control (Only listing/review owners can edit or delete).
- 🏠 **Full CRUD Functionality:** Users can Create, Read, Update, and Delete property listings and reviews.
- ☁️ **Cloudinary Image Upload:** Seamless image storage and CDN hosting for property photos.
- 🔍 **Interactive Search & Category Filters:** Live destination search bar along with category filters (Trending, Rooms, Iconic Cities, Amazing Pools, etc.).
- 💰 **Dynamic Tax Toggle:** Instant price calculation with 18% GST display switch.
- 🗺️ **Interactive Maps:** Leaflet.js and OpenStreetMap integration for location visualizer.
- ❤️ **Wishlist System:** Bookmark favorite stays for easy access.
- 📱 **Responsive UI:** Built with custom CSS animations and Bootstrap 5 for mobile and desktop screens.

---

## 🛠️ Tech Stack

- **Frontend:** EJS (Embedded JavaScript), HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, FontAwesome
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ORM
- **Authentication:** Passport.js, Passport-Local, Passport-Local-Mongoose
- **Cloud Storage:** Cloudinary, Multer
- **Maps:** Leaflet.js, OpenStreetMap

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/kalsariya-sagar/WanderLust.git
cd WanderLust
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the project root and add the following:

```env
PORT=8080

ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### 4️⃣ Seed the Database (Optional)

```bash
node init/index.js
```

### 5️⃣ Start the Application

```bash
npm start
```

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Sagar Kalsariya**

GitHub: https://github.com/kalsariya-sagar

---

⭐ If you like this project, don't forget to **Star** the repository!
