import Vue from 'vue'
import VueRouter from 'vue-router'

import {masterAuthRouter} from './init/masterAuth'       //密码主管授权路由
import {localProduceRouter} from './init/localProduce'   //本地生产方式路由
import {uploadKey} from './init/uploadKey'               //上传密钥备份文件初始化

import {authorityManagement} from './manage/authorityManagement' //权限管理
import {keyManagement} from './manage/keyManagement' //密钥管理
import {logManage} from './manage/logManage' //日志管理
import {equipManage} from './manage/equipManage' //设备管理

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name:"masterAuth",
        redirect:'/init/initType',
    },
    {
        path: '/login',
        name:'login',
        // redirect:'/init/masterAuth',
        component: () => import('../views/login/index'),
    },
    {
        path: '/init',
        component: () => import('../views/init/layout'),
        children: [
            ...masterAuthRouter,
            ...localProduceRouter,
            ...uploadKey,
            {
                path: "initSuccess",
                component: () => import('../components/init/common/initSuccess'),
                name: 'initSuccess'
            }
        ]
    },
    {
        path:'/home',
        name:'home',
        component:() => import('../views/manage/home'),
        redirect:'/home/index',
        children:[
            {
                path:'index',
                name:'index',
                component: () => import('../views/manage/index'),
            },
            {
                path:'modifyPin',
                name:'modifyPin',
                component: () => import('../components/modify/modifyPin')
            },
            ...authorityManagement,
            ...keyManagement,
            ...logManage,
            ...equipManage,
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
