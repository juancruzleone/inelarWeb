import React from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const Mantenimiento = () => {
  return (
    <Layout className={styles.app}>
      <Head>
        <title>Mantenimiento | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.tituloServicio}>Mantenimientos</h1>
      <div className={styles.contenedorPosicionamientoContenidoServicio}>
        <div className={styles.contenedorTextoServicio}>
          <p className={styles.textoServicios}>Inelar presta servicios de mantenimientos a todos los clientes que lo deseen. Contamos con equipo de última tecnología para llevar a cabo los mantenimientos y un equipo de técnicos especializados para su realización.</p><br />
          <p className={styles.textoServicios}>Además, ofrecemos a nuestros clientes una aplicación para llevar un registro de los mantenimientos realizados y arreglar posibles fallas de los dispositivos en caso de que no puedan contactar con un técnico. Así, mantenemos un control exhaustivo de los dispositivos y garantizamos su buen estado funcionamiento.</p><br />
          <div className={styles.contenedorControlMantenimiento}>
            <h2 className={styles.subtituloMantenimiento}>Control de mantenimientos</h2>
            <p className={styles.textoServicios}>Realizamos los mantenimientos de forma periódica, siguiendo un calendario establecido y adaptado a las necesidades de cada dispositivo. Una vez se realiza el mantenimiento, se registra en nuestra aplicación y se informa al cliente del estado del dispositivo.</p>
            <p className={styles.textoServicios}>Además, realizamos un seguimiento de los dispositivos y sus elementos de forma individual, de modo que podamos anticipar posibles problemas y evitar averías mayores en el futuro.</p>
          </div>
        </div>
        <Image
          src="/mantenimiento servicio.webp"
          alt="Imagen servicio mantenimiento"
          className={styles.fotoServicio}
          width={300}
          height={300}
        />
      </div>
      <Link href="/solicitar-mantenimiento" className={styles.botonServicio}>Solicitar mantenimiento</Link>
      <Footer></Footer>
    </Layout>
  );
};

export default Mantenimiento;