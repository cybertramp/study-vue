import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import MpFlow from '../components/MpFlow.vue'
import MpFlowBranches from '../components/MpFlowBranches.vue'
import MpFlowDetail from '../components/MpFlowDetail.vue'


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
            path: '/mpflow',
            name: 'mpflow',
            component: MpFlow
        },
        {
            path: '/mpflow-branches',
            name: 'mpflow-branches',
            component: MpFlowBranches
        },
        {
            path: '/mpflow-detail',
            name: 'mpflow-detail',
            component: MpFlowDetail
        },


    ]
})