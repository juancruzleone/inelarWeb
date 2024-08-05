import React from "react";
import Head from "next/head"
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const SobreNosotros = () => {
  return (
    <Layout>
      <Head>
        <title>Quiénes somos | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <h1 className={styles.tituloPaginas} id={styles.quienesSomos}>Quiénes somos</h1>
      <section className={styles.seccion}>
        <div className={styles.contenido}>
          <h2 className={styles.subtitulo}>Nuestra Empresa</h2>
          <p>
            <span>INELAR</span>, una empresa de más de 50 años especializada en
            los Sistemas automatizados de detección y extinción de incendios. Con
            obras públicas y privadas que abarcan las compañías e instituciones
            más importantes en todos los rubros: comunicación, energía, transporte,
            entidades financieras y manufactureras.
          </p>
        </div>
      </section>
      <section className={styles.seccion}>
        <div className={styles.contenido}>
          <h2 className={styles.subtitulo}>Investigación y Desarrollo</h2>
          <p>
            Es una empresa dedicada a la investigación y el desarrollo de nuevos
            productos. A través del entrenamiento de su personal profesional,
            tanto en el país como en el extranjero, y de la representación de
            empresas especializadas de prestigio internacional reconocido, INELAR
            incorpora en forma continua los avances tecnológicos que permiten el
            mejoramiento y abaratamiento de los sistemas automáticos de control.
          </p>
        </div>
      </section>
      <section className={styles.seccion}>
        <div className={styles.contenido}>
          <h2 className={styles.subtitulo}>Compromiso con la Calidad</h2>
          <p>
            Trabajamos bajo la consigna de que todo elemento diseñado para la
            protección de la vida humana debe ser confiable y funcionar
            correctamente cuando sea requerido su uso. Nos encontramos empeñados en
            aumentar nuestra capacidad para producir con calidad. Parte de este
            programa de superación es la obtención de la calificación ISO 9002 que
            garantiza el reconocimiento internacional de nuestros productos.
          </p>
        </div>
      </section>
      <section className={styles.seccion}>
        <div className={styles.contenido}>
          <h2 className={styles.subtitulo}>Servicios Complementarios</h2>
          <p>
            Sabemos que todo producto de seguridad cumple su cometido cuando se
            transforma en un servicio de protección, por lo que complementamos
            nuestro trabajo con programas de entrenamiento para usuarios, y
            realizamos cursos de actualización para profesionales. Entérese de las
            últimas Jornadas. Contamos además con un Departamento Técnico y mesa de
            ayuda para cualquier consulta referida a nuestros productos o a normas y
            requerimientos nacionales o internacionales de seguridad contra incendios.
          </p>
        </div>
      </section>
      <section className={styles.seccion}>
        <div className={styles.contenido}>
          <h2 className={styles.subtitulo}>Tecnología e Innovación</h2>
          <p>
            Podemos exhibir hoy, como resultado de nuestro esfuerzo, una extensa
            gama de productos y servicios de alta calidad que nos han convertido en
            un símbolo de tecnología e innovación, líder en el mercado argentino.
          </p>
        </div>
      </section>
      <section className={styles.seccion}>
        <div className={styles.contenido}>
          <h2 className={styles.subtitulo}>Nuestra Misión</h2>
          <p>
            Protegemos lo más importante utilizando los recursos más modernos de
            la ingeniería y la informática.
          </p>
        </div>
      </section>
      <Footer></Footer>
    </Layout>
  );
};

export default SobreNosotros;
