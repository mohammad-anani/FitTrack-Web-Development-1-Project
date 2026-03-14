import {
  add,
  deleteByID,
  getAll,
  getByID,
  idExists,
  updateByID,
} from "./tablesManager";

const tableName = "users";
const idKey = "id";

export function getAllUsers(filter = null) {
  return getAll(tableName, filter);
}

export function getUserByID(id) {
  return getByID(tableName, id, idKey);
}

export function addUser(user) {
  return add(tableName, user, idKey);
}

export function updateUser(user) {
  return updateByID(tableName, user, idKey);
}

export function deleteUserByID(id) {
  return deleteByID(tableName, id, idKey);
}

export function userExistsByUsername(username) {
  return idExists(tableName, username, "username");
}

export function findUserByUsernameAndPassword(username, password) {
  const filtered = getAll(tableName, [
    ["username", username],
    ["password", password],
  ]);

  if (!filtered || filtered.length === 0) return null;

  return filtered[0];
}

export function userExistsByUsername(username, password) {
  return !!findUserByUsernameAndPassword(username, password);
}
