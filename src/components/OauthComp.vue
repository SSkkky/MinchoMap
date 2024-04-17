<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCookies } from 'vue3-cookies';
import { GetUserKakaoData } from '../lib/GetUserKakaoData';

const route = useRoute();
const router = useRouter();
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
const { cookies } = useCookies();

onMounted(() => {
    kakaoLogin();
})

const kakaoLogin = () => {
    const AuthorizationCode = route.query.code;
    console.log('인가코드', AuthorizationCode)
    console.log('REDIRECT_URI', REDIRECT_URI)
    console.log('REST_API_KEY', REST_API_KEY)

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
        .then(response => {
            console.log(response.data, '토큰들')
            const accessToken = response.data.access_token;

            // 사용자 정보 받기
            GetUserKakaoData(accessToken)

            //1.카카오 이메일 획득
            //2.이메일이 몽고디비에 있냐? 
            //2.1 있으면  우리 사이트  로그인 처리 확인 : jwt 토큰 발행(서버에서)
            //3.이메일 몽고 디비에 없나면 
            // => 이메일 디비에 저장
            // => 추가정보를 받을꺼면 회원가입 페이지 이동
            // => 아니면 로그인 처리 2-1 



            // 토큰 저장
            cookies.set('accessToken', accessToken, '30min');
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