import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient('mongodb+srv://juan:juan123@proyectoinelar.2eadspu.mongodb.net/');
await client.connect();
const db = client.db("inelar");

async function getClients(filter = {}) {
  const filterMongo = { eliminado: { $ne: true } };
  return db.collection("clientes").find(filterMongo).toArray();
}

async function getClientById(id) {
  return db.collection("clientes").findOne({ _id: new ObjectId(id) });
}

const addClient = async (cliente) => {
  const insertedClient = await db.collection("clientes").insertOne(cliente);
  cliente._id = insertedClient.insertedId;
  return cliente;
};

const putClient = async (id, cliente) => {
  const editedClient = await db.collection("clientes").replaceOne({ _id: new ObjectId(id) }, cliente);
  return editedClient;
};

const editClient = async (id, nuevoCliente) => {
  const editedClient = await db.collection("clientes").updateOne(
    { _id: new ObjectId(id) },
    { $set: nuevoCliente }
  );
  return editedClient;
};

const deleteClient = async (id) => {
  const deletedClient = await db.collection("clientes").deleteOne({ _id: new ObjectId(id) });
  return deletedClient;
};

export {
  getClients,
  getClientById,
  addClient,
  putClient,
  editClient,
  deleteClient,
};
