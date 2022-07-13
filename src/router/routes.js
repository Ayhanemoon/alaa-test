const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("pages/Index.vue"),
        meta: {
          auth: false,
        },
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("pages/Profile.vue"),
        meta: {
          auth: true,
        },
      },
    ],
  },

  {
    path: "/404",
    name: "404",
    component: () => import("pages/Error404.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
