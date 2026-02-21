# Health Monitoring & Blockchain Dashboard

A comprehensive, full-stack application designed to monitor and visualize real-time health metrics, analyze historical trends, and securely log data using blockchain technology. 

Designed with a modern, dark-themed UI, this dashboard provides in-depth insights into vital signs like Oxygen Saturation (SpO2), Body Temperature, and Heart Rate, alongside predictive analytics and secure data management.

![Dashboard Preview](./dashboard.png)

## Features

* **Real-Time Sensor Readings:** Displays the latest vital statistics including SpO2, Temperature, and Heart Rate, simulating real-life IoT device streams (e.g., ESP8266).
* **Advanced Data Visualization:** Utilizes Recharts to render interactive, beautiful charts for:
  * Average metrics over time
  * Min/Max ranges per month
  * Heart Rate Variability (HRV) and Temperature Variability (TVI)
* **Blockchain Integration:** Secures historical health logs leveraging smart contracts directly from the dashboard, ensuring data immutability and transparent verification.
* **Predictive Analytics:** Analyzes health trends to forecast future metrics and detect anomalies using the builtin prediction models.
* **Responsive Dark-Mode Interface:** Built with Material-UI (MUI), ensuring a premium, accessible, and responsive user experience across devices.

## Tech Stack

**Frontend (Client)**
* [React 18](https://reactjs.org/) & [Vite](https://vitejs.dev/)
* [Redux Toolkit](https://redux-toolkit.js.org/) & RTK Query
* [Material-UI (MUI)](https://mui.com/) & Emotion
* [Recharts](https://recharts.org/) for data visualization
* TypeScript

**Backend (Server)**
* [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
* Helmet & Morgan for security and logging

**Blockchain**
* [Solidity](https://soliditylang.org/)
* [Hardhat](https://hardhat.org/)
* [Ethers.js](https://docs.ethers.io/)

## Project Structure

This is a monorepo containing both the frontend and backend applications.

```
Final-Year-Project/
├── client/                 # React frontend application
│   ├── src/                # Source files (components, scenes, state)
│   ├── public/             # Static assets
│   ├── package.json        
│   └── vite.config.ts      
└── server/                 # Node.js Express backend & Blockchain
    ├── models/             # Mongoose schemas (HeartRate, etc.)
    ├── routes/             # API route controllers
    ├── contracts/          # Solidity smart contracts (HashStorage.sol)
    ├── scripts/            # Hardhat deployment scripts
    ├── package.json        
    └── index.js            # Main server entry point
```

## Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v16 or higher)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* A [MongoDB](https://www.mongodb.com/) cluster or local instance

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Emjaay20/Final-Year-Project.git
   cd Final-Year-Project
   ```

2. **Install Server Dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies:**
   ```bash
   cd ../client
   npm install
   ```

## Environment Variables

You need to set up environment variables for both the client and the server.

**Server (`server/.env`):**
Create a `.env` file in the `server` directory and add your MongoDB connection string:
```env
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
PORT=1337
# Add any blockchain specific variables (like private keys or Infura/Alchemy URLs) if needed for deployments
```

**Client (`client/.env.local` - *Optional*):**
If you need to change the default API base URL, create `.env.local` in the `client` folder:
```env
VITE_BASE_URL=http://localhost:1337
```

## Running the Application

To run the application locally, you will need to start both the server and the client in separate terminal windows.

**Start the Backend Server:**
```bash
cd server
npm run dev
```
*The server will start on `http://localhost:1337` (or the port specified in your .env).*

**Start the Frontend Client:**
```bash
cd client
npm run dev
```
*The client will start on `http://localhost:5173`.*

## Smart Contract Deployment

To deploy the blockchain smart contracts to a network (e.g., Sepolia):
```bash
cd server
npm run deploy-sc
```
*Make sure to configure your `hardhat.config.cjs` with the appropriate network RPC URLs and private keys.*

---
*Developed for a Final Year University Project.*
