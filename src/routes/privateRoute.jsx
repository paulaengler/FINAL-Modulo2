import { Navigate, Outlet } from 'react-router-dom';


export function TemplatePrivado() {
    // Obtém o valor do localStorage e faz o parse do JSON
    const user = localStorage.getItem("@natureza365:user");

    let estaAutenticado = false;

    try {
        // Faz o parse do JSON para um objeto
        const userObj = JSON.parse(user);

        // Verifica se o objeto contém email e senha
        if (userObj && userObj.email && userObj.senha) {
            estaAutenticado = true;
        }
    } catch (e) {
        // Se ocorrer um erro ao parsear o JSON, assume-se que não está autenticado
        console.error("Erro ao verificar a autenticação:", e);
    }

    // Se estiver autenticado, renderiza o layout com o Outlet para renderizar componentes filhos
    // Caso contrário, redireciona para a página inicial
    return estaAutenticado ? (
       
        <div>
            <Outlet/>
        </div>
    ) : (
        <Navigate to='/' replace />
    );
}