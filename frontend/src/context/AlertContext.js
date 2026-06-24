import { useState, createContext } from "react";

export const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const setAlertVisibility = (visible) => {
    setShowAlert(visible);
  };

  const setAlertMessage = (text) => {
    setMessage(text);
  };
  return (
    <AlertContext.Provider
      value={{ showAlert, message,type, setType, setAlertVisibility, setAlertMessage }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
