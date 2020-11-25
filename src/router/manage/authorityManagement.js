export const authorityManagement = [
    {
        path: "authorizationManagement",
        component: () => import('../../views/manage/authorityManagement/authorizationManagement'),
        name: 'authorizationManagement'
    },
    {
        path: "administratorManagement",
        component: () => import('../../views/manage/authorityManagement/administratorManagement'),
        name: 'administratorManagement'
    }
]