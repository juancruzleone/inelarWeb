import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Modal from "react-modal";
import Link from "next/link";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";
import { FiEye, FiEyeOff } from 'react-icons/fi';

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

      // Automatic login after successful registration
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

      router.push("/");

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
        <link rel="icon" href="/favicon.ico" />
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
    </Layout>
  );
};

export default Register;
