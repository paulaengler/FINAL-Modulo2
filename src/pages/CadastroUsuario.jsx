import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


async function addUsers(values) {
  try {
    console.log(values);

    const resposta = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!resposta.ok) {
      alert("Houve um erro ao cadastrar o usuário");
      return false; 
    } else {
      alert("Pessoa cadastrada com sucesso");
      return true; 
    }
  } catch (error) {
    alert("Houve um erro ao cadastrar o usuário - no catch");
    return false; 
  }
}

function CadastroUsuario() {
  const navigate = useNavigate();
  const { register, formState, handleSubmit } = useForm();

  const onSubmit = async (values) => { 

    console.log("Dados do formulário:", values);
 
    const sucesso = await addUsers(values);

    console.log("Sucesso da operação:", sucesso);

    if (sucesso) { 
      console.log("Navegando para a página inicial");
      navigate('/'); 
    }
  };

  return (
    <>
    
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Nome</label>
          <input
            placeholder="Digite o nome"
            {...register("nome", { required: "O nome é obrigatório" })}
          />
          {formState.errors?.nome?.message}

          <label>Sobrenome</label>
          <input
            placeholder="Digite o sobrenome"
            {...register("sobrenome", {
              required: "O sobrenome é obrigatório",
            })}
          />
          {/* {formState.errors?.sobrenome?.message} */}

          <label>Data de nascimento</label>
          <input
            type="date"
            placeholder="Digite a data de nascimento"
            {...register("nascimento", {
              required: "A data de nascimento é obrigatória",
            })}
          />
          {/* {formState.errors?.nascimento?.message} */}

          <label>Sexo</label>
          <select {...register('sexo', { required: 'O sexo é obrigatório' })}>
          <option value=""></option>
          <option value="feminino">Feminino</option>
          <option value="masculino">Masculino</option>
          </select>
          {formState.errors?.sexo?.message}

          <label>CPF</label>
          <input
            type="number"
            placeholder="Digite o CPF"
            {...register("cpf", { required: "O CPF é obrigatório" })}
          />
          {/* {formState.errors?.cpf?.message} */}

          <label>Email</label>
          <input
            type="email"
            placeholder="Digite o email"
            {...register("email", { required: "O email é obrigatório" })}
          />
          {/* {formState.errors?.email?.message} */}

          <label>Senha</label>
          <input
            type="string"
            placeholder="Digite a senha"
            {...register("senha", { required: "O email é obrigatório" })}
          />
          {/* {formState.errors?.senha?.message} */}

          <label>Endereço</label>
          <input
            type="string"
            placeholder="Digite ao endereço"
            {...register("endereço", { required: "O email é obrigatório" })}
          />
          {/* {formState.errors?.endereço?.message} */}

          <label>Número/Complemento</label>
          <input
            placeholder="Digite o número do endereço"
            {...register("numero", { required: "O email é obrigatório" })}
          />
          {/* {formState.errors?.numero?.message} */}

          <label>CEP</label>
          <input
            type="number"
            placeholder="Digite o CEP do endereço"
            {...register("cep", { required: "O email é obrigatório" })}
          />
          {/* {formState.errors?.cep?.message} */}

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </>
  );
}

export default CadastroUsuario;






