# 🚚 Trucker Logbook - Frontend

A modern, premium React application designed to act as a digital driver's logbook, strictly enforcing FMCSA Hours of Service guidelines. Built with React, Vite, and Tailwind CSS.

## ✨ Features
- **Premium Glassmorphism UI:** Stunning dark-themed UI with micro-animations.
- **Interactive 24-Hour Grid:** Log and track status intervals (Off Duty, Sleeper Berth, Driving, On Duty) with an intuitive input system.
- **Real-Time Dashboard:** Automatically aggregates active driving/on-duty hours dynamically.
- **Axios Integration:** Seamlessly talks to the Django REST Framework backend to sync and validate driver logs.

## 🚀 Tech Stack
- React (Functional Components & Hooks)
- Vite
- Tailwind CSS v4
- Axios

## 🛠️ Local Development
1. Clone the repository: `git clone https://github.com/surya190211/Trucker-Frontend.git`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

## 🌍 Production
This project is pre-configured to be hosted easily on [Vercel](https://vercel.com/). Ensure the backend API URL inside `src/services/api.js` points to your production Django server (e.g., PythonAnywhere).
