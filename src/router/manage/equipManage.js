export const equipManage = [
    {
        path: "basicInfo",
        component: () => import('../../views/manage/equipManage/basicInfo'),
        name: 'basicInfo'
    },
    {
        path: "equipSelf",
        component: () => import('../../views/manage/equipManage/equipSelf'),
        name: 'equipSelf'
    },
    {
        path: "whiteList",
        component: () => import('../../views/manage/equipManage/whiteList'),
        name: 'whiteList'
    },
    {
        path: "netConfig",
        component: () => import('../../views/manage/equipManage/netConfig'),
        name: 'netConfig'
    },
    {
        path: "deviceStartEnd",
        component: () => import('../../views/manage/equipManage/deviceStartEnd'),
        name: 'deviceStartEnd'
    },
]