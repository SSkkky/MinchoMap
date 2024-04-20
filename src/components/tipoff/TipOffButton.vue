<script setup lang="ts">
import { useRouter } from 'vue-router';
import TipOffPng from '../../assets/images/fn/tipoff.png'
const router = useRouter();
</script>

<template>
    <button class='tipoffBtn' v-on:click="router.push('/tipoff')"
        :style="{ backgroundImage: `url(${TipOffPng})` }"></button>
</template>
