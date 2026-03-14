import { add, deleteByID, getAll, getByID, updateByID } from "./tablesManager";

const tableName = "types";
const idKey = "id";

export function getAllTypes(filter = null) {
  return getAll(tableName, filter);
}

export function getTypeByID(id) {
  return getByID(tableName, id, idKey);
}

export function addType(type) {
  return add(tableName, type, idKey);
}

export function updateType(type) {
  return updateByID(tableName, type, idKey);
}

export function deleteTypeByID(id) {
  return deleteByID(tableName, id, idKey);
}
