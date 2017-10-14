import Vue from 'vue';
import Router from 'vue-router';

const Timer = () => import(/* webpackChunkName: "timer-home" */ '@/components/Timer/Timer.vue');
const TimerHome = () => import(/* webpackChunkName: "timer-home" */ '@/components/TimerHome/TimerHome.vue');
const TimerInput = () => import(/* webpackChunkName: "timer-input" */ '@/components/TimerInput/TimerInput.vue');
const TimerDisplay = () => import(/* webpackChunkName: "timer-display" */ '@/components/TimerDisplay/TimerDisplay.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: TimerHome,
    },
    {
      path: '/timer',
      component: Timer,
      children: [
        {
          path: '/',
          name: 'timer',
          component: TimerInput,
        },
        {
          path: '/display/:timerAmount',
          name: 'timer-display',
          component: TimerDisplay,
          props: true,
        },
      ],
    },
  ],
});
