export const masterAuthRouter=[
    {
        path: "masterAuth",
        component: () => import('../../components/init/masterAuth/masterAuth'),
        name: 'masterAuth'
    },
    {
        path:"modifyPin",
        name:"modifyPin",
        component:()=>import('../../components/init/masterAuth/modifyPin')
    },
    {
        path:'initType',
        name:'initType',
        component:()=>import('../../components/init/masterAuth/initType')
    }
]
