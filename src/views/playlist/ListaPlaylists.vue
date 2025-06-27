<script lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { defineComponent } from 'vue'
import { PlaylistService } from '@/services/playlist.service'
import router from '@/routes'

interface Data {
    playlist_id: number,
    titulo: string,
    imagem: string
}

export default defineComponent({
    components: {
        Button, 
        Label,
        Input,
    },
    data() {
        return {
            data: [] as Data[]
        }
    },
    async mounted() {
        this.data = await this.loadItems(this.data)
    },
    methods:{
        async loadItems(items:any) {
            
            try {
                const response = await PlaylistService.listarPlaylist();

                 items = response.data.map((item:any) => ({
                    playlist_id: item.playlist_id,
                    titulo: item.titulo,
                    imagem: item.imagem
                }))
                return items;

            } catch (error) {
                console.error(error);
            }

        },

        async loadPlaylist(id:number) {

          try {

            const response = await PlaylistService.obterPlaylistPorId(id);
            console.log(response.data);
            

          } catch (error) {
                console.error(error);
            }
        },

        goToPlaylistPage(id:number) {
          router.push({ name: 'Playlist.Id', params: { id } })
          console.log(id, 'click');
          
        }
    }
})

</script>

<template>
  <div class="w-full p-3">
    <p class="text-2xl ml-4">Playlists Globais</p>
    <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mx-10">
      <div
        v-for="playlist in data"
        :key="playlist.playlist_id"
        class="bg-white" 
        style="cursor: pointer;"
        @click="goToPlaylistPage(playlist.playlist_id)"
      >
        <div >
          <img
            v-if="playlist.imagem"
            :src="`http://localhost:8000/uploads/${playlist.imagem}`"
            alt="Thumbnail"
            class="mt-2 h-[190px] w-[443px] object-cover rounded-xl"
          />
        </div>
        <div class="flex mt-3 gap-4">
          
          <div>
            <h3 class="font-bold text-base">{{ playlist.titulo }}</h3>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
