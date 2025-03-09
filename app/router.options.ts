import type { RouterConfig } from "nuxt/schema";
import { RouterPaths } from "~/types/router";

export default <RouterConfig>{
    routes: (_routes) => {
        return [
            {
                path: "/",
                name: RouterPaths.DASHBOARD,
                component: () => import('~/pages/index.vue'),
                meta: {
                    middleware: ['auth']
                },
            },
            {
                path: "/reading",
                name: RouterPaths.READING,
                component: () => import("~/pages/main/reading/index.vue")
            },
            {
                path: "/writing",
                name: RouterPaths.WRITING,
                component: () => import("~/pages/main/writing/index.vue")
            },
            {
                path: "/ai",
                name: RouterPaths.AI,
                component: () => import("~/pages/main/ai/index.vue")
            },
            {
                path: "/test",
                name: RouterPaths.DEV_TEST,
                component: () => import('~/pages/dev/test.vue'),
            },
            {
                path: "/settings",
                name: RouterPaths.SETTINGS,
                component: () => import('~/pages/main/settings/index.vue'),
            },
            {
                path: '/auth/',
                component: () => import('~/pages/auth/layout.vue'),
                name: RouterPaths.AUTH,
                redirect: '/auth/login',
                meta: {
                    middleware: ['auth'],
                    layout: "auth",
                },
                children: [
                    {
                        path: 'login',
                        component: () => import('~/pages/auth/login/index.vue'),
                        name: RouterPaths.LOGIN,
                    },
                    {
                        path: 'register',
                        component: () => import('~/pages/auth/register/index.vue'),
                        name: RouterPaths.REGISTER,
                    }
                ]
            }
        ];
    }
}