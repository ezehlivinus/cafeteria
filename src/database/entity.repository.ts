import {
  Document,
  Model,
  FilterQuery,
  UpdateQuery,
  QueryOptions
} from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findById(
    filterQuery: FilterQuery<T>,
    projection?: Record<string, unknown> | string,
    options?: QueryOptions
  ): Promise<T | null> {
    return await this.entityModel
      .findById(filterQuery, projection, options)
      .exec();
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
}
