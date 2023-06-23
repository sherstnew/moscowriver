<script setup>
  import axios from 'axios';
  import RequestError from '../components/RequestError.vue';
</script>

<script>
  export default {
    data() {
      return {
        total: 0,
        username: '',
        email: '',
        ticketType: this.$route.query.type,
        status: null
      };
    },
    methods: {
      countTotal() {
        this.ticketType === 'one'
        ?
        this.total = 50
        :
        this.ticketType === 'many_month'
        ?
        this.total = 300
        :
        this.ticketType === 'many_year'
        ?
        this.total = 1000
        :
        this.total = 0;
      },
      buyTicket(event) {
        event.preventDefault();
        const ticketData = {
          type: this.ticketType,
          price: this.total,
          username: this.username,
          email: this.email,
        };
        this.status = 'loading';
        axios.post('/api/buyTicket', ticketData)
        .then(response => {
          if (response.data === 'ok') {
            this.$router.push('/');
          } else {
            this.status = 'error';
          }
        })
        .catch(error => {
          this.status = 'error';
          console.log(error);
        })
      },
    },
    mounted() {
      this.countTotal();
    }
  };
</script>

<template>
  <request-error v-if="status === 'error'" />
  <div v-if="status === 'loading'" class="loading">Загрузка...</div>
  <div class="wrapper" v-if="status !== 'loading'">
    <header class="header">Купить билет</header>
    <form class="form" @submit="buyTicket">
      <label for="username" class="label">Введите ваше имя:</label>
      <input type="text" name="username" id="username" class="input" placeholder="Ваше имя" required v-model="username">
      <label for="email" class="label">Введите ваш E-Mail:</label>
      <input type="email" name="email" id="email" class="input" placeholder="E-Mail" required v-model="email">
      <label for="ticket" class="label">Выберите билет:</label>
      <select name="ticket" id="ticket" class="ticketselect" v-model="ticketType" @change="countTotal">
        <option value="one" :selected="$route.query.type === 'one'">Единый - 50₽</option>
        <option value="many_month" :selected="$route.query.type === 'many_month'">Проездной на месяц - 300₽</option>
        <option value="many_year" :selected="$route.query.type === 'many_year'">Проездной на год - 1000₽</option>
      </select>
      <div class="total">
        {{ total }} ₽
      </div>
      <button type="submit" class="submit">
        Купить билет
      </button>
    </form>
  </div>
</template>

<style scoped>
  .loading {
    font-size: 64px;
    font-weight: 500;
  }
  .header {
    width: 100%;
    text-align: left;
    font-weight: 500;
    font-size: 65px;
    margin: 10px 0px;
  }
  .form {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px;
    width: 100%;
  }
  .label {
    width: 100%;
    font-size: 25px;
  }
  .input {
    width: 30%;
    height: 60px;
    border: none;
    border-radius: 15px;
    padding-left: 20px;
    outline: 2px #dadada solid;
    font-family: 'TTNormsPro';
    font-size: 18px;
    transition: outline .5s;
  }
  .input:focus {
    outline: 2px #00a3e2 solid;
  }
  .ticketselect {
    font-family: 'TTNormsPro';
    background-color: #fff;
    border: none;
    outline: 2px #dadada solid;
    border-radius: 10px;
    padding: 15px;
    font-size: 18px;
    transition: outline .5s;
  }
  .ticketselect:focus {
    outline: 2px #00a3e2 solid;
  }
  .total {
    width: 100%;
    font-size: 40px;
  }
  .submit {
    width: 30%;
    height: 60px;
    font-family: 'TTNormsPro';
    font-size: 20px;
    border-radius: 15px;
    border: none;
    background-color: #00a3e2;
    color: #ffffff;
    transition: background-color .5s;
    cursor: pointer;
  }
  .submit:hover {
    background-color: #0081b4;
  }
  @media screen and (max-width: 600px) {
    .header {
      font-size: 30px;
    }
    .input {
      width: 100%;
    }
    .submit {
      width: 100%;
    }
  }
</style>