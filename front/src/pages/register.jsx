import React, { useState } from "react";
import { useRouter } from "next/router";
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

    if (!username && !password) {
      setError("Ingrese ambos campos para registrarse.");
      return;
    }

    if (!username) {
      setError("Por favor, ingresa un nombre de usuario.");
      return;
    }

    if (!password) {
      setError("Por favor, ingresa una contraseña.");
      return;
    }

    if (username.length < 6) {
      setError("El nombre de usuario debe tener al menos 6 caracteres.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

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

      const data = await response.json();
      console.log(data);

      const { token } = data;
      localStorage.setItem("token", token);

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

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Cuenta creada exitosamente"
        className={styles.Modal}
      >
        <p>Cuenta creada exitosamente</p>
        <Link href="/login">Iniciar sesión</Link>
        <button onClick={() => setShowModal(false)}>❌</button>
      </Modal>

      <Footer />
    </Layout>
  );
};

export default Register;
