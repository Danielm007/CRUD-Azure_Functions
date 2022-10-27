const azure = require("azure-storage");
// Create reference to the table
const tableSvc = azure.createTableService(
  "restapidnode",
  process.env.AZURE_STORAGE_ACCESS_KEY
);

// Create
const insertEntity = (tableName, entity) => {
  return new Promise((resolve, reject) => {
    tableSvc.insertEntity(
      tableName,
      entity,
      { echoContent: true, payloadFormat: "application/json;odata=nometadata" },
      (error, result, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.body);
        }
      }
    );
  });
};

// Read
const queryEntities = (tableName, query) => {
  return new Promise((resolve, reject) => {
    tableSvc.queryEntities(
      tableName,
      query,
      null,
      { payloadFormat: "application/json;odata=nometadata" },
      (error, result, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.body);
        }
      }
    );
  });
};

// Update
const updateEntity = (tableName, entity) => {
  return new Promise((resolve, reject) => {
    tableSvc.mergeEntity(tableName, entity, {}, (error, result, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

// Delete
const deleteEntity = (tableName, entity) => {
  return new Promise((resolve, reject) => {
    tableSvc.deleteEntity(tableName, entity, (error, result, response) => {
      if (error) {
        reject(error);
      } else {
        resolve("Deleted!");
      }
    });
  });
};

// C
exports.insertEntity = insertEntity;
// R
exports.queryEntities = queryEntities;
// U
exports.updateEntity = updateEntity;
// D
exports.deleteEntity = deleteEntity;
