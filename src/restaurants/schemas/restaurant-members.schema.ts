import { EntityModel } from '@/common/database/entity/entity.schema';
import { User } from '@/users/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Model, Types } from 'mongoose';
import { Restaurant } from './restaurants.schema';

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
export class RestaurantMember {
  _id: string;

  @Prop({
    type: String
  })
  role: string;

  @Prop({ required: false })
  description?: string;

  @Prop({
    ref: User.name,
    type: mongoose.Schema.Types.ObjectId,
    required: true
  })
  member: string;

  @Prop({
    ref: Restaurant.name,
    type: mongoose.Schema.Types.ObjectId,
    required: true 
  })
  restaurant: string; 
}

export const RestaurantMemberSchema =
  SchemaFactory.createForClass(RestaurantMember);

export type RestaurantMemberDocument = RestaurantMember & Document;

export type RestaurantMemberModel = EntityModel<RestaurantMemberDocument>;
