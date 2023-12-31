const express = require('express');
const userRoute = require('./v1/user.route');
const router = express.Router();

const defaultRoutes = [
  /*{
    path: '/auth',
    route: authRoute,
  },*/
  {
    path: '/users',
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
