import { Schema, model, Document, Types } from 'mongoose';

export interface IHousehold extends Document {
  village: Types.ObjectId;
  householdCode: string;
  head: Types.ObjectId;
  members: Types.ObjectId[];
  address: string;
  status: 'active' | 'inactive';
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const HouseholdSchema = new Schema<IHousehold>(
  {
    village: { type: Schema.Types.ObjectId, ref: 'Village', required: true },
    householdCode: { type: String, required: true, unique: true, uppercase: true, trim: true },
    head: { type: Schema.Types.ObjectId, ref: 'Resident', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'Resident' }],
    address: { type: String, required: true, trim: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

export const Household = model<IHousehold>('Household', HouseholdSchema);
