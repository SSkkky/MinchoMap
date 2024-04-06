<script setup lang="ts">
// src\assets\images\icon\search.svg
import SearchSvg from './icon/SearchSvg.vue';
</script>


<template>
  <section class="SearchStoreForm">
    <form>
        <input type="text" class="form-control boxshadow" id="floatingInput" placeholder="예) 프라페">
        <button type="submit" class="searchBtn boxshadow">
          <SearchSvg />
        </button>
    </form>
  </section>
</template>