import React from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const Servicios = () => {
  return (
    <Layout>
      <Head>
        <title>Servicios | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.tituloPaginas}>Servicios</h1>
      <h2 className={styles.subtituloServicio}>
        Los servicios se brindan en toda la Argentina
      </h2>
      <div className={styles.contenedorCardServicios}>
        <div className={styles.cardServicios}>
          <Link href="/instalaciones">
            <Image
              src="/instalaciones.svg"
              alt="icono instalaciones"
              className={styles.iconoServiciosCard}
              width={140}
              height={140}
            />
          </Link>
          <h3 className={styles.tituloCardServicio}>Instalaciones</h3>
          <p className={styles.descripcionServicio}></p>
          <Link href="/instalaciones" className={styles.botonCardServicio}>
            Ver más
          </Link>
        </div>
        <div className={styles.cardServicios}>
          <Link href="/mantenimientos">
            <Image
              src="/mantenimiento.svg"
              alt="icono mantenimiento"
              className={styles.iconoServiciosCard}
              width={140}
              height={140}
            />
          </Link>
          <h3 className={styles.tituloCardServicio}>Mantenimientos</h3>
          <p className={styles.descripcionServicio}></p>
          <Link href="/mantenimientos" className={styles.botonCardServicio}>
            Ver más
          </Link>
        </div>
        <div className={styles.cardServicios}>
          <Link href="/serviciotecnico">
            <Image
              src="/servicio-tecnico.svg"
              alt="icono servicio técnico"
              className={styles.iconoServiciosCard}
              width={140}
              height={140}
            />
          </Link>
          <h3 className={styles.tituloCardServicio}>Servicio técnico</h3>
          <p className={styles.descripcionServicio}></p>
          <Link href="/serviciotecnico" className={styles.botonCardServicio}>
            Ver más
          </Link>
        </div>
        <div className={styles.cardServicios}>
          <Link href="/provisiones">
            <Image
              src="/provisiones.svg"
              alt="icono provisiones"
              className={styles.iconoServiciosCard}
              width={140}
              height={140}
            />
          </Link>
          <h3 className={styles.tituloCardServicio}>Provisiones</h3>
          <p className={styles.descripcionServicio}></p>
          <Link href="/provisiones" className={styles.botonCardServicio}>
            Ver más
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </Layout>
  );
};

export default Servicios;
