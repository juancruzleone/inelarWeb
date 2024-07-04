import yup from 'yup';

const productoSchemaCreate = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  categoria: yup.string().required(),
});

const productoSchemaPatch = yup.object({
  name: yup.string(),
  description: yup.string(),
  price: yup.number(),
  categoria: yup.string(),
});

export {
  productoSchemaCreate,
  productoSchemaPatch
};
