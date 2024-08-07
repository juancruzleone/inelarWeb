import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from 'react-modal';
import styles from "@/styles/Home.module.css";

const Layout = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);

  useEffect(() => {
    const userData = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("userData")) : null;

    if (userData) {
      setIsLoggedIn(true);
      setUserId(userData.cuenta._id); 
      if (userData.cuenta && userData.cuenta.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setLogoutModalIsOpen(true);
    
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000); 
  };

  return (
    <>

      <main>
        <nav className={styles.nav}>
          <Link href="/" className={styles.seccionesNav}>
            Inicio
          </Link>
          <Link href="/quienes-somos" className={styles.seccionesNav}>
            Quiénes somos
          </Link>
          <Link href="/servicios" className={styles.seccionesNav}>
            Servicios
          </Link>
          <Link href="/productos" className={styles.seccionesNav}>
            Productos
          </Link>
          <Link href="/preguntas-frecuentes" className={styles.seccionesNav}>
            Preguntas frecuentes
          </Link>
          <Link href="/certificaciones" className={styles.seccionesNav}>
            Certificaciones
          </Link>
          <Link href="/contacto" className={styles.seccionesNav}>
            Contacto
          </Link>
          {isAdmin && (
            <Link href="/panel" className={styles.seccionesNav}>
              Panel admin
            </Link>
          )}
          {isLoggedIn ? (
            <>
              <Link href={`/perfil/${userId}`} className={styles.sesion} id={styles.sesion}>
                <Image
                  src="/prelogin.svg"
                  alt="Perfil de usuario"
                  className={styles.carrito}
                  width={40}
                  height={40}
                />
              </Link>
              <Link href="/carrito" className={styles.carrito}>
                <Image
                  src="/carrito.svg"
                  alt="Carrito"
                  className={styles.carrito}
                  id={styles.iconoCarrito}
                  width={40}
                  height={40}
                />
              </Link>
              <button onClick={handleLogout} className={`${styles.sesion} ${styles.logoutButton}`} id={styles.cerrarSesion}>
                <Image
                  src="/cerrar-sesion.svg"
                  alt="Cerrar sesión"
                  className={styles.logoutIcon}
                  width={40}
                  height={40}
                />
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.sesion} id={styles.sesion}>
                <Image
                  src="/prelogin.svg"
                  alt="Iniciar sesión"
                  className={styles.carrito}
                  width={40}
                  height={40}
                />
              </Link>
              <Link href="/carrito" className={styles.carrito}>
                <Image
                  src="/carrito.svg"
                  alt="Carrito"
                  className={styles.carrito}
                  id={styles.iconoCarrito}
                  width={40}
                  height={40}
                />
              </Link>
            </>
          )}
        </nav>
        {children}
        <Modal
          isOpen={logoutModalIsOpen}
          className={styles.Modal}
          onRequestClose={() => setLogoutModalIsOpen(false)}
          contentLabel="Sesión cerrada"
        >
          <h2 className={styles.tituloModal}>Sesión cerrada exitosamente</h2>
          <Image src="/tick.svg" alt="Icono modal exitoso" width={40} height={40} className={styles.tickModal}/>
        </Modal>
      </main>
    </>
  );
};

export default Layout;
