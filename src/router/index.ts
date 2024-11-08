import { createRouter, createWebHistory } from "vue-router";
import { validateRoute } from "@/utils/utils";
import Layout from "@/layout/quasar-classic.vue";
import Login from "@/views/Login/Login.vue";
import Register from "@/views/Login/Register.vue";
import Categories from "@/views/Category/Category.vue";
import AddProduct from "@/views/Products/Add.vue";
import Product from "@/views/Products/Product.vue";

const routes = [
    {
        path: '/404',
        name: 'NotFound',
        component: () => import('@/views/404/NotFound.vue'),
        children: []
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/layout/AuthLayout.vue'),
        children: [
            { path: '', name: 'login', component: Login, meta: { auth: false } },
        ],
        meta: {
            auth: false
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/layout/AuthLayout.vue'),
        children: [
            { path: '', name:'Register', component: Register, meta: { auth: false } },
        ],
        meta: {
            auth: false
        }
    },
    {
        path: "/",
        name: "Index",
        component: Layout,
        meta: {
            auth: true,
        },
        children: [
            {
                path: "/category",
                name: "Category",
                component: Categories,
                meta: {
                    auth: true,
                },
            },
            {
                path: "/products",
                name: "Product",
                component: Product,
                meta: {
                    auth: true,
                },
            },
            {
                path: "/product/:id?",
                name: "Add",
                component: AddProduct,
                meta: {
                    auth: true,
                },
            },
        ],
    },
    {
        path: '/:catchAll(.*)', // Captura cualquier ruta no definida
        component: () => import('@/views/404/NotFound.vue'),
        children: []
    },
    
];

//

const base_url = import.meta.env.VITE_BASE_URL || "";

const router = createRouter({
    history: createWebHistory(base_url),
    routes,
});

router.beforeEach(async (to: any, _from: any, next: any) => {
    if (!to.meta.auth) {
        next();
    }
    else {
        if (await validateRoute()) {
            next();
        } else {
            localStorage.removeItem("token");
            next("/login");
        }
    }
});

export default router;
