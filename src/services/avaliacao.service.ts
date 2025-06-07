import axios, { AxiosError } from "axios";

const API_URL = 'http://127.0.0.1:8000/avaliacoes';

const AvaliacaoService = new class {

    public criarAvaliacao(dados: FormData) {
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

    public listarAvaliacaoPorVideo(video_id: Number) {
        return new Promise<any>((resolve, reject) => {
            axios.get(`${API_URL}/listar/${video_id}`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }


    public editarAvaliacao(avaliacao_id: any, dados: FormData): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios.put(`${API_URL}/editar/${avaliacao_id}`, dados, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => resolve(response.data))
            .catch((error: AxiosError) => reject(error));
        });
    }

    public deletarAvaliacao(avaliacao_id: any) {
        return new Promise<any>((resolve, reject) => {
            axios.delete(`${API_URL}/excluir/${avaliacao_id}`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }
  
}

export { AvaliacaoService };
