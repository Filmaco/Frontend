<template>
    <div>
      <h2>Listar Usuário</h2>
  
      <form @submit.prevent="listarUsuario">
        <button type="submit">Listar</button>
        <div v-for="usuario in usuarios" style="border: 1px solid black; padding: 5px; border-radius: 10px; margin: 10px;">
            <p>{{ usuario.usuario_id }}</p>
            <p>{{ usuario.nome_completo }}</p>
            <p>{{ usuario.username }}</p>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
       usuarios: [],
      };
    },
    methods: {
      async listarUsuario() {
        try {

            await axios.get(`http://localhost:8000/usuarios`).then((data) => {
                this.usuarios = data.data.usuarios;
                console.log(this.usuarios); 
            }).catch((e) => console.log(e.response)
            )
            alert('Usuário listado!');
            this.$router.push('/usuarios');
        } catch (error) {
          alert(`Erro ao listar usuario. ${this.id}`);
          console.error(error);
        }
      }
    }
  };
  </script>

  