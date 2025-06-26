import axios, { AxiosError } from "axios";

const API_URL = 'http://127.0.0.1:8000/estatisticas';

const EstatisticaService = new class {

    // estatisticas admin
    public estatisticasAdmin() {
        return new Promise<any>((resolve, reject) => {
            axios.get(`${API_URL}/admin`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

    // estatisticas basicas por usuario
    public estatisticasPorUsuario(usuarioId: number) {
        return new Promise<any>((resolve, reject) => {
            axios.get(`${API_URL}/usuarios/${usuarioId}`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

    // estatisticas de seguidores
    public seguidoresComEstatisticas(usuarioId: number) {
        return new Promise<any>((resolve, reject) => {
            axios.get(`${API_URL}/seguidores/${usuarioId}`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

    // estatisticas de seguidos
    public seguidosComEstatisticas(usuarioId: number) {
        return new Promise<any>((resolve, reject) => {
            axios.get(`${API_URL}/seguidos/${usuarioId}`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

    public estatisticasDetalhadas(usuarioId: number) {
        return new Promise<any>((resolve, reject) => {
            axios.get(`${API_URL}/usuarios/${usuarioId}/detalhado`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

}

export default EstatisticaService
