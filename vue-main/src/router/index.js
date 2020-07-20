import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import MpHistory from '../components/MpHistory.vue'
import MpHistoryModifyFileInfo from '../components/MpHistoryModifyFileInfo.vue'
import MpFlowSequence from '../components/MpFlowSequence.vue'
import MpFlowSequenceCreate from '../components/MpFlowSequenceCreate.vue'
import MpFlowSequenceModify from '../components/MpFlowSequenceModify.vue'
import MpFlowSequenceDelete from '../components/MpFlowSequenceDelete.vue'

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
        },
        {
            path: '/mp-flow-sequence',
            name: 'mp-flow-sequence',
            component: MpFlowSequence
        },
        {
            path: '/mp-flow-sequence-create',
            name: 'mp-flow-sequence-create',
            component: MpFlowSequenceCreate
        }
        ,
        {
            path: '/mp-flow-sequence-modify',
            name: 'mp-flow-sequence-modify',
            component: MpFlowSequenceModify
        }
        ,
        {
            path: '/mp-flow-sequence-delete',
            name: 'mp-flow-sequence-delete',
            component: MpFlowSequenceDelete
        }
    ]
})