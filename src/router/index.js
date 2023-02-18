import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
import UserBook from "@/views/UserBook.vue";
const routes = [
    // Không tìm thấy route
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    // Contact routes
    {
        path: "/",
        name: "contactbook",
        component: ContactBook,
    },
    {
        path: "/contacts/:id",
        name: "contact.edit",
        component: () => import("@/views/ContactEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/add",
        name: "contact.add",
        component: () => import("@/views/ContactAdd.vue"),
    },

    // User routes
    {
        path: "/user",
        name: "userbook",
        component: UserBook,
    },
    {
        path: "/users/:id",
        name: "user.edit",
        component: () => import("@/views/UserEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/user/add",
        name: "user.add",
        component: () => import("@/views/UserAdd.vue"),
    },

    // Đăng nhập
    {
        path: "/login",
        name: "user.login",
        component: () => import("@/views/UserLogin.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
];
var user;
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/user/add'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('isLogin');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && loggedIn == 'false') {
        next('/login');
    } else {
        next();
    }
});

export default router;