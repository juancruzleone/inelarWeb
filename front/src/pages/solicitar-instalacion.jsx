import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";
import Modal from "react-modal";

const SolicitarInstalaciones = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    dispositivo: "",
    fecha: "",
    cantidad: "", 
    category: "instalaciones", 
  });

  const [productos, setProductos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch("http://localhost:2023/api/productos");
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        direccion: formData.direccion,
        dispositivo: formData.dispositivo,
        fecha: formData.fecha,
        cantidad: formData.cantidad, 
        category: formData.category,
      };

      const res = await fetch("http://localhost:2023/api/servicios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (res.ok) {
        setModalIsOpen(true);
        setTimeout(() => {
          setModalIsOpen(false);
        }, 1000);
      } else {
        const errorData = await res.json();
        alert(`Ocurrió un error al enviar la solicitud: ${errorData.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al enviar la solicitud");
    }
  };

  return (
    <Layout>
      <Head>
        <title>Solicitar instalación | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <h1 className={styles.tituloSolicitudServicio}>Solicitar instalación</h1>
      <div className={styles.contenedorContenidoServicio}>
        <p className={styles.textoSolicitudServicios}>
          Si quieres solicitar nuestro servicio de instalación de dispositivos,
          por favor completa el siguiente formulario con tus datos y los detalles de tu solicitud. Nos pondremos en contacto contigo lo antes posible
          para confirmar la fecha y el precio.
        </p>
        <form onSubmit={handleSubmit} className={styles.formulario}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
          <label htmlFor="dispositivo">Dispositivo:</label>
          <select
            id="dispositivo"
            name="dispositivo"
            value={formData.dispositivo}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una opción</option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.name}>
                {producto.name}
              </option>
            ))}
          </select>
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            required
            min="1" 
          />
          <label htmlFor="fecha">Fecha deseada:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.botonSolicitudServicio}>
            Enviar solicitud
          </button>
        </form>
      </div>
      <Footer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className={styles.Modal}
        contentLabel="Solicitud Enviada"
      >
        <h2>Solicitud enviada con éxito</h2>
      </Modal>
    </Layout>
  );
};

export default SolicitarInstalaciones;
