import { createRouter, createWebHistory } from "vue-router";
// import ForgotPassword from '@/views/ForgotPassword.vue';
import { userRoutes } from "./userRoutes";
import { adminRoutes } from "./adminRoutes";

const router = createRouter({
  history: createWebHistory(),
  routes: [...userRoutes, ...adminRoutes],
});

router.beforeEach((to, _from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const requiredRoles = to.meta.roles as string[];

  const isAuthenticated = !!localStorage.getItem("access_token");
  const userRole = localStorage.getItem("user_role");

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (requiresAuth && requiredRoles && requiredRoles.length > 0) {
    if (userRole && requiredRoles.includes(userRole)) {
      next();
    } else {
      if (requiredRoles.includes("admin") || requiredRoles.includes("HRD")) {
        next({ name: "Not Found Admin" });
      } else {
        next({ name: "Not Found User" });
      }
    }
  } else {
    next();
  }
});

export default router;
