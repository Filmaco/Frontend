<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { ref, onMounted } from 'vue'
import UsuarioTable from '@/components/datatable/UsuarioTable.vue';
import {Data} from '@/components/datatable/data'
import columns from '@/components/datatable/usuarioTable';
import DataTable from '@/components/datatable/DataTable.vue';

const URL = 'http://localhost:8000';

interface Usuario {
  usuario_id: number;
  nome_completo: string;
  username: string;
}

export default defineComponent({
  components: {
    DataTable
  },
  data() {
    return {
      columns,
      data: [] as Data[]
    };
  },
  async mounted() {
    this.data = await this.loadItems(this.data);
    console.log('mounted', this.data);
    
  },
  methods: {
    async loadItems(items: any) {
      try {
        const response = await axios.get(`${URL}/usuarios`);
        console.log(response.data);
        
        items = response.data.usuarios.map((item: any) => ({
          id: item.usuario_id,
          name: item.nome_completo,
          email: item.email,
          status: item.status
        }));
        console.log("items: ", items);

        return items;
      } catch (error) {
        //alert('Erro ao listar usuários.');
        console.error(error);
      }
    },
    handleClickAndRedirectToClientePage(id: number) {
      console.log(id);
     
      try {
        axios.put(`http://localhost:8000/usuarios/inativar/${id}`, {})
        .then(response => { console.log(response) })
        .catch(error => { console.log(error) });
        alert('usuario inativo com sucesso')
      }
      catch(error) {
        alert('Erro ao inativar')
        console.error(error);

      }
    }
  }
});
</script>



<template>
    <main class="pb-16 pt-20 px-5 full w-full h-full flex justify-center content-center">
      <DataTable :data="data" :columns="columns" @handle-click-get-id="handleClickAndRedirectToClientePage" />
    </main>
  </template>
  
  