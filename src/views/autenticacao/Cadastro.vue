<script lang="ts">
import axios from 'axios'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Separator from '@/components/ui/separator/Separator.vue'
import { toast } from 'vue-sonner'
import { defineComponent, ref, onMounted } from 'vue';
import router from '@/routes'
import { UserService } from '@/services/user.service'
import Label from '@/components/ui/label/Label.vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Eye, EyeClosed } from 'lucide-vue-next'


export default {
  components: {
    Button,
    Input,
    Separator,
    Label,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    Eye,
    EyeClosed
  },
  data() {
    return {
      usuario: {
        nome_completo: '',
        username: '',
        email: '',
        senha: '',
        data_nascimento: '',
        foto_perfil: null as File | null,
        genero: '',
        biografia: '',
        tipo: 'comum'
      },
      confirmar_senha: '',
      erros: {
        nome_completo: '',
        username: '',
        email: '',
        senha: '',
        confirmar_senha: '',
        data_nascimento: '',
      },
      submit: false,
      error: '',
      statusError: false,
      mostrar_nova_senha: false,
      mostrar_confirmar_senha: false,
    }
  },
  methods: {
    validarCampos() {

      this.erros = {
        nome_completo: '',
        username: '',
        email: '',
        senha: '',
        confirmar_senha: '',
        data_nascimento: '',
      }

      if (!this.usuario.nome_completo) this.erros.nome_completo = 'Nome completo é obrigatório'
      if (!this.usuario.username) {
        this.erros.username = 'Username é obrigatório'
      } else {
        const usernameRegex = /^[a-zA-Z0-9._]{3,20}$/;
        console.log('caiu aqui no else');
        if (!usernameRegex.test(this.usuario.username)) {
          this.erros.username = 'Username inválido. Use de 3 a 20 letras, números, ponto ou underline, sem espaços.'
          console.log('caiu aqui no if');
          
        }
      }
      if (!this.usuario.email) {
        this.erros.email = 'Email é obrigatório'
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(this.usuario.email)) {
          this.erros.email = 'Formato de e-mail inválido'
        }
      }
      if (!this.usuario.senha) this.erros.senha = 'Senha é obrigatória'
      if (!this.confirmar_senha) this.erros.confirmar_senha = 'Confirmação de senha é obrigatória'
      if (this.usuario.senha && this.confirmar_senha && this.usuario.senha !== this.confirmar_senha) {
        this.erros.confirmar_senha = 'As senhas não coincidem'
      }
      if (!this.usuario.data_nascimento) {
        this.erros.data_nascimento = 'Data de nascimento é obrigatória'
      } else {
        const hoje = new Date();
        const nascimento = new Date(this.usuario.data_nascimento);
        const idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        const dia = hoje.getDate() - nascimento.getDate();

        const idadeValida = idade > 13 || (idade === 13 && (mes > 0 || (mes === 0 && dia >= 0)));
        if (!idadeValida) {
          this.erros.data_nascimento = 'Você deve ter pelo menos 13 anos para se cadastrar.';
        }
      }

      const senhaRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
      if (this.usuario.senha && !senhaRegex.test(this.usuario.senha)) {
        this.erros.senha = 'Senha inválida. Deve conter pelo menos 8 caracteres, uma letra maiúscula e um número.'
      }

      const errosAtivos = Object.values(this.erros).filter(erro => erro !== '')
      if (errosAtivos.length > 0) {
        const mensagens = errosAtivos.join(', ')
        toast.error('Campos obrigatórios com erro:', {
          description: mensagens,
          action: {
            label: 'OK',
            onClick: () => {}
          }
        })
        return false
      }

      return true
    },

    async criarUsuario() {
      console.log('click 1');
      
      this.submit = true;
      if (!this.validarCampos()) return;
      console.log('click 2');

      const formData = new FormData();
      formData.append('nome_completo', this.usuario.nome_completo);
      formData.append('email', this.usuario.email);
      formData.append('senha', this.usuario.senha);
      formData.append('username', this.usuario.username);
      formData.append('data_nascimento', this.usuario.data_nascimento);
      formData.append('genero', this.usuario.genero);
      formData.append('biografia', this.usuario.biografia);
      formData.append('tipo', this.usuario.tipo);
      if (this.usuario.foto_perfil) {
        formData.append('foto', this.usuario.foto_perfil as File);
      }

      try {
        const response =  UserService.cadastrar(formData)
        router.push({ name: 'Auth.Login' });
        return response;
      }
      catch(error:any) {
         this.error = error.response?.data?.mensagem;
            console.log(error.response);

            this.statusError = true
      }
     
    },
    handleFileChange(event: Event) {
      const target = event.target as HTMLInputElement
      const files = target?.files
      if (files && files.length > 0) {
        this.usuario.foto_perfil = files[0]
      }
    },

    mostrarSenha() {
      this.mostrar_nova_senha = !this.mostrar_nova_senha;
    },

     mostrarConfirmarSenha() {
      this.mostrar_confirmar_senha = !this.mostrar_confirmar_senha;
    },

  }
}
</script>



<template>
  <div class="flex h-[100vh]">
     <div class="w-[50%] flex-col justify-center justify-items-center self-center">
       <h1 class="text-3xl mb-[5%]">Crie sua conta</h1>

       <form @submit.prevent="criarUsuario" class="w-[30vw] mb-[50px]">
       <div class="my-2">
         <Label class="pl-2">Nome Completo</Label>
         <Input v-model="usuario.nome_completo" placeholder="Nome completo" class="radius pl-5" style="border-radius: 60px; height: 40px;"/>
         <p v-if="submit && erros.nome_completo" class="text-red-500 text-sm pl-3 pt-1">{{ erros.nome_completo }}</p>
       </div>
       <div class="my-2">
         <Label class="pl-2">Username</Label>
         <Input v-model="usuario.username" placeholder="Username" class="radius pl-5" style="border-radius: 60px; height: 40px;"/>
         <p v-if="submit && erros.username" class="text-red-500 text-sm pl-3 pt-1">{{ erros.username }}</p>
       </div>
       <div class="my-2">
         <Label class="pl-2">E-mail</Label>
         <Input v-model="usuario.email" placeholder="Email" class="radius pl-5" style="border-radius: 60px; height: 40px;"/>
         <p v-if="submit && erros.email" class="text-red-500 text-sm pl-3 pt-1">{{ erros.email }}</p>
       </div>

       <!-- <div class="flex">
           <div class="my-2 pr-1">
            <Label class="pl-2">Senha</Label>
            <Input v-model="usuario.senha" type="password" placeholder="Senha" class="radius pl-5" style="border-radius: 60px; height: 40px;"/>
            <p v-if="submit && erros.senha" class="text-red-500 text-sm pl-3 pt-1">{{ erros.senha }}</p>
          </div>
          <div class="my-2 pl-1">
            <Label class="pl-2">Confirme a Senha</Label>
            <Input v-model="confirmar_senha" type="password" placeholder="Confirmar senha" class="radius pl-5" style="border-radius: 60px; height: 40px;"/>
            <p v-if="submit && erros.confirmar_senha" class="text-red-500 text-sm pl-3 pt-1">{{ erros.confirmar_senha }}</p>
          </div>
       </div> -->
      
       <div class="flex">
         <div class="pt-3 w-[90%] relative">
            <Label class="pl-2">Senha</Label>
            <Input
                :type="mostrar_nova_senha ? 'text' : 'password'"
                class="radius pl-5"
                placeholder="Nova senha"
                v-model="usuario.senha"
                style="border-radius: 60px; height: 40px;"
            />
            <button
                type="button"
                class="absolute right-2 top-[47px] text-gray-500"
                @click="mostrarSenha()"
            >
                <EyeClosed v-if="mostrar_nova_senha" />
                <Eye v-else/>
                
            </button>
            
          </div>

          <div class="pt-3 w-[90%] relative">
             <Label class="pl-2">Confirmar Senha</Label>
            <Input
                :type="mostrar_confirmar_senha ? 'text' : 'password'"
                class="radius pl-5"
                placeholder="Nova senha"
                v-model="confirmar_senha"
                style="border-radius: 60px; height: 40px;"
            />
            <button
                type="button"
                class="absolute right-2 top-[47px] text-gray-500"
                @click="mostrarConfirmarSenha()"
            >
                <EyeClosed v-if="mostrar_confirmar_senha" />
                <Eye v-else/>
                
            </button>
          </div>
       </div>
       <p v-if="submit && erros.senha" class="text-red-500 text-sm pl-3 pt-1">{{ erros.senha }}</p>

       <div class="flex">
          <div class="my-2 w-full pr-1">
          <Label class="pl-2">Data de Nascimento</Label>
          <Input v-model="usuario.data_nascimento" type="date" class="radius pl-5" style="border-radius: 60px; height: 40px;"/>
          <p v-if="submit && erros.data_nascimento" class="text-red-500 text-sm pl-3 pt-1">{{ erros.data_nascimento }}</p>
        </div>
        <div class="my-2 w-full pl-1">
          <Label class="pl-2">Genero</Label>
          <!-- <Input  placeholder="Gênero" class="radius pl-5" style="border-radius: 60px; height: 40px;"/> -->
           <Select v-model="usuario.genero" class="w-[180px]">
              <SelectTrigger class="radius pl-5 w-full" style="border-radius: 60px; height: 40px;">
                <SelectValue placeholder="Selecione os geenros" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Generos</SelectLabel>
                  <SelectItem value="feminino">
                    Feminino
                  </SelectItem>
                  <SelectItem value="masculino">
                    Masculino
                  </SelectItem>
                  <SelectItem value="outro">
                    Outro
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
        </div>
       </div>
       
       <div class="my-2">
         <Label class="pl-2">Biografia</Label>
         <Input v-model="usuario.biografia" placeholder="Biografia" class="radius pl-5" style="border-radius: 60px; height: 40px;"/>
       </div>

       <div>
         <Label class="pl-2">Imagem de Perfil</Label>
        <Input type="file" @change="handleFileChange" />
       </div>

       <Button class="w-full mt-[20px] radius text-lg bg-purple-800" style="border-radius: 60px; height: 40px;"  >Cadastrar</Button>

       <p v-if="statusError" class="text-red-500 text-sm pl-3">Username ou email ja cadastrado, teste novamente</p>
     </form>

       <!--Separator class="mb-[40px] text-base w-[50%]" label="Ou continue com" />

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
       </div-->

       <p>Ja tem uma conta? <RouterLink to="/login" class="text-purple-600">Entre</RouterLink>
      
      </p>

     </div>
     <div class="w-[50%] bg-purple-400 mx-7 my-10 flex justify-center items-center" style="border-radius: 30px;">
        <img src="../../assets/imagens/tutorial_2.svg" style="width: 100%; height: 80%;" />
     </div>
  </div>
</template>


<style>

.radius {
  border-radius: 60px;
  height: 50px;
}

</style>

