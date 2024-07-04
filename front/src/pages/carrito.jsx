import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import styles from '@/styles/Home.module.css';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

const Cart = () => {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [userData, setUserData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const savedCart = Cookies.get('carrito') ? JSON.parse(Cookies.get('carrito')) : [];
    setCart(savedCart);

    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  const handleRemoveProduct = (index) => {
    const newCart = [...cart];
    if (newCart[index].unidades > 1) {
      newCart[index].unidades -= 1;
    } else {
      newCart.splice(index, 1);
    }
    setCart(newCart);
    Cookies.set('carrito', JSON.stringify(newCart));
  };

  const handleIncreaseUnits = (index) => {
    const newCart = [...cart];
    newCart[index].unidades += 1;
    setCart(newCart);
    Cookies.set('carrito', JSON.stringify(newCart));
  };

  const handleEmptyCart = () => {
    setCart([]);
    Cookies.set('carrito', JSON.stringify([]));
  };

  const handleCheckout = async () => {
    if (!userData) {
      setModalIsOpen(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:2023/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart,
          estado: 'nuevo',
          userId: userData.cuenta._id,
        }),
      });

      const data = await response.json();
      if (data && data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <Layout className={styles.app}>
      <h1 className={styles.tituloPaginas}>Carrito</h1>
      <div className={`${styles.contenedorSeccionCarrito} ${cart.length === 0 ? styles.contenedorSeccionCarritoVacio : ''}`}>
        <div className={`${styles.contenedorCarrito} ${cart.length === 0 ? styles.contenedorCarritoVacio : ''}`}>
          <h3>Productos en el carrito</h3>
          {cart.length === 0 ? (
            <p className={styles.mensajeCarritoVacio}>No hay productos en el carrito.</p>
          ) : (
            cart.map((producto, index) => (
              <div key={index} className={styles.tarjetaProductoCarrito}>
                <div className={styles.imagenProductoDetalleCarrito}>
                  <Image
                    src={producto.imagen}
                    alt={producto.nombre}
                    width={150}
                    height={180}
                  />
                </div>
                <div className={styles.detalleProductoCarrito}>
                  <div>
                    <p className={styles.nombreProductoCarrito}>{producto.nombre}</p>
                    <p className={styles.categoriaProductoCarrito}>{producto.categoria}</p>
                    <p>{producto.precio}</p>
                  </div>
                  <div className={styles.unidadesProductoCarrito}>
                    <p><span>Unidades:</span>{producto.unidades}</p>
                  </div>
                </div>
                <button
                  className={styles.botonSumar}
                  onClick={() => handleIncreaseUnits(index)}
                >
                  <Image src="/suma.svg" alt="Sumar unidades" width={20} height={20} />
                </button>
                <button
                  className={styles.botonEliminar}
                  onClick={() => handleRemoveProduct(index)}
                >
                  <Image src="/eliminar.svg" alt="Eliminar unidades" width={20} height={20} />
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 ? (
          <button
            className={styles.botonVaciar}
            onClick={handleEmptyCart}
          >
            Vaciar carrito
          </button>
        ) : null}
        <button
          className={styles.botonIrCheckout}
          onClick={handleCheckout}
        >
          Proceder al checkout
        </button>
      </div>
      <Footer />
      <Modal
        isOpen={modalIsOpen}
        className={styles.ModalCheckout}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Debes iniciar sesión para proceder al checkout"
      >
        <h2 className={styles.tituloModalCheckout}>Tenés que iniciar sesión para ir al checkout</h2>
      </Modal>
    </Layout>
  );
};

export default Cart;
