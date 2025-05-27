
<script lang="ts">
  import axios from 'axios';
  import { Button } from '@/components/ui/button'
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card'
  import { Input } from '@/components/ui/input'
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs' 
import Label from '@/components/ui/label/Label.vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { defineComponent } from 'vue';
import rio from '@/assets/imagens/rio.jpg'
import { SquarePenIcon, Trash, Trash2, LucideEdit } from 'lucide-vue-next';
import { UserService } from '@/services/user.service';
import Separator from '@/components/ui/separator/Separator.vue';
import router from '@/routes';
  
  export default defineComponent({
    components:{
      Tabs,
      TabsContent,
      TabsList,
      TabsTrigger,
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
      Input,
      Label,
      rio,
      SquarePenIcon,
      Trash2,
      Select,
      SelectContent,
      SelectGroup,
      SelectItem,
      SelectLabel,
      SelectTrigger,
      SelectValue,
      Button,
      Separator,
      LucideEdit,
    },
    data() {
      return {
        usuario: {
          usuario_id: '',
          nome_completo: '',
          username: '',
          email: '',
          senha: '',
          data_nascimento: '',
          foto_perfil: null as File | null,
          genero: '',
          biografia: '',
        },
        usuarioOriginal: {} as any,
        confirmarSenha: '',
        genero: {
          
        },
        rio,
        defaultImg: '/img/default-user.jpg',
        novaSenha: '',
      };
    },
    mounted() { 
    UserService.perfil()
      .then(user => {
        this.usuario = user.usuario;
         this.usuarioOriginal = { ...user.usuario }; 
        //console.log('user: ', this.usuario);
        
      })
      .catch((e) => {
          console.log(e);
          
      });
    },
    methods: {
     async atualizarUsuario() {
        try {
          const formData = new FormData();

          for (const key in this.usuario) {
            if (key === 'foto_perfil' || key === 'senha') continue;
            const novoValor = this.usuario[key];
            const valorOriginal = this.usuarioOriginal[key];

            if (novoValor !== valorOriginal && novoValor !== undefined) {
              formData.append(key, novoValor);
            }
          }

          if (this.novaSenha || this.confirmarSenha) {
            if (this.novaSenha !== this.confirmarSenha) {
              alert('As senhas não coincidem.');
              return;
            }
            formData.append('senha', this.novaSenha);
          }

          if (this.usuario.foto_perfil && this.usuario.foto_perfil !== this.usuarioOriginal.foto_perfil) {
            formData.append('foto_perfil', this.usuario.foto_perfil as File);
          }

          if ([...formData.keys()].length === 0) {
            alert("Nenhuma alteração detectada.");
            return;
          }

          const response = await axios.put(
            `http://localhost:8000/usuarios/editar/${this.usuario.usuario_id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            }
          );

          alert("Usuário atualizado com sucesso!");
          this.usuarioOriginal = { ...this.usuario };
          this.novaSenha = '';
          this.confirmarSenha = '';
          window.location.reload(); 
          return response;

        } catch (error) {
          alert('Erro ao atualizar usuário.');
          console.error(error);
        }
      },

      handleFileChange(event) {
        const file = event.target.files[0]
        if (file) {
          this.usuario.foto_perfil = file
        }
      },

      InativateUsuario() {
        UserService.inativarUsuario(Number(this.usuario.usuario_id))
        .then((response) => {
          
           window.location.href = '/';
            return response;
        })
        .catch((error) => console.log())
      }
    }
  });
  </script>

<template>
  <div>
    
    <div class="mt-[100px]  grid grid-cols-5 gap-4 px-10 pb-10 ">
    
      <div class=" col-span-2">
        <div class="flex flex-col items-center">
          <div class="flex flex-col items-center relative w-[175px] h-[180px]">
          <label class="relative cursor-pointer">
            <img
              :src="`http://localhost:8000/uploads/${usuario.foto_perfil}`"
              alt="Foto de perfil"
              class="w-[175px] h-[180px] object-cover rounded-full"
            />
            <div
              class="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md"
            >
              <LucideEdit class="w-5 h-5 text-gray-600" />
            </div>

            <input
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileChange"
            />
          </label>
        </div>

          <p class="text-xl">{{ usuario.nome_completo }}</p>

          <div class="mt-3">
            <Button @click="InativateUsuario">Inativar Conta</Button>
          </div>
          
          <!--div class="p-4 flex gap-2">
              <div class="border p-1" style="border-radius: 5px; cursor: pointer;">
                <SquarePenIcon/>
              </div>
              <div class="border p-1" style="border-radius: 5px; cursor: pointer">
                <Trash2/>
              </div>
          </div-->
          <!-- <div class="flex flex-row">
            <div>
              <p>45</p>
              <p>45</p>
            </div>

            <Separator orientation="vertical" class="mx-3"/>

            <div>
              <p>45</p>
              <p>45</p>
            </div>

            <Separator orientation="vertical" class="mx-3"/>

            <div>
              <p>45</p>
              <p>45</p>
            </div>
          </div> -->
        </div>

      </div>
    
    
      <form class="col-span-3" @submit.prevent="atualizarUsuario">

        <div class="flex justify-between mb-3">
          <p> Informações da Conta </p>

          <div class="gap-2">
            <Button >Cancelar</Button>
            <Button class="ml-2">Salvar</Button>
           
          </div>
         
        </div>

        <Separator></Separator>
        

        <Tabs default-value="account" class="w-[80px] mt-4">
          <TabsList class="grid w-full grid-cols-2 border-none bg-transparent w-[400px]">
            <TabsTrigger value="account">
              Conta
            </TabsTrigger>
            <TabsTrigger value="password">
              Senha
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div class="w-[50vw]" >

              <div class="flex gap-1 pt-3 w-[90%]">
                  <div class="w-[50%]">
                    <Label>NOME COMPLETO</Label>
                    <Input class="mt-3" placeholder="Nome Completo" v-model="usuario.nome_completo"/>
                  </div>
                  <div class="w-[50%]">
                    <Label>USERNAME</Label>
                    <Input class="mt-3" placeholder="Username" v-model="usuario.username"/>
                  </div>
              </div>

              <div class="pt-3 w-[90%]">
                <Label>EMAIL</Label>
                <Input class="mt-3" placeholder="E-mail" v-model="usuario.email"/>
              </div>

              <div class="flex w-[90%]">
                <div class="pr-2 w-[100%]">
                  <Label>DATA DE NASCIMENTO</Label>
                  <input  type="date" class="border p-[1px] w-[100%] h-[35px] mt-3" style="border-radius: 5px;"  v-model="usuario.data_nascimento"/>
                </div>

                <div class="w-[90%]">
                  <Label>GENERO</Label>
                  <Select v-model="usuario.genero">
                    <SelectTrigger class="w-[100%] mt-3">
                      <SelectValue placeholder="Selecionar Genero" />
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

              <div class="pt-3 w-[90%]">
                <Label>BIOGRAFIA</Label>
                <textarea class="border w-[100%] h-[90px] p-2 mt-3" style="border-radius: 5px;" placeholder="..." v-model="usuario.biografia"></textarea>
              </div>

              


            </div>
            
          </TabsContent>
          <TabsContent value="password" class="w-full">
            <div class="w-[50vw]">
                 <div class="pt-3">
                    <Label>NOVA SENHA</Label>
                    <Input
                      type="password"
                      class="mt-3"
                      placeholder="Nova senha"
                      v-model="novaSenha"
                    />
                  </div>

                  <div class="pt-3 w-[90%]">
                    <Label>CONFIRMAR SENHA</Label>
                    <Input
                      type="password"
                      class="mt-3"
                      placeholder="Confirmar senha"
                      v-model="confirmarSenha"
                    />
                  </div>
            </div>
           

          </TabsContent>
        </Tabs>
      </form>

    
    </div>
  </div>
  
</template>
  