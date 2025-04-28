import axios from 'axios';

export async function resetarSenha(email) {
  try {
    const response = await axios.post('http://localhost:8000/resetar/senha', {
      email: email
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
