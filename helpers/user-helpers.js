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

  getPrePressDetails: () => {
    return new Promise(async (resolve, reject) => {
      let prepress = await db
        .get()
        .collection(collection.PREPRESS_COLLECTION)
        .find()
        .toArray();
      resolve(prepress);
    });
  },

  getPressDetails: () => {
    return new Promise(async (resolve, reject) => {
      let press = await db
        .get()
        .collection(collection.PRESS_COLLECTION)
        .find()
        .toArray();
      resolve(press);
    });
  },

  getPostPressDetails: () => {
    return new Promise(async (resolve, reject) => {
      let postpress = await db
        .get()
        .collection(collection.POSTPRESS_COLLECTION)
        .find()
        .toArray();
      resolve(postpress);
    });
  },
};