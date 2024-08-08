import { productSchemaCreate, productSchemaPatch } from '../schemas/product.schema.js';

function validateProduct(req, res, next) {
  productoSchemaCreate.validate(req.body, { abortEarly: false })
    .then((producto) => {
      req.body = producto;
      next();
    })
    .catch((error) => res.status(400).json({ error: error.errors }));
}

function validateProductPatch(req, res, next) {
  productoSchemaPatch.validate(req.body, { abortEarly: false, stripUnknown: true })
    .then((producto) => {
      req.body = producto;
      next();
    })
    .catch((error) => res.status(400).json({ error: error.errors }));
}

export {
  validateProduct,
  validateProductPatch
};
