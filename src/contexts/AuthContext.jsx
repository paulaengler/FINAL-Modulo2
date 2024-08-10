import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
    user:null,
    signIn: async () => {},
    signOut: () => {}
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
        try {
            const response = await fetch(`http://localhost:3000/users?email=${data.email}&senha=${data.senha}`);
            const users = await response.json();
    
            if (users.length === 0) {
                throw new Error("Email/Senha inválida");
            }
    
            if (users.length > 0) {
                setUser(data); 
                localStorage.setItem('@natureza365:user', JSON.stringify(data)); 
                return true;                 
            } else {
                return false;
            }
    
        } catch (error) {
            console.error('Error during signIn:', error);
        }
    }

    async function signOut () {
        localStorage.removeItem('@natureza365:user');
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{ auth, setAuth, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );    
}