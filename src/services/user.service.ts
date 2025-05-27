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

  public async cadastrar(data: any): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}/usuarios/add`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });


      return response;

    } catch (error: any) {
      const serverMessage = error.response?.data?.mensagem;
      throw new Error(serverMessage || error.message || 'Erro inesperado');
    }
  }

  public async editar(data: any, id: number): Promise<any> {
    try {
      const response = await axios.put(`${API_URL}/usuarios/editar/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });


      return response;

    } catch (error: any) {
      const serverMessage = error.response?.data?.mensagem;
      throw new Error(serverMessage || error.message || 'Erro inesperado');
    }
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

  public async inativarUsuario(id:number) : Promise<any> {
    try {
      const response = await axios.put(`${API_URL}/usuarios/inativar/${id}/inativo`, {})

      TokenService.removeIdUser()
      localStorage.removeItem('token');
      localStorage.removeItem('name');
     
      return response;
    }catch(error) {
        alert('Erro ao inativar')
        console.error(error);

      }
  }

  public async ativarUsuario(id:number) : Promise<any> {
    try {
      const response = await axios.put(`${API_URL}/usuarios/status/${id}/ativo`, {})
     
      return response;
    }catch(error) {
        alert('Erro ao inativar')
        console.error(error);

      }
  }

  public async inativarUsuarioADM(id:number) : Promise<any> {
    try {
      const response = await axios.put(`${API_URL}/usuarios/status/${id}/inativo`, {})
     
      return response;
    }catch(error) {
        alert('Erro ao inativar')
        console.error(error);

      }
  }

  public async alterarTipoUsuario(adminId: number, usuarioIdPromovido: number, tipo:string): Promise<any> {
    try {
      const token = TokenService.getToken();
      if (!token) {
        throw new Error("Token não encontrado.");
      }

      const response = await axios.put(
        `${API_URL}/usuarios/promover/${adminId}/${usuarioIdPromovido}/${tipo}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return response.data;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  
};

export { UserService };
