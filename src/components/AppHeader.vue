<template>
  <header>
    <img src="../assets/river_trans_icon.svg" alt="" class="logo">
    <div class="wrapper">
      <nav>
        <RouterLink to="/" class="navlink">Главная</RouterLink>
        <RouterLink to="/about" class="navlink">О нас</RouterLink>
        <RouterLink to="/ports" class="navlink">Причалы</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px;
  }
  nav {
    display: flex;
    gap: 50px;
  }
  .navlink {
    font-size: 18px;
  }
  .logo {
    width: 50px;
    height: 50px;
  }
  @media screen and (max-width: 600px) {
    .navlink {
      width: 100%;
      text-align: center;
      font-size: 16px;
    }
    header {
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
    }
  }
</style>