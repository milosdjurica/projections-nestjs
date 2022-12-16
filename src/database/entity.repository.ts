import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

@Injectable()
export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async find(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T[] | null> {
    return this.entityModel.find(entityFilterQuery, {
      // _id: 0,
      // __v: 0,
      // hash: 0,
      ...projection,
    });
  }

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        // _id: 0,
        // __v: 0,
        ...projection,
      })
      .exec();
  }

  async create(createEntityData: unknown): Promise<T> {
    const newEntity = new this.entityModel(createEntityData);
    return newEntity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
        projection: {
          // __v: 0,
          // hash: 0,
        },
      },
    );
  }

  async delete(entityFilterQuery: FilterQuery<T>): Promise<T> {
    return this.entityModel.findOneAndDelete(entityFilterQuery);
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }
}
