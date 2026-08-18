import { Schema, model, Document, Types } from 'mongoose';

export interface IRole extends Document {
  name: 'SuperAdmin' | 'ProvinceAdmin' | 'DistrictAdmin' | 'SectorAdmin' | 'CellAdmin' | 'VillageLeader' | 'VillageSecretary' | 'Viewer';
  description: string;
  permissions: Types.ObjectId[];
  level: number;
  status: 'active' | 'inactive';
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      enum: ['SuperAdmin', 'ProvinceAdmin', 'DistrictAdmin', 'SectorAdmin', 'CellAdmin', 'VillageLeader', 'VillageSecretary', 'Viewer'],
      unique: true
    },
    description: { type: String, required: true },
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
    level: { type: Number, required: true }, // e.g. 0 for SuperAdmin, 1 for ProvinceAdmin, etc.
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

export const Role = model<IRole>('Role', RoleSchema);
