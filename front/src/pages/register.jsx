import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image"
import Link from "next/link";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import Modal from "react-modal";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import styles from "@/styles/Home.module.css";

Modal.setAppElement("#__next");

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:2023/api/cuenta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error.message === "cuenta ya existe") {
          setError("La cuenta ya existe. Por favor, inicia sesión.");
        } else if (errorData.error.details) {
          setError(errorData.error.details.join(', '));
        } else {
          setError(`Error en la solicitud: ${errorData.error.message}`);
        }
        return;
      }


      const loginResponse = await fetch("http://localhost:2023/api/cuenta/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, password }),
      });

      if (!loginResponse.ok) {
        const loginErrorData = await loginResponse.json();
        setError(`Error en el inicio de sesión: ${loginErrorData.error.message}`);
        return;
      }

      const loginData = await loginResponse.json();
      console.log("Login response data:", loginData);

      localStorage.setItem("userData", JSON.stringify(loginData));

      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        router.push("/");
      }, 2000); 

    } catch (error) {
      setError("Error de red");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout className={styles.app}>
      <Head>
        <title>Registro | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <div className={styles.contenedorPrelogin}>
        <div className={styles.formularioPrelogin}>
          <h1 className={styles.tituloPrelogin}>Regístrate</h1>
          <form onSubmit={handleSubmit} className={styles.formularioLogin}>
            <label htmlFor="usuario" className={styles.formLabel}>
              Usuario
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Crea un usuario nuevo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.inputField}
            />
            <label htmlFor="contraseña" className={styles.formLabel}>
              Contraseña
            </label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="contraseña"
                name="contraseña"
                placeholder="Crea la contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
              />
              <button
                type="button"
                className={styles.botonOjito}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <button type="submit" className={styles.submitButton}>Regístrate</button>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        </div>
      </div>

      <Footer />

      <Modal
        isOpen={showModal}
        className={styles.Modal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Cuenta registrada"
      >
        <h2 className={styles.tituloModal}>Cuenta registrada exitosamente</h2>
        <Image src="/tick.svg" alt="Icono modal exitoso" width={40} height={40} className={styles.tickModal}/>
      </Modal>
    </Layout>
  );
};

export default Register;
