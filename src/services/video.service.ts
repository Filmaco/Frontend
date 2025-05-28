import axios, {AxiosResponse, AxiosError} from "axios";
import TokenService from "./storage.service";

import router from "@/routes/router";

const API_URL = 'http://127.0.0.1:8000/videos'

const VideoService = new class{

    public listarVideos () {
        return new Promise<any>((resolve, reject) => {         
            axios.get(`${API_URL}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch((error: AxiosError) => reject(error))
                
            })  
    }

    public listarVideosPorUsuario (id:number) {
        console.log('id',id);
        
        return new Promise<any>((resolve, reject) => {         
            axios.get(`${API_URL}/usuario/${id}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch((error: AxiosError) => reject(error))
                
            })  
    }

    public inativarVideo(id:number) {
        return new Promise<any>((resolve, reject) => {         
            axios.put(`${API_URL}/inativar/${id}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch((error: AxiosError) => reject(error))
                
            })  
    }

     public editarVideo(id: string, dados: FormData) {
        return new Promise<any>((resolve, reject) => {
            axios
            .put(`${API_URL}/editar/${id}`, dados, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => resolve(response.data))
            .catch((error: AxiosError) => reject(error));
        });
    }

    public buscarPorId(id: string) {
        return new Promise<any>((resolve, reject) => {
            axios.get(`${API_URL}/${id}`)
                .then((response) => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

    public buscarNomeTagPorId(idTag: number) {
    return new Promise<any>((resolve, reject) => {
        axios.get(`${API_URL}/tag/id/${idTag}`)
            .then((response: AxiosResponse) => resolve(response.data))
            .catch((error: AxiosError) => reject(error));
    });
}


}


export {VideoService}