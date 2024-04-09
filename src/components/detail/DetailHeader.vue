<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, defineProps, onMounted } from 'vue';
import BackSvg from '../icon/BackSvg.vue';

const router = useRouter();
const HeaderTitle = ref('점포 이름');
const props = defineProps({
    storeName: String
});

onMounted(() => {
    HeaderTitle.value = props.storeName as string;
});


</script>

<template>
    <header class="detailHeader">
        <button v-on:click="router.go(-1)">
            <BackSvg />
        </button>
        <h1>{{ HeaderTitle }}</h1>
        <button>⭐</button>
    </header>
</template>
