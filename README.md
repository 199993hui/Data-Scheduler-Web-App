# Data Scheduler Web App

A full-stack web application for data management, interactive dashboards, user management, and optimised production schedule generation using the **SA-HH (Simulated Annealing - Hybrid Heuristic)** algorithm.

---

## Features

- **Data Management** — Upload, view, update, and delete production data (Excel files)
- **Interactive Dashboard** — Visualise order trends, product performance, and schedule insights through charts and heatmaps
- **Optimised Scheduling** — Automatically generate production schedules using the SA-HH algorithm via MATLAB integration, displayed as Gantt charts
- **Data Understanding & Clustering** — Perform K-Means clustering with feature selection and visualise results through scatter plots and bar charts
- **User Management** — Role-based access control with three roles: `Root`, `Admin`, and `Employee`
- **Authentication** — JWT-based login and session management

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Recharts / ApexCharts / Plotly | Data visualisation |
| Syncfusion Gantt | Gantt chart for schedule display |
| MUI (Material UI) | Component library |
| Formik + Yup | Form handling and validation |
| JWT Decode | Token-based auth on client |

### Backend
| Technology | Purpose |
|---|---|
| Python / Flask | REST API server |
| Flask-JWT-Extended | JWT authentication |
| Flask-Bcrypt | Password hashing |
| MongoDB (PyMongo) | Database |
| Pandas / NumPy | Data processing |
| Scikit-learn | K-Means clustering & feature scaling |
| MATLAB (subprocess) | SA-HH scheduling algorithm execution |

---

## Project Structure

```
data-scheduler-app/
├── frontend/               # React app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── DashboardPage/      # Order, Product, Schedule dashboards
│   │   │   ├── DataPage/           # File upload & data management
│   │   │   ├── ClusteringPage/     # Data understanding & clustering
│   │   │   ├── SchedulingPage/     # Schedule generation & Gantt chart
│   │   │   ├── AdminPage/          # User management (Root only)
│   │   │   └── LoginPage/          # Authentication
│   │   └── components/             # Shared UI components
│   └── package.json
│
└── backend/                # Flask REST API
    ├── app.py              # Main app & API routes
    ├── clustering.py       # K-Means clustering logic
    ├── schedule.py         # Schedule data retrieval
    ├── dashboard.py        # Dashboard data queries
    ├── employee.py         # User CRUD & auth logic
    ├── database.py         # MongoDB connection
    ├── to_text.py          # Data preprocessing for MATLAB
    └── config.py           # App configuration
```

---

## Getting Started

### Prerequisites
- Node.js >= 16
- Python >= 3.10
- MongoDB
- MATLAB (for scheduling algorithm)

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:

```env
SECRET_KEY=your_secret_key_here
```

Run the server:

```bash
python app.py
```

The backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend runs on `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/login` | User login |
| GET/POST/PUT/DELETE | `/emp` | Employee (user) management |
| POST | `/get_emp` | Get a specific employee |
| GET/POST/PUT/DELETE | `/data` | Production data management |
| GET | `/date` | Get available data dates |
| GET | `/dashboard_date` | Get available dashboard dates |
| POST | `/table_data` | Fetch table data by type and date |
| GET | `/line_data` | Line chart data for dashboard |
| POST | `/scheduling` | Fetch schedule/Gantt chart data |
| GET/POST | `/clustering` | Run clustering analysis |
| POST | `/clustering_result` | Get K-Means clustering result |

---

## Role-Based Access Control

| Role | Permissions |
|---|---|
| `Root` | Full access to all features including user management |
| `Admin` | Access to data, dashboard, scheduling, and clustering |
| `Employee` | Access to dashboard, scheduling, and clustering only |

---

## Algorithm — SA-HH (Simulated Annealing Hybrid Heuristic)

The scheduling engine uses a **Simulated Annealing Hybrid Heuristic (SA-HH)** algorithm implemented in MATLAB. It optimises the assignment of work orders to production lines by minimising makespan and balancing machine utilisation. The backend triggers MATLAB via subprocess, parses the output, and stores the generated schedule in MongoDB.
