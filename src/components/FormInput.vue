<script setup lang="ts">
import { defineComponent } from 'vue';

// export default defineComponent({


// });

const props = defineProps({
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  modelValue: String,
  placeholder: String,
  error: String,
});

const emit = defineEmits(['update:modelValue']);

const onInput = ($event) => {
  emit('update:modelValue', $event.target.value);
}

</script>

<template>
  <div>
    <label>{{ label }}</label>
    <input :type="type" :class="{ 'is-invalid': error }" :name="label" :placeholder="placeholder" value="modelValue" @input="onInput"/>
  </div>
</template>

<style scoped>
.password-reset-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.request-section, .reset-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #ff4444;
}

.success-message {
  color: #00C851;
}
</style>