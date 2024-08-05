import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
// import { TemplatePrivado } from "./routes/TemplatePrivado";
import Dashboard  from "./pages/Dashboard";
import CadastroUsuario from "./pages/CadastroUsuario";
import Home from "./pages/Home";



function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/cadastrousuario' Component={CadastroUsuario}/>
          <Route path='/' Component={Home}/>
          {/* <Route path='/' Component={TemplatePrivado} >          */}
                <Route path='/dashboard' Component={Dashboard}/>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;