import express, { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { CowRoutes } from '../modules/cow/cow.route';

const router: Router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/cows',
    route: CowRoutes,
  }
];

moduleRoutes.forEach(mr => router.use(mr.path, mr.route));

export default router;
