<script lang="ts">
import { defineComponent } from 'vue'
import { Label } from '@/components/ui/label'
import { UserService } from '@/services/user.service'
import Separator from './ui/separator/Separator.vue'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import DenunciaService from '@/services/denuncia.service'
import Button from './ui/button/Button.vue'

export default defineComponent({
  name: 'ModalDenuncia',
  props: {
    data: {
      type: Object as () => {
        denuncia_id: number,
        nome_usuario: number,
        video_id: number,
        status: 'pendente'|'resolvido'|'impedimento'
        criado_em: Date,
      },
      required: false,
      default: null,
    }
  },
  components: {
    Label,
    Separator,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Button,
  },
  data() {
    return {
      denuncia: {
        denuncia_id: '',
        nome_usuario: '',
        video_id: 0,
        status: '',
        criado_em: '',
        link: '',
        titulo_video: '',
        motivo: '',
        status_video: ''
      }
    }
  },
  mounted() {
    console.log(this.data);
    
    this.fetchDenunciaById(this.data?.denuncia_id)

  },
  methods: {
    async fetchDenunciaById(id: number) {
      try {
        const response = await DenunciaService.obterPorId(id)
        console.log(response);
        this.denuncia = response.denuncia
        // this.denunciado = response
        return this.denuncia
      } catch (error) {
        console.error('Erro ao buscar usuário denunciado:', error)
      }
    },

    async aceitarDenuncia() {
      try {
        const response = await DenunciaService.alterarStatusVideoBloqueado(this.denuncia.video_id)
        // alert('video bloqueado')
        window.location.reload()
        return response;
      }catch(error) { console.log(error) }
    },

    async rejeitarDenuncia() {
      try {
        const response = await DenunciaService.alterarStatusVideoAtivo(this.denuncia.video_id)
        window.location.reload()
        // alert('video ativo')
        return response;
      }catch(error) { console.log(error) }
    }
  }
})
</script>

<template>
  <div v-if="data" class="h-auto">
    <Tabs default-value="info">
      <div class="">

        <div>
          <TabsList class="grid w-full grid-cols-2 bg-transparent">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
          </TabsList>
        </div>

        <div class="">
          <TabsContent value="info" class="h-[330px]">
            <div>
              <Label class="text-xl">Nome do video: {{ denuncia.titulo_video }}</Label>
            </div>

            <!-- <div class="grid grid-cols-2 mt-3">
              <div class="flex">
                <Label class="pr-2">Status:</Label>
                <Label :class="denunciado.status === 'ativo' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'" class="py-[1px] px-2 rounded-md">
                  {{ denunciado.status }}
                </Label>
              </div>
            </div> -->

            <!-- <Separator orientation="horizontal" class="my-5"/> -->

            <div class="my-3">
              <div class="mb-2 flex">
                <Label class="font-semibold text-base mr-3">Motivo da denúncia:</Label>
                <p v-if="denuncia.motivo == 'inapropriado'" class="text-base">Conteúdo inapropriado</p>
                  <p v-if="denuncia.motivo == 'violencia'" class="text-base">Violência ou incitação ao ódio</p>
                  <p v-if="denuncia.motivo == 'spam'" class="text-base">Spam ou propaganda enganosa</p>
                  <p v-if="denuncia.motivo == 'direitos_autorais'" class="text-base">Violação de direitos autorais</p>
                  <p v-if="denuncia.motivo == 'indisponivel'" class="text-base">Video Indisponivel ou impossibilidade de assistir.</p>
                </div>
              <div class="mb-2 flex">
                <Label class="font-semibold text-base mr-3">Status da denúncia:</Label>
                <p v-if="data.status == 'pendente'" class="font-semibold text-center bg-yellow-100 text-yellow-800 rounded-xl px-2">Pendente</p>
                 <p v-if="data.status == 'resolvido'" class="font-semibold text-center bg-green-100 text-green-800 rounded-xl px-2">Resolvido</p>
                  <p v-if="data.status == 'impedimento'" class="font-semibold text-center bg-red-100 text-red-800 rounded-xl px-2">Impedimento</p>
              </div>
              <div class="mb-2 flex">
                <Label class="font-semibold text-base mr-3">Status do Video:</Label>
                <p v-if="denuncia.status_video == 'investigando'" class="font-semibold text-center bg-yellow-100 text-yellow-800 rounded-xl px-2">Investigando</p>
                <p v-if="denuncia.status_video == 'bloqueado'" class="font-semibold text-center bg-red-100 text-red-800 rounded-xl px-2">Bloqueado</p>
                 <p v-if="denuncia.status_video == 'ativo'" class="font-semibold text-center bg-green-100 text-green-800 rounded-xl px-2">Ativo</p>
                  <p v-if="denuncia.status_video == 'inativo'" class="font-semibold text-center bg-gray-100 text-gray-800 rounded-xl px-2">Inativo</p>
              </div>
              <!-- <div v-if="data.titulo_video" class="mb-2">
                <Label class="font-semibold">Vídeo relacionado:</Label>
                <p class="text-gray-700 mt-1">{{ data.titulo_video }}</p>
              </div> -->
            </div>

            <!-- <Separator orientation="horizontal" class="my-5"/> -->

          </TabsContent>
          <TabsContent value="video">
             <div v-if="denuncia.link" class="aspect-w-16 aspect-h-9 mt-6">
                <div>
                  <iframe
                  class="w-full h-full"
                  :src="denuncia.link"
                  frameborder="0"
                  allowfullscreen
                  style="border-radius: 30px;"
                ></iframe>
                </div>
              </div>
          </TabsContent>

          <Separator orientation="horizontal" class="my-5"/>

          <div class="w-full flex">
            <div class="w-full">
              <Button variant="secondary" @click="rejeitarDenuncia()">Ignorar Denúncia</Button>
            </div>
            <div class="w-full flex justify-end">
              <Button variant="destructive" @click="aceitarDenuncia()">Bloquear Vídeo</Button>
            </div>
          </div>
        </div>
      </div>
    </Tabs>
  </div>
</template>

<style scoped>
.aspect-w-16 {
  position: relative;
  width: 100%;
  padding-top: 56.25%; 
}
.aspect-w-16 iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>