import { EntityModel } from '@/common/database/entity/entity.schema';
import { Restaurant } from '@/restaurants/schemas/restaurants.schema';
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
export class MenuCategory {
  _id: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 2
  })
  name: string;

  @Prop({ required: false })
  description?: string;

  @Prop({
    ref: Restaurant.name,
    type: mongoose.Schema.Types.ObjectId,
    required: true
  })
  restaurant: string;

  @Prop({
    type: Boolean,
    default: false
  })
  isDeleted: boolean;
}

export const MenuCategorySchema = SchemaFactory.createForClass(MenuCategory);

export type MenuCategoryDocument = MenuCategory & Document;

export type MenuCategoryModel = EntityModel<MenuCategoryDocument>;
