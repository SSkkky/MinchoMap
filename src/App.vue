<script setup>
import HearderComp from './components/HeaderComp.vue'
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex'
import '@/assets/styles/global.scss';
</script>

<template>
    <HearderComp />
    <router-view />
</template>

<style lang="scss"></style>