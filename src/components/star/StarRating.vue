<script setup>
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps({
  rate: Number
});

const value = ref(0);

onMounted(() => {
  value.value = props.rate;
  // console.log(value.value);
});
</script>

<template>
  <a-rate v-model:value="value" allow-half disabled/>
</template>
