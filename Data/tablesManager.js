import { increment } from "./tableSequence";

function filterRowCallback(kvp_filter) {
  return (row) => {
    for (const [key, value] of kvp_filter) {
      if (typeof value === "string" && row[key]?.includes(value)) {
        continue;
      }
      if (row[key] !== value) {
        return false;
      }
    }
    return true;
  };
}

function getAll(tableName, kvp_filter = null) {
  if (!tableName || typeof tableName !== "string") return null;

  const tableData = JSON.parse(localStorage.getItem(tableName) || "[]");

  if (!Array.isArray(tableData)) return null;

  if (Array.isArray(kvp_filter)) {
    const filteredData = tableData.filter(filterRowCallback(kvp_filter));
    return filteredData;
  }
  return tableData;
}

function getByID(tableName, id, idKey = "id") {
  const items = getAll(tableName, [[idKey, id]]);
  if (!items || items.length !== 1) return null;
  return items[0];
}

function deleteByID(tableName, id, idKey = "id") {
  const items = getAll(tableName);
  if (!items) return false;
  const newItems = items.filter((row) => row[idKey] !== id);
  localStorage.setItem(tableName, JSON.stringify(newItems));
  return true;
}

function idExists(tableName, id, idKey = "id") {
  return !!getByID(tableName, id, idKey);
}

function add(tableName, newItem, idKey = "id") {
  const items = getAll(tableName) || [];
  const nextID = increment(tableName);
  newItem[idKey] = nextID;
  const newItems = [...items, newItem];
  localStorage.setItem(tableName, JSON.stringify(newItems));
  return nextID;
}

function updateByID(tableName, newItem, idKey = "id") {
  const items = getAll(tableName);
  if (!items) return false;
  if (!idExists(tableName, newItem[idKey], idkey)) return false;
  const newItems = items.map((row) =>
    row[idKey] === newItem[idKey] ? newItem : row,
  );
  localStorage.setItem(tableName, JSON.stringify(newItems));
  return true;
}

export { add, deleteByID, getAll, getByID, idExists, updateByID };
