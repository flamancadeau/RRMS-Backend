import { Schema, model, Document, Types } from 'mongoose';

export interface IVillage extends Document {
  cell: Types.ObjectId;
  name: string;
  code: string;
  leader?: Types.ObjectId;
  population: number;
  status: 'active' | 'inactive';
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VillageSchema = new Schema<IVillage>(
  {
    cell: { type: Schema.Types.ObjectId, ref: 'Cell', required: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    leader: { type: Schema.Types.ObjectId, ref: 'User' },
    population: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

export const Village = model<IVillage>('Village', VillageSchema);
