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


    public editarAvaliacao(avaliacao_id: any, avaliacao: number): Promise<any> {
     const formData = new FormData();
     formData.append("avaliacao", avaliacao.toString());

     return new Promise<any>((resolve, reject) => {
        axios.put(`${API_URL}/editar/${avaliacao_id}`, formData, {
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

    public ultimaAvaliacaoDoUsuario(usuario_id: number, video_id: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios.get(`${API_URL}/usuario/${usuario_id}/${video_id}`)
            .then(response => resolve(response.data))
            .catch((error: AxiosError) => reject(error));
        });
    }

    public listarUltimasAvaliacoesPorVideo(video_id: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios.get(`${API_URL}/usuarios/video/${video_id}`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }
  
}

export { AvaliacaoService };
