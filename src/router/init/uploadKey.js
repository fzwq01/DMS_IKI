export const uploadKey = [
    {
        path: "uploadKey",
        component: () => import('../../components/init/uploadKey/uploadKey'),
        name: 'uploadKey'
    },
    {
        path: "installKey", 
        component: () => import('../../components/init/uploadKey/installKey'),
        name: 'installKey'
    },
    {
        path: "deviceKeyProduction", 
        component: () => import('../../components/init/uploadKey/deviceKeyProduction'),
        name: 'deviceKeyProduction'
    },
    {
        path: "administratorSettings", 
        component: () => import('../../components/init/uploadKey/administratorSettings'),
        name: 'administratorSettings'
    },
    {
        path: "networkConfiguration", 
        component: () => import('../../components/init/uploadKey/networkConfiguration'),
        name: 'networkConfiguration'
    },
]
