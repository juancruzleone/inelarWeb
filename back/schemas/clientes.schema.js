import yup from 'yup';

const clienteSchemaCreate = yup.object({
    name: yup.string().required(),
    category: yup.string().required(),
    // Puedes añadir más validaciones según tus necesidades
});

const clienteSchemaPatch = yup.object({
    name: yup.string(),
    category: yup.string(),
    // Añade más validaciones según tus necesidades
});

export {
    clienteSchemaCreate,
    clienteSchemaPatch
};
