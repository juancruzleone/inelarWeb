import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head'
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";

const Custom404 = () => {
    return(
        <Layout>
            <Head>
                <title>Error 404 | Inelar</title>
                <meta name="description" content="Descripción de mi aplicación" />
                <link rel="icon" href="/inelar.ico" />
            </Head>
            <section className='contenedor404'>
                <h1 className='titulo404'>Código 404</h1>
                <p className='texto404'>Página no encontrada</p>
                <div className='contenedorImg404'>
                    <Image src='/manguera.svg' alt="Icono de manguera" width={100} height={100}/>
                </div> 
                <Link href="/" className='boton-404'>Ir al inicio</Link>
            </section>
            <Footer />
        </Layout>
    )
}

export default Custom404