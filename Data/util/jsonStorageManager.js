import { filterRowCallback, sortRowsCallback } from "./util.js";

const API_BASE = "http://localhost:3000";

async function getAll(
  tableName,
  kvp_filter = null,
  sortingKey = null,
  isAsc = true,
) {
  if (!tableName) return null;
  try {
    const res = await fetch(`${API_BASE}/${tableName}`);
    if (!res.ok) throw new Error("Failed to fetch data");
    let tableData = await res.json();

    if (Array.isArray(kvp_filter) && kvp_filter.length > 0) {
      tableData = tableData.filter(filterRowCallback(kvp_filter));
    }

    if (sortingKey) {
      tableData.sort(sortRowsCallback(sortingKey, isAsc));
    }

    return tableData;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getByID(tableName, id, idKey = "id") {
  try {
    const res = await fetch(`${API_BASE}/${tableName}/${id}`);
    if (!res.ok) return null;
    const item = await res.json();
    return item;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function add(tableName, newItem) {
  try {
    if (!newItem.id) {
      newItem.id = await increment(tableName);
    }

    const res = await fetch(`${API_BASE}/${tableName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    if (!res.ok) throw new Error("Failed to add item");
    const added = await res.json();
    return added.id;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function updateByID(tableName, newItem, idKey = "id") {
  try {
    const id = newItem[idKey];
    if (!id) return false;
    const res = await fetch(`${API_BASE}/${tableName}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function deleteByID(tableName, id) {
  try {
    const res = await fetch(`${API_BASE}/${tableName}/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function idExists(tableName, id) {
  const item = await getByID(tableName, id);
  return !!item;
}

const sequencesKey = "tableSequences";

async function increment(tableName) {
  const res = await fetch(`${API_BASE}/${sequencesKey}`);
  const sequences = await res.json();
  const next = (sequences[tableName] ?? 0) + 1;
  sequences[tableName] = next;

  await fetch(`${API_BASE}/${sequencesKey}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sequences),
  });

  return next;
}

export { add, deleteByID, getAll, getByID, idExists, updateByID };
