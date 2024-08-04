import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import CadastroUsuario from "./pages/CadastroUsuario";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard  from "./pages/Dashboard";


function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/cadastrousuario' Component={CadastroUsuario}/>
          <Route path='/dashboard' Component={Dashboard}/>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
