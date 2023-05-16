let db = require('../config/db');
let collection = require('../config/collection');
const { response } = require('../app');
let objectId = require('mongodb').ObjectId;

module.exports = {
    addService : (serviceData) => {
        db.get()
          .collection(collection.SERVICES_COLLECTION)
          .insertOne(serviceData)
          .then((response) => {
            resolve(data)
          });
    }
}