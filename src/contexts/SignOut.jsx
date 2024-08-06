import { useAuth } from '../contexts/useAuth';
import { Link } from 'react-router-dom';


export default function Logout(){
    const { signOut } = useAuth();

    return(
        <>
        <div>
        <button onClick={signOut}> 
            <Link to='/'>Home</Link> 
        </button>        
        </div>
        </>
    )

}