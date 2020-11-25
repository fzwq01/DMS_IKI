export const logManage = [
    {
        path: "checkLog",
        component: () => import('../../views/manage/logManage/checkLog'),
        name: 'checkLog'
    },
    {
        path: "logging",
        component: () => import('../../views/manage/logManage/logging'),
        name: 'logging'
    },
    {
        path:'logPolicy',
        component:() => import('../../views/manage/logManage/logPolicy'),
        name:'logPolicy'
    }
]