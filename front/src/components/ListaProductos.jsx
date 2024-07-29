import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Modal from "react-modal";
import styles from "@/styles/Home.module.css";

Modal.setAppElement("#__next");

const ListaProductos = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", categoria: "", description: "", price: "", imagen: null, alt: "" });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, search, products]);

  const getRoleFromLocalStorage = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log("Role from localStorage:", userData && userData.cuenta ? userData.cuenta.role : null); // Verificar role
    return userData && userData.cuenta ? userData.cuenta.role : null;
  };

  const fetchProducts = async () => {
    setLoading(true);
    const role = getRoleFromLocalStorage();
    try {
      const response = await fetch("http://localhost:2023/api/productos", {
        headers: {
          'Role': role
        }
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }
      setProducts(data);
      const uniqueCategories = Array.from(
        new Set(data.map((product) => product.categoria))
      ).filter(categoria => categoria !== undefined && categoria !== "");
      setCategories(uniqueCategories);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product => product.categoria === selectedCategory);
    }

    if (search) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filteredProducts);
  };

  const handleCreateProduct = () => {
    setCreateModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditModal(true);
  };

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setDeleteModal(true);
  };

  const handleCloseModal = () => {
    setCreateModal(false);
    setEditModal(false);
    setDeleteModal(false);
    setSelectedProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (createModal) {
      const updatedProduct = { ...newProduct, [name]: value };
      if (name === "name") {
        updatedProduct.alt = value;
      }
      setNewProduct(updatedProduct);
    } else if (editModal) {
      setSelectedProduct({ ...selectedProduct, [name]: value });
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const role = getRoleFromLocalStorage();
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('categoria', newProduct.categoria);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
      formData.append('imagen', newProduct.imagen);
      formData.append('alt', newProduct.alt);

      const response = await fetch("http://localhost:2023/api/productos", {
        method: "POST",
        headers: {
          'Role': role
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const createdProduct = await response.json();
      setProducts([...products, createdProduct]);
      handleCloseModal();
      showConfirmation("Producto creado exitosamente");
      fetchProducts();
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const role = getRoleFromLocalStorage();
    try {
      const formData = new FormData();
      formData.append('name', selectedProduct.name);
      formData.append('categoria', selectedProduct.categoria);
      formData.append('description', selectedProduct.description);
      formData.append('price', selectedProduct.price);
      if (selectedProduct.imagen instanceof File) {
        formData.append('imagen', selectedProduct.imagen);
      }

      const response = await fetch(`http://localhost:2023/api/productos/${selectedProduct._id}`, {
        method: "PUT",
        headers: {
          'Role': role
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const updatedProduct = await response.json();
      setProducts(
        products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
      handleCloseModal();
      showConfirmation("Producto editado exitosamente");
      fetchProducts();
    } catch (error) {
      console.error("Error al editar producto:", error);
    }
  };

  const handleDeleteSubmit = async () => {
    const role = getRoleFromLocalStorage();
    try {
      const response = await fetch(`http://localhost:2023/api/productos/${selectedProduct._id}`, {
        method: "DELETE",
        headers: {
          'Role': role
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      setProducts(products.filter(product => product._id !== selectedProduct._id));
      handleCloseModal();
      showConfirmation("Producto eliminado exitosamente");
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const showConfirmation = (message) => {
    setConfirmationMessage(message);
    setConfirmationModal(true);
    setTimeout(() => {
      setConfirmationModal(false);
    }, 3000);
  };

  return (
    <div>
      <div className={styles.contenedorPagina}>
        <h2 className={styles.tituloPaginasPanel}>Productos</h2>
        <button onClick={handleCreateProduct} className={styles.botonCrearModal}>Crear Producto</button>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.buscadorPanel}
          placeholder='Busca el nombre del producto'
        />
        <div className={styles.posicionSeccionProductos}>
          <div className={styles.contenedorCategorias}>
            {categories.map((categoria, index) => (
              <div
                key={index}
                className={`${styles.contenedorCategoria} ${categoria === selectedCategory ? styles.categoriaSeleccionada : ""}`}
                onClick={() => setSelectedCategory(categoria)}
              >
                <p>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</p>
              </div>
            ))}
          </div>
          <div className={styles.contenedorClientes}>
            {loading ? (
              <p>Cargando productos...</p>
            ) : (
              Array.isArray(filteredProducts) && filteredProducts.map((product, index) => (
                <div key={index} className={styles.tarjetaProductoPanelClientes}>
                  <h3>{product.name}</h3>
                  <div>
                    <button onClick={() => handleEditProduct(product)} className={styles.botonEditar}>
                      <Image
                        src="/editar.svg"
                        alt="Editar"
                        className={styles.iconoEditar}
                        width={30}
                        height={30}
                      />
                    </button>
                    <button onClick={() => handleDeleteProduct(product)} className={styles.botonEliminar}>
                      <Image
                        src="/eliminar.svg"
                        alt="Eliminar"
                        className={styles.iconoEliminar}
                        width={30}
                        height={30}
                      />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={createModal}
        onRequestClose={handleCloseModal}
        contentLabel="Crear Producto"
        className={`${styles.ModalPanel} ${styles.Modal}`}
        closeTimeoutMS={500}
      >
        <h2>Crear Producto</h2>
        <form onSubmit={handleCreateSubmit} className={styles.formularioPanel}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            value={newProduct.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((categoria, index) => (
              <option key={index} value={categoria}>{categoria}</option>
            ))}
          </select>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            required
          />
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={(e) => setNewProduct({ ...newProduct, imagen: e.target.files[0] })}
            required
          />
          <button type="submit">Crear</button>
        </form>
      </Modal>

      <Modal
        isOpen={editModal}
        onRequestClose={handleCloseModal}
        contentLabel="Editar Producto"
        className={`${styles.ModalPanel} ${styles.Modal}`}
        closeTimeoutMS={500}
      >
        <h2>Editar Producto</h2>
        <form onSubmit={handleEditSubmit} className={styles.formularioPanel}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={selectedProduct?.name || ""}
            onChange={handleChange}
            required
          />
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            value={selectedProduct?.categoria || ""}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((categoria, index) => (
              <option key={index} value={categoria}>{categoria}</option>
            ))}
          </select>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={selectedProduct?.description || ""}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={selectedProduct?.price || ""}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">Imagen actual:</label>
          {selectedProduct?.imagen && (
            <div>
              <Image
                src={
                  selectedProduct.imagen instanceof File
                    ? URL.createObjectURL(selectedProduct.imagen)
                    : selectedProduct.imagen
                }
                alt={selectedProduct.alt}
                className={styles.imagenProductoEditar}
                width={80}
                height={50}
              />
            </div>
          )}
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={(e) => setSelectedProduct({ ...selectedProduct, imagen: e.target.files[0] })}
          />
          <button type="submit">Guardar</button>
        </form>
      </Modal>

      <Modal
        isOpen={deleteModal}
        onRequestClose={handleCloseModal}
        contentLabel="Eliminar Producto"
        className={`${styles.ModalPanelEditar} ${styles.Modal}`}
        closeTimeoutMS={500}
      >
        <h2>Eliminar Producto</h2>
        <p>¿Estás seguro de que deseas eliminar a <span>{selectedProduct?.name}</span>?</p>
        <div className={styles.contenedorBotonesEditar}>
          <button onClick={handleDeleteSubmit} className={styles.botonEliminarProducto}>Eliminar</button>
          <button onClick={handleCloseModal} className={styles.botonCancelarModal}>Cancelar</button>
        </div>
      </Modal>

      <Modal
        isOpen={confirmationModal}
        contentLabel="Confirmación"
        className={`${styles.ModalConfirmacion} ${styles.Modal}`}
        closeTimeoutMS={500}
      >
        <p>{confirmationMessage}</p>
      </Modal>
    </div>
  );
};

export default ListaProductos;
