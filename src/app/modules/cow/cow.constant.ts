import {
  CowCategoryEnumType,
  CowLabelEnumType,
  CowLocationEnumType,
} from './cow.interface';

export const cowLocations: CowLocationEnumType[] = [
  'Sylhet',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Dhaka',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];

export const cowCategories: CowCategoryEnumType[] = [
  'Dairy',
  'Beef',
  'DualPurpose',
];

export const cowLabels: CowLabelEnumType[] = ['for sale', 'sold out'];

export const cowSearchableFields = ['location', 'breed', 'category'];
export const cowFilterableFields = [
  'searchTerm',
  'location',
  'minPrice',
  'maxPrice',
];
