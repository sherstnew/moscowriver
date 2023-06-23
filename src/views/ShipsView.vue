<script setup>
  import ShipCard from '../components/ShipCard.vue';
  import RequestError from '../components/RequestError.vue';
  import axios from 'axios';
  import * as dayjs from 'dayjs';
</script>

<script>
  export default {
    data() {
      return {
        ships: [],
        shedule: {},
        status: null,
        modalVisible: false,
      }
    },
    methods: {
      getShips() {
        this.status = 'loading';
        axios.get(`/api/ships`)
        .then(response => {
          this.status = 'success';
          this.ships = response.data;
        })
        .catch(error => {
          this.status = 'error';
          console.log(error);
        })
      },
      getShedule(shipName) {
        axios.get('/api/shedule', {
          params: {
            shipName: shipName
          },
        })
        .then(response => {
          this.shedule = response.data;
          this.modalVisible = true;
        })
        .catch(error => {
          console.log(error);
        })
      },
    },
    mounted() {
      this.getShips();
    }
  };
</script>

<template>
  <request-error v-if="status === 'error'" />
  <div v-if="status === 'loading'" class="loading">Загрузка...</div>
  <div class="modal_wrapper" v-if="modalVisible">
    <div class="modal">
      <div class="modal_header">
        <span>Расписание движения</span>
        <img src="../assets/icons/cross.svg" alt="Закрыть" class="cross" @click="modalVisible = false">
      </div>
      <div class="shedule_card">
        <div class="route">{{ shedule.routeNumber }}</div>
        <header class="card_header">{{ shedule.shipName }}</header>
        <div class="shedule_item" v-for="(sheduleItem, sheduleIndex) in shedule.shedule">
          {{ dayjs(sheduleItem).format('H:mm') }}
        </div>
        <div class="delay">Возможна задержка: {{ shedule.delay }} минут</div>
      </div>
    </div>
  </div>
  <div class="wrapper" v-if="status === 'success'">
    <header class="header">Модели транспорта</header>
    <div class="list">
      <ship-card v-for="(item, index) in ships" :ship="item" :key="index" @click="getShedule(item.name)" />
    </div>
  </div>
</template>

<style scoped>
  .header {
    font-size: 64px;
    font-weight: 500;
    margin: 30px 0px;
    width: 100%;
    text-align: left;
  }
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 50vh;
    gap: 50px;
    list-style-type: none;
    margin: 0px;
    padding: 0px;
  }
  .modal_wrapper {
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;
    background-color: #0000009a;
  }
  .modal {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    position: fixed;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 30%;
    width: 40%;
    min-height: 450px;
    background-color: #fafafa;
    border-radius: 15px;
    padding: 30px;
    z-index: 3;
  }
  .modal_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 24px;
  }
  .route {
    color: #929292;
    font-size: 14px;
  }
  .card_header {
    font-size: 32px;
  }
  .shedule_item {
    font-size: 18px;
    margin-top: 10px;
  }
  .delay {
    font-size: 16px;
    margin-top: 50px;
  }
  .cross {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
  @media screen and (max-width: 600px) {
    .header {
      font-size: 30px;
    }
    .modal {
      width: 100%;
    }
  }
</style>