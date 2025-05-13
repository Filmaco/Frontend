<script setup lang="ts">

const {modelValue, label, placeholder, rows, error } = defineProps(['modelValue', 'label', 'placeholder', 'rows', 'error']);

const emit = defineEmits(['update:modelValue']);

const updateValue = ($event) => {
    emit('update:modelValue', $event.target.value);
}

</script>

<template>
    <div>
        <label :for="label">{{ label }}</label>
        <textarea :class="{'is-invalid': error}" :name="label" :placeholder="placeholder" :value="modelValue" @input="updateValue($event)" :rows="rows"></textarea>

        <div v-if="error">
            <small class="text-red-400">{{ error }}</small>
        </div>
    </div>
</template>