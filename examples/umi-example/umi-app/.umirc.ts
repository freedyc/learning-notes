import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '北漂小青年',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '访问',
      path: '/access',
      component: './Access',
    },
    {
      name: '新建年轻人',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'pnpm',
});

