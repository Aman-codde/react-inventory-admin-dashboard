import "./App.css";
import Dashboard from "./pages/Dashboard";
import './styles/theme.css';
import {Toaster} from "react-hot-toast";

function App() {
  
 
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "16px",
            fontWeight: "bold",
          },
          success: {
            duration: 4000,
            style:{
              backgroundColor: "#4CAF50",
              color: "#fff",
            }
          },
          error: {
            duration: 5000,
            style: {
              backgroundColor: "#E53E3E",
              color: "#fff"
            }
          }
        }}
      />
      <Dashboard />
    </>
  );
}

export default App;
