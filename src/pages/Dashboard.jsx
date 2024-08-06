// import { api } from '../services/api';
import { Sidebar } from '../components/Sidebar';
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"


function Dashboard() {

  // const navigate = useNavigate()
  const [lista, setLista] = useState([])

  console.log(lista)

  async function carregarDados() {
      const resposta = await fetch('http://localhost:3000/locais')
      setLista(await resposta.json())
  }


  useEffect(() => {
      carregarDados()
  }, [])


    return (
      <>
      
      <Sidebar></Sidebar>
        <div>      
        <h1> Dashboard </h1>
        {/* <button onClick={() => navigate('/cadastrolocais')}>Cadastrar</button>    */}

        <table border="1">
                <thead>
                    <tr>
                        <td>Nome do local</td>
                        <td>Descrição</td>
                    </tr>
                </thead>
                <tbody>

                {
                        lista.map((item) => (
                            <tr key={item.id}>
                                <td>{item.nomelocal}</td>
                                <td>{item.descricao}</td>
                                
                            </tr>
                        ))
                    }
          </tbody>
          </table>

        </div>       
      </>
    )
  }
  
  export default Dashboard



 // const coordenadaInicial = [-27.59249003298383, -48.56058625979836]

  // // const [totalUsers, setTotalUsers ] = useState(0);
  // const [locais, setLocais] = useState(0);

  // async function buscarLocais() {
  //   const response = await api('/locais')
  //   const data = await response.json()
  //   setLocais(data)
  // }

  // useEffect(() => {
    // buscarLocais()
  // }, [])

  // return
      {/* <Link to="/"><button>Cadastrar</button></Link> */}