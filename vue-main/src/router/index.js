import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import MpFlow from '../components/MpFlow.vue'
import MpHistoryModifyFileInfo from '../components/MpHistoryModifyFileInfo.vue'
import MpFlowSequence from '../components/MpFlowSequence.vue'
import MpFlowCreate from '../components/MpFlowCreate.vue'
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
            path: '/mpflow',
            name: 'mpflow',
            component: MpFlow
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
            path: '/mpflow-create',
            name: 'mpflow-create',
            component: MpFlowCreate
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