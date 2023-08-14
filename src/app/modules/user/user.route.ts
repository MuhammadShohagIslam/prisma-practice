import express from "express";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.get("/", UserController.getAllUsers);

router.post("/profile", UserController.getAllUsers);
router.post(
    "/create-user",
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser
);
router.route("/:id").get(UserController.getSingleUser);

export const UserRoutes = router;
