import { productoSchemaCreate, productoSchemaPatch } from '../schemas/product.schema.js';

function validateProducto(req, res, next) {
  productoSchemaCreate.validate(req.body, { abortEarly: false })
    .then((producto) => {
      req.body = producto;
      next();
    })
    .catch((error) => res.status(400).json({ error: error.errors }));
}

function validateProductoPatch(req, res, next) {
  productoSchemaPatch.validate(req.body, { abortEarly: false, stripUnknown: true })
    .then((producto) => {
      req.body = producto;
      next();
    })
    .catch((error) => res.status(400).json({ error: error.errors }));
}

export {
  validateProducto,
  validateProductoPatch
};
