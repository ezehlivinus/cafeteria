import { PaginationFunction, SearchFunction } from '@/common/interfaces';
import { Model } from 'mongoose';

export type EntityModel<T> = Model<T> & {
  paginate: PaginationFunction<T>;
  search: SearchFunction<T>;
};
