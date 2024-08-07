import { Sidebar } from "../components/Sidebar";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marcadores } from "../components/Marcadores";
import 'leaflet/dist/leaflet.css';
import { MapPin, Pencil, Trash } from "lucide-react";

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


  //EXCLUIR

  async function excluirLocal(id) {
    // Envia uma solicitação DELETE para o servidor
    await fetch(`http://localhost:3000/locais/${id}`, {
      method: 'DELETE',
    });
  
    // Atualiza a lista de locais removendo o local excluído
    setLista(lista.filter(local => local.id !== id));
  }
  

  return (
    <>
      <Sidebar></Sidebar>
      <div>
        <h1> LISTAGEM LOCAIS </h1>
        <button onClick={() => navigate("/cadastrolocais")}>
        <MapPin size={16}/> Cadastrar</button>

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
                  <Link to={`/cadastrolocais/${local.id}`}>
                    <button>
                      <Pencil size={16}/>Editar</button>
                  </Link>              
                </td>
                <td>
                  <button onClick={() => excluirLocal(local.id)}>
                    <Trash size={16}/>Excluir</button>
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

