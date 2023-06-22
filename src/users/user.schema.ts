import { PaginationFunction, SearchFunction } from '@/common/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

export enum Roles {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT'
}

export enum UserTypes {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN'
}

type UserStatics = {
  hashPassword(password: string): Promise<string>;
  paginate: PaginationFunction<User>;
  search: SearchFunction<User>;
};

type UserMethods = {
  comparePassword(password: string): Promise<boolean>;
};

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
      delete ret.password;

      return ret;
    }
  }
})
export class User {
  _id: string;

  @Prop({ unique: true, required: true, trim: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: Roles, default: Roles.STUDENT })
  role: Roles;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.comparePassword = async function compare(password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = async function hashPassword(
  password: string
) {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
};

UserSchema.pre('save', async function preSave(next) {
  if (this.isModified('password') || (this.isNew && this.password)) {
    const saltOrRounds = 10;
    this.password = await bcrypt.hash(this.password, saltOrRounds);
  }
  next();
});

export type UserDocument = User & Document & UserMethods;

export type UserModel = Model<UserDocument> & UserStatics;
