import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const ListaServicios = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:2023/api/servicios");
        const data = await response.json();

        setServices(data);

        const uniqueCategories = Array.from(
          new Set(data.map((service) => service.category || "Sin Categoría"))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error al obtener servicios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const filtered = services.filter(service => {
      const matchesCategory = selectedCategory === null || service.category === selectedCategory;
      const matchesSearch = 
        service.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
        service.direccion.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredServices(filtered);
  }, [selectedCategory, services, searchTerm]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <h2 className={styles.tituloPaginasPanel}>Servicios</h2>
      <input
        type="text"
        placeholder="Buscar servicio por nombre o dirección..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.buscadorPanel} 
      />
      <div className={styles.posicionSeccionProductos}>
        <div className={styles.contenedorCategorias}>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${styles.contenedorCategoria} ${
                category === selectedCategory ? styles.categoriaSeleccionada : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <p>{capitalizeFirstLetter(category)}</p>
            </div>
          ))}
        </div>

        <div className={styles.contenedorServicios}>
          {loading ? (
            <p>Cargando servicios...</p>
          ) : filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <div key={index} className={styles.tarjetaProductoPanel}>
                <h3>Cliente: {service.nombre}</h3>
                <div className={styles.contenidoTarjetaProductoPanel}>
                  <p><span>Email:</span> {service.email}</p>
                  <p><span>Teléfono:</span> {service.telefono}</p>
                  <p><span>Dirección:</span> {service.direccion}</p>
                  <p><span>Dispositivo:</span> {service.dispositivo}</p>
                  <p><span>Cantidad:</span> {service.cantidad}</p>
                  <p><span>Fecha:</span> {service.fecha}</p>
                  <p><span>Categoría:</span> {service.category}</p>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.textoBuscadorPanel}>No se encontraron servicios que coincidan con tu búsqueda.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ListaServicios;