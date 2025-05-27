<script lang="ts">
import { defineComponent } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UserService } from '@/services/user.service'
import Button from './ui/button/Button.vue'
import Separator from './ui/separator/Separator.vue'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Eye, EyeClosed } from 'lucide-vue-next'

export default defineComponent({
  name: 'ModalUser',
  props: {
    user: {
      type: Object as () => {
        id: number
        name: string
        email: string
        tipo: string
        status: string
      } | null,
      required: false,
      default: null,
    }
  },
  components: {
    Label,
    Button,
    Separator,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Input,
    Eye,
    EyeClosed
  },
  data() {
    return {
        usuario: {
            usuario_id: 0,
            nome_completo: '',
            username: '',
            email: '',
            senha: '',
            data_nascimento: '',
            foto_perfil: null as File | null,
            genero: '',
            biografia: '',
            tipo: '',
            status: '',
        },
        nova_senha: '',
        confirmarPnova_senha: '',
        mensagem_erro_senha: '',
        mensagem_sucesso_senha: '',
        confirmar_senha: '',
        mostrar_nova_senha: false,
        mostrar_confirmar_senha: false,
        erros: {
            confirmar_senha: '',
            senha: ''
        },
        submit: false,
    }
  },
  mounted() {
    if (this.user?.id) {
        this.fetchUserById(this.user.id)
    }
  },
  methods: {
    async fetchUserById(id: number) {
        try {
            const response = await UserService.getUserById(id)
            this.usuario = response
        } catch (error) {
            console.error('Erro ao buscar usuário por ID:', error)
        }
    },

     async validarCampos() {
        if (this.usuario.senha && this.confirmar_senha && this.usuario.senha !== this.confirmar_senha) {
            this.erros.confirmar_senha = 'As senhas não coincidem'
        }

      const senhaRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
      if (this.usuario.senha && !senhaRegex.test(this.usuario.senha)) {
        this.erros.senha = 'Senha inválida. Deve conter pelo menos 8 caracteres, uma letra maiúscula e um número.'
      }
    },

    async alterarSenha() {
        
        try {

            this.submit = true;
            if (!this.validarCampos()) return;
            if (!this.usuario.senha || !this.confirmar_senha) {
            this.mensagem_erro_senha = 'Preencha ambos os campos de senha.';
            return;
            }


            const formData = new FormData();
            formData.append('senha', this.usuario.senha);

            const response = await UserService.editar(formData, this.usuario.usuario_id)

            this.mensagem_sucesso_senha = 'Senha alterada com sucesso!';
            this.mensagem_erro_senha = '';
            this.usuario.senha = '';
            this.confirmar_senha = '';
            return response;

        } catch (error) {
            this.mensagem_erro_senha = 'Erro ao alterar a senha.';
            this.mensagem_sucesso_senha = '';
            console.error(error);
        }
    },

    mostrarSenha() {
        this.mostrar_nova_senha = !this.mostrar_nova_senha;
    },

   


  }
})
</script>

<template>
    <div v-if="user" class="h-[50vh]">
        <Tabs default-value="account" class=" mt-6">
        <div class="grid grid-cols-3 ">
            
            <div class="">
                 <div class=" w-[175px] h-[180px]mb-10">
                    <img
                    v-if="usuario.foto_perfil"
                    :src="`http://localhost:8000/uploads/${usuario.foto_perfil}`"
                    alt="Foto de perfil"
                    class="w-[175px] h-[180px] object-cover rounded-[20px]"
                    />
                    <div v-else class="w-[175px] h-[180px] rounded-[20px] bg-gray-300">

                    </div>
                
                    <TabsList class="grid w-full grid-cols-1 bg-transparent">
                    <TabsTrigger value="account">
                        Informacoes da Conta
                    </TabsTrigger>
                    <TabsTrigger value="password">
                        Alterar Senha
                    </TabsTrigger>
                    </TabsList>
                </div>

            </div>
            <div class="col-span-2 ml-6">
                    <TabsContent value="account" class=" bg-transparent">
                        <div class=" w-full">
        
                           
                        </div>
                        <div class="w-full">
                            
                            <div>
                                <Label class="text-xl">{{ usuario.nome_completo }}</Label>
                            </div>
                            <div class="grid grid-cols-2 mt-3">
                                <div class="flex">
                                    <Label class="pr-2">Nivel:</Label>
                                    <Label>{{ usuario.tipo }}</Label>
                                </div>
                                <div class="flex">
                                    <Label class="pr-2">Status:</Label>
                                    <Label v-if="usuario.status == 'ativo'" class="bg-green-200 py-[1px] px-2 rounded-md text-green-800">{{ usuario.status }}</Label>
                                    <Label v-else class="bg-red
                                    -200 py-[1px] px-2 rounded-md text-red
                                    -800">{{ usuario.status }}</Label>
                                </div>
                            </div>
                            
                        </div>
                        
                        <Separator orientation="horizontal" class="my-5 "/>
                        
                        <div class="flex grid grid-cols-3">
                            
                            <div class="mr-5">
                                <Label>Seguidores</Label>
                                <p class="">100</p>
                            </div>
                            <div class="mr-5">
                                <Label>Seguindo</Label>
                                <p class="">100</p>
                            </div>
                            <div>
                                <Label>Videos</Label>
                                <p class="">100</p>
                            </div>
                        </div>
                        
                        <Separator orientation="horizontal" class="my-5 "/>
                        
                    </TabsContent>
                    <TabsContent value="password">
                        <div class="w-full">
                            <div class="pt-3 w-[90%] relative">
                                <Label>NOVA SENHA</Label>
                                <Input
                                    :type="mostrar_nova_senha ? 'text' : 'password'"
                                    class="mt-3 pr-10"
                                    placeholder="Nova senha"
                                    v-model="usuario.senha"
                                />
                                <button
                                    type="button"
                                    class="absolute right-2 top-[47px] text-gray-500 mt-2"
                                    @click="mostrarSenha()"
                                >
                                    <EyeClosed v-if="mostrar_nova_senha" />
                                    <Eye v-else/>
                                    
                                </button>
                                </div>
                                <p v-if="submit && erros.senha" class="text-red-500 text-sm pl-3 pt-1">{{ erros.senha }}</p>

                                <div class="pt-3 w-[90%] relative">
                                <Label>CONFIRMAR SENHA</Label>
                                <Input
                                    :type="mostrar_confirmar_senha ? 'text' : 'password'"
                                    class="mt-3 pr-10"
                                    placeholder="Confirmar senha"
                                    v-model="confirmar_senha"
                                />
                                <button
                                    type="button"
                                    class="absolute right-2 top-[47px] text-gray-500 flex justify-center mt-2"
                                    @click="mostrar_confirmar_senha = !mostrar_confirmar_senha"
                                >
                                    <EyeClosed v-if="mostrar_nova_senha" />
                                    <Eye v-else/>
                                </button>
                            </div>
                            <p v-if="submit && erros.confirmar_senha" class="text-red-500 text-sm pl-3 pt-1">{{ erros.confirmar_senha }}</p>
                            

                            <Button class="mt-4" @click="alterarSenha">Salvar nova senha</Button>

                        </div>
                    </TabsContent>
                </div>
                
            </div>
        </Tabs>
        
    </div>
</template>
