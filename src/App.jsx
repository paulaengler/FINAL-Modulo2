import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Dashboard  from "./pages/Dashboard";
import CadastroUsuario from "./pages/CadastroUsuario";
import CadastroLocais from "./pages/CadastroLocais";
import ListagemLocais from "./pages/ListagemLocais";
import {SignOut} from "../src/contexts/SignOut";


function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/cadastrousuario' Component={CadastroUsuario}/>
          <Route path='/' Component={Home}/>        
          <Route path='/dashboard' Component={Dashboard}/>
          <Route path="/cadastrolocais" element={<CadastroLocais />} />
          <Route path="/cadastrolocais/:id" element={<CadastroLocais />} />
          <Route path='/listagemlocais' Component={ListagemLocais}/>                
          <Route path='/' Component={SignOut}/>              
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;