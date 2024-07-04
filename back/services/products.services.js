import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient('mongodb+srv://juan:juan123@proyectoinelar.2eadspu.mongodb.net/');
const db = client.db("inelar");

async function getProducts(filter = {}) {
  const filterMongo = { eliminado: { $ne: true } };

  if (filter.min && filter.max) {
    filterMongo.price = { $gte: parseInt(filter.min), $lte: parseInt(filter.max) };
  } else {
    if (filter.min) {
      filterMongo.price = { $gte: parseInt(filter.min) };
    }

    if (filter.max) {
      filterMongo.price = { $lte: parseInt(filter.max) };
    }
  }

  if (filter.description) {
    filterMongo.$text = { $search: filter.description };
  }

  return db
    .collection("productos")
    .find(filterMongo)
    .toArray();
}

async function getProductbyId(id) {
  return db.collection("productos").findOne({ _id: new ObjectId(id) });
}

const addProduct = async (producto) => {
  const result = await db.collection("productos").insertOne(producto);
  producto._id = result.insertedId;
  return producto;
};

const putProduct = async (id, producto) => {
  const result = await db.collection("productos").replaceOne({ _id: new ObjectId(id) }, producto);
  return result;
};

const editProduct = async (id, producto) => {
  const result = await db.collection("productos").updateOne({ _id: new ObjectId(id) }, { $set: producto });
  return result;
};

const deleteProduct = async (id) => {
  const result = await db.collection("productos").deleteOne({ _id: new ObjectId(id) });
  return result;
};

export {
  getProducts,
  getProductbyId,
  addProduct,
  putProduct,
  deleteProduct,
  editProduct
};
