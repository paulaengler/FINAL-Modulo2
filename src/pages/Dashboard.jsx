import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { MapPin, UsersRound } from "lucide-react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marcadores } from "../components/Marcadores";
import 'leaflet/dist/leaflet.css';


function Dashboard() {
  //DOIS QUADROS - usuarios

  const [numeroDeUsuarios, setNumeroDeUsuarios] = useState(0);

    useEffect(() => {
      const carregarUsuarios = async () => {
        try {
          const resposta = await fetch("http://localhost:3000/users");
          const dados = await resposta.json();
          console.log(dados); 
          setNumeroDeUsuarios(Object.keys(dados).length);
        } catch (error) {
          console.error('Erro ao carregar os dados:', error);
        }
      };  
      carregarUsuarios();
    }, []);

    //DOIS QUADROS - locais
    const [numeroDeLocais, setNumeroDeLocais] = useState(0);

    useEffect(() => {
      const carregarLocais = async () => {
        try {
          const resposta = await fetch("http://localhost:3000/locais");
          const dados = await resposta.json();
          console.log(dados); 
          setNumeroDeLocais(Object.keys(dados).length);
        } catch (error) {
          console.error('Erro ao carregar os dados:', error);
        }
      };  
      carregarLocais();
    }, []);
  


  // TABELA GRANDE
  const [locais, setLocais] = useState([]);

  async function carregarDados() {
    const resposta = await fetch("http://localhost:3000/locais");
    setLocais(await resposta.json());
  }

  useEffect(() => {
    carregarDados();
  }, []);


  //MAPA
  const coordenadaInicial = [-27.59249003298383, -48.56058625979836]


  return (
    <>
      <Sidebar></Sidebar>

      <div>
        {/* DOIS QUADROS */}
        <div>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', width: '200px' }}>
        <h2>Usuários</h2>
        <UsersRound size={16}/>
        <p>{numeroDeUsuarios}</p>
        </div>          
        </div>

        <div>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', width: '200px' }}>
        <h2>Locais</h2>
        <MapPin size={16}/>
        <p>{numeroDeLocais}</p>
        </div>          
        </div>

        {/* TABELA GRANDE */}
        <div>
          <h2> Locais e Descrição</h2>
          <table border="1">
            <thead>
              <tr>
                <td>Nome do local </td>
                <td>Descrição</td>
              </tr>
            </thead>
            <tbody>
              {locais.map((local) => (
                <tr key={local.id}>
                  <td>{local.nomelocal}</td>
                  <td>{local.descricao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MAPA */}
        <div>       
                <MapContainer center={coordenadaInicial} zoom={8} className="mapa-dashboard" style={{width:'500px', height:'500px', border:'5px'}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marcadores locais={locais}></Marcadores>
                </MapContainer>
        </div>

      </div>
    </>
  );
}

export default Dashboard;