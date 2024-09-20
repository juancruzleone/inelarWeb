import React from "react";
import styles from "@/styles/Home.module.css";

const FormularioCrear = ({ 
  newDevice, 
  errors, 
  handleSubmit, 
  onClose,
  handleInputChange
}) => {
  return (
    <form onSubmit={handleSubmit} className={styles.formularioPanel}>
      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        value={newDevice.nombre}
        onChange={handleInputChange}
        placeholder="Escribe el nombre del dispositivo"
      />
      {errors.nombre && <p className={styles.error}>{errors.nombre}</p>}
      <label htmlFor="ubicacion">Ubicación:</label>
      <input
        type="text"
        id="ubicacion"
        name="ubicacion"
        value={newDevice.ubicacion}
        onChange={handleInputChange}
        placeholder="Escribe la ubicación del dispositivo"
      />
      {errors.ubicacion && <p className={styles.error}>{errors.ubicacion}</p>}
      <label htmlFor="estado">Estado:</label>
      <select
        id="estado"
        name="estado"
        value={newDevice.estado}
        onChange={handleInputChange}
      >
        <option value="">Seleccione un estado</option>
        <option value="si">si</option>
        <option value="no">no</option>
      </select>
      {errors.estado && <p className={styles.error}>{errors.estado}</p>}
      <div className={styles.contenedorBotonesEditar}>
        <button type="submit" className={styles.botonGuardar}>
          Crear
        </button>
        <button type="button" onClick={onClose} className={styles.botonCancelarModal}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormularioCrear;