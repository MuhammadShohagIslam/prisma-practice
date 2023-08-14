import { Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import responseReturn from "../../../shared/responseReturn";
import httpStatus from "http-status";
import { User } from "@prisma/client";

// create user controller
const createUser: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const { ...createdUserData } = req.body;

        const result = await UserService.createUser(createdUserData);

        responseReturn<User | null>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User Created successfully!",
            data: result,
        });
    }
);

// get all users controller
const getAllUsers: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const result = await UserService.getAllUsers();

        responseReturn<User[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Users retrieved successfully!",
            data: result,
        });
    }
);

// get single user controller
const getSingleUser: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        const result = await UserService.getSingleUser(id);

        responseReturn<User | null>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User retrieved successfully!",
            data: result,
        });
    }
);

// delete user controller
const deleteUser: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const result = await UserService.deleteUser(id);
        responseReturn<User | null>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User deleted successfully!",
            data: result,
        });
    }
);

export const UserController = {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
};
