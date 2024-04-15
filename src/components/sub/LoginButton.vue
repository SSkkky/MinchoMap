<script setup lang="ts">
import { onMounted } from 'vue';
import LoginPng from '../../assets/images/fn/login.png'

onMounted(() => {
    window.Kakao.init("a7c8dc5e9a80d7a0d9c12c5d44404383");
})

const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/oauth',
    });
    displayToken()
}

function displayToken() {
    var token = getCookie('authorize-access-token');
    console.log('displayToken', token)

    if (token) {
        window.Kakao.Auth.setAccessToken(token);
        window.Kakao.Auth.getStatusInfo()
            .then(function (res) {
                if (res.status === 'connected') {
                    let tokennnn = window.Kakao.Auth.getAccessToken();
                    console.log(tokennnn)
                }
            })
            .catch(function () {
                window.Kakao.Auth.setAccessToken(null);
            });
    }
}

function getCookie(name) {
    var parts = document.cookie.split(name + '=');
    if (parts.length === 2) { return parts[1].split(';')[0]; }
}

</script>

<template>
    <button class='loginBtn' v-on:click="loginWithKakao()" :style="{ backgroundImage: `url(${LoginPng})` }"></button>
</template>
