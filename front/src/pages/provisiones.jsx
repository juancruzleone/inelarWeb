import React from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const Provisiones = () => {
  return (
    <Layout>
      <Head>
        <title>Provisiones | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.tituloServicio}>Provisiones</h1>
      <div className={styles.contenedorPosicionamientoContenidoServicio}>
        <div className={styles.contenedorTextoServicio}>
          <p className={styles.textoServicios}>En Inelar, sabemos que el éxito de cualquier proyecto depende de los recursos adecuados. Ofrecemos provisiones tecnológicas de primera calidad para garantizar que tengas todo lo que necesitas para llevar a cabo tu proyecto con éxito.</p><br />
          <p className={styles.textoServicios}>Ya sea en hardware o software, en Inelar contamos con una amplia gama de recursos y herramientas para tus proyectos tecnológicos. Desde soluciones personalizadas de software hasta hardware de última generación, trabajamos con nuestros clientes para entender sus necesidades y proporcionar soluciones que se ajusten exactamente a lo que necesitan.</p><br />
          <p className={styles.textoServicios}>Accede a nuestro amplio catálogo de provisiones tecnológicas y cuéntanos qué necesitas. Nuestro equipo de expertos te ayudará a elegir la mejor opción según tus necesidades y te proporcionará todas las herramientas que necesitas para llevar a cabo tu proyecto.</p>
        </div>
        <Image
          src="/servicio-provisiones-.webp"
          alt="Imagen servicio provisiones"
          className={styles.fotoServicio}
          width={300}
          height={300}
        />     
      </div>
      <Link href="/solicitar-provisiones" className={styles.botonServicio}>Solicitar provisiones</Link>
      <Footer></Footer>
    </Layout>
  );
};

export default Provisiones;