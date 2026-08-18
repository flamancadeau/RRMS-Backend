import { Schema, model, Document, Types } from 'mongoose';

export interface ITransferHistory extends Document {
  resident: Types.ObjectId;
  fromVillage: Types.ObjectId;
  toVillage: Types.ObjectId;
  approvedBy: Types.ObjectId;
  transferDate: Date;
  remarks?: string;
  status: 'completed';
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TransferHistorySchema = new Schema<ITransferHistory>(
  {
    resident: { type: Schema.Types.ObjectId, ref: 'Resident', required: true },
    fromVillage: { type: Schema.Types.ObjectId, ref: 'Village', required: true },
    toVillage: { type: Schema.Types.ObjectId, ref: 'Village', required: true },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    transferDate: { type: Date, default: Date.now },
    remarks: { type: String, trim: true },
    status: { type: String, enum: ['completed'], default: 'completed' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

export const TransferHistory = model<ITransferHistory>('TransferHistory', TransferHistorySchema);
