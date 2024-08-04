import { createContext, useState } from "react";
// useEffect

export const AuthContext = createContext(null)

export function AuthProvider({ children }){
    const [auth, setAuth] = useState(null);

   
    const getCredentials = async () => {
        try {
            const response = await fetch('../src/public/database.json');
            if (!response.ok) {
                throw new Error('Não foi possível obter o arquivo de credenciais');
            }
            const credentials = await response.json();

            console.log(credentials)
            return credentials;
        } catch (error) {
            console.error('Erro ao obter as credenciais', error);
            throw error;
        }
    };
    
    const signIn = async () => {
        try {
            // Obter credenciais do arquivo JSON
            const credentials = await getCredentials();
    
            // Desestruturar e-mail e senha
            const { email, senha } = credentials;
    
            // Fazer a requisição de autenticação
            const response = await fetch('http://localhost:3000/users', { 
                method: 'POST',
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify({ email, senha })
            });
    
            if (!response.ok) {
                throw new Error('Erro na autenticação');
            }
    
            const data = await response.json();
    
            localStorage.setItem('auth', JSON.stringify(data));
            setAuth(data);
            return data;
        } catch (error) {
            console.error('Erro na autenticação', error);
            throw error;
        }
    };
    
    // Executar a função de autenticação
    signIn(); 
  
    const signOut = () => {
        localStorage.removeItem('auth');
        setAuth(null);
    };

    return(
        <AuthContext.Provider value={{ auth, setAuth, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );    
}




// useEffect(() => {
    //     const storageAuth = localStorage.getItem('auth')
    //     if (storageAuth){
    //         setAuth(JSON.parse(storageAuth));
    //     }

    // }, []);

  
    // const signIn = async ({ email, senha}) => {
    //     try {
    //         const response = await fetch('http://localhost:3000/users', { 
    //             method: 'POST',
    //             headers: {
    //                 'Content-type': "application/json"
    //             },
    //             body: JSON.stringify({ email, senha })
    //         });

    //         console.log(response)

    //         if(!response.ok){
    //             throw new Error('Erro na autenticação')
    //         }

    //         const data = await response.json();

    //         localStorage.setItem('auth', JSON.stringify(data));
    //         setAuth(data);
    //         return data;
    //     }catch (error) {
    //         console.error('Erro na autenticação', error)
    //         throw error
    //     }
    // };





    // import { createContext, useState, useContext } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState(null);

//     return (
//         <AuthContext.Provider value={{ auth, setAuth }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);