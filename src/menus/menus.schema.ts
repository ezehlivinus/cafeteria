import { EntityModel } from '@/common/database/entity/entity.schema';
import { MenuCategory } from '@/menu-categories/menu-categories.schema';
import { Restaurant } from '@/restaurants/schemas/restaurants.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

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
export class Menu {
  _id: string;

  @Prop({
    required: true,
    trim: true
  })
  name: string;

  @Prop({
    ref: MenuCategory.name,
    type: mongoose.Schema.Types.ObjectId,
    required: true
  })
  category: string;

  @Prop({
    ref: Restaurant.name,
    type: mongoose.Schema.Types.ObjectId,
    required: true
  })
  restaurant: string;

  @Prop({
    required: true,
    default: 200 // to make things for this demo all menus are 200 (whatever the unit maybe)
  })
  price: number;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);

export type MenuDocument = Menu & Document;

export type MenuModel = EntityModel<MenuDocument>;
