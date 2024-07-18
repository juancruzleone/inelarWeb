import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import Modal from "react-modal";
import styles from "@/styles/Home.module.css";

Modal.setAppElement("#__next");

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:2023/api/contactos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const newFormErrors = {};
        errorData.errors.forEach((err) => {
          newFormErrors[err.field] = err.message;
        });
        setFormErrors(newFormErrors);
        return;
      }

      setModalIsOpen(true);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setFormErrors({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setModalIsOpen(false);
      }, 1000); // Cerrar modal después de 1 segundo
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      alert("Ocurrió un error al enviar el mensaje. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <Layout className={styles.app}>
      <Head>
        <title>Contacto | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.tituloPaginas}>Contacto</h1>
      <div className={styles.posicionContacto}>
        <div className={styles.contenedorMapa}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.18615416173108!2d-58.476913098561596!3d-34.569650433418985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb73dfb2108cd%3A0x60a2394907b54ab7!2sINELAR%20SRL!5e0!3m2!1ses!2us!4v1717682610340!5m2!1ses!2us"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className={styles.contenedorFormulario}>
          <form className={styles.formularioContacto} onSubmit={handleSubmit}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Escribe tu nombre"
            />
            <span className="error">{formErrors.name}</span>
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Escribe tu correo electrónico"
            />
            <span className="error">{formErrors.email}</span>
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Escribe un mensaje"
            />
            <span className="error">{formErrors.message}</span>
            <button type="submit" id="boton-contacto" className={styles.botonContacto}>
              Enviar
            </button>
          </form>
        </div>
      </div>
      <Footer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Mensaje Enviado"
        className={styles.Modal}
        overlayClassName={styles.modalOverlay}
      >
        <h2>Mensaje enviado correctamente</h2>
      </Modal>
    </Layout>
  );
};

export default Contacto;
