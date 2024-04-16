<script setup lang="ts">
import LoginPng from '../../assets/images/fn/login.png'

// const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const REDIRECT_URI = 'http://localhost:5000/minchomap/oauth/callback';
const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;

function loginWithKakao() {
    return `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
}

</script>

<template>
    <a :href=loginWithKakao()>
        <button class='loginBtn' :style="{ backgroundImage: `url(${LoginPng})` }"></button>
    </a>
</template>
