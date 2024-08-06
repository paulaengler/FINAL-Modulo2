import { Link } from "react-router-dom"
import { House } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { UsersRound } from 'lucide-react';
import { LogOut } from 'lucide-react';
// import './sidebar.css'

export function Sidebar(){
    return (
      <>
        <div className="sidebar">
            <h2 className="titulo">NATUREZA 365</h2>

        <div className="quadro1">
            <div className="quadro"> 
                <h2> Página inicial</h2>
                <button className="btn-sidebar">
                    <House size={16}/>            
                <Link to="/dashboard">Dashboard</Link>
                </button>
            </div>
            <div className="quadro">
                <h2> Cadastro de Locais </h2>
                <button className="btn-sidebar">
                    <MapPin size={16}/>
                <Link to="/cadastrolocais">Cadastro Locais</Link>
                </button>
            </div>
            <div className="quadro">
                <h2> Listagem de Locais </h2>
                <button className="btn-sidebar">
                    <UsersRound size={16}/>                
                <Link to="/listagemlocais">Listagem Locais</Link>
                </button>
            </div>
        </div>


        <div className="quadro2">
            <div className="quadro">
                <h2> Sair </h2>
                <button className="btn-sidebar">
                    <LogOut size={16}/>
                <Link to="/signout">Sair</Link>
                </button>
            </div>
        </div>

        </div>
      </>
    )
}

