import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";

const ListaMensajes = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:2023/api/contactos");
        const data = await response.json();

        setMessages(data);
        setFilteredMessages(data); 
      } catch (error) {
        console.error("Error al obtener mensajes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    const filtered = messages.filter(message => 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      message.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMessages(filtered);
  }, [searchTerm, messages]);

  return (
    <div className={styles.app}>
      <div className={styles.contenedorPagina}>
        <h2 className={styles.tituloPaginasPanel}>Mensajes de contacto</h2>
        <input
          type="text"
          placeholder="Buscar mensaje por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.buscadorPanel} 
        />
        <div className={styles.posicionSeccionProductos}>
          <div className={styles.contenedorProductosPanel}>
            {loading ? (
              <p>Cargando mensajes...</p>
            ) : filteredMessages.length > 0 ? (
              filteredMessages.map((message, index) => (
                <div key={index} className={styles.tarjetaProductoPanel}>
                  <h3>{message.name}</h3>
                  <div className={styles.contenidoTarjetaProductoPanelContacto}>
                    <p><span>Email:</span> {message.email}</p>
                    <p><span>Mensaje:</span> {message.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.textoBuscadorPanelMensajes}>No se encontraron mensajes que coincidan con tu búsqueda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaMensajes;