Proyecto:
-- Es un rediseño de web para la empresa Inelar, una empresa que dedica a la prevención contra incendios en Argentina. Se ubica en CABA, provincia de Buenos Aires pero brinda su servicio en todo el pais. 

La página que tienen esta desactualizada, fue realizada con adoble flash. El rediseño se realizo con React con Next y Node con Express y Mongodb en el back. El proyecto tiene una presentación de la empresa y de su app, una sección de quienes somos, una sección de servicios donde el usuario puede hacer la solicitud del serivicio que necesita, una sección de productos con filtrados por categoria, una sección preguntas frecuentes, una secció con las certificaciones de la empresa, una sección para enviar un mensaje de contacto y un panel admin con administración de productos, clientes, servicios y mensajes de contacto


Tecnologias: 
-- Front: React, Next
-- Back: Node, Express, MongoDB


Front: (localhost:3000)
-- npm install
-- npm run build
-- npm run dev

Back:
-- npm install
-- npm run dev


Funcionalidades:
-- Autenticación (Otorgar/Eliminar permisos para visitar y visualizar las secciones en el nav)
-- Cuentas (Inciar sesión y Registarse)
-- Solicitud de servicios (Mantenimiento, Servicio técnico, Instalaciones y Provisiones)
-- Productos (Filtrado por categoria, agregar al carrito)
-- Contacto (Enviar mensaje de contacto que se va a visualizar en el panel admin)
-- Carrito (Agregar cantidades de productos, Eliminar productos, Vaciar carrito y Checkout con API de mercadopago)
-- Perfil de usuario (Editar nombre de usuario, ver ordenes de compras realizadas)
-- Panel admin (Productos, clientes, mensajes y mensajes de contacto)
      |
      |
      |-- Productos (Visualizar, buscar, filtro por categoria, crear, editar y eliminar)
             |
             |-- Al crea producto el usuario tiene que subir una img para crear el producto
      |
      |
      |-- Clientes (Visualizar, filtro por categoria, buscar, crear, editar y eliminar)
      |
      |
      |-- Mensajes (Visualizar)
      |
      |
      |-- Mensajes de contacto (Visualizar)



Usuario admin:
-- Usuario: admin123
-- Contraseña: admin123

Usuario normal:
-- Usuario: 
-- Contraseña:

Usuario prueba de mercadopago:
-- Usuario: TESTUSER1436795086
-- Contraseña: Bk0lzZ8mnN




