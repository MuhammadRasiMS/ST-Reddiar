const db = require('../config/connection');
const collection = require('../config/collection');


module.exports = {
  getServiceDetails: () => {
    return new Promise(async (resolve, reject) => {
      let service = await db
        .get()
        .collection(collection.SERVICES_COLLECTION)
        .find()
        .toArray();
      resolve(service);
    });
  },
};