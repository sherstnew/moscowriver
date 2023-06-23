<script setup>
  import { ClientConfig } from '../../client.config';
</script>

<script>
  export default {
    name: 'ship-card',
    props: ['ship'],
  };
</script>

<template>
  <div class="card" :style="{ 'background-image': 'url(' + ClientConfig.BASE_URL + ship.image + ')' }">
    <div class="name">
      {{ ship.name }}
    </div>
  </div>
</template>

<style scoped>
  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50%;
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    cursor: pointer;
  }
  .name {
    font-size: 40px;
    font-weight: 500;
    color: #ffffff;
    backdrop-filter: brightness(40%);
    padding: 20px;
    border-radius: 15px;
  }
  @media screen and (max-width: 600px) {
    .card {
      padding: 20px;
    }
  }
</style>