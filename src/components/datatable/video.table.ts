
import { h } from 'vue'
import { ColumnDef, createColumnHelper } from '@tanstack/vue-table';
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import { Button } from '../ui/button';
import { Data } from './data';

const columns: ColumnDef<Data>[] = [

    {
        accessorKey: 'imagem',
        header: ({ column }) => {
            return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Imagem', h(ArrowUpDown, { class: 'ml-2 h-4 w-4 text-left pl-3' })])
        },
        cell: ({ row }) => {
            const url = row.getValue('imagem')
            return h('img', {
            src: url,
            alt: 'Thumb',
            class: 'h-12 w-20 object-cover rounded'
            })
        }
    },

    {
      accessorKey: 'video_id',
      header: ({ column }) => {
        return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['ID', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
      },
      cell: ({ row }) => h('div', { class: 'lowercase text-left pl-3' }, row.getValue('video_id')),
    },

    {
      accessorKey: 'nome',
      header: ({ column }) => {
        return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Nome', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
      },
      cell: ({ row }) => h('div', { class: 'lowercase text-left pl-3' }, row.getValue('nome')),
    },

    {
      accessorKey: 'visualizacoes',
      header: ({ column }) => {
        return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Visualizacao', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
      },
      cell: ({ row }) => h('div', { class: 'lowercase text-left pl-3' }, row.getValue('visualizacoes')),
    },

    {
      accessorKey: 'status',
      header: ({ column }) => {
        return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Status', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
      },
      cell: ({ row }) => {
        const status = row.getValue('status');
        let bgClass = '';

        if (row.getValue('status') == "ativo") {
          return h('div', { class: 'lowercase text-center bg-green-100 text-green-800 rounded-xl '  }, row.getValue('status'))
        } else {
          return h('div', { class: 'lowercase text-center bg-red-100 text-red-800 rounded-xl' },  row.getValue('status'))
        }

      }
    },

    {
      accessorKey: 'criado_em',
      header: ({ column }) => {
        return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Criado em', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
      },
      cell: ({ row }) => h('div', { class: 'lowercase text-left pl-3' }, row.getValue('criado_em')),
    },

    {
      accessorKey: 'atualizado_em',
      header: ({ column }) => {
        return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Atualizado em', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
      },
      cell: ({ row }) => h('div', { class: 'lowercase text-left pl-3' }, row.getValue('atualizado_em')),
    },

  ]

  export default columns;