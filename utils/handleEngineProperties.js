const ENGINE_DB = process.env.ENGINE_DB;

/**
 * It returns the value of the property `id` of the object that is the value of the property
 * `ENGINE_DB` of the object `data`.
 * @returns The value of the key ENGINE_DB in the data object.
 */
const getProperties = () => {
  const data = {
    nosql: {
      id: "_id",
    },
    mysql: {
      id: "id",
    },
  };
  return data[ENGINE_DB];
};

module.exports = getProperties;
