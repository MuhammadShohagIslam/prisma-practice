import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import responseReturn from '../../../shared/responseReturn';
import { IUser } from './user.interface';
import httpStatus from 'http-status';

// get all users controller
const getAllUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.getAllUsers();

    responseReturn<IUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  }
);

// get single user controller
const getSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await UserService.getSingleUser(id);

    responseReturn<IUser | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrieved successfully!',
      data: result,
    });
  }
);

// update user controller
const updateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await UserService.updateUser(id, updatedData);

    responseReturn<IUser | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  }
);

// delete user controller
const deleteUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await UserService.deleteUser(id);
    responseReturn<IUser | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  }
);




export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
};
