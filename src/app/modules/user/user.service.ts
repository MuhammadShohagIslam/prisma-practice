/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient, User } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import config from "../../../config";

const prisma = new PrismaClient();

// create user service
const createUser = async (createdData: User): Promise<User | null> => {
    const result = await prisma.user.create({
        data: createdData,
    });
    return result;
};

// get all users service
const getAllUsers = async (): Promise<User[]> => {
    const results = prisma.user.findMany();
    return results;
};

// get single user service
const getSingleUser = async (payload: number): Promise<User | null> => {
    const result = await prisma.user.findUnique({
        where: {
            id: payload,
        },
    });
    return result;
};

// delete user service
const deleteUser = async (id: number): Promise<User | null> => {
    // check user is exit, if not exit return error
    const result = await prisma.user.delete({
        where: {
            id,
        },
    });
    return result;
};

export const UserService = {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
};
