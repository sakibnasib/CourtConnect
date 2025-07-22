🏟️ CourtConnect – Client Side
A responsive, user-friendly frontend for a full-stack sports court booking application. Users can browse courts, make bookings, and process payments, while admins manage users, courts, and finances via a powerful dashboard.

🔗 Live Site
👉 [View](https://courtconnect-fe336.web.app/)

🚀 Features
👤 User Features
🔐 Secure Firebase Authentication (Google login)

🏟️ View & book available sports courts

💳 Online payment integration (Stripe)

📆 Booking history with invoice details

🔄 Real-time court availability

🛠️ Admin Dashboard
📊 Overview with analytics (users, earnings, bookings)

🧑 Manage users and assign roles

🏟️ Add, update, delete courts

📅 View and filter booking data

📈 Google Charts / Chart.js for earnings insights

📱 UI/UX
🎨 Modern and mobile-first design using Tailwind CSS

⚡ Fast load times with lazy loading

🔍 Search & pagination for members and bookings


🧰 Tech Stack
Tech	Description
React	Frontend UI framework
Tailwind CSS	Styling library
React Router	SPA routing
Firebase	Authentication
Axios	API requests
TanStack Query	Data fetching & caching
Stripe	Secure payments
Google Charts / Chart.js	Data visualization

📦 Installation
Clone the repository

bash
Copy
Edit
git clone https://github.com/yourusername/sports-court-client.git
cd sports-court-client
Install dependencies

bash
Copy
Edit
npm install
Environment Variables

Create a .env file in the root directory:

ini
Copy
Edit
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRIPE_PK=your_stripe_public_key
Run the app

bash
Copy
Edit
npm run dev
📁 Folder Structure
bash
Copy
Edit
src/
│
├── components/        # Reusable UI components
├── pages/             # Page views (Home, Dashboard, Login, etc.)
├── layout/            # Layouts (Main, Dashboard)
├── routes/            # Protected & public route configs
├── hooks/             # Custom hooks (e.g., useAuth, useRole)
├── context/           # Auth context
├── services/          # API handlers (axiosSecure setup)
└── assets/            # Images and static files
🔒 Authentication Flow
Uses Firebase for OAuth (Google)

JWT is issued from the backend and stored in localStorage

Admin routes are protected using role-based guards

📊 Admin Dashboard
Clean and intuitive layout

Includes earnings breakdown (Today, Week, Month, Total)

Integrated bar/pie charts for financial reporting

Booking and member management with pagination & filters

📌 To-Do / Future Improvements
✅ Add calendar view for bookings

✅ Add email confirmation for bookings

⏳ Push notifications for upcoming bookings

⏳ Dark mode toggle

🙌 Credits
🔥 React

🎨 Tailwind CSS

🔐 Firebase

💳 Stripe

📊 Google Charts