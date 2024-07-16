import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Ingrese ambos campos para iniciar sesión.");
      return;
    }

    try {
      const response = await fetch("http://localhost:2023/api/cuenta/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (errorData.error.message === "Validation error") {
          setError("Usuario o contraseña incorrectos.");
        } else {
          setError(`Error en la solicitud: ${errorData.error.message}`);
        }

        return;
      }

      const data = await response.json();
      console.log("Login response data:", data);

      localStorage.setItem("userData", JSON.stringify(data));

      if (data.cuenta.role === "admin") {
        router.push("/");
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("Error de red");
    }
  };

  return (
    <Layout className={styles.app}>
      <Head>
        <title>Inicio sesión | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.contenedorPrelogin}>
        <div className={styles.formularioPrelogin}>
          <h1 className={styles.tituloPrelogin}>Inicia sesión</h1>
          <form onSubmit={handleSubmit} className={styles.formularioLogin}>
            <label htmlFor="usuario" className={styles.formLabel}>
              Usuario
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="contraseña" className={styles.formLabel}>
              Contraseña
            </label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className={styles.submitButton}>
              Iniciar sesión
            </button>
            {error && <p className={styles.error}>{error}</p>}
            <p>
              Si no tienes una cuenta,{" "}
              <Link href="/register" className={styles.registroLogin}>
                regístrate
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Login;
