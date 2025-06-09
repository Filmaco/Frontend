import axios, { AxiosError } from "axios";

const API_URL = 'http://127.0.0.1:8000/estatisticas';

const EstatisticaService = new class {

    public estatisticasPorUsuario(usuarioId: number) {
        return new Promise<any>((resolve, reject) => {
            axios.get(`${API_URL}/usuarios/${usuarioId}`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

    public seguidoresComEstatisticas(usuarioId: number) {
        return new Promise<any>((resolve, reject) => {
            axios.get(`${API_URL}/seguidores/${usuarioId}`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

    public seguidosComEstatisticas(usuarioId: number) {
    return new Promise<any>((resolve, reject) => {
        axios.get(`${API_URL}/seguidos/${usuarioId}`)
            .then(response => resolve(response.data))
            .catch((error: AxiosError) => reject(error));
    });
}


}

export default EstatisticaService
