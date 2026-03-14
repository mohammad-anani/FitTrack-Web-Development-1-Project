import { add, deleteByID, getAll, getByID, updateByID } from "./tablesManager";

const tableName = "goalWorkouts";
const idKey = "id";

export function getAllGoalWorkouts(filter = null) {
  return getAll(tableName, filter);
}

export function getGoalWorkoutByID(id) {
  return getByID(tableName, id, idKey);
}

export function addGoalWorkout(goalworkout) {
  return add(tableName, goalworkout, idKey);
}

export function updateGoalWorkout(goalworkout) {
  return updateByID(tableName, goalworkout, idKey);
}

export function deleteGoalWorkoutByID(id) {
  return deleteByID(tableName, id, idKey);
}
