<script>
import axios from 'axios'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Separator from '@/components/ui/separator/Separator.vue'
import { toast } from 'vue-sonner'
import { UserService } from '@/services/user.service'
import router from '@/routes'

export default {
  components: {
    Button,
    Input,
    Separator
  },
  data() {
    return {
      usuario: {
        //Admin
        email: 'laratrabalhos83@gmail.com',
        //user padrao 
        // email: 'tilara.cloud@gmail.com',
        senha: 'Senha123@',
      },
      confirmar_senha: '',
      erros: {},
      submit: false,
      mensagem: false
    }
  },
  methods: {
    validarCampos() {
      this.erros = {}

      if (!this.usuario.email) this.erros.email = 'Email é obrigatório'
      if (!this.usuario.senha) this.erros.senha = 'Senha é obrigatória'
      if (!this.confirmar_senha) this.erros.confirmar_senha = 'Confirmação de senha é obrigatória'

      return true
    },
    async loginUsuario() {
        this.submit = true
        if (!this.validarCampos()) return

        try {
            const response = await UserService.login(this.usuario.email, this.usuario.senha)
           
            router.push({ name: 'Home' });
            //window.location.reload();

            return response

        } catch (error) {
          this.mensagem = true;
          
          
        }
        }
  }
}
</script>



<template>
  <div class="flex h-[100vh]">
     <div class="w-[50%] flex-col justify-center justify-items-center self-center">
       <h1 class="text-3xl mb-[5%]">Bem-Vindo de volta!</h1>

       <form @submit.prevent="loginUsuario" class="w-[30vw] mb-[50px]">
       
        <div class="my-2">
            <Input v-model="usuario.email" placeholder="Email" class="radius pl-5" style="border-radius: 60px; height: 40px;"/>
            <p v-if="submit && erros.email" class="text-red-500 text-sm pl-3 pt-1">{{ erros.email }}</p>
        </div>
        <div class="my-2">
            <Input v-model="usuario.senha" type="password" placeholder="Senha" class="radius pl-5" style="border-radius: 60px; height: 40px;"/>
            <p v-if="submit && erros.senha" class="text-red-500 text-sm pl-3 pt-1">{{ erros.senha }}</p>
        </div>

        <p v-if="mensagem && (!erros.email && !erros.senha)" class="text-red-500 text-sm pl-3 pt-1"> Credencrias Invalidas </p>

        <Button class="w-full mt-[20px] radius text-lg bg-purple-800" style="border-radius: 60px; height: 40px;">Entrar</Button>
        </form>

       <p>Nao tem uma conta?<RouterLink to="/cadastro" class="text-purple-600">Cadastre-se.</RouterLink></p>
     </div>
     <div class="w-[50%] bg-purple-400 mx-7 my-10 flex justify-center items-center" style="border-radius: 30px;">
        <img src="../../assets/imagens/tutorial_3.svg" style="width: 100%; height: 80%;" />
     </div>
  </div>
</template>


<style>

.radius {
  border-radius: 60px;
  height: 50px;
}

</style>

