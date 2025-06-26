<script setup lang="ts" generic="TData" >
import type { ColumnDef } from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import type { 
    ColumnFiltersState,
    ExpandedState,
    SortingState,
    VisibilityState,
    
} from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import {
  FlexRender,
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
  Column,
  FilterFn,
  SortingFn,
  sortingFns,
  
} from '@tanstack/vue-table'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { inject, onMounted, provide, ref, watch, h } from 'vue'
import { cn, valueUpdater } from '@/lib/utils'
import { EllipsisVertical } from 'lucide-vue-next'
import { ArrowUpDown, ChevronDown, Trash2, Pencil } from 'lucide-vue-next'
import { defineEmits } from 'vue'

const props = defineProps<{
  columns: ColumnDef<TData>[]
  data: TData[]
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
    get expanded() { return expanded.value },
  },
})

const emit = defineEmits<{
  (event: 'handle-click-get-id', id: number): void;
   (event: 'inative-video', id: number): void;
    (event: 'ativar-por-id', id: number): void;
     (event: 'inativar-por-id', id: number): void;
}>();['handle-click-get-id'];

const handleClickId = (data: TData) => {
    const {video_id} = data as unknown as {video_id: number}
    console.log(video_id);
    
    emit('handle-click-get-id', video_id)
}

const inativar = (data: TData) => {
    const {video_id} = data as unknown as {video_id: number}
    console.log('DATATABLE',video_id);
    
    emit('inativar-por-id', video_id)
}

const ativar = (data: TData) => {
    const {video_id} = data as unknown as {video_id: number}
        console.log('DATATABLE',video_id);

    emit('ativar-por-id', video_id)
}

</script>

<template>
  <div class="w-full border bg-white p-10" style="border-radius: 20px;">
    <div class="flex gap-2 items-center py-4">
      <Input
        class="max-w-sm"
        placeholder="Filtrar nome..."
        :model-value="table.getColumn('nome')?.getFilterValue() as string"
        @update:model-value=" table.getColumn('nome')?.setFilterValue($event)"
      />
     
    </div>
    <div class="rounded-md border" style="border-radius: 20px;">
      <Table>
          <TableHeader>
            <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
              <TableHead v-for="header in headerGroup.headers" :key="header.id">
                <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="table.getRowModel().rows?.length">
              <template v-for="row in table.getRowModel().rows" :key="row.id">
                  <TableRow :data-state="row.getIsSelected() && 'selected'" @click="handleClickId(row.original)" style="cursor:pointer;">
                    <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                      <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                    </TableCell>
                    <TableCell>
                        <DropdownMenu>
                        
                          <DropdownMenuTrigger  @click.stop>
                            <Pencil/>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent >
                             <DropdownMenuItem
                             v-if="(row.original as any).status === 'ativo'" 
                             @click="inativar(row.original)">
                              <span>Inativar</span>
                            </DropdownMenuItem>
                             <DropdownMenuItem
                             v-if="(row.original as any).status === 'inativo'" 
                             @click="ativar(row.original)">
                              <span>Ativar</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                  </TableRow>
                <TableRow v-if="row.getIsExpanded()">
                  <TableCell :colspan="row.getAllCells().length">
                    {{ JSON.stringify(row.original) }}
                  </TableCell>
                </TableRow>
                
               
              </template>
            </template>
  
            <TableRow v-else>
              <TableCell
                :colspan="columns.length"
                class="h-24 text-center"
              >
                Sem resultados....
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
     
      <div class="space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Proximo
        </Button>
      </div>
    </div>
  </div>
</template>