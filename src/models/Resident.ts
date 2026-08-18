import { Schema, model, Document, Types } from 'mongoose';

export interface IResident extends Document {
  household: Types.ObjectId;
  village: Types.ObjectId;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  nationalId: string;
  residentCode: string;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  phone?: string;
  email?: string;
  occupation?: string;
  photo?: string;
  status: 'active' | 'inactive' | 'moved';
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ResidentSchema = new Schema<IResident>(
  {
    household: { type: Schema.Types.ObjectId, ref: 'Household', required: true },
    village: { type: Schema.Types.ObjectId, ref: 'Village', required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    dateOfBirth: { type: Date, required: true },
    nationalId: { type: String, required: true, unique: true, trim: true },
    residentCode: { type: String, required: true, unique: true, uppercase: true, trim: true },
    maritalStatus: { type: String, enum: ['single', 'married', 'divorced', 'widowed'], required: true },
    phone: { type: String, trim: true },
    email: { type: String, lowercase: true, trim: true },
    occupation: { type: String, trim: true },
    photo: { type: String, default: '' },
    status: { type: String, enum: ['active', 'inactive', 'moved'], default: 'active' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

export const Resident = model<IResident>('Resident', ResidentSchema);
