import yup from 'yup';

const clienteSchemaCreate = yup.object({
    name: yup.string().required(),
    category: yup.string().required(),
});

const clienteSchemaPatch = yup.object({
    name: yup.string(),
    category: yup.string(),
});

export {
    clienteSchemaCreate,
    clienteSchemaPatch
};
