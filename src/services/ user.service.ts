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
export const getUsers = async () => {
  const users = await User.find({
    isDeleted: false,
  })
    // .populate("role")
    .select("-password")
    .sort({ createdAt: -1 });

  return users;
};

export const getUser = async (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const user = await User.findOne({
    _id: userId,
    isDeleted: false,
  })
    // .populate("role")
    .select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const deleteUser = async (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const user = await User.findOne({
    _id: userId,
    isDeleted: false,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.isDeleted = true;
  await user.save();

  return user;
};


export const updateUser = async (
  userId: string,
  data: Partial<CreateUserData>,
) => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const user = await User.findOne({
    _id: userId,
    isDeleted: false,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check email uniqueness if email is being updated
  if (data.email) {
    const email = data.email.toLowerCase();

    const existingEmail = await User.findOne({
      email,
      isDeleted: false,
      _id: { $ne: userId },
    });

    if (existingEmail) {
      throw new ApiError(409, "Email already exists");
    }

    user.email = email;
  }

  // Check national ID uniqueness if being updated
  if (data.nationalId) {
    const existingNationalId = await User.findOne({
      nationalId: data.nationalId,
      isDeleted: false,
      _id: { $ne: userId },
    });

    if (existingNationalId) {
      throw new ApiError(409, "National ID already exists");
    }

    user.nationalId = data.nationalId;
  }

  if (data.firstName !== undefined) user.firstName = data.firstName;
  if (data.lastName !== undefined) user.lastName = data.lastName;
  if (data.phone !== undefined) user.phone = data.phone;

  if (data.role !== undefined) {
    if (!Types.ObjectId.isValid(data.role)) {
      throw new ApiError(400, "Invalid role ID");
    }

    user.role = new Types.ObjectId(data.role);
  }

  // Only hash password when a new password is provided
  if (data.password) {
    user.password = await hashPassword(data.password);
  }

  await user.save();

  const userObject = user.toObject();
  delete userObject.password;

  return userObject;
};
