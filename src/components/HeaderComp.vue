<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import LogoSvg from './icon/LogoSvg.vue'
import SearchSvg from './icon/SearchSvg.vue';

const store = useStore();
const router = useRouter();
const searchKeyword = ref('');

function handleSubmit() {
    onSearch(searchKeyword.value);
    searchKeyword.value = '';
}

const onSearch = (keyword: string) => {
    if (keyword.length === 0) {
        window.alert('검색어를 입력해주세요')
        return;
    }
    const searchData = store.state.data.filter((item) => {
        return item.storeName.includes(keyword) ||
            item.address.includes(keyword) ||
            item.menu[0].name.includes(keyword);
    })

    store.commit('setCopyData', searchData);
}

const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;

const loginWithKakao = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
}

</script>

<template>
    <header id="MainHeader">
        <section class="logoSection">
            <h1 v-on:click="router.push('/')">
                <LogoSvg />
            </h1>
        </section>
        <form class="searchCont" @submit.prevent="handleSubmit">
            <input type="text" name="storeName" class="storeSearch" placeholder="메뉴 또는 지역을 검색해주세요!"
                v-model="searchKeyword">
            <button class="storeSearchBtn">
                <SearchSvg />
            </button>
        </form>
        <section class="userSection">
            <p v-if="store.state.isOnToken" class="nickname"><span>{{ store.state.loginData.data.nickname }}</span>님</p>
            <button class="login" v-else="store.state.isOnToken" v-on:click="loginWithKakao()">로그인</button>
            <img :src="store.state.loginData.data.profile_image" alt="" v-if="store.state.isOnToken">
            <img src="../assets/images/fn/profile_null.png" alt="" v-else="store.state.isOnToken">
        </section>
    </header>
</template>
