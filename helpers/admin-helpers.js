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
      let service = await db
        .get()
        .collection(collection.SERVICES_COLLECTION)
        .aggregate([
          {
            $match: { _id: new objectId(serviceId) },
          },
        ])
        .toArray();
      resolve(service[0]);
    });
  },

  updateService: (serviceId, service) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collection.SERVICES_COLLECTION)
        .updateOne(
          { _id: new objectId(serviceId) },
          {
            $set: {
              name: service.name,
              img: service.img,
            },
          }
        )
        .then((data) => {
          resolve(data);
        });
    });
  },

  //---------------------------prepress--------------------------------------------

  addPrePress: (prePressData) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.PREPRESS_COLLECTION)
        .insertOne(prePressData)
        .then((data) => {
          resolve(data);
        });
    });
  },

  getPrePressesDetails: () => {
    return new Promise(async (resolve, reject) => {
      let prepress = await db
        .get()
        .collection(collection.PREPRESS_COLLECTION)
        .find()
        .toArray();
      resolve(prepress);
    });
  },

  deletePrePress: (prepressId) => {
    return new Promise(async (resolve, reject) => {
      let deletePrePress = await db
        .get()
        .collection(collection.PREPRESS_COLLECTION)
        .deleteOne({ _id: new objectId(prepressId) });
      resolve(deletePrePress);
    });
  },

  getPrePressDetails: (prepressId) => {
    return new Promise(async (resolve, reject) => {
      let prepress = await db
        .get()
        .collection(collection.PREPRESS_COLLECTION)
        .aggregate([
          {
            $match: { _id: new objectId(prepressId) },
          },
        ])
        .toArray();
      resolve(prepress[0]);
    });
  },

  updatePrePress: (prepressId, prepress) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collection.PREPRESS_COLLECTION)
        .updateOne(
          { _id: new objectId(prepressId) },
          {
            $set: {
              heading: prepress.heading,
              subheading: prepress.subheading,
              description: prepress.description,
              img: prepress.img,
            },
          }
        )
        .then((data) => {
          resolve(data);
        });
    });
  },

  //-----------------------------------------------------------------------------------------------
  //--------------------------------------------press---------------------------------------------------
  addPress: (pressData) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.PRESS_COLLECTION)
        .insertOne(pressData)
        .then((data) => {
          resolve(data);
        });
    });
  },

  getPressesDetails: () => {
    return new Promise(async (resolve, reject) => {
      let press = await db
        .get()
        .collection(collection.PRESS_COLLECTION)
        .find()
        .toArray();
      resolve(press);
    });
  },

  deletePress: (pressId) => {
    return new Promise(async (resolve, reject) => {
      let deletePress = await db
        .get()
        .collection(collection.PRESS_COLLECTION)
        .deleteOne({ _id: new objectId(pressId) });
      resolve(deletePress);
    });
  },

  getPressDetails: (pressId) => {
    return new Promise(async (resolve, reject) => {
      let press = await db
        .get()
        .collection(collection.PRESS_COLLECTION)
        .aggregate([
          {
            $match: { _id: new objectId(pressId) },
          },
        ])
        .toArray();
      resolve(press[0]);
    });
  },

  updatePress: (pressId, press) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collection.PRESS_COLLECTION)
        .updateOne(
          { _id: new objectId(pressId) },
          {
            $set: {
              heading: press.heading,
              subheading: press.subheading,
              description: press.description,
              img: press.img,
            },
          }
        )
        .then((data) => {
          resolve(data);
        });
    });
  },
  //-----------------------------------------------------------------------------------------------
  //-------------------------------------------postpress----------------------------------------------------
  addPostPress: (postPressData) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.POSTPRESS_COLLECTION)
        .insertOne(postPressData)
        .then((data) => {
          resolve(data);
        });
    });
  },

  getPostPressesDetails: () => {
    return new Promise(async (resolve, reject) => {
      let postpress = await db
        .get()
        .collection(collection.POSTPRESS_COLLECTION)
        .find()
        .toArray();
      resolve(postpress);
    });
  },

  deletePostPress: (postpressId) => {
    return new Promise(async (resolve, reject) => {
      let deletePostPress = await db
        .get()
        .collection(collection.POSTPRESS_COLLECTION)
        .deleteOne({ _id: new objectId(postpressId) });
      resolve(deletePostPress);
    });
  },

  getPostPressDetails: (postpressId) => {
    return new Promise(async (resolve, reject) => {
      let postpress = await db
        .get()
        .collection(collection.POSTPRESS_COLLECTION)
        .aggregate([
          {
            $match: { _id: new objectId(postpressId) },
          },
        ])
        .toArray();
      resolve(postpress[0]);
    });
  },

  updatePostPress: (postpressId, postpress) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collection.POSTPRESS_COLLECTION)
        .updateOne(
          { _id: new objectId(postpressId) },
          {
            $set: {
              heading: postpress.heading,
              subheading: postpress.subheading,
              description: postpress.description,
              img: postpress.img,
            },
          }
        )
        .then((data) => {
          resolve(data);
        });
    });
  },
  //-----------------------------------------------------------------------------------------------
};