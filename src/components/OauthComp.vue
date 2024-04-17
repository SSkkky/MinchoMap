<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router';
import { GetUserKakaoData } from '../lib/GetUserKakaoData';

const store = useStore();
const route = useRoute();
const router = useRouter();
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;

onMounted(() => {
    kakaoLogin();
})

const kakaoLogin = () => {
    const AuthorizationCode = route.query.code;

    let formData = new FormData();
    formData.append("grant_type", "authorization_code");
    formData.append("client_id", `${REST_API_KEY}`);
    formData.append("redirect_uri", `${REDIRECT_URI}`);
    formData.append("code", AuthorizationCode as string);

    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
    };

    // 액세스 토큰 받기
    axios.post("https://kauth.kakao.com/oauth/token",
        {
            grant_type: 'authorization_code',
            client_id: REST_API_KEY,
            code: AuthorizationCode,
            redirect_uri: REDIRECT_URI
        }
        , config)
        .then(async response => {
            const accessToken = response.data.access_token;
            store.commit('setAccessToken', accessToken);

            // 사용자 정보 받기
            const userData = await GetUserKakaoData(accessToken);
            const userDataForm = {
                "id": userData.id,
                "nickname": userData.kakao_account.profile.nickname,
                "profile_image": userData.kakao_account.profile.thumbnail_image_url,
                "email": userData.kakao_account.email
            }

            // 회원 조회
            const searchUserData = await axios.get(`${import.meta.env.VITE_DB_URL}/user/list/${userData.kakao_account.email}`)

            if (searchUserData.data.length === 0) { // 신규회원은 저장 ㅇㅅㅇb
                await axios.post(`${import.meta.env.VITE_DB_URL}/user/list`, userDataForm)
            }

            // 토큰 발급!
            const jwtToken = await axios.post(`${import.meta.env.VITE_DB_URL}/jwt`, userDataForm)
            sessionStorage.setItem('jwtToken', jwtToken.data);

            router.push('/')
        })
        .catch(error => {
            console.log(error);
        });
}

</script>


<template>
    <section class="OauthComp">
    </section>
</template>../lib/GetUserKakaoData