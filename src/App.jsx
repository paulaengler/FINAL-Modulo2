import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
// import { TemplatePrivado } from "./routes/TemplatePrivado";
import Home from "./pages/Home";
import Dashboard  from "./pages/Dashboard";
import CadastroUsuario from "./pages/CadastroUsuario";
import CadastroLocais from "./pages/CadastroLocais";
import ListagemLocais from "./pages/ListagemLocais";
import Logout from "./contexts/SignOut";
import EditarLocais from '../src/pages/EditarLocais';



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
                <Route path='/cadastrolocais' Component={CadastroLocais}/>
                <Route path='/cadastrolocais/:id' Component={EditarLocais}/>
                <Route path='/listagemlocais' Component={ListagemLocais}/>                
                <Route path='/signout' Component={Logout}/>
                
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;


// export function AppRoutes() {
//   return (
//       <Routes>
//           {/* MINHAS ROTAS PUBLICAS */}
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/cadastro" element={<CadastroPage />} />
//           {/* MINHAS ROTAS PRIVADAS */}
//           <Route path="/dashboard" element={<TemplatePrivateRoute />}>
//               <Route path="/dashboard" element={<HomePage />}/>
//           </Route>
//       </Routes>
//   )
// } 

// export function App() {

//   return (
//     <>
//       <AuthProvider>
//         <BrowserRouter>
//           <AppRoutes />
//         </BrowserRouter>
//       </AuthProvider>
//     </>
//   )
// }

// export default App