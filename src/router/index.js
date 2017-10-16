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
      meta: {
        showBackButton: false,
        showBottomBar: true,
      },
    },
    {
      path: '/timer',
      component: Timer,
      children: [
        {
          path: '/',
          name: 'timer',
          component: TimerInput,
          meta: {
            showBackButton: false,
            showBottomBar: true,
          },
        },
        {
          path: '/display/:timerAmount',
          name: 'timer-display',
          component: TimerDisplay,
          props: true,
          meta: {
            showBackButton: true,
            showBottomBar: false,
          },
        },
      ],
    },
  ],
});
