import RoutesConfig from "./routes/Routes";
import "./styles/app.css";
import "./styles/temas.css";
import { AuthProvider } from "./pages/context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RoutesConfig />
      </AuthProvider>
    </div>
  );
}

export default App;
