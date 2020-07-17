import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import MpHistory from '../components/MpHistory.vue'
import MpHistoryModifyFileInfo from '../components/MpHistoryModifyFileInfo.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/mp-history',
            name: 'mp-history',
            component: MpHistory
        },
        {
            path: '/mp-history-modify-fileinfo',
            name: 'mp-history-modify-fileinfo',
            component: MpHistoryModifyFileInfo
        }
    ]
})