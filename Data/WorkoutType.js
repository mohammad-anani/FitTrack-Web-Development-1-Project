import { add, getAll, updateByID } from "./util/jsonStorageManager.js";

const tableName = "types";

export class WorkoutType {
  static async getAllTypes() {
    const types = await getAll(tableName);
    if (!types) return [];
    return types.map((t) => t.name);
  }

  static async updateTypes(types) {
    const existing = (await getAll(tableName)) || [];

    const updated = types.map((name, index) => {
      const existingType = existing.find((t) => t.name === name);
      return {
        id: existingType ? existingType.id : index + 1,
        name,
      };
    });

    for (const type of updated) {
      const exists = existing.find((t) => t.id === type.id);
      if (exists) {
        await updateByID(tableName, type);
      } else {
        await add(tableName, type);
      }
    }

    for (const type of existing) {
      if (!updated.find((t) => t.id === type.id)) {
        await deleteByID(tableName, type.id);
      }
    }
  }

  static async seedDefaultData() {
    const types = await WorkoutType.getAllTypes();
    if (!types || types.length === 0) {
      await WorkoutType.updateTypes(["Strength", "Yoga", "Cardio"]);
    }
  }
}

WorkoutType.seedDefaultData();
