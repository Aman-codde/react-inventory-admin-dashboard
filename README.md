# 📦 Inventory Admin Dashboard

A React-based admin dashboard to manage product inventory — built over a weekend by two developers.

## 🎯 Features

- ✅ View product list (name, category, price, stock)
- ✅ Add, edit, delete products (CRUD)
- ✅ Search, filter by category, and sort
- ✅ Low/in-stock indicators
- ✅ Visual charts with Recharts
- ✅ Powered by mock API (JSON Server)

## 🧱 Tech Stack

- React + Hooks
- Redux Toolkit
- React Router (optional)
- Axios + JSON Server
- Recharts
- Tailwind CSS


## 🚀 Setup Instructions

1. Clone the repo
    ```bash
    git clone https://github.com/Aman-codde/react-inventory-admin-dashboard.git

    cd react-inventory-admin-dashboard

2. Install dependencies
    ```bash
    npm install

3. Start the dev server
    ```bash
    npm run dev 

4. (Optional) Start JSON Server (mock API)
    📁 Sample Mock API (db.json)
    Create a file named db.json in the root:
    
    ```bash
    npx json-server --watch db.json --port 3001

    JSON Server will run at http://localhost:3001 and provide REST endpoints like /products.

## Visualization

The dashboard leverages Recharts to display product stock status and category breakdowns via interactive charts, helping admins quickly assess inventory.
