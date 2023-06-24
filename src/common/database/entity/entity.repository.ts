import { PaginationQueryDTO } from '@/common/dtos/pagination.dto';
import {
  Document,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PopulateOptions
} from 'mongoose';
import { EntityModel } from './entity.schema';

interface ISearchOptions<T> {
  fields?: Array<keyof T>;
}

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: EntityModel<T>) {}

  async findById(
    id: FilterQuery<T>['_id'],
    projection?: Record<string, unknown> | string,
    options?: QueryOptions
  ): Promise<T | null> {
    return await this.entityModel.findById(id, projection, options).exec();
  }

  async findOne(
    filterQuery: FilterQuery<T>,
    projection?: Record<string, unknown> | string,
    options?: QueryOptions
  ): Promise<T | null> {
    return await this.entityModel
      .findOne(filterQuery, projection, options)
      .exec();
  }

  async find(
    filterQuery?: FilterQuery<T>,
    projection?: Record<string, unknown> | string,
    options?: QueryOptions
  ): Promise<T[] | null> {
    return await this.entityModel.find(filterQuery, projection, options).exec();
  }

  async create(createData: unknown): Promise<T> {
    return await this.entityModel.create(createData);
  }

  async update(
    filterQuery: FilterQuery<T>,
    updateData: UpdateQuery<T>,
    options?: QueryOptions
  ): Promise<T | null> {
    return await this.entityModel.findOneAndUpdate(filterQuery, updateData, {
      new: true,
      ...options
    });
  }

  async delete(
    filterQuery: FilterQuery<T>,
    options?: QueryOptions
  ): Promise<boolean> {
    return await this.entityModel.findOneAndRemove(filterQuery, options);
  }

  async deleteMany(filterQuery: FilterQuery<T>, options?: QueryOptions) {
    const result = await this.entityModel.deleteMany(filterQuery, options);

    return result.deletedCount >= 1;
  }


  /**
   * @deprecated use findOrSearch instead. This is failing to use the search plugin regex $options
   * @param filter 
   * @param query 
   * @param searchOptions 
   * @param populateOptions 
   * @returns 
   */
  // async _findOrSearch<F extends keyof T>(
  //   filter?: FilterQuery<T>,
  //   query?: PaginationQueryDTO,
  //   searchOptions?: ISearchOptions<T>,
  //   populateOptions?: PopulateOptions
  // ) {
  //   if (query?.search) {
  //     const fields = searchOptions?.fields;

  //     const entityFields = Object.keys(this.entityModel.schema.obj).map((key) =>
  //       key.toString()
  //     );

  //     // fields can be pass like this ['field1', 'field2]
  //     // if nothing is passed the inheriting/implementing entity model's fields will be used
  //     const searchResult = await this.entityModel.search(
  //       {
  //         query: query.search,
  //         fields: (fields as string[]) || entityFields,
  //         filters: filter
  //       },
  //       {
  //         ...query,
  //         populate: populateOptions
  //       }
  //     );

  //     return searchResult;
  //   }

  //   const result = await this.entityModel.paginate(filter, {
  //     ...query,
  //     populate: populateOptions
  //   });

  //   return result;
  // }

  async findOrSearch<F extends keyof T>(
    filter?: FilterQuery<T>,
    query?: PaginationQueryDTO,
    searchOptions?: ISearchOptions<T>,
    populateOptions?: PopulateOptions
  ) {
    const result = await this.entityModel.paginate(filter, {
      ...query,
      populate: populateOptions
    });

    return result;
  }
}
