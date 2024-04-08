<script setup lang="ts">
import { useRoute } from 'vue-router'
import { mapDataType } from '../types/DataType';
import { useStore } from 'vuex';
import { onMounted, computed, ComputedRef } from 'vue';

const store = useStore();
const data: ComputedRef<mapDataType[]> = computed(() => (store.state.data));

async function fetchData() {
    await store.getters.getData;
    const filteredData = data.value.filter((item) => item.id === Number(route.params));
    console.log(filteredData)
}

onMounted(() => {
    fetchData();
});

// data 에서 id값이 일치하는 객체를 찾아 반환하기 ㅇㅅㅇ

const route = useRoute()
console.log(route.params)

</script>

<template>
    {{ route.params.id }}
</template>
