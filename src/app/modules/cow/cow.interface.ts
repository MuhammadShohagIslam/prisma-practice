import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type CowCategoryEnumType = 'Dairy' | 'Beef' | 'DualPurpose';
export type CowLabelEnumType = 'for sale' | 'sold out';
export type CowLocationEnumType =
  | 'Sylhet'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Dhaka'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: CowLocationEnumType;
  breed: string;
  weight: number;
  label: CowLabelEnumType;
  category: CowCategoryEnumType;
  seller: Types.ObjectId | IUser;
};

export type CowModel = Model<ICow, Record<string, unknown>>;

export type CowFilterOptionType = {
  searchTerm?: string | undefined;
  minPrice?:number | undefined, 
  maxPrice?: number | undefined
};
