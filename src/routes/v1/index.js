/* eslint-disable camelcase */
const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const trungtamRoute = require('./trungtam.route');
const giaovienRoute = require('./giaovien.route');
const hocvienRoute = require('./hocvien.route');
const nguoidungttRoute = require('./nguoidungtt.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/trungtam',
    route: trungtamRoute,
  },
  {
    path: '/giaovien',
    route: giaovienRoute,
  },
  {
    path: '/hocvien',
    route: hocvienRoute,
  },
  {
    path: '/nguoidungtt',
    route: nguoidungttRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
