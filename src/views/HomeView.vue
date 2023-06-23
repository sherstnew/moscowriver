<script setup>
  import MenuCard from '../components/MenuCard.vue';
  import axios from 'axios';
  import * as dayjs from 'dayjs';
  import 'dayjs/locale/ru';
  dayjs.locale('ru');
</script>

<script>
  export default {
    data() {
      return {
        news: [],
        status: null,
      };
    },
    methods: {
      getNews() {
        this.status = 'loading';
        axios.get('/api/news')
        .then(response => {
          this.status = 'success';
          this.news = response.data;
        })
        .catch(error => {
          console.log(error);
          this.status = 'error';
        });
      }
    },
    mounted() {
      this.getNews();
    }
  }
</script>

<template>
  <div class="wrapper">
    <header class="header">
      Московский речной транспорт
    </header>
    <div class="menu">
      <menu-card header="Купить билет" image="https://www.svgrepo.com/show/511170/ticket-voucher.svg" link="/tickets" />
      <menu-card header="Корабли" image="https://www.svgrepo.com/show/510191/ship.svg" link="/ships" />
      <menu-card header="Расписание" image="https://www.svgrepo.com/show/438216/time-calendar-time-date-event-planner-shedule-task-icon.svg" link="/shedule" />
    </div>
    <div class="news" v-if="status === 'success'">
      <ul class="news_list">
        <li v-for="(item, index) in news" :key="index" class="news_item">
          <div class="news_header">
            {{ item.header }}
          </div>
          <div class="news_content">
            {{ item.content }}
          </div>
          <div class="news_date">
            {{ dayjs(item.date).format('D MMMM YYYY') }}
          </div>
        </li>
      </ul>
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
  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px;
    width: 100%;
    min-height: 100%;
  }
  .news_list {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  .news_item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 30px;
  }
  .news_header {
    width: 100%;
    font-size: 20px;
    font-weight: 500;
  }
  .news_content {
    text-align: justify;
    font-size: 16px;
  }
  .news_date {
    width: 100%;
    text-align: right;
  }
  @media screen and (max-width: 600px) {
    .header {
      font-size: 30px;
    }
  }
</style>