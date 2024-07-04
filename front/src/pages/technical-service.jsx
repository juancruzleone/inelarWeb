import React from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const ServicioTecnico = () => {
  return (
    <Layout>
      <h1 className={styles.tituloServicio}>Servicio técnico</h1>
      <div className={styles.contenedorPosicionamientoContenidoServicio}>
        <div className={styles.contenedorTextoServicio}>
          <p className={styles.textoServicios}>En Inelar, estamos comprometidos a brindar un servicio técnico excepcional. Nuestro equipo de soporte está disponible para atender tus necesidades tecnológicas en cualquier momento que surja un problema. Ya sea un pequeño contratiempo o una pregunta importante, estamos aquí para ayudarte.</p><br />
          <p className={styles.textoServicios}>Nos enorgullece ofrecer un servicio de atención al cliente personalizado y profesional. Nuestros técnicos están altamente capacitados y comprometidos a ofrecer soluciones prácticas y efectivas a cualquier problema técnico que puedas tener.</p><br />
          <p className={styles.textoServicios}>Además, ponemos a tu disposición una línea telefónica y una plataforma de asistencia en línea para garantizar una respuesta rápida y efectiva ante cualquier inconveniente técnico. Nuestro objetivo es siempre mantener tus operaciones en línea y sin contratiempos.</p>
        </div>
        <Image
          src="/servicio-tecnico-servicio.jpeg"
          alt="Imagen servicio técnico"
          className={styles.fotoServicio}
          width={300}
          height={300}
        />     
      </div>
      <Link href="/solicitar-servicio-tecnico" className={styles.botonServicio}>Solicitar servicio técnico</Link>
      <Footer></Footer>
    </Layout>
  );
};

export default ServicioTecnico;