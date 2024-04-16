<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';

const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;

onMounted (()=>{
    kakaoLogin();
})

const kakaoLogin = async() => {
    const code = await new URL(window.location.href).searchParams.get("code");

    const formData = new FormData();
        formData.append("grant_type", "authorization_code");
        formData.append("client_id", `${REST_API_KEY}`);
        formData.append("redirect_uri", `${REDIRECT_URI}`);
        formData.append("code", code);
    console.log(formData)
        return;

    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
    };

    const authToken = axios.post("https://kauth.kakao.com/oauth/token", formData, config)
    .then(response => {
                console.log('----------엑세스 토큰 발행 성공---------')
                const accessToken = response.data.access_token;

                axios.post("https://kapi.kakao.com/v2/user/me", {}, {
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                        "Authorization": `Bearer ${accessToken}`
                    }
                })
            })
            .catch(error => {
                console.log('------코드는 발급되었는데 오류남--------')
                console.log(error);
            });
}

</script>


<template>
    <section class="OauthComp">
    </section>
</template>