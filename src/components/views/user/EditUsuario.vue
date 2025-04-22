<template>
    <div>
      <h2>Editar Usuário</h2>
  
      <form @submit.prevent="atualizarUsuario">
        <input v-model="usuario.id" placeholder="Codigo" />
        <input v-model="usuario.nome_completo" placeholder="Nome completo" />
        <input v-model="usuario.username" placeholder="Username" />
        <input v-model="usuario.email" placeholder="Email" />
        <input v-model="usuario.senha" type="password" placeholder="Senha (opcional)" />
        <input v-model="usuario.data_nascimento" type="date" placeholder="Nascimento" />
        <input v-model="usuario.genero" placeholder="Gênero" />
        <input v-model="usuario.biografia" placeholder="Biografia" />
        <button type="submit">Atualizar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        usuario: {},
      };
    },
    methods: {
      async atualizarUsuario() {
        try {

          await axios.put(`http://localhost:8000/usuarios/editar/${this.usuario.id}`, this.usuario);
          alert('Usuário atualizado!');
          this.$router.push('/usuarios');
        } catch (error) {
          alert('Erro ao atualizar usuário.');
          console.error(error);
        }
      }
    }
  };
  </script>
  