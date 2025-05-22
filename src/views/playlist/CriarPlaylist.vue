<script lang="ts" setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const emit = defineEmits<{
  (event: 'handle-click-get-data', data: any): void;
}>()

const data = ref({
  titulo: '',
})

const handleClickData = () => {
  console.log('Emitindo:', data.value.titulo)
  emit('handle-click-get-data', data.value)
}
</script>

<template>
  <div class="w-full p-3">
    <form @submit.prevent="handleClickData">
      <div class="pb-3">
        <Label>Título</Label>
        <Input v-model="data.titulo" placeholder="Título da Playlist" />
      </div>

      <div class="flex justify-end">
        <Button type="submit">Criar</Button>
      </div>
    </form>
  </div>
</template>
