import { Schema, model, Document, Types } from 'mongoose';

export interface ILoginHistory extends Document {
  user: Types.ObjectId;
  device?: string;
  browser?: string;
  os?: string;
  location?: string;
  ipAddress?: string;
  loginTime: Date;
  logoutTime?: Date;
  status: 'success' | 'failed';
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const LoginHistorySchema = new Schema<ILoginHistory>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    device: { type: String },
    browser: { type: String },
    os: { type: String },
    location: { type: String },
    ipAddress: { type: String },
    loginTime: { type: Date, default: Date.now },
    logoutTime: { type: Date },
    status: { type: String, enum: ['success', 'failed'], required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

export const LoginHistory = model<ILoginHistory>('LoginHistory', LoginHistorySchema);
