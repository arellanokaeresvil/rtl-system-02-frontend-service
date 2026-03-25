import { createRouter, createWebHistory} from 'vue-router'
import { useAuthStore } from '../stores'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../pages/auth/Login.vue')
    },
    {
        path: '/',
        redirect: '/dashboard',
        name: 'Home',
        component: () => import('../components/BaseContainer.vue'),
        meta: { requiresAuth: true},
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: () => import('../pages/dashboard/Dashboard.vue')
            },
            {
                path: '/batches',
                name: 'Batches',
                component: () => import('../pages/batches/Batch.vue')
            },
            {
                path: '/batches/create',
                name: 'Create Batches',
                component: () => import('../pages/batches/Form.vue')
            },
            {
                path: '/batches/edit/:id',
                name: 'Edit Batches',
                component: () => import('../pages/batches/Form.vue')
            },
            {
                path: '/egg-production',
                name: 'Egg Production',
                component: () => import('../pages/eggs/Egg.vue')
            },{
                path: '/egg-production/create',
                name: 'Create Egg Production',
                component: () => import('../pages/eggs/Form.vue')
            },
            {
                path: '/egg-production/edit/:id',
                name: 'Edit Egg Production',
                component: () => import('../pages/eggs/Form.vue')
            },
            {
                path: '/feeds',
                name: 'Feeds',
                component: () => import('../pages/feeds/Feed.vue')
            },
            {
                path: '/feeds/create',
                name: 'Create Feeds',
                component: () => import('../pages/feeds/Form.vue')
            },
            {
                path: 'feeds/list/:id',
                name: 'Feeds List',
                component: () => import('../pages/feeds/List.vue')
            },
            {
                path: '/expenses',
                name: 'Expenses',
                component: () => import('../pages/expenses/Expense.vue')
            },
            {
                path: '/expenses/create',
                name: 'Create Expenses',
                component: () => import('../pages/expenses/Form.vue')
            },
            {
                path: '/expenses/create-category',
                name: 'Create Expense Category',
                component: () => import('../pages/expenses/CategoryForm.vue')
            },
             {
                path: '/expenses/edit-category/:id',
                name: 'Edit  Expense Category',
                 component: () => import('../pages/expenses/CategoryForm.vue')
            },
            {
                path: '/sales',
                name: 'Sales',
                component: () => import('../pages/sale/Sale.vue')
            },
            {
                path: '/sales/create',
                name: 'Create Sales',
                component: () => import('../pages/sale/Form.vue')
            },
            {
                path: '/users',
                name: 'Users',
                component: () => import('../pages/user/User.vue')
            },
        ]
    },
    {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/NotFound.vue')
  }
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return '/login'
  }

  if (to.path === '/login' && auth.isAuthenticated) {
    return '/dashboard'
  }
})



export default router