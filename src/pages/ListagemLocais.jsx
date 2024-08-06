import { Sidebar } from "../components/Sidebar"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

function ListagemLocais() {
    const navigate = useNavigate()
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
     <h1> LISTAGEM LOCAIS </h1>
     <button onClick={() => navigate('/cadastrolocais')}>Cadastrar</button>

    {/* <Link to="/"> <button>Cadastrar</button></Link> */}
    <table border="1">
    <thead>
        <tr>
            <td>ID</td>
            <td>Nome do Local</td>
            <td>Mapa</td>
        </tr>
    </thead>
    <tbody>
        {
            lista.map((local) => (
                <tr key={local.id}>
                    <td>{local.id}</td>
                    <td>{local.nomelocal}</td>
                    <td></td>
                    <td>
                        <button>Editar</button>
                    </td>
                    <td>
                        <button>Excluir</button>
                    </td>
                </tr>
            ))
        }
    </tbody>
</table>
     </div>
      </>
    )
  }
  
  export default ListagemLocais