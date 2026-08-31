import { Types } from "mongoose";
import { Province, IProvince } from "../models/Province";
import { generateProvinceCode } from "../helpers/codeGenerator";

interface CreateProvinceInput {
  name: string;
  status?: "active" | "inactive";
  createdBy?: Types.ObjectId;
}

interface UpdateProvinceInput {
  name?: string;
  status?: "active" | "inactive";
  updatedBy?: Types.ObjectId;
}

export class ProvinceService {
  /**
   * Create a new province
   */
  async createProvince(
    data: CreateProvinceInput
  ): Promise<IProvince> {
    const code = generateProvinceCode(data.name);

    const existingProvince = await Province.findOne({
      $or: [
        {
          code,
          isDeleted: false
        },
        {
          name: data.name.trim(),
          isDeleted: false
        }
      ]
    });

    if (existingProvince) {
      if (existingProvince.code === code) {
        throw new Error(
          "Province with this code already exists"
        );
      }

      throw new Error(
        "Province with this name already exists"
      );
    }

    const province = await Province.create({
      name: data.name.trim(),
      code,
      status: data.status ?? "active",
      createdBy: data.createdBy,
      isDeleted: false
    });

    return province;
  }

  /**
   * Get all active provinces
   */
  async getAllProvinces(): Promise<IProvince[]> {
    return Province.find({
      isDeleted: false
    })
      .sort({ name: 1 })
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");
  }

  /**
   * Get province by ID
   */
  async getProvinceById(
    id: string
  ): Promise<IProvince> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid province ID");
    }

    const province = await Province.findOne({
      _id: id,
      isDeleted: false
    })
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!province) {
      throw new Error("Province not found");
    }

    return province;
  }

  /**
   * Update province
   */
  async updateProvince(
    id: string,
    data: UpdateProvinceInput
  ): Promise<IProvince> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid province ID");
    }

    const updateData: Record<string, unknown> = {};

    /**
     * If name is changed, generate a new code
     */
    if (data.name !== undefined) {
      const name = data.name.trim();
      const code = generateProvinceCode(name);

      const existingProvince = await Province.findOne({
        $or: [
          {
            code,
            isDeleted: false
          },
          {
            name,
            isDeleted: false
          }
        ],
        _id: { $ne: id }
      });

      if (existingProvince) {
        if (existingProvince.code === code) {
          throw new Error(
            "Province with this code already exists"
          );
        }

        throw new Error(
          "Province with this name already exists"
        );
      }

      updateData.name = name;
      updateData.code = code;
    }

    /**
     * Update status if provided
     */
    if (data.status !== undefined) {
      updateData.status = data.status;
    }

    /**
     * Store the user who updated the province
     */
    if (data.updatedBy !== undefined) {
      updateData.updatedBy = data.updatedBy;
    }

    const province = await Province.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false
      },
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!province) {
      throw new Error("Province not found");
    }

    return province;
  }

  /**
   * Soft delete province
   */
  async deleteProvince(
    id: string,
    deletedBy?: Types.ObjectId
  ): Promise<IProvince> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid province ID");
    }

    const province = await Province.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false
      },
      {
        isDeleted: true,
        deletedAt: new Date(),
        updatedBy: deletedBy
      },
      {
        new: true
      }
    );

    if (!province) {
      throw new Error("Province not found");
    }

    return province;
  }

  /**
   * Restore a soft-deleted province
   */
  async restoreProvince(
    id: string
  ): Promise<IProvince> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid province ID");
    }

    const province = await Province.findOneAndUpdate(
      {
        _id: id,
        isDeleted: true
      },
      {
        $set: {
          isDeleted: false
        },
        $unset: {
          deletedAt: 1
        }
      },
      {
        new: true
      }
    );

    if (!province) {
      throw new Error(
        "Deleted province not found"
      );
    }

    return province;
  }
}

export const provinceService =
  new ProvinceService();
