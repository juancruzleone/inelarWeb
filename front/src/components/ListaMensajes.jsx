import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";

const ListaMensajes = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:2023/api/contactos");
        const data = await response.json();

        setMessages(data);
      } catch (error) {
        console.error("Error al obtener mensajes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.contenedorPagina}>
        <h2 className={styles.tituloPaginasPanel}>Mensajes</h2>
        <div className={styles.posicionSeccionProductos}>
          <div className={styles.contenedorProductosPanel}>
            {loading ? (
              <p>Cargando mensajes...</p>
            ) : (
              messages.map((message, index) => (
                <div key={index} className={styles.tarjetaProductoPanel}>
                  <h3>{message.name}</h3>
                  <div className={styles.contenidoTarjetaProductoPanelContacto}>
                    <p><span>Email:</span> {message.email}</p>
                    <p><span>Mensaje:</span> {message.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaMensajes;
