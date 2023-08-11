import express from 'express';
import { CowController } from './cow.controller';
import { CowValidation } from './cow.validation';
import validateRequest from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router
  .route('/')
  .post(
    auth(ENUM_USER_ROLE.SELLER),
    validateRequest(CowValidation.createCowZodSchema),
    CowController.createCow
  )
  .get(
    auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
    CowController.getAllCows
  );

router
  .route('/:id')
  .get(
    auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
    CowController.getSingleCow
  )
  .patch(
    auth(ENUM_USER_ROLE.SELLER),
    validateRequest(CowValidation.updateCowZodSchema),
    CowController.updateCow
  )
  .delete(auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);

export const CowRoutes = router;
