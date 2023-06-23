<script setup>
  import axios from 'axios';
  import * as dayjs from 'dayjs';
  import AppLoading from '../components/AppLoading.vue';
  import RequestError from '../components/RequestError.vue';
</script>

<script>
  export default {
    data() {
      return {
        shedule: [],
        status: null,
      };
    },
    methods: {
      getShedule() {
        this.status = 'loading';
        axios.get(`/api/shedule`)
        .then(response => {
          this.status = 'success';
          this.shedule = response.data;
        })
        .catch(error => {
          this.status = 'error';
          console.log(error);
        });
      },
    },
    mounted() {
      this.getShedule();
    },
  };
</script>

<template>
  <app-loading v-if="status === 'loading'" />
  <request-error v-if="status === 'error'" />
  <div class="wrapper" v-if="status === 'success'">
    <header class="header">Расписание</header>
    <div class="shedule">
      <div class="shedule_card" v-for="(item, index) in shedule" :key="item._id">
        <div class="route">{{ item.routeNumber }}</div>
        <header class="card_header">{{ item.shipName }}</header>
        <div class="shedule_item" v-for="(sheduleItem, sheduleIndex) in item.shedule">
          {{ dayjs(sheduleItem).format('H:mm') }}
        </div>
        <div class="delay">Возможна задержка: {{ item.delay }} минут</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .header {
    font-weight: 500;
    font-size: 64px;
    margin: 30px 0px;
    width: 100%;
    text-align: left;
  }
  .shedule {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 50px;
  }
  .shedule_card {
    flex: 1;
    min-width: 20%;
  }
  .route {
    color: #929292;
    font-size: 14px;
  }
  .card_header {
    font-size: 24px;
  }
  .shedule_item {
    font-size: 18px;
    margin-top: 10px;
  }
  .delay {
    font-size: 16px;
    margin-top: 50px;
  }
  @media screen and (max-width: 600px) {
    .header {
      font-size: 30px;
    }
    .shedule_card {
      min-width: 100%;
    }
  }
</style>