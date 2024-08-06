import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
    user:null,
    signIn: async () => {},
})

export function AuthProvider({ children }){
    const [auth, setAuth] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storageAuth = localStorage.getItem('auth')
        if (storageAuth){
            setAuth(JSON.parse(storageAuth));
        }

    }, []);

    async function signIn(data) {
        // Verifica se o email e senha estão corretos
        try {
            console.log(data);
            const response = await fetch(`http://localhost:3000/users?email=${data.email}&senha=${data.senha}`);
            const users = await response.json();
            console.log(response);
    
            if (users.length === 0) {
                throw new Error("Email/Senha inválida");
            }
    
            if (users.length > 0) {
                setUser(data); // Atualizar o estado do usuário
                localStorage.setItem('@natureza365:user', JSON.stringify(data)); // Salvar os dados no localStorage
                return true;
            } else {
                return false;
            }
    
        } catch (error) {
            console.error('Error during signIn:', error);
            // alert("Email/Senha inválida-authcontext");
            // throw new Error("Email/Senha inválida");
        }
    }

    const signOut = () => {
        localStorage.removeItem('@natureza365:user');
        setAuth(null);
    };

    return(
        <AuthContext.Provider value={{ auth, setAuth, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );    
}