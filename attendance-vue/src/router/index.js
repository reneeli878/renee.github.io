import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MyAttendance from '../views/MyAttendance.vue'
import RepairAttendance from '../views/RepairAttendance.vue'
import LeaveRequest from '../views/LeaveRequest.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/my-attendance', name: 'myAttendance', component: MyAttendance },
    { path: '/repair-attendance', name: 'repairAttendance', component: RepairAttendance },
    { path: '/leave-request', name: 'leaveRequest', component: LeaveRequest }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router