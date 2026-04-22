import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MyAttendance from '../views/MyAttendance.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/my-attendance',
      name: 'myAttendance',
      component: MyAttendance
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router