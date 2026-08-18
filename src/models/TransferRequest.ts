import { Schema, model, Document, Types } from 'mongoose';

export interface IApproval {
  approved: boolean;
  by?: Types.ObjectId;
  date?: Date;
}

export interface ITransferRequest extends Document {
  resident: Types.ObjectId;
  oldVillage: Types.ObjectId;
  newVillage: Types.ObjectId;
  reason: string;
  requestedDate: Date;
  approvedByOldLeader: IApproval;
  approvedByNewLeader: IApproval;
  status: 'pending' | 'approved' | 'rejected';
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ApprovalSchema = new Schema<IApproval>({
  approved: { type: Boolean, default: false },
  by: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date }
}, { _id: false });

const TransferRequestSchema = new Schema<ITransferRequest>(
  {
    resident: { type: Schema.Types.ObjectId, ref: 'Resident', required: true },
    oldVillage: { type: Schema.Types.ObjectId, ref: 'Village', required: true },
    newVillage: { type: Schema.Types.ObjectId, ref: 'Village', required: true },
    reason: { type: String, required: true, trim: true },
    requestedDate: { type: Date, default: Date.now },
    approvedByOldLeader: { type: ApprovalSchema, default: () => ({}) },
    approvedByNewLeader: { type: ApprovalSchema, default: () => ({}) },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

export const TransferRequest = model<ITransferRequest>('TransferRequest', TransferRequestSchema);
