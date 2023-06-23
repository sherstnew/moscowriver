<template>
  <div class="wrapper">
    <img src="../assets/icons/error.svg" alt="" class="error_image">
    <header class="error_message">
      Произошла ошибка, попробуйте еще раз.
    </header>
  </div>
</template>

<style scoped>
  .wrapper {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
  }
  .error_image {
    width: 100px;
    height: 100px;
  }
  .error_message {
    width: 100%;
    font-weight: 500;
    font-size: 64px;
  }
</style>