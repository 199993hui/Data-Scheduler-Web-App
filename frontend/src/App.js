import "./App.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import AdminPage from "./pages/AdminPage/AdminPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import DataPage from "./pages/DataPage/DataPage";
import MainPage from "./pages/MainPage/MainPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import SchedulingPage from "./pages/SchedulingPage/SchedulingPage";
import ClusteringPage from "./pages/ClusteringPage/ClusteringPage";
import Alert from "./components/Alert/Alert";
import AlertProvider from "./context/AlertContext";

const App = () => {
  return (
    <>
      <div className="App">
        <AlertProvider>
          <Alert />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/main" element={<MainPage />}>
              <Route path="/main/management" element={<AdminPage />} />
              <Route path="/main/addEmployee" element={<SignUpPage />} />
              <Route path="/main/table" element={<DataPage />} />
              <Route path="/main/dashboard" element={<DashboardPage />} />
              <Route path="/main/scheduling" element={<SchedulingPage />} />
              <Route path="/main/clustering" element={<ClusteringPage />} />
            </Route>
          </Routes>
        </AlertProvider>
      </div>
    </>
  );
};

export default App;
