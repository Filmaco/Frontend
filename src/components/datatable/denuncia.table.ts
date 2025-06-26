
import { h } from 'vue'
import { ColumnDef, createColumnHelper } from '@tanstack/vue-table';
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import { Button } from '../ui/button';
import { Data } from './data.denuncias';

const columns: ColumnDef<Data>[] = [

    {
      accessorKey: 'denuncia_id',
      header: 'ID',
      cell: ({ row }) => h('div', { class: 'capitalize text-left' }, row.getValue('denuncia_id')),
    },
    
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Status', h(ArrowUpDown, { class: 'ml-2 h-4 w-4 ' })])
      },
      cell: ({ row }) => {
        const status = row.getValue('status');
        let bgClass = '';

        if (row.getValue('status') == "pendente") {
          return h('div', { class: 'lowercase font-semibold text-center bg-yellow-100 text-yellow-800 rounded-xl inline-block px-3'  }, row.getValue('status'))
        } 
        else if ((row.getValue('status') == "resolvido")) {
          return h('div', { class: 'lowercase font-semibold text-center bg-green-100 text-green-800 rounded-xl inline-block px-3' },  row.getValue('status'))
        }
        else {
            return h('div', { class: 'lowercase font-semibold text-center bg-red-100 text-red-800 rounded-xl inline-block px-3' },  row.getValue('status'))
        }

      }
    },

    {
      accessorKey: 'status_video',
      header: ({ column }) => {
        return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Status do Video', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
      },
      cell: ({ row }) => {
        const status = row.getValue('status_video');
        let bgClass = '';

        if (row.getValue('status_video') == "ativo") {
          return h('div', { class: 'lowercase font-semibold text-center bg-green-100 text-green-800 rounded-xl inline-block px-3'  }, row.getValue('status_video'))
        }
         else if (row.getValue('status_video') == "inativo"){
            return h('div', { class: 'lowercase font-semibold text-center bg-gray-100 text-gray-800 rounded-xl inline-block px-3' },  row.getValue('status_video'))
        }
        else if (row.getValue('status_video') == "investigando") {
            return h('div', { class: 'lowercase font-semibold text-center bg-yellow-100 text-yellow-800 rounded-xl inline-block px-3' },  row.getValue('status_video'))
        }
        else {
            return h('div', { class: 'lowercase font-semibold text-center bg-red-100 text-red-800 rounded-xl inline-block px-3' },  row.getValue('status_video'))
        }

      }
    },

     {
      accessorKey: 'titulo_video',
      header: 'Titulo Video',
      cell: ({ row }) => h('div', { class: 'capitalize text-left' }, row.getValue('titulo_video')),
    },

    {
      accessorKey: 'nome_usuario',
      header: 'Autor da Denúncia',
      cell: ({ row }) => h('div', { class: 'capitalize text-left' }, row.getValue('nome_usuario')),
    },

    {
      accessorKey: 'video_id',
      header: 'ID Video',
      cell: ({ row }) => h('div', { class: 'capitalize text-left' }, row.getValue('video_id')),
    },

    {
      accessorKey: 'criado_em',
      header: ({ column }) => {
        return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Criado em', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
      },
      cell: ({ row }) => h('div', { class: 'lowercase font-semibold text-left pl-3 ' }, row.getValue('criado_em')),
    },

  ]

  export default columns;