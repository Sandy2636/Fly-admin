import logo from "./logo.svg";
import "./app.scss";
import Routes from "./Routes";
import { AuthProvider } from "./Context/AuthContext";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
