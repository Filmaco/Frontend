<script>
import axios from 'axios';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Separator from '@/components/ui/separator/Separator.vue'; 

export default {
  components: {
    Button,
    Input,
    Separator
  },
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
      },
      confirmar_senha: '',
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

<template>
  <!--div>
    <h2 class="p-4 bg-blue-100 text-blue-800 rounded-xl shadow">Criar Usuário</h2>
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
  </div-->

   <div class="flex  h-[100vh]">
      <div class="w-[50%] flex-col justify-center justify-items-center 
self-center">
        <h1 class="text-3xl mb-[5%]">Crie sua conta</h1>

        <form @submit.prevent="criarUsuario" class="w-[30vw] mb-[50px]">
        <div class="my-2">
          <Input  v-model="usuario.nome_completo" placeholder="Nome  completo" class="radius pl-5" style="border-radius: 60px; height: 40px;"/>
        </div>
        <div class="my-2">
          <Input  v-model="usuario.username" placeholder="Username"  class="radius pl-5" style="border-radius: 60px; height: 40px;"/>
        </div>
        <div class="my-2">
          <Input  v-model="usuario.email" placeholder="Email"  class="radius pl-5" style="border-radius: 60px; height: 40px;"/>
        </div>
        <div class="my-2">
          <Input  v-model="usuario.senha" type="password"  placeholder="Senha" class="radius pl-5" style="border-radius: 60px; height: 40px;"/>
        </div>
        <div class="my-2">
          <Input  v-model="confirmar_senha" type="password"  placeholder="Confirmar senha" class="radius pl-5" style="border-radius: 60px; height: 40px;"/>
        </div>
        <div class="my-2">
          <Input  v-model="usuario.data_nascimento" type="date"  class="radius pl-5" style="border-radius: 60px; height: 40px;"/>
        </div>
        <div class="my-2">
          <Input  v-model="usuario.genero" placeholder="Gênero"  class="radius pl-5" style="border-radius: 60px; height: 40px;"/>
        </div>
        <div class="my-2">
          <Input  v-model="usuario.biografia" placeholder="Biografia"  class="radius pl-5" style="border-radius: 60px; height: 40px;"/>
        </div>

        <Button class="w-full mt-[20px] radius text-lg bg-purple-800" style="border-radius: 60px; height: 40px;">Cadastrar</Button>
      </form>

        <Separator class="mb-[40px] text-base w-[50%]" label="Ou continue com" />


        <div class="flex mb-10">
          <div class="bg-purple-500 w-[60px] h-[55px] flex justify-center items-center mx-3" style="border-radius: 100%;">
            <p>G</p>
          </div>

          <div class="bg-purple-500 w-[60px] h-[55px] flex justify-center items-center mx-3" style="border-radius: 100%;">
            <p>Y</p>
          </div>

          <div class="bg-purple-500 w-[60px] h-[55px] flex justify-center items-center mx-3" style="border-radius: 100%;">
            <p>G</p>
          </div>
        </div>

        <p>Ja tem uma conta? <a src="#" class="text-purple-600
">Entre.</a></p>
      </div>
      <div class="w-[50%] bg-blue-300">
        b
      </div>
   </div>

  <div>

  </div>
</template>

<style>

.radius {
  border-radius: 60px;
  height: 50px;
}

</style>

