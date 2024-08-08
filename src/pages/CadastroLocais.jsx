import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Sidebar } from "../components/Sidebar";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marcadores } from "../components/Marcadores";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

async function saveLocal(values, isEditMode) {
  try {
    const url = isEditMode ? `http://localhost:3000/locais/${values.id}` : 'http://localhost:3000/locais';
    const method = isEditMode ? 'PUT' : 'POST';
    
    const resposta = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!resposta.ok) {
      alert("Houve um erro ao salvar o local");
      return false; 
    } else {
      alert("Local salvo com sucesso");
      return true; 
    }
  } catch (error) {
    alert("Houve um erro ao salvar o local - no catch");
    return false; 
  }
}

async function buscarEndereco(cep) {
  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const endereco = await resposta.json();

    if (endereco.erro) {
      alert("CEP não encontrado.");
      return null;
    }

    return endereco;
  } catch (error) {
    alert("Erro ao buscar o endereço.");
    return null;
  }
}

function RedCadastroLocal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, formState, handleSubmit, setValue } = useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [cep, setCep] = useState("");

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchLocalData(id);
    }
  }, [id]);

  const fetchLocalData = async (id) => {
    const resposta = await fetch(`http://localhost:3000/locais/${id}`);
    const data = await resposta.json();

    for (const key in data) {
      setValue(key, data[key]);
    }
  };

  const onSubmit = async (values) => { 
    const sucesso = await saveLocal(values, isEditMode);
    if (sucesso) { 
      navigate('/dashboard'); 
    }
  };

  const handleBuscarEndereco = async () => {
    const endereco = await buscarEndereco(cep);
    if (endereco) {
      setValue("endereço", endereco.logradouro);
      setValue("numero", endereco.numero || "");
      setValue("bairro", endereco.bairro);
      setValue("cidade", endereco.localidade);
      setValue("estado", endereco.uf);
    }
  };

  //MAPA
  const [locais, setLocais] = useState([]);
  const coordenadaInicial = [-27.59249003298383, -48.56058625979836]

  return (
    <>
      <Sidebar />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Nome do local</label>
          <input
            placeholder="Digite o nome do local"
            {...register("nomelocal", { required: "O nome do local é obrigatório" })}
          />
          {formState.errors?.nomelocal?.message}

          <label>CEP</label>
          <input
            type="text"
            placeholder="Digite o CEP do local"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
          {formState.errors?.cep?.message}
          <button type="button" onClick={handleBuscarEndereco}>
            Buscar Endereço
          </button>

          <label>Endereço</label>
          <input
            type="string"
            placeholder="Digite ao endereço"
            {...register("endereço", { required: "O email é obrigatório" })}
          />
          {formState.errors?.endereço?.message}

          <label>Número/Complemento</label>
          <input
            placeholder="Digite o número do endereço"
            {...register("numero", { required: "O email é obrigatório" })}
          />
          {formState.errors?.numero?.message}

          <label>Cidade</label>
          <input
            placeholder="Digite a cidade do local"
            {...register("cidade", { required: "A cidade é obrigatória" })}
          />
          {formState.errors?.cidade?.message}

          <label>Latitude</label>
          <input
            type="string"
            placeholder="Digite a latitude"
            {...register("latitude", { required: "A latitude é obrigatória" })}
          />
          {formState.errors?.latitude?.message}

          <label>Longitude</label>
          <input
            type="string"
            placeholder="Digite a longitude"
            {...register("longitude", { required: "A longitude é obrigatória" })}
          />
          {formState.errors?.longitude?.message}

          <textarea 
            placeholder="Digite a descrição do local"
            {...register("descricao", { required: "A descrição é obrigatória" })}
          ></textarea>
       
          {/* ***MAPA*** */}
          <div>       
            <MapContainer center={coordenadaInicial} zoom={8} className="mapa-cadastro" style={{ width: '500px', height: '500px', border: '5px' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
              <Marcadores locais={locais}></Marcadores>
            </MapContainer>
          </div>
       
          <button type="submit">
            <MapPin size={16}/>{isEditMode ? "Editar" : "Cadastrar"}</button>
        </form>
      </div>
    </>
  );
}

export default RedCadastroLocal;

