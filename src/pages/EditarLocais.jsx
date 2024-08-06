import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { useEffect } from 'react';

export function PaginaEditarLocal (){
    const { register, handleSubmit, reset } = useForm();
    const { id } = useParams();

async function onUpdate(data){    
    const response = await api('/locais' + id, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
        const update = await response.json()
        alert ('Atualizado com sucesso')
        console.log(update)
    }

    async function buscarLocal(){
        const response = await api(`/locais/${id}`)
        const data = await response.json()

        if(data.length>0){
            const local = data[0];
            reset(local)
        }
        console.log(data)
    }

    useEffect (()=> {
       if (id) {
       buscarLocal()    
    }
        }, [id])


    return (
    <>
    <form onSubmit={handleSubmit(onUpdate)}>
        <input type="text" {...register('nome')} />
        <input type="text" {...register('descricao')} />
        <button>Atualizar</button>
    </form>
    </>
    )
}