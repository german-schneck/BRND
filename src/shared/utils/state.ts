/**
 * Converts an array of objects into a normalized state object using a specified property as the key.
 * @param {Array} data - The array of objects to be normalized.
 * @param {string} typeId - The key to be used for each object in the normalized state object.
 * @returns {object} The normalized state object.
 * @template T
 */
export function normalizeState<T>(data: T[], typeId: keyof T): {[key: string]: T} {
  const items: {[key: string]: T} = {};
  data.forEach(d => {
    items[String(d[typeId])] = d;
  });
  return items;
}

/**
 * Converts a normalized state object into an array of values.
 * @param {object} data - The normalized state object.
 * @returns {Array} An array of values from the state object.
 * @template T
 */
export function unNormalizeState<T>(data: {[key: string]: T}): T[] {
  return Object.values(data);
}
