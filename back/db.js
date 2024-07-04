import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb+srv://juan:juan123@proyectoinelar.2eadspu.mongodb.net/');
const db = client.db("inelar");

client.connect()
    .then(() => console.log("Conectado a la base de datos"))
    .catch(error => console.error("Error al conectar a la base de datos:", error));

export { client, db };
