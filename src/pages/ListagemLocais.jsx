import { Sidebar } from "../components/Sidebar";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marcadores } from "../components/Marcadores";
import 'leaflet/dist/leaflet.css';
import {useForm} from 'react-hook-form';
import { PaginaEditarLocal } from "./EditarLocais";

function ListagemLocais() {
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);

  console.log(lista);

  async function carregarDados() {
    const resposta = await fetch("http://localhost:3000/locais");
    setLista(await resposta.json());
  }

  useEffect(() => {
    carregarDados();
  }, []);

  //MAPA
  const [locais, setLocais] = useState([]);
  const coordenadaInicial = [-27.59249003298383, -48.56058625979836]


  //EDITAR
  

  return (
    <>
      <Sidebar></Sidebar>
      <div>
        <h1> LISTAGEM LOCAIS </h1>
        <button onClick={() => navigate("/cadastrolocais")}>Cadastrar</button>

        {/* <Link to="/"> <button>Cadastrar</button></Link> */}
        <table border="1">
          <thead>
            <tr>
              <td>Nome do Local</td>
              <td>Mapa</td>
            </tr>
          </thead>
          <tbody>
            {lista.map((local) => (
              <tr key={local.id}>
                <td>{local.nomelocal}</td>
                <td>
                  <MapContainer
                    center={coordenadaInicial}
                    zoom={8}
                    className="mapa-dashboard"
                    style={{ width: "100px", height: "100px", border: "5px" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marcadores locais={locais}></Marcadores>
                  </MapContainer>
                </td>
                <td> 
                    <Link to="/PaginaEditarLocal">
                    <button>Editar</button>
                    </Link>                
                </td>
                <td>
                  <button>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListagemLocais;
