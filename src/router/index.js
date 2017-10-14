import Vue from 'vue';
import Router from 'vue-router';
import Timer from '@/components/Timer/Timer.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Timer',
      component: Timer,
    },
  ],
});
