import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Modal from "react-modal";
import styles from "@/styles/Home.module.css";

Modal.setAppElement("#__next");

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [nuevoCliente, setNuevoCliente] = useState({ name: "", category: "" });
  const [buscar, setBuscar] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    obtenerClientes();
  }, []);

  useEffect(() => {
    filtrarClientes();
  }, [categoriaSeleccionada, buscar, clientes]);

  const obtenerClientes = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:2023/api/clientes");
      const data = await response.json();

      setClientes(data);

      const categoriasUnicas = Array.from(
        new Set(data.map((cliente) => cliente.category))
      ).filter(categoria => categoria !== undefined && categoria !== "");
      setCategorias(categoriasUnicas);
      
      setClientesFiltrados(data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtrarClientes = () => {
    let clientesFiltrados = clientes;

    if (categoriaSeleccionada) {
      clientesFiltrados = clientesFiltrados.filter(cliente => cliente.category === categoriaSeleccionada);
    }

    if (buscar) {
      clientesFiltrados = clientesFiltrados.filter(cliente =>
        cliente.name.toLowerCase().includes(buscar.toLowerCase())
      );
    }

    setClientesFiltrados(clientesFiltrados);
  };

  const handleCrearCliente = () => {
    setModalCrear(true);
  };

  const handleEditarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    setModalEditar(true);
  };

  const handleEliminarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    setModalEliminar(true);
  };

  const handleCerrarModal = () => {
    setModalCrear(false);
    setModalEditar(false);
    setModalEliminar(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (modalCrear) {
      setNuevoCliente({ ...nuevoCliente, [name]: value });
    } else if (modalEditar) {
      setClienteSeleccionado({ ...clienteSeleccionado, [name]: value });
    }
  };

  const handleSubmitCrear = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2023/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoCliente),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const createdCliente = await response.json();
      setClientes([...clientes, createdCliente]);
      handleCerrarModal();
      mostrarConfirmacion("Cliente creado exitosamente");
      obtenerClientes(); 
    } catch (error) {
      console.error("Error al crear cliente:", error);
    }
  };

  const handleSubmitEditar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:2023/api/clientes/${clienteSeleccionado._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteSeleccionado),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      handleCerrarModal();
      mostrarConfirmacion("Cliente editado exitosamente");
      obtenerClientes(); 
    } catch (error) {
      console.error("Error al editar cliente:", error);
    }
  };

  const handleSubmitEliminar = async () => {
    try {
      const response = await fetch(`http://localhost:2023/api/clientes/${clienteSeleccionado._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      handleCerrarModal();
      mostrarConfirmacion("Cliente eliminado exitosamente");
      obtenerClientes(); 
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

  const mostrarConfirmacion = (mensaje) => {
    setMensajeConfirmacion(mensaje);
    setModalConfirmacion(true);
    setTimeout(() => {
      setModalConfirmacion(false);
    }, 1000);
  };

  return (
    <div>
      <div className={styles.contenedorPagina}>
        <h2 className={styles.tituloPaginasPanel}>Clientes</h2>
        <button onClick={handleCrearCliente} className={styles.botonCrearModal}>Crear cliente</button>
        <input
          type="text"
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          className={styles.buscadorPanel}
          placeholder='Busca el nombre del cliente'
        />
        <div className={styles.posicionSeccionProductos}>
          <div className={styles.contenedorCategorias}>
            {categorias.map((categoria, index) => (
              <div
                key={index}
                className={`${styles.contenedorCategoria} ${
                  categoria === categoriaSeleccionada
                    ? styles.categoriaSeleccionada
                    : ""
                }`}
                onClick={() => setCategoriaSeleccionada(categoria)}
              >
                <p>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</p>
              </div>
            ))}
          </div>

          <div className={styles.contenedorClientes}>
            {loading ? (
              <p>Cargando clientes...</p>
            ) : (
              clientesFiltrados.map((cliente, index) => (
                <div key={index} className={styles.tarjetaProductoPanelClientes}>
                  <h3>{cliente.name}</h3>
                  <div className={styles.contenedorBotonesClientes}>
                    <button onClick={() => handleEditarCliente(cliente)} className={styles.botonEditar}>
                      <Image src="/editar.svg" alt="Editar" width={10} height={10} />
                    </button>
                    <button onClick={() => handleEliminarCliente(cliente)} className={styles.botonEliminar}>
                      <Image src="/eliminar.svg" alt="Eliminar" width={10} height={10} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalCrear}
        onRequestClose={handleCerrarModal}
        contentLabel="Crear Cliente"
        className={`${styles.ModalPanelClientes} ${styles.Modal}`}
        closeTimeoutMS={1000}
      >
        <h2>Crear Cliente</h2>
        <form onSubmit={handleSubmitCrear} className={styles.formularioPanel}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={nuevoCliente.name}
            onChange={handleChange}
          />
          <label htmlFor="category">Categoría:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={nuevoCliente.category}
            onChange={handleChange}
          />
          <button type="submit">Crear</button>
        </form>
      </Modal>

      <Modal
        isOpen={modalEditar}
        onRequestClose={handleCerrarModal}
        contentLabel="Editar Cliente"
        className={`${styles.ModalPanelClientes} ${styles.Modal}`}
        closeTimeoutMS={1000}
      >
        <h2>Editar Cliente</h2>
        {clienteSeleccionado && (
          <form onSubmit={handleSubmitEditar} className={styles.formularioPanel}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={clienteSeleccionado.name}
              onChange={handleChange}
            />
            <label htmlFor="category">Categoría:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={clienteSeleccionado.category}
              onChange={handleChange}
            />
            <button type="submit">Guardar</button>
          </form>
        )}
      </Modal>

      <Modal
        isOpen={modalEliminar}
        onRequestClose={handleCerrarModal}
        contentLabel="Eliminar Cliente"
        className={`${styles.ModalPanelEditar} ${styles.Modal}`}
        closeTimeoutMS={1000}
      >
        <h2>Eliminar Cliente</h2>
        {clienteSeleccionado && (
          <div className={styles.contenidoPanelEditar}>
            <p>¿Estás seguro de que deseas eliminar a <span>{clienteSeleccionado.name}</span>?</p>
            <div className={styles.contenedorBotonesEditar}>
              <button onClick={handleSubmitEliminar} className={styles.botonEliminarProducto}>Eliminar</button>
              <button onClick={handleCerrarModal} className={styles.botonCancelarModal}>Cancelar</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={modalConfirmacion}
        contentLabel="Confirmación"
        className={`${styles.ModalConfirmacion} ${styles.Modal}`}
        closeTimeoutMS={1000}
      >
        <h2>{mensajeConfirmacion}</h2>
      </Modal>
    </div>
  );
};

export default ListaClientes;
