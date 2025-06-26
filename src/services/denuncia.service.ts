import axios, { AxiosError } from "axios";

const API_URL = 'http://127.0.0.1:8000/denuncias';

const DenunciaService = new class {

    public criarDenuncia(dados: {
        usuario_id: number;
        motivo: string;
        video_id?: number;
    }) {
        return new Promise<any>((resolve, reject) => {
            axios.post(`${API_URL}/`, dados)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

    public listarDenuncias() {
        return new Promise<any>((resolve, reject) => {
            axios.get(`${API_URL}/lista`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

    public atualizarStatus(denuncia_id: number, novo_status: 'pendente' | 'resolvido' | 'impedimento') {
        return new Promise<any>((resolve, reject) => {
            axios.put(`${API_URL}/${denuncia_id}/status`, { novo_status })
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

    public alterarStatusVideoImpedimento(video_id: number) {
        return new Promise<any>((resolve, reject) => {
            axios.put(`${API_URL}/alterar-status/${video_id}/investigando`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

     public alterarStatusVideoBloqueado(video_id: any) {
        return new Promise<any>((resolve, reject) => {
            axios.put(`${API_URL}/alterar-status/${video_id}/bloqueado`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

    public alterarStatusVideoAtivo(video_id: any) {
        return new Promise<any>((resolve, reject) => {
            axios.put(`${API_URL}/alterar-status/${video_id}/ativo`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

    public removerConteudo(denuncia_id: number) {
        return new Promise<any>((resolve, reject) => {
            axios.delete(`${API_URL}/${denuncia_id}/remover-conteudo`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

    public obterPorId(denuncia_id: number) {
        return new Promise<any>((resolve, reject) => {
            axios.get(`${API_URL}/${denuncia_id}`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }
}

export default DenunciaService;
