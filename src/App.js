import logo from "./logo.svg";
import "./app.scss";
import Routes from "./Routes";
import { AuthProvider } from "./Context/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
function App() {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + Cookies.get("jwtToken");
  return (
    <div className="App">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
