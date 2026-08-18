import { Schema, model, Document, Types } from 'mongoose';

export interface IPermission extends Document {
  module: string; // e.g. 'Residents', 'Household', 'Village', 'Reports'
  action: 'create' | 'read' | 'update' | 'delete' | 'approve' | 'export';
  code: string; // e.g. 'RESIDENT_CREATE'
  description: string;
  status: 'active' | 'inactive';
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PermissionSchema = new Schema<IPermission>(
  {
    module: { type: String, required: true, trim: true },
    action: { type: String, required: true, enum: ['create', 'read', 'update', 'delete', 'approve', 'export'] },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

export const Permission = model<IPermission>('Permission', PermissionSchema);
