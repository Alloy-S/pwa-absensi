import { createRouter, createWebHistory } from "vue-router";
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
  const userRoleString = localStorage.getItem("user_role");

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (requiresAuth && requiredRoles && requiredRoles.length > 0) {
    
    if (userRoleString) {  
      const userRoles = userRoleString.split(',').map(role => role.trim());

      const hasRequiredRole = requiredRoles.some(requiredRole => userRoles.includes(requiredRole));

      if (hasRequiredRole) {
        next(); 
      } else {
        if (requiredRoles.includes("Admin") || requiredRoles.includes("PIC")) {
          next({ name: "Not Found Admin" });
        } else {
          next({ name: "Not Found User" });
        }
      }
    } else {
      next({ name: "Not Found User" });
    }

  } else {
    next(); 
  }
});

export default router;
