<script setup>
  import { RouterLink, RouterView } from 'vue-router';
  import AppHeader from './components/AppHeader.vue';
  import { ClientConfig } from '../client.config';
  import axios from 'axios';
  axios.defaults.baseURL = ClientConfig.BASE_URL;
</script>

<template>
  <app-header />
  <RouterView />
</template>

<style scoped>

</style>
