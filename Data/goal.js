import { add, deleteByID, getAll, getByID, updateByID } from "./tablesManager";

const tableName = "goals";
const idKey = "id";

export function getAllGoals(filter = null) {
  return getAll(tableName, filter);
}

export function getGoalByID(id) {
  return getByID(tableName, id, idKey);
}

export function addGoal(goal) {
  return add(tableName, goal, idKey);
}

export function updateGoal(goal) {
  return updateByID(tableName, goal, idKey);
}

export function deleteGoalByID(id) {
  return deleteByID(tableName, id, idKey);
}
