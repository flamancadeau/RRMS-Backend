import { District } from "../models/District";
import { Province } from "../models/Province";

/**
 * Create District
 */
export const createDistrict = async (data: any) => {
  // Check that Province exists
  const province = await Province.findOne({
    _id: data.province,
    isDeleted: false,
  });

  if (!province) {
    throw new Error("Province not found");
  }

  // Check duplicate district code
  const existingDistrict = await District.findOne({
    code: data.code,
    isDeleted: false,
  });

  if (existingDistrict) {
    throw new Error("District with this code already exists");
  }

  const district = await District.create(data);

  return district;
};

/**
 * Get all Districts
 */
export const getDistricts = async () => {
  const districts = await District.find({
    isDeleted: false,
  })
    .populate("province", "name")
    .sort({ name: 1 });

  return districts;
};

/**
 * Get District by ID
 */
export const getDistrict = async (id: string) => {
  const district = await District.findOne({
    _id: id,
    isDeleted: false,
  }).populate("province", "name");

  if (!district) {
    throw new Error("District not found");
  }

  return district;
};

/**
 * Update District
 */
export const updateDistrict = async (
  id: string,
  data: any
) => {
  const district = await District.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!district) {
    throw new Error("District not found");
  }

  // If province is being changed,
  // check that the new province exists
  if (
    data.province &&
    data.province.toString() !== district.province.toString()
  ) {
    const province = await Province.findOne({
      _id: data.province,
      isDeleted: false,
    });

    if (!province) {
      throw new Error("Province not found");
    }
  }

  // Check duplicate code
  if (data.code && data.code !== district.code) {
    const existingDistrict = await District.findOne({
      code: data.code,
      _id: { $ne: id },
      isDeleted: false,
    });

    if (existingDistrict) {
      throw new Error("District with this code already exists");
    }
  }

  Object.assign(district, data);

  await district.save();

  return district;
};

/**
 * Soft Delete District
 */
export const deleteDistrict = async (id: string) => {
  const district = await District.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!district) {
    throw new Error("District not found");
  }

  district.isDeleted = true;
  district.deletedAt = new Date();

  await district.save();

  return district;
};

/**
 * Restore District
 */
export const restoreDistrict = async (id: string) => {
  const district = await District.findOne({
    _id: id,
    isDeleted: true,
  });

  if (!district) {
    throw new Error("Deleted district not found");
  }

  district.isDeleted = false;
  district.deletedAt = undefined;

  await district.save();

  return district;
};
