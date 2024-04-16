<script setup lang="ts">
import LoginPng from '../../assets/images/fn/login.png'

const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/oauth',
    });
}

</script>

<template>
    <button class='loginBtn' v-on:click="loginWithKakao()" :style="{ backgroundImage: `url(${LoginPng})` }"></button>
</template>
