/**
 * A function to update object with key value pairs
 *
 * @parameters :
 * obj: object that is being updated,
 * keyValue: updated {key value pairs} in that object obj
 */
export const updateObj = (obj, keyValue) => Object.assign({}, obj, keyValue);

/**
 * A function to delete objects with key
 *
 * @parameters :
 * obj: object that is being updated,
 * key: key that needs to be deleted in that object obj
 */
export const deleteFromObj = (obj, keys) => {
  const newObj = Object.assign({}, obj);
  const arrKeys = Array.isArray(keys) ? keys : [keys];
  for (let i = 0; i < arrKeys.length; i += 1) {
    delete newObj[arrKeys[i]];
  }
  return newObj;
};

/**
 * A function to get new ID
 */
export const getNewId = () => `id${Math.floor(Math.random() * 1000)}`;
