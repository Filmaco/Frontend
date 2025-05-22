import axios, { AxiosError } from "axios";
import TokenService from "./storage.service";
import router from "@/routes/router";

const API_URL = 'http://localhost:8000';

const UserService = new class {

  public async login(email: string, senha: string): Promise<any> {
    try {
      if (!email || !senha) {
        throw new Error("Email e senha são obrigatórios.");
      }

      const response = await axios.post(`${API_URL}/usuarios/login`, { email, senha });

      //const { token, refresh_token, name } = response.data;
      const { token } = response.data;

      TokenService.saveToken(token.token);
      localStorage.setItem('usuario_id', token.id.toString());
      //TokenService.saveRefreshToken(refresh_token);
      //TokenService.saveName(name);

      
      return response.data;
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  public cadastrar(data: any): Promise<any> {
    return axios.post(`${API_URL}/cadastro`, data)
      .then(response => response.data)
      .catch((error: AxiosError) => { throw error });
  }

  public delete(id: number): Promise<any> {
    return axios.post(`${API_URL}/deletar`, { id })
      .then(response => response.data)
      .catch((error: AxiosError) => { throw error });
  }

  // public async logout() {

  //   localStorage.removeItem('token');
  //   localStorage.removeItem('name');
  //   localStorage.removeItem('refresh_token');
  //   localStorage.removeItem('id'); // se necessário
  
  // }

  public async perfil(): Promise<any> {
    try {
      const token = TokenService.getToken();
      
      if (!token) throw new Error("Token não encontrado.");
  
      const response = await axios.get(`${API_URL}/perfil`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          //TokenService.logoutAndRedirect();
        }
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  public async getUserByName(nome_completo:string): Promise<any> {
    try {
      const response = await axios.get(`${API_URL}/usuarios/nome/${nome_completo}`)
      return response.data.usuario.usuario;
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  public async getUserById(id:number): Promise<any> {
    try {
      const response = await axios.get(`${API_URL}/usuarios/${id}`)
      return response.data.usuario.usuario;
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error;
      }
      throw error;
    }
  }
  
};

export { UserService };
