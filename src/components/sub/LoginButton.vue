<script setup lang="ts">
import LoginPng from '../../assets/images/fn/login.png'
import LogoutPng from '../../assets/images/fn/logout.png'
import { onMounted } from 'vue';
import { useStore } from 'vuex'
import { KakaoLogout } from '../../lib/KakaoLogout';

const store = useStore();

const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;

const loginWithKakao = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
}

const logoutKakao = () => {
    KakaoLogout(`${store.state.accessToken}`)
    sessionStorage.removeItem('jwtToken')
    store.commit('setOnToken', false)
    store.commit('setLoginData', {})
}

onMounted(() => {
})

</script>

<template>
    <button class='loginBtn' :style="{ backgroundImage: `url(${LogoutPng})` }" v-on:click="logoutKakao()"
        v-if="store.state.isOnToken"></button>
    <button class='loginBtn' :style="{ backgroundImage: `url(${LoginPng})` }" v-on:click="loginWithKakao()"
        v-else="store.state.isOnToken"></button>
</template>
