import axios, { AxiosError } from "axios";

const API_URL = 'http://127.0.0.1:8000/busca';

const BuscaAvancadaService = new class {

    public buscarVideosAvancado(filtros: {
        nome?: string;
        genero?: string;
        tags?: string[];
        tipo?: string;
        data_inicio?: string;
        data_fim?: string;
        duracao?: string;
    }) {
        return new Promise<any>((resolve, reject) => {
            const params = new URLSearchParams();

            if (filtros.nome) params.append("nome", filtros.nome);
            if (filtros.genero) params.append("genero", filtros.genero);
            if (filtros.tipo) params.append("tipo", filtros.tipo);
            if (filtros.data_inicio) params.append("data_inicio", filtros.data_inicio);
            if (filtros.data_fim) params.append("data_fim", filtros.data_fim);
            if (filtros.duracao) params.append("duracao", filtros.duracao);
            if (filtros.tags && filtros.tags.length > 0) {
                filtros.tags.forEach(tag => params.append("tags", tag));
            }

            axios.get(`${API_URL}/videos?${params.toString()}`)
                .then(response => resolve(response.data))
                .catch((error: AxiosError) => reject(error));
        });
    }

};

export { BuscaAvancadaService };
