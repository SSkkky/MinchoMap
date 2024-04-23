<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { mapDataType } from '../types/DataType';
import store from '../store/store';

const router = useRouter();
const entriesData = ref<mapDataType[]>();
const copyData = ref<mapDataType[]>();

onMounted(async () => {
    if (store.state.loginData.data.email === 'worte5633@naver.com') {
        entriesData.value = await axios.get(`${import.meta.env.VITE_DB_URL}`)
            .then((res) => { return res.data })
            .catch((err) => { console.log(err) })

        copyData.value = entriesData.value;
        return;
    }
    if (!sessionStorage.getItem('jwtToken')) {
        window.alert('잘못된 접근입니다.')
        router.push('/');
        return;
    }
})

const onClickSortBtn = async (state) => {
    switch (state) {
        case 'all':
            copyData.value = entriesData.value;
            console.log('all : ', copyData.value)
            break;

        case 'true':
            copyData.value = entriesData.value && entriesData.value.filter((item) => (
                item.state === true
            ))
            break;

        case 'false':
            copyData.value = entriesData.value && entriesData.value.filter((item) => (
                item.state === false
            ))
            break;

        default:
            copyData.value = entriesData.value;
            break;
    }
}

const onClickChangeState = async (state, item) => {
    let updateObject;
    if (state === '승인') {
        updateObject = { ...item, state: true };
    } else {
        updateObject = { ...item, state: false };
    }
    const result = await axios.put(`${import.meta.env.VITE_DB_URL}`, updateObject)
    console.log('업데이트 결과 : ', result.data)
    copyData.value = result.data;
    window.alert(`${item.storeName}_${state}_완료`)
}
</script>

<template>
    <section id="AdminComp">
        <h2>데이터 정리</h2>
        <section class="sort">
            <p>정렬</p>
            <button @click="onClickSortBtn('all')">전체</button>
            <button @click="onClickSortBtn('true')">승인</button>
            <button @click="onClickSortBtn('false')">미승인</button>
        </section>
        <article v-for="(item) in copyData" class="dataItem" :class="item.state ? 'true' : 'false'">
            <button v-if="item.state" @click="onClickChangeState('미승인', item)">미승인</button>
            <button v-else="item.state" @click="onClickChangeState('승인', item)">승인</button>
            <p><b>상태 : </b> {{ item.state ? '승인' : '미승인' }}</p>
            <p><b>id : </b>{{ item.id }}</p>
            <p><b>상호명 : </b>{{ item.storeName }}</p>
            <p><b>주소 : </b>{{ item.address }}</p>
            <p><b>전화번호 : </b>{{ item.tel }}</p>
            <p><b>메뉴 : </b><span class="menus" v-for="(menus) in item.menu">#{{ menus.name }}_{{ menus.price }}원</span>
            </p>
            <p>제보자 : {{ item.email }} ({{ item.nickname }}님)</p>
        </article>
    </section>
</template>