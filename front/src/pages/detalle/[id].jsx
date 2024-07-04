import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import styles from '@/styles/Home.module.css';
import Modal from 'react-modal';
import Cookies from 'js-cookie';

const DetalleProducto = ({ initialProducto, initialProductosRelacionados }) => {
  const router = useRouter();
  const { id } = router.query;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [producto, setProducto] = useState(initialProducto);
  const [productosRelacionados, setProductosRelacionados] = useState(initialProductosRelacionados);
  const [loading, setLoading] = useState(!initialProducto || !initialProductosRelacionados);

  useEffect(() => {
    if (!initialProducto || !initialProductosRelacionados) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const responseProducto = await fetch(`http://localhost:2023/api/productos/${id}`);
          const fetchedProducto = await responseProducto.json();

          const responseProductos = await fetch(`http://localhost:2023/api/productos`);
          const fetchedProductos = await responseProductos.json();

          const fetchedProductosRelacionados = fetchedProductos
            .filter(p => p.categoria === fetchedProducto.categoria && p._id !== id)
            .slice(0, 3); 

          setProducto(fetchedProducto);
          setProductosRelacionados(fetchedProductosRelacionados);
        } catch (error) {
          console.error('Error al obtener detalles del producto:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleAgregarAlCarrito = () => {
    const carrito = Cookies.get('carrito') ? JSON.parse(Cookies.get('carrito')) : [];
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
      productoExistente.unidades += 1;
    } else {
      const nuevoProducto = {
        id,
        nombre: producto.name,
        categoria: producto.categoria,
        precio: producto.price,
        imagen: producto.imagen,
        unidades: 1
      };
      carrito.push(nuevoProducto);
    }

    Cookies.set('carrito', JSON.stringify(carrito));
    setModalIsOpen(true);
    setTimeout(() => {
      setModalIsOpen(false);
    }, 1000);
  };

  const handleVerMas = (productoId) => {
    router.push(`/detalle/${productoId}`).then(() => {
      window.location.reload();
    });
  };

  if (loading) {
    return (
      <Layout className={styles.app}>
        <p>Cargando detalles del producto...</p>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout className={styles.app}>
      <div className={styles.contenedorDetalleProducto}>
        <div className={styles.contenedorProducto}>
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            width={150}
            height={180}
            className={styles.imagenProductoDetalle}
          />
        </div>
        <div className={styles.contenidoProducto}>
          <div className={styles.contenidoDetalle}>
            <h3 className={styles.nombreProductoDetalle}>{producto.name}</h3>
            <p className={styles.categoriaDetalle}>{producto.categoria}</p>
            <p className={styles.precioDetalle}>{producto.price}</p>
            <a href="#" onClick={handleAgregarAlCarrito}>Agregar al carrito</a>
          </div>
        </div>
      </div>
      <div className={styles.contenedorDescripcionProducto}>
        <h4>Descripción</h4>
        <p>{producto.description}</p>
      </div>
      <div className={styles.contenedorProductosRelacionados}>
        <h4 className={styles.tituloSeccionProductoRelacionado}>Productos relacionados</h4>
        <div className={styles.productosRelacionados}>
          {productosRelacionados.map((relacionado) => (
            <div key={relacionado._id} className={styles.productoRelacionado}>
              <Image
                src={relacionado.imagen}
                alt={relacionado.nombre}
                width={100}
                height={120}
                className={styles.imagenProductoRelacionado}
              />
              <p>{relacionado.name}</p>
              <button onClick={() => handleVerMas(relacionado._id)} className={styles.botonDetalleRelacionado}>Ver más</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <Modal
        isOpen={modalIsOpen}
        className={styles.Modal}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Producto agregado al carrito"
      >
        <h2>Producto agregado al carrito</h2>
      </Modal>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  try {
    const responseProducto = await fetch(`http://localhost:2023/api/productos/${id}`);
    const producto = await responseProducto.json();

    if (!producto) {
      return {
        notFound: true,
      };
    }

    const responseProductos = await fetch(`http://localhost:2023/api/productos`);
    const productos = await responseProductos.json();

    const productosRelacionados = productos
      .filter(p => p.categoria === producto.categoria && p._id !== id)
      .slice(0, 3); 

    return {
      props: {
        initialProducto: producto,
        initialProductosRelacionados: productosRelacionados,
      },
    };
  } catch (error) {
    console.error('Error al obtener detalles del producto:', error);

    return {
      notFound: true,
    };
  }
}

export default DetalleProducto;
