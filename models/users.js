import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema (
  {
    name: {
      type: 'string',
      trim: true,
      required: true,
    },
    email: {
      type: 'string',
      unique: true,
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    address: {
      type: 'string',
      required: true,
    },
    phone: {
      type: 'string',
      required: true,
    },
    role: {
      type: 'number',
      default: 0,
    },
  },
  {timestamps: true}
);

export default mongoose.model ('User', UserSchema);
