import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';
const DEPARTMENTS = ['Engineers', 'HR', 'Marketing', 'Sales'];

export const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      index: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    lastname: {
      type: String,
      index: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    department: {
      type: String,
      index: true,
      enum: DEPARTMENTS,
      required: true,
    },
  },
  {
    collection: 'users',
  },
);

UserSchema.plugin(timestamps);

UserSchema.index({ createdAt: 1, updatedAt: 1 });

export const User = mongoose.model('User', UserSchema);
export const UserTC = composeWithMongoose(User);
