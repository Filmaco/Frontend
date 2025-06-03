// src/services/seguidores.service.ts
import axios, { AxiosError } from 'axios';

const API_URL = 'http://127.0.0.1:8000/seguidores';

export const SeguidoresService = new class {
    
  public seguir(seguidor_id: number, seguido_id: number) {
    return new Promise<any>((resolve, reject) => {
      axios.post(`${API_URL}/seguir/${seguidor_id}/${seguido_id}`)
        .then(response => resolve(response.data))
        .catch((error: AxiosError) => reject(error));
    });
  }

  public deixarDeSeguir(seguidor_id: number, seguido_id: number) {
    return new Promise<any>((resolve, reject) => {
      axios.post(`${API_URL}/deixar_de_seguir/${seguidor_id}/${seguido_id}`)
      .then(response => resolve(response.data))
      .catch((error: AxiosError) => reject(error));
    });
  }

  public verificarSeSegue(usuario_id: number) {
    return new Promise<any>((resolve, reject) => {
      axios.get(`${API_URL}/verificar`, {
        params: { usuario_id }
      })
      .then(response => resolve(response.data))
      .catch((error: AxiosError) => reject(error));
    });
  }

    public listarSeguidoresPorId(usuario_id: number) {
    return new Promise<any>((resolve, reject) => {
      axios.get(`${API_URL}/listar/${usuario_id}`)
        .then(response => resolve(response.data))
        .catch((error: AxiosError) => reject(error));
    });
  }
};
