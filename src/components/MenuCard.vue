<script>
  export default {
    props: ['header', 'image', 'link'],
  };
</script>

<template>
  <RouterLink :to="link" class="card">
    <header class="header">
      {{ header }}
    </header>
    <img :src="image" alt="" class="bottom-image">
  </RouterLink>
</template>

<style scoped>
  .card {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
    width: 30%;
    height: 300px;
    background: linear-gradient(#131a27, #0a1727);
    border-radius: 15px;
    cursor: pointer;
    color: #ffffff;
    transition: .5s;
    text-decoration: none;
  }
  .card:hover {
    color: #32b4ff;
  }
  .header {
    width: 100%;
    text-align: left;
    font-size: 30px;
    font-weight: 500;
  }
  .bottom-image {
    width: 100px;
    height: 100px;
    align-self: flex-end;
    filter: invert(100%);
  }
  @media screen and (max-width: 600px) {
    .card {
      width: 100%;
    }
  }
</style>