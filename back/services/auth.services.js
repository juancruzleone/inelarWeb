import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt';

const client = new MongoClient('mongodb+srv://juan:juan123@proyectoinelar.2eadspu.mongodb.net/');

const db = client.db("inelar");
const cuentaCollection = db.collection("cuentas");

async function createAccount(cuenta) {
    await client.connect();

    const existe = await cuentaCollection.findOne({ userName: cuenta.userName });

    if (existe) throw new Error("cuenta ya existe");

    const nuevaCuenta = { ...cuenta };
    nuevaCuenta.password = await bcrypt.hash(cuenta.password, 10);

    await cuentaCollection.insertOne(nuevaCuenta);
}

async function login(cuenta) {
    await client.connect();

    const existe = await cuentaCollection.findOne({ userName: cuenta.userName });

    if (!existe) throw new Error("No me pude logear");

    const esValido = await bcrypt.compare(cuenta.password, existe.password);

    if (!esValido) throw new Error("No me pude logear");

    return { ...existe, password: undefined };
}

export {
    createAccount,
    login
};
