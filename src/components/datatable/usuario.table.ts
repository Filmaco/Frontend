
import { h } from 'vue'
import { ColumnDef, createColumnHelper } from '@tanstack/vue-table';
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import { Button } from '../ui/button';
import { Data } from './data';

const columns: ColumnDef<Data>[] = [

    {
      accessorKey: 'id',
      header: 'id',
      cell: ({ row }) => h('div', { class: 'capitalize text-left' }, row.getValue('id')),
    },
    {
      accessorKey: 'name',
      header: 'Nome',
      cell: ({ row }) => h('div', { class: 'capitalize text-left' }, row.getValue('name')),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Email', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
      },
      cell: ({ row }) => h('div', { class: 'lowercase text-left' }, row.getValue('email')),
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
      accessorKey: 'tipo',
      header: ({ column }) => {
        return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Tipo', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
      },
      cell: ({ row }) => h('div', { class: 'lowercase text-left' }, row.getValue('tipo')),
    },
  ]

  export default columns;