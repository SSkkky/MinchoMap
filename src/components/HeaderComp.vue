<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
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

</script>

<template>
    <header id="MainHeader">
        <section class="logoSection">
            <h1 v-on:click="router.push('/')">민초맵</h1>
        </section>
        <form class="searchCont" @submit.prevent="handleSubmit">
            <div class="searchInputCont">
                <input type="text" name="storeName" class="storeSearch" placeholder="메뉴 또는 지역을 검색해주세요!"
                    v-model="searchKeyword">
                <button class="storeSearchBtn">
                    <SearchSvg />
                </button>
            </div>
        </form>
        <section class="userSection">
            <p>로그인</p>
            <div>이미지</div>
        </section>
    </header>
</template>
