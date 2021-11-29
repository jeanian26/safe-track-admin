/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",

    component: () =>
      import("../views/About.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",

    component: () =>
      import("../views/Dashboard.vue"),
  },
  {
    path: "/passwordReset",
    name: "passwordReset",

    component: () =>
      import("../views/passwordReset.vue"),
  },
  {
    path: "/events",
    name: "events",

    component: () =>
      import("../views/Events.vue"),
  },
  {
    path: "/events/:id",
    name: "SingleEvent",

    component: () =>
      import("../views/SingleEvent.vue"),
  },
  {
    path: "/users/:id",
    name: "SingleUser",

    component: () =>
      import("../views/SingleUser.vue"),
  },
  {
    path: "/videos",
    name: "videos",

    component: () =>
      import("../views/Videos.vue"),
  },
  {
    path: "/users",
    name: "users",

    component: () =>
      import("../views/Users.vue"),
  },

];

const router = new VueRouter({
  routes,
});

export default router;
