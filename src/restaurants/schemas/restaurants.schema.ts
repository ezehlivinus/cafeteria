import { EntityModel } from '@/common/database/entity/entity.schema';
import { User } from '@/users/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Model, Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})
export class Restaurant {
  _id: string;

  @Prop({
    unique: true,
    required: true,
    trim: true,
    minlength: 2
  })
  name: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ type: String })
  address?: string;

  @Prop({
    ref: User.name,
    type: mongoose.Schema.Types.ObjectId,
    required: true
  })
  owner: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

export type RestaurantDocument = Restaurant & Document;

export type RestaurantModel = EntityModel<RestaurantDocument>;
