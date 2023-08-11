import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import responseReturn from '../../../shared/responseReturn';
import { cowFilterableFields } from './cow.constant';
import { ICow } from './cow.interface';
import { CowService } from './cow.service';
import ApiError from '../../../errors/ApiError';

const createCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...cowData } = req.body;
   
    const result = await CowService.createCow(cowData);

    if (!result) {
      throw new ApiError(400, 'Failed to Create Cow!');
    }
    responseReturn<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow created successfully!',
      data: result,
    });
  }
);

const getAllCows: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, cowFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await CowService.getAllCows(paginationOptions, filters);

    responseReturn<ICow[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cows retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await CowService.getSingleCow(id);

    responseReturn<ICow | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow retrieved successfully!',
      data: result,
    });
  }
);

const updateCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await CowService.updateCow(id, updatedData);

    responseReturn<ICow | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow updated successfully!',
      data: result,
    });
  }
);

const deleteCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await CowService.deleteCow(id);
    responseReturn<ICow | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow deleted successfully!',
      data: result,
    });
  }
);

export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
