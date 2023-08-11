import { Schema, model } from 'mongoose';
import { ICow, CowModel } from './cow.interface';
import { cowCategories, cowLabels, cowLocations } from './cow.constant';

const cowSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: cowLocations,
    },
    breed: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: cowLabels,
      default: "for sale"
    },
    category: {
      type: String,
      required: true,
      enum: cowCategories,
    },
    seller: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);


const Cow = model<ICow, CowModel>('Cow', cowSchema);

export default Cow;
