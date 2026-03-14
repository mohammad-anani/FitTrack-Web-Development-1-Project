import { add, deleteByID, getAll, getByID, updateByID } from "./tablesManager";

const tableName = "trainings";
const idKey = "id";

export function getAllTrainings(filter = null) {
  return getAll(tableName, filter);
}

export function getTrainingByID(id) {
  return getByID(tableName, id, idKey);
}

export function addTraining(workout_training) {
  return add(tableName, workout_training, idKey);
}

export function updateTraining(workout_training) {
  return updateByID(tableName, workout_training, idKey);
}

export function deleteTrainingByID(id) {
  return deleteByID(tableName, id, idKey);
}
