<template>
    <div>
      <h2>Inativar Usuário</h2>
  
      <form @submit.prevent="inativarUsuario">
        <input v-model="id" placeholder="Codigo" />
        <button type="submit">Inativar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
       id: '',
      };
    },
    methods: {
      async inativarUsuario() {
        try {

            await axios.put(`http://localhost:8000/usuarios/inativar/${this.id}`, {});
            alert('Usuário inativado!');
            this.$router.push('/usuarios');
        } catch (error) {
          alert(`Erro ao inativar usuário. ${this.id}`);
          console.error(error);
        }
      }
    }
  };
  </script>
  