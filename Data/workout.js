import { add, deleteByID, getAll, getByID, updateByID } from "./tablesManager";

const tableName = "workouts";
const idKey = "id";

export function getAllWorkouts(filter = null) {
  return getAll(tableName, filter);
}

export function getWorkoutByID(id) {
  return getByID(tableName, id, idKey);
}

export function addWorkout(workout) {
  return add(tableName, workout, idKey);
}

export function updateWorkout(workout) {
  return updateByID(tableName, workout, idKey);
}

export function deleteWorkoutByID(id) {
  return deleteByID(tableName, id, idKey);
}
