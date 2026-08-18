import { Schema, model, Document, Types } from 'mongoose';

export interface IAuditLog extends Document {
  user: Types.ObjectId;
  action: string;
  module: string;
  recordId?: string;
  description: string;
  ip?: string;
  userAgent?: string;
  status: 'active';
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true, trim: true },
    module: { type: String, required: true, trim: true },
    recordId: { type: String },
    description: { type: String, required: true, trim: true },
    ip: { type: String },
    userAgent: { type: String },
    status: { type: String, enum: ['active'], default: 'active' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

export const AuditLog = model<IAuditLog>('AuditLog', AuditLogSchema);
