import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/useAuth";
import { UsersRound, LogIn } from 'lucide-react';
// import { useContext } from 'react';
// import { AuthContext } from "../contexts/AuthContext";
// import LoginComponent from "../contexts/LoginComponent";

function Home() {
  
  const { signIn } = useAuth();
  const { register, formState, handleSubmit} = useForm();
  const navigate = useNavigate();
 
  async function onSubmit(data){
      try {
         const isSuccess = await signIn(data)
         // console.log(data)
         if(isSuccess){
            navigate('/dashboard')
         } else {
          alert('Email/senha inválidos')
         }
      } catch (error) {
          (console.log(error))
      }
  }


    return (
      <>    
        <div>

        <div className="img-home">
           <img className='img-home' src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg" />
        </div> 

        <form onSubmit={handleSubmit(onSubmit)} className="form-home" >
            <input placeholder="Email" type="email" {...register('email', {required: 'O email é obrigatório',})}/>
            <span>{formState.errors?.email?.message}</span>
            <input placeholder="Senha" type="senha" {...register('senha', {required: 'A senha é obrigatória'})}/>
            <span>{formState.errors?.senha?.message}</span>
            <button>
               <LogIn size={16}/>
               Entrar</button>
            <Link to="/CadastroUsuario">
            <button>
               <UsersRound size={16}/>
               Cadastrar</button>   
            </Link>
        </form>
        </div>

       </>
    )
  }
  
  export default Home



