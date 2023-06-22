import { Schema } from 'mongoose';
import { pagination } from './pagination';
import { search } from './search';

export function paginatePlugin(schema: Schema) {
  schema.statics.paginate = pagination;
}

export function searchPlugin(schema: Schema) {
  schema.statics.search = search;
}
