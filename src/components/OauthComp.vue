<script setup lang="ts">
import { onMounted } from 'vue';

declare global {
    interface Window {
        Kakao: any;
    }
}

onMounted(() => {
    displayToken();
})

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
    <section class="OauthComp">
        <p>auth 링크입니당</p>
    </section>
</template>