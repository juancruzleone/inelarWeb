import { clienteSchemaCreate, clienteSchemaPatch } from '../schemas/client.schema.js';

function validateCliente(req, res, next) {
    clienteSchemaCreate.validate(req.body, { abortEarly: false })
        .then((cliente) => {
            req.body = cliente;
            next();
        })
        .catch((error) => res.status(500).json(error));
}

function validateClientePatch(req, res, next) {
    clienteSchemaPatch.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((cliente) => {
            req.body = cliente;
            next();
        })
        .catch((error) => res.status(500).json(error))
}

export {
    validateCliente,
    validateClientePatch
};
