const db = require('../config/connection');
const collection = require('../config/collection');
let objectId = require('mongodb').ObjectId;

module.exports = {
  addService: (serviceData) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.SERVICES_COLLECTION)
        .insertOne(serviceData)
        .then((data) => {
          resolve(data);
        });
    });
  },

  getServicesDetails: () => {
    return new Promise(async (resolve, reject) => {
      let service = await db
        .get()
        .collection(collection.SERVICES_COLLECTION)
        .find()
        .toArray();
      resolve(service);
    });
  },

  deleteService: (serviceId) => {
    return new Promise(async (resolve, reject) => {
      let deleteService = await db
        .get()
        .collection(collection.SERVICES_COLLECTION)
        .deleteOne({ _id: new objectId(serviceId) });
      resolve(deleteService);
    });
  },

  getServiceDetails: (serviceId) => {
    return new Promise(async (resolve, reject) => {
      let service = await db.get().collection(collection.SERVICES_COLLECTION).aggregate([
        {
          $match: {_id: new objectId(serviceId)}
        }
      ]).toArray()
      resolve(service[0]);
    });
  },

  updateService: (serviceId, service) =>{
    return new Promise(async (resolve, reject) => {
      db.get().collection(collection.SERVICES_COLLECTION).updateOne({ _id: new objectId(serviceId) },
      {
        $set: {
          name: service.name, 
          img: service.img
        }
      }
      ).then(data => {
        resolve(data);
      })
    })
  }
};