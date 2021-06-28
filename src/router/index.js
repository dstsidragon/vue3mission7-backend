import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue'),
  },
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/front/Index.vue'),
      },
      {
        path: '/products',
        component: () => import('../views/front/Products.vue'),
      },
      {
        path: '/carts',
        component: () => import('../views/front/Carts.vue'),
      },
      {
        path: '/orders',
        component: () => import('../views/front/Order.vue'),
      },
      {
        path: '/product/:id',
        component: () => import('../views/front/product.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/backend/Index.vue'),
      },
      {
        path: '/productsControl',
        component: () => import('../views/backend/ProductsControl.vue'),
      },
      {
        path: '/articles',
        component: () => import('../views/backend/Articles.vue'),
      },
      {
        path: '/ordersList',
        component: () => import('../views/backend/OrdersList.vue'),
      },
      {
        path: '/coupons',
        component: () => import('../views/backend/Coupons.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
