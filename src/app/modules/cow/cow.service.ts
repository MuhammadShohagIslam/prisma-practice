/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { PaginationOptionsType } from '../../../interfaces/pagination';
import { cowSearchableFields } from './cow.constant';
import { ICow, CowFilterOptionType } from './cow.interface';
import Cow from './cos.model';
import User from '../user/user.model';

const createCow = async (payload: ICow): Promise<ICow> => {
  const isSellerUser =
    (await User.findOne({ _id: payload.seller }, { _id: 0, role: 1 }).lean())
      ?.role === 'seller';

  if (!isSellerUser) {
    throw new ApiError(httpStatus.CONFLICT, 'You are not seller user!');
  }

  const result = await Cow.create(payload);
  return result;
};

const getAllCows = async (
  paginationOption: PaginationOptionsType,
  filters: CowFilterOptionType
): Promise<IGenericResponse<ICow[] | null>> => {
  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelper.calculationPagination(paginationOption);
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;
  const sortCondition: { [key: string]: SortOrder } = {};

  const addCondition = [];

  // for searchable filters
  if (searchTerm) {
    addCondition.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (minPrice || maxPrice) {
    const priceCondition: Partial<{ price: { $gte?: number; $lte?: number } }> =
      {};
    if (minPrice) {
      priceCondition.price = { $gte: Number(minPrice) };
    }
    if (maxPrice) {
      priceCondition.price = {
        ...priceCondition.price,
        $lte: Number(maxPrice),
      };
    }
    addCondition.push(priceCondition);
  }

  if (Object.keys(filtersData).length > 0) {
    addCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition = addCondition.length > 0 ? { $and: addCondition } : {};

  const result = await Cow.find(whereCondition)
    .populate('seller')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const count = await Cow.countDocuments();

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

const getSingleCow = async (data: string): Promise<ICow | null> => {
  const result = await Cow.findById({ _id: data }).populate('seller');
  return result;
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const isExitCow = await Cow.findOne({ _id: id }).populate('seller');

  if (!isExitCow) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found!');
  }
  const result = await Cow.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete({ _id: id });
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
