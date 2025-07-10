<script setup>

import { ref } from 'vue';

const parentMessage = ref('daaasd')

</script>

<template>
  <RouterView></RouterView>
</template>

<style>
#app{
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
