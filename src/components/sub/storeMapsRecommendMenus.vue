<script setup lang="ts">
const props = defineProps<{
    clickSelectBtns: any;
    selectBtnTexts: string[];
}>();

import {onMounted, ref} from 'vue';
const isDragging = ref(false);
const slideTransX = ref(0);
const prevX = ref(0);
const currentX = ref(0);
const isOnMobile = ref(false);
const nowWindowWidth = ref(0);

onMounted(()=>{
    nowWindowWidth.value = window.innerWidth;
    if(window.innerWidth <= 768){
        isOnMobile.value = true;
    }
})

const handleResize = () => {
    if(window.innerWidth <= 768){
        nowWindowWidth.value = window.innerWidth;
        isOnMobile.value = true;
        slideTransX.value = 0;
    } else{
        isOnMobile.value = false;
    }
}
window.addEventListener('resize', handleResize);

const mouseMove = (event) => {
    // 946 = 버튼 컨텐츠 전체 너비
    // 18 = overflow bar 너비
    // nowWindowWidth = 윈도우 내부 창 크기
    if (isOnMobile.value && slideTransX.value <  -(946 - nowWindowWidth.value - 18)) {
        console.log(slideTransX.value, -(nowWindowWidth.value + 64))
        slideTransX.value = -(946 - nowWindowWidth.value - 18)
        return;
    } else if (slideTransX.value <  -680){
        slideTransX.value = -680
    }

    if(slideTransX.value > 0){ // 최소(시작)
        slideTransX.value = 0;
        return;
    }
    if (isDragging.value) {
        currentX.value = event.clientX;
        slideTransX.value += currentX.value - prevX.value;
        prevX.value = currentX.value;
    }
}

const mouseUp = () => {
    isDragging.value = false;
    prevX.value = 0;
}

const mouseDown = (event) => {
    isDragging.value = true;
    prevX.value = event.clientX;
}
</script>

<template>
    <section class="transformCont"
        :style="{ transform : `translateX(${slideTransX}px)`}"
        v-on:mousemove="mouseMove"
        v-on:mouseup="mouseUp"
        v-on:mousedown="mouseDown">
        <button v-for="(item, index) in props.selectBtnTexts"
                v-on:click="props.clickSelectBtns(index)">
            {{ item }}
        </button>
    </section>
</template>