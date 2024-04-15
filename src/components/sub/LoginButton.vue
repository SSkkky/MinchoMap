<script setup lang="ts">
import { useRouter } from 'vue-router';
import LoginPng from '../../assets/images/fn/login.png'
const router = useRouter();
</script>

<template>
    <button class='loginBtn' v-on:click="router.push('/signin')"
        :style="{ backgroundImage: `url(${LoginPng})` }"></button>
</template>
