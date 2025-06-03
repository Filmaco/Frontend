import axios, { AxiosError } from "axios";

const API_URL = 'http://127.0.0.1:8000/comentarios';

const ComentarioService = new class {

    public adicionarComentario(dados: FormData) {
        return new Promise<any>((resolve, reject) => {
            axios.post(`${API_URL}/add`, dados, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => resolve(response.data))
            .catch((error: AxiosError) => reject(error));
        });
    }

    public listarComentariosPorVideo(videoId: number) {
        return new Promise<any>((resolve, reject) => {
            axios.get(`${API_URL}/video/${videoId}`)
                .then(response => 
                    {
                        console.log(response.data);
                        
                        resolve(response.data)
                    }
                )
                .catch((error: AxiosError) => reject(error));
        });
    }

    public excluirComentario(comentarioId: number, usuarioId: number) {
        return new Promise<any>((resolve, reject) => {
            axios.delete(`${API_URL}/excluir/${comentarioId}/${usuarioId}`)
            .then(response => resolve(response.data))
            .catch((error: AxiosError) => reject(error));
        });
    }

};

export { ComentarioService };
