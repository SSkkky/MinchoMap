<script setup lang="ts">
import LoginPng from '../../assets/images/fn/login.png'
import LogoutPng from '../../assets/images/fn/logout.png'
import { useCookies } from 'vue3-cookies';
import { onMounted, ref } from 'vue';
import { KakaoLogout } from '../../lib/KakaoLogout';
const { cookies } = useCookies();

const isOnToken = ref(false);

const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;

const loginWithKakao = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
}

const logoutKakao = () => {
    KakaoLogout(cookies.get('accessToken'));
    cookies.remove('accessToken')
    isOnToken.value = false;
}

onMounted(() => {
    if (cookies.get('accessToken')) { isOnToken.value = true; }
})

</script>

<template>
    <button class='loginBtn' :style="{ backgroundImage: `url(${LogoutPng})` }" v-if="isOnToken"
        v-on:click="logoutKakao()"></button>
    <button class='loginBtn' :style="{ backgroundImage: `url(${LoginPng})` }" v-else="isOnToken"
        v-on:click="loginWithKakao()"></button>
</template>
