<script setup lang="ts">
import { useRouter } from 'vue-router';
import BackSvg from '../components/icon/BackSvg.vue';
const router = useRouter();
</script>

<template>
    <section id="TipOffSection">
        <header>
            <button v-on:click="router.go(-1)">
                <BackSvg />
            </button>
            <h2>제보하기</h2>
            <button>등록</button>
        </header>
        <p class="TipOffNotice"> <b>🔥안내🔥</b><br>지나칠 수 없는 존맛집을 제보해주세요! <br> 제보한 맛집은 검수를 거쳐 등록됩니다! </p>
        <form action="">
            <input type="text">
        </form>
    </section>
</template>
