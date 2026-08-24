import { Types } from "mongoose";
import { User } from "../models/User";
import { hashPassword } from "../utils/password";
import { ApiError } from "../utils/ApiError";

interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  nationalId: string;
  role: string;
}

interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  nationalId?: string;
  role?: string;
  status?: "active" | "suspended";
}

export const createUser = async (
  data: CreateUserData,
  createdBy?: Types.ObjectId,
) => {
  const { firstName, lastName, email, phone, password, nationalId, role } =
    data;

  // Business rule: email must be unique
  const existingEmail = await User.findOne({
    email: email.toLowerCase(),
    isDeleted: false,
  });

  if (existingEmail) {
    throw new ApiError(409, "Email already exists");
  }

  // Business rule: national ID must be unique
  const existingNationalId = await User.findOne({
    nationalId,
    isDeleted: false,
  });

  if (existingNationalId) {
    throw new ApiError(409, "National ID already exists");
  }

  // Business rule: role must be a valid ObjectId
  if (!Types.ObjectId.isValid(role)) {
    throw new ApiError(400, "Invalid role ID");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    phone,
    password: hashedPassword,
    nationalId,
    role: new Types.ObjectId(role),
    createdBy,
  });

  // Never return password
  const userObject = user.toObject();
  delete userObject.password;

  return userObject;
};
