import axios, { AxiosError } from "axios";

const API_URL = 'http://127.0.0.1:8000/playlists';

const PlaylistService = new class {

    public criarPlaylist(dados: FormData) {
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

    public inativarPlaylist(id:number) {
        return new Promise<any>((resolve, reject) => {         
            axios.put(`${API_URL}/inativar/${id}`, {})
                .then(response => {
                    resolve(response.data)
                })
                .catch((error: AxiosError) => reject(error))
                
            })  
    }

    public listarPlaylist() {
        return new Promise<any>((resolve, reject) => {
            axios.get(`${API_URL}/`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

    public listarPlaylistsPorUsuario(usuarioId: number) {
        return new Promise<any>((resolve, reject) => {
            axios.get(`${API_URL}/usuario/${usuarioId}`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

    public adicionarVideoNaPlaylist(dados: FormData) {
        return new Promise<any>((resolve, reject) => {
            axios.post(`${API_URL}/video/add`, dados, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => resolve(response.data))
            .catch((error: AxiosError) => reject(error));
        });
    }

    public listarVideosDaPlaylist(playlistId: number) {
        return new Promise<any>((resolve, reject) => {
            axios.get(`${API_URL}/${playlistId}/videos`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

    public editarPlaylist(playlistId: number, dados: FormData): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios.put(`${API_URL}/${playlistId}`, dados, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => resolve(response.data))
            .catch((error: AxiosError) => reject(error));
        });
    }

    public obterPlaylistPorId(playlistId: number) {
        return new Promise<any>((resolve, reject) => {
                axios.get(`${API_URL}/${playlistId}`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
            });
        }
  
}

export { PlaylistService };
