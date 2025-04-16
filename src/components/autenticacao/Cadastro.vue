<template>
  <div>
    <h2>Criar Usuário</h2>
    <form @submit.prevent="criarUsuario">
      <input v-model="usuario.nome_completo" placeholder="Nome completo" />
      <input v-model="usuario.username" placeholder="Username" />
      <input v-model="usuario.email" placeholder="Email" />
      <input v-model="usuario.senha" type="password" placeholder="Senha" />
      <input v-model="usuario.data_nascimento" type="date" placeholder="Nascimento" />
      <input v-model="usuario.genero" placeholder="Gênero" />
      <input v-model="usuario.biografia" placeholder="Biografia" />
      <button type="submit">Criar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      usuario: {
        nome_completo: '',
        username: '',
        email: '',
        senha: '',
        data_nascimento: '',
        foto_perfil: null,
        genero: '',
        biografia: ''
      }
    };
  },
  methods: {
    async criarUsuario() {
      await axios.post('http://localhost:8000/usuarios/add', this.usuario);
      alert('Usuário criado!');
      this.$router.push('/usuarios');
    }
  }
};
</script>
