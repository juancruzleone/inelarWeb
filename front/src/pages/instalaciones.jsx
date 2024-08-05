import React from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const Instalaciones = () => {
  return (
    <Layout className={styles.app}>
      <Head>
        <title>Instalaciones | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <h1 className={styles.tituloServicio}>Instalaciones</h1>
      <div className={styles.contenedorPosicionamientoContenidoServicio}>
        <div className={styles.contenedorTextoServicio}>
          <p className={styles.textoServicios}>En Inelar, comprendemos la importancia de la implementación de dispositivos de manera eficiente y efectiva. Nuestro equipo especializado está dedicado a garantizar que tus dispositivos se instalen de manera óptima y funcionen sin problemas desde el primer momento.</p><br />
          <p className={styles.textoServicios}>Ya sea que necesites implementar una nueva infraestructura tecnológica o desees mejorar la configuración de dispositivos existentes, estamos aquí para ayudarte. Nuestras instalaciones de dispositivos están diseñadas para garantizar que tu tecnología funcione a la perfección.</p>
          <p className={styles.textoServicios}>Nos encargamos de todo el proceso de instalación, desde la evaluación de tus necesidades hasta la configuración y puesta en marcha de los dispositivos. Además, utilizamos equipos de alta calidad y tecnología de vanguardia para garantizar la máxima eficiencia y durabilidad.</p>
        </div>
        <Image
          src="/servicio-instalaciones-imagen.webp"
          alt="Imagen servicio instalaciones"
          className={styles.fotoServicio}
          width={300}
          height={300}
        />
      </div>
      <Link href="/solicitar-instalacion" className={styles.botonServicio}>Solicitar instalación</Link>
      <Footer></Footer>
    </Layout>
  );
};

export default Instalaciones;