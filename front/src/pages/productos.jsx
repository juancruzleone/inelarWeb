import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:2023/api/productos");
        const data = await response.json();

        const filteredProducts = categoriaSeleccionada
          ? data.filter((producto) => producto.categoria === categoriaSeleccionada)
          : data;

        setProductos(filteredProducts);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoriaSeleccionada]);

  const changeCategory = (category) => {
    setCategoriaSeleccionada(category);
  };

  return (
    <Layout>
      <Head>
        <title>Productos | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <div className={styles.contenedorPagina}>
        <h1 className={styles.tituloPaginas}>Productos</h1>
        <div className={styles.posicionSeccionProductos}>
          <div className={styles.contenedorCategoriasProductos} id={styles.contenedorCategoriaProductos}>
            <a
              href="#"
              onClick={() => changeCategory("detección")}
              className={categoriaSeleccionada === "detección" ? styles.categoriaSeleccionadaProducto : ""}
            >
              Detección
            </a>
            <a
              href="#"
              onClick={() => changeCategory("extinción")}
              className={categoriaSeleccionada === "extinción" ? styles.categoriaSeleccionadaProducto : ""}
            >
              Extinción
            </a>
          </div>
          <div className={styles.contenedorProductos}>
            {loading ? (
              <p>Cargando productos...</p>
            ) : (
              productos.map((producto, index) => (
                <div key={index} className={styles.tarjetaProducto}>
                  <Image
                    src={producto.imagen}
                    alt={producto.alt} 
                    width={120}
                    height={120}
                    className={styles.imagenProducto}
                  />
                  <h3>{producto.name}</h3>
                  <p>${producto.price}</p>
                  <Link href={`/detalle/${producto._id}`} className={styles.botonVerMas}>
                    Ver más
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </Layout>
  );
};

export default Productos;
