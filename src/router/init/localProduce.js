export const localProduceRouter = [
    {
        path: "matrixProduce",
        component: () => import('../../components/init/localProduce/matrixProduce'),
        name: 'matrixProduce'
    },
    {
        path: "deviceKeyProduce",
        component: () => import('../../components/init/localProduce/deviceKeyProduce'),
        name: 'deviceKeyProduce'
    },
    {
        path: "localManagerConfig",
        component: () => import('../../components/init/localProduce/localManagerConfig'),
        name: 'localManagerConfig'
    },
    {
        path: "localNetworkConfig",
        component: () => import('../../components/init/localProduce/networkConfig'),
        name: 'localNetworkConfig'
    }
]
