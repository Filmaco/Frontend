import axios, {AxiosResponse, AxiosError} from "axios";
import TokenService from "./storage.service";

import router from "@/routes/router";

const API_URL = 'http://127.0.0.1:8000/videos'

const TagService = new class{

    public listarTags () {
        return new Promise<any>((resolve, reject) => {         
            axios.get(`${API_URL}/tags`)
                .then(response => {
                    resolve(response.data)
                })
                .catch((error: AxiosError) => reject(error))
                
            })  
    }

    public listarVideosPorTags(nome_tag: string) {
        return new Promise<any>((resolve, reject) => {         
            axios.get(`${API_URL}/tag/${nome_tag}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch((error: AxiosError) => reject(error))
                
            }) 
    }

}


export {TagService}