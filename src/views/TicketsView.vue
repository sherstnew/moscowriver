<script>
  export default {
    methods: {
      navigateToBuyForm(ticketType) {
        this.$router.push({path: '/tickets/buy', query: {type: ticketType}})
      },
    },
  };
</script>

<template>
  <div class="wrapper">
    <header class="header">Билеты</header>
    <div class="tickets">
      <div class="ticket one" @click="navigateToBuyForm('one')">
        <div class="ticket_header">Единый</div>
        <div class="ticket_description">Один билет - все виды транпорта.</div>
        <div class="ticket_price">50₽</div>
      </div>
      <div class="ticket many" @click="navigateToBuyForm('many_month')">
        <div class="ticket_header">Проездной на месяц</div>
        <div class="ticket_description">Месяц комфортных поездок.</div>
        <div class="ticket_price">300₽</div>
      </div>
      <div class="ticket many" @click="navigateToBuyForm('many_year')">
        <div class="ticket_header">Проездной на год</div>
        <div class="ticket_description">Год комфортных поездок.</div>
        <div class="ticket_price">1000₽</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .header {
    width: 100%;
    text-align: left;
    font-weight: 500;
    font-size: 64px;
    margin: 30px 0px;
  }
  .tickets {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 50px;
    width: 100%;
  }
  .ticket {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 40%;
    height: 250px;
    border-radius: 15px;
    padding: 20px;
    color: #ffffff;
    cursor: pointer;
  }
  .ticket_header {
    font-weight: 500;
    font-size: 40px;
    width: 100%;
  }
  .ticket_description {
    font-size: 18px;
    width: 100%;
  }
  .ticket_price {
    align-self: flex-end;
    font-size: 40px;
  }
  .one {
    background-color: #ED2B2A;
  }
  .many {
    background-color: #00a3e2;
  }
  @media screen and (max-width: 600px) {
    .header {
      font-size: 30px;
    }
    .ticket {
      width: 100%;
    }
  }
</style>