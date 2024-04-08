<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue';

const route = useRoute()
const userData = ref()

watch(
    () => route.params.id,
    async newId => {
        userData.value = await fetchUser(newId)
    }
)
</script>

<template>
    {{ route.params.id }}
</template>