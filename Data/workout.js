import {
  add,
  deleteByID,
  getAll,
  getByID,
  updateByID,
} from "./util/jsonStorageManager.js";

const tableName = "workouts";
const idKey = "id";

export class Workout {
  constructor(
    id = -1,
    userId = -1,
    name = "",
    type = "",
    date = "",
    duration = 0,
    calories = 0,
  ) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.type = type;
    this.date = date;
    this.duration = duration;
    this.calories = calories;
  }

  static createInstance(data) {
    if (!data) return null;
    return new Workout(
      data.id,
      data.userId,
      data.name,
      data.type,
      data.date,
      data.duration,
      data.calories,
    );
  }

  static async getAllWorkouts(
    filter = null,
    sortKey = "date",
    isAsc = false,
    dateRange = null,
  ) {
    let data = await getAll(tableName, filter, sortKey, isAsc);

    if (dateRange && dateRange[0] && dateRange[1]) {
      data = data.filter((workout) => {
        return workout.date >= dateRange[0] && workout.date <= dateRange[1];
      });
    }

    return data.map((obj) => Workout.createInstance(obj));
  }

  static async getWorkoutsByUser(
    userId,
    filter = null,
    sortKey = null,
    isAsc = true,
  ) {
    const data = await getAll(
      tableName,
      [["userId", userId], ...(filter ?? [])],
      sortKey,
      isAsc,
    );
    return data.map((obj) => Workout.createInstance(obj));
  }

  static async getWorkoutByID(id) {
    const data = await getByID(tableName, id, idKey);
    return Workout.createInstance(data);
  }

  async addWorkout() {
    return await add(tableName, { ...this }, idKey);
  }

  async updateWorkout() {
    return await updateByID(tableName, { ...this }, idKey);
  }

  static async deleteWorkoutByID(id) {
    return await deleteByID(tableName, id, idKey);
  }
}
