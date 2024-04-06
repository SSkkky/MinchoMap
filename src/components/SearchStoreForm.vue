<script setup lang="ts">
// import '@/assets/styles/views/SearchStoreForm.scss';
</script>


<template>
  <section class="SearchStoreForm">
    <div class="form-floating">
        <input type="text" class="form-control" id="floatingInput" placeholder="예) 프라페">
        <label for="floatingInput">검색어를 입력하세요</label>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.SearchStoreForm{
    position: absolute;
    z-index: 2;
    top: 6rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    display: flex;
    justify-content: center;


    .form-floating{
        width: 100%;
        max-width: 768px;
    }
}
</style>
