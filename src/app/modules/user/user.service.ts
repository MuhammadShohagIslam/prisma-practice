/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import config from "../../../config";

const prisma = new PrismaClient();

// get all users service
const getAllUsers = async (): Promise<> => {};

// get single user service
const getSingleUser = async (data: string): Promise<IUser | null> => {
    const result = await User.findById({ _id: data });
    return result;
};

// update user service
const updateUser = async (
    id: string,
    payload: Partial<IUser>
): Promise<IUser | null> => {
    // check user is exit, if not exit return error
    const isExit = await User.findOne({ _id: id });
    if (!isExit) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
    }

    const { name, ...userData } = payload;
    const updatedUserData: Partial<IUser> = { ...userData };

    // dynamically updated nested object
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}` as keyof Partial<IUser>;
            (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
        });
    }

    const result = await User.findByIdAndUpdate({ _id: id }, updatedUserData, {
        new: true,
    });
    return result;
};

// delete user service
const deleteUser = async (id: string): Promise<IUser | null> => {
    // check user is exit, if not exit return error
    const result = await User.findByIdAndDelete({ _id: id });
    return result;
};

export const UserService = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
