<script lang="ts">
import { defineComponent } from 'vue';
import { TagService } from '@/services/tag.service';
import { VideoService } from '@/services/video.service'
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import router from '@/routes';
import { UserService } from '@/services/user.service';
import ApexCharts from 'apexcharts';
import EstatisticaService from '@/services/estatistica.service';
import { number } from 'zod';

interface Estatisticas {
  usuarios: {
    total: string,
    ativos: number;
    inativos: number;
    bloqueados: number;
  };
  videos: {
    total: number;
    por_status: {
      ativo: number;
      inativo: number;
      bloqueado: number;
      investigando: number;
    };
  };
  interacoes: {
    comentarios: number;
    avaliacoes: number;
  };
  playlists: {
    total: number;
    // por_usuario: number;
  };
  videos_populares: Videos[];
  media_visualizacoes: number;
  comentarios_por_data: { data: string; total: number }[];
  avaliacoes_por_data: { data: string; total: number }[];
}


interface Videos {
  video_id: number,
  nome: string,
  visualizacoes: number,
  comentarios: 0,
  curtidas: 0,
}

export default defineComponent({
  components: {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    Card,
    CardContent,
    Avatar,
    AvatarFallback,
    AvatarImage,
    ApexCharts,
  },
   data() {
    return {
      estatisticas: {
         usuarios: {
          total: 0,
          ativos: 0,
          inativos: 0,
          bloqueados: 0,
        },
        videos: {
          total: 0,
          por_status: {
            ativo: 0,
            inativo: 0,
            bloqueado: 0,
            investigando: 0,
          },
        },
        interacoes: {
          comentarios: 0,
          avaliacoes: 0,
        },
        playlists: {
          total: 0,
          // por_usuario: 0,
        },
        videos_populares: [], 
        media_visualizacoes: 0,
        comentarios_por_data: [],
        avaliacoes_por_data: [],
        media_videos_por_usuario: 0,
        media_visualizacoes_por_usuario: 0,
        media_comentarios_por_usuario: 0,
        // total_visualizacoes: 0,
        // total_comentarios: 0
      },
      chartOptions: {
        chart: {
          id: 'grafico-visualizacoes'
        },
        xaxis: {
          categories: ['Janeiro', 'Fevereiro', 'Março']
        },
        title: {
          text: 'Visualizações por Mês'
        }
      },
      series: [
        {
          name: 'Visualizações',
          data: [150, 200, 300]
        }
      ],
      chartUsuarios: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true
          }
        },
        colors: ['#28b463', '#2874a6', '#FF4560'], 
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: ['Ativos', 'Inativos', 'Bloqueados'],
          labels: {
            style: {
              colors: ['#28b463', '#2874a6', '#FF4560'],
              fontSize: '14px'
            }
          }
        },
        title: {
          text: 'Usuários por Status',
          align: 'center'
        }
      },
      seriesUsuarios: [{ name: 'Usuários', data: [0, 0, 0] }],

      chartVideosStatus: {
        chart: { type: 'donut' },
        labels: ['Ativo', 'Inativo', 'Bloqueado', 'Investigando'],
        title: { text: 'Vídeos por Status' }
      },
      seriesVideosStatus: [0, 0, 0, 0],
     
      chartInteracoes: {
          chart: {
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'category',
            categories: [] as string[]
          },
          title: {
            text: 'Comentários e Avaliações por Data'
          },
          tooltip: {
            x: {
              format: 'dd/MM/yyyy'
            }
          }
        },
        seriesInteracoes: [
          { name: 'Comentários', data: [] as number[] },
          { name: 'Avaliações', data: [] as number[] }
        ],

      chartPopulares: {
        chart: { type: 'bar' },
        xaxis: { categories: [] as string[]},
        title: { text: 'Top 10 Vídeos Mais Populares' },
        tooltip: {} as any
      },
      seriesPopulares: [{
        name: 'Visualizações',
        data: [] as {
          x: string,
          y: number,
          curtidas: number,
          comentarios: number
        }[]
      }],

   chartMediasPorUsuario: {
      chart: {
        height: 350,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val.toFixed(1);
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758']
        }
      },
      xaxis: {
        categories: ['Vídeos por Usuário', 'Visualizações por Usuário', 'Comentários por Usuário'],
        position: 'top',
        axisBorder: { show: false },
        axisTicks: { show: false },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: { enabled: true }
      },
      yaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          show: false,
          formatter: function (val: number) {
            return val.toFixed(1);
          }
        }
      },
      title: {
        text: 'Médias por Usuário',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444'
        }
      }
    },
    seriesMediasPorUsuario: [{
      name: 'Média',
      data: [] as number[]
    }],




    }
  },
  async mounted() {
    this.loadItems()
    console.log(this.estatisticas);
    
  },
  methods: {
    async loadItems() {
      try {
        const response = await EstatisticaService.estatisticasAdmin()
         this.estatisticas = {
            usuarios: {
              total: response.estatisticas.usuarios.total,
              ativos: response.estatisticas.usuarios.ativos,
              inativos: response.estatisticas.usuarios.inativos,
              bloqueados: response.estatisticas.usuarios.bloqueados
            },
            videos: {
              total: response.estatisticas.videos.total,
              por_status: {
                ativo: response.estatisticas.videos.por_status.ativo || 0,
                inativo: response.estatisticas.videos.por_status.inativo || 0,
                bloqueado: response.estatisticas.videos.por_status.bloqueado || 0,
                investigando: response.estatisticas.videos.por_status.investigando || 0
              }
            },
            interacoes: {
              comentarios: response.estatisticas.interacoes.comentarios,
              avaliacoes: response.estatisticas.interacoes.avaliacoes
            },
             playlists: {
              total: response.estatisticas.playlist.total,
              // por_usuario: response.estatisticas.playlists.por_usuario || 0,
            },
            videos_populares: response.estatisticas.videos_populares,
            media_visualizacoes: response.estatisticas.media_visualizacoes,
            comentarios_por_data: response.estatisticas.comentarios_por_data,
            avaliacoes_por_data: response.estatisticas.avaliacoes_por_data,
            
            media_videos_por_usuario: response.estatisticas.medias_por_usuario.videos,

            media_visualizacoes_por_usuario: response.estatisticas.medias_por_usuario.visualizacoes,

            media_comentarios_por_usuario: response.estatisticas.medias_por_usuario.comentarios,

            // total_visualizacoes: response.estatisticas.medias_por_usuario.,

            // total_comentarios: number
          }

        this.seriesUsuarios = [
          { name: 'Usuários', data: [this.estatisticas.usuarios.ativos, this.estatisticas.usuarios.inativos] }
        ];

        this.seriesVideosStatus = [
          this.estatisticas.videos.por_status.ativo,
          this.estatisticas.videos.por_status.inativo,
          this.estatisticas.videos.por_status.bloqueado,
          this.estatisticas.videos.por_status.investigando
        ];

        const datas = this.estatisticas.comentarios_por_data.map((item: any) => item.data)

        this.chartInteracoes.xaxis.categories = datas

        this.seriesInteracoes = [
          {
            name: 'Comentários',
            data: this.estatisticas.comentarios_por_data.map((item: any) => item.total)
          },
          {
            name: 'Avaliações',
            data: this.estatisticas.avaliacoes_por_data.map((item: any) => item.total)
          }
        ]

       this.seriesPopulares = [
          {
            name: 'Visualizações',
            data: this.estatisticas.videos_populares.map((v: any) => ({
              x: v.nome,
              y: v.visualizacoes,
              curtidas: v.curtidas,
              comentarios: v.comentarios
            }))
          }
        ]

        this.chartPopulares = {
          chart: { type: 'bar' },
          title: { text: 'Top 10 Vídeos Mais Populares' },
          tooltip: {
            custom: function({ series, seriesIndex, dataPointIndex, w }) {
              const data = w.config.series[seriesIndex].data[dataPointIndex];
              return `
                <div class="px-2 py-1">
                  <strong>${data.x}</strong><br>
                  Visualizações: ${data.y}<br>
                  Curtidas: ${data.curtidas}<br>
                  Comentários: ${data.comentarios}
                </div>
              `;
            }
          },
          xaxis: {
            categories: this.estatisticas.videos_populares.map((v: any) => v.nome)
          }
        }

        this.seriesMediasPorUsuario = [{
          name: 'Média',
          data: [
            response.estatisticas.medias_por_usuario.comentarios,
            response.estatisticas.medias_por_usuario.videos,
            response.estatisticas.medias_por_usuario.visualizacoes
          ]
        }]


        return this.estatisticas;
      }
      catch(error) { console.log(error) }
    }
  },

});
</script>



<template>
   <div class="w-full p-8 grid grid-rows-5 gap-4">
      <div class="w-full grid grid-cols-4 gap-2">
        <div class="bg-blue-100 border rounded-md flex flex-col grid grid-rows-3 items-center p-4">
          <div class=" rows-span-2 grid grid-cols-2 flex flex-between">
            <div>a</div>
            <!-- <p >{{ estatisticas }}</p> -->
             <div>
              <p class="text-3xl"> {{ estatisticas.usuarios.total }} </p>
             </div>
          </div>
          <div class="">
            Total de Usuarios
          </div>
        </div>

        <div class="bg-green-100 border rounded-md flex flex-col grid grid-rows-3 items-center p-4">
          <div class=" rows-span-2 grid grid-cols-2 flex flex-between">
            <div>a</div>
            <div class="text-3xl">{{ estatisticas.videos.total }}</div>
          </div>
          <div class="">
            Total de Videos
          </div>
        </div>  

        <div class="bg-purple-100 border rounded-md flex flex-col grid grid-rows-3 items-center p-4">
          <div class=" rows-span-2 grid grid-cols-2 flex flex-between">
            <div>a</div>
            <div class="text-3xl">{{ estatisticas.playlists.total }}</div>
          </div>
          <div class="">
            Total de Playlists
          </div>
        </div>

        <div class="bg-red-100 border rounded-md flex justify-centent items-center">
            <img src="../assets/logos/logo_preto_1.png" class=""/>
        </div>
      </div>
      <div class="w-full row-span-4 grid grid-row-2 gap-3">
          <div class="gap-2 grid grid-cols-5">
              <div class="border rounded-md p-2 col-span-2">
                <ApexChart type="bar" height="350" :options="chartUsuarios" :series="seriesUsuarios" />
              </div>
              <div class="border rounded-md p-2 col-span-3">
                <ApexChart type="donut" height="350" :options="chartVideosStatus" :series="seriesVideosStatus" />
              </div>
          </div>
          <div class=" grid grid-cols-5 gap-2">
            <div class="border rounded-md p-2 col-span-3">
              <ApexChart type="bar" height="350" :options="chartMediasPorUsuario" :series="seriesMediasPorUsuario" />
            </div>
            <div class="border rounded-md p-2 col-span-2">
              <ApexChart type="bar" height="350" :options="chartPopulares" :series="seriesPopulares" />
            </div>
          </div>
      </div>
  </div>
</template>


<style scoped>

</style>
