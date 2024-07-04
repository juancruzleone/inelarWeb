import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient('mongodb+srv://juan:juan123@proyectoinelar.2eadspu.mongodb.net/');
const db = client.db('inelar');
const cuentaCollection = db.collection('cuentas');

async function editProfile(userId, userName) {
  await client.connect();

  const existe = await cuentaCollection.findOne({ userName });
  if (existe) throw new Error('El nombre de usuario ya existe');

  await cuentaCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { userName } }
  );
}

export { editProfile };
