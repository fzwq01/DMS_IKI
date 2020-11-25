export const keyManagement = [
    {
        path: "userKeyManagement",
        component: () => import('../../views/manage/keyManagement/userKeyManagement'),
        name: 'userKeyManagement'
    },
    {
        path: "symmetricKeyManagement",
        component: () => import('../../views/manage/keyManagement/symmetricKeyManagement'),
        name: 'symmetricKeyManagement'
    },
    {
        path:'keyBackup',
        component:() => import('../../views/manage/keyManagement/keyBackup'),
        name:'keyBackup'
    },
    {
        path:'keyRecovery',
        component:() => import('../../views/manage/keyManagement/keyRecovery'),
        name:'keyRecovery'
    }
]