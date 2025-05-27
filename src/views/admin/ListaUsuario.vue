<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { ref, onMounted } from 'vue'
import UsuarioTable from '@/components/datatable/UsuarioTable.vue';
import { Data } from '@/components/datatable/data'
import columns from '@/components/datatable/usuarioTable';
import DataTable from '@/components/datatable/DataTable.vue';
import { UserService } from '@/services/user.service';
import { reload } from '@firebase/auth';

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
      data: [] as Data[],
      id: 0,
    };
  },
  async mounted() {
    this.data = await this.loadItems(this.data);
    console.log('mounted', this.data);
    
    try {
      const response = await UserService.perfil()
      this.id = response.usuario.usuario_id
      // console.log('perfil', this.id);
      
    }
    catch(error) { console.log(error) }
    
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
          status: item.status,
          tipo: item.tipo
        }));
        console.log("items: ", items);

        return items;
      } catch (error) {
        //alert('Erro ao listar usuários.');
        console.error(error);
      }
    },
    // handleClickAndRedirectToClientePage(id: number) {
    //   console.log(id);
     
    //   try {
    //     const response = UserService.inativarUsuario(id);

    //     return response
       
    //   }
    //   catch(error) {
    //     alert('Erro ao inativar')
    //     console.error(error);

    //   }
    //   window.location.reload();
    // },

    inativar(id: number) {
      UserService.inativarUsuarioADM(id)
      .then((response) => {
        window.location.reload()
        return response;
      })
      .catch((error) => console.log(error)
      )
    },

    ativar(id: number) {
      UserService.ativarUsuario(id)
      .then((response) => {
        window.location.reload()
        return response;
      })
      .catch((error) => console.log(error)
      )
    },

    tornarUsuarioADM(usuarioIdPromovido: number) {
        const tipo = 'administrador'
        UserService.alterarTipoUsuario(this.id, usuarioIdPromovido, tipo)
        .then((response) => {
          window.location.reload()
          return response;
        })
        .catch((error) => console.log(error)
        )
    },

    tornarUsuarioComum(usuarioId: number) {
        const tipo = 'comum'
        UserService.alterarTipoUsuario(this.id, usuarioId, tipo)
        .then((response) => {
          window.location.reload()
          return response;
        })
        .catch((error) => console.log(error)
        )
    }
  }
});
</script>



<template>
    <main class="pb-16 pt-20 px-5 full w-full h-full flex justify-center content-center">
      <DataTable 
      :data="data" 
      :columns="columns"
      :user-id="id"
      @inativar-por-id="inativar" 
      @tornar-adm="tornarUsuarioADM"
      @tornar-comum="tornarUsuarioComum" 
      @ativar-por-id="ativar"/>
    </main>
  </template>
  
  