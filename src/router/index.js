import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import PortsView from '../views/PortsView.vue';
import TicketsView from '../views/TicketsView.vue';
import BuyTicketView from '../views/BuyTicketView.vue';
import ShipsView from '../views/ShipsView.vue';
import SheduleView from '../views/SheduleView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/ports',
      name: 'ports',
      component: PortsView,
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: TicketsView,
    },
    {
      path: '/tickets/buy',
      name: 'buyTicket',
      component: BuyTicketView,
    },
    {
      path: '/ships',
      name: 'ships',
      component: ShipsView,
    },
    {
      path: '/shedule',
      name: 'shedule',
      component: SheduleView,
    }
  ]
})

export default router
