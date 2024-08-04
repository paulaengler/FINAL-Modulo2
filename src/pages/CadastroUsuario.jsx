import { useForm } from "react-hook-form"

function CadastroUsuario() {
  

    const { register, watch, handleSubmit, formState} = useForm()

    console.log(watch)

    console.log(formState.errors)

   async function addUsers(values){
        try {
            console.log(values)
        
            const resposta = await fetch('http://localhost:3000/usuarios', {
                method: 'post',
                body: JSON.stringfy(values)
            })
        
            if(resposta.ok === false) {
                alert("houve um erro ao cadastrar o usuário")
            } else {
                alert ("pessoa cadastrada com sucesso")
            }   
        
            console.log(resposta)
        
           } catch (error) {
                    alert("houve um erro ao cadastrar o usuário - no catch")
           }
        
        }

    return (
      <>
     
            <h1> Cadastro de usuario </h1>

      </>
    )
  }
  
  export default CadastroUsuario