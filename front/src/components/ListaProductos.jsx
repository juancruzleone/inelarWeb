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
  const [newProduct, setNewProduct] = useState({ name: "", category: "", description: "", price: "", image: null });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, search, products]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:2023/api/productos");
      const data = await response.json();
      setProducts(data);
      const uniqueCategories = Array.from(
        new Set(data.map((product) => product.categoria))
      ).filter(category => category !== undefined && category !== "");
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
      setNewProduct({ ...newProduct, [name]: value });
    } else if (editModal) {
      setSelectedProduct({ ...selectedProduct, [name]: value });
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('category', newProduct.category);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
      formData.append('image', newProduct.image);

      const response = await fetch("http://localhost:2023/api/productos", {
        method: "POST",
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
    try {
      const formData = new FormData();
      formData.append('name', selectedProduct.name);
      formData.append('category', selectedProduct.category);
      formData.append('description', selectedProduct.description);
      formData.append('price', selectedProduct.price);
      if (selectedProduct.image instanceof File) {
        formData.append('image', selectedProduct.image);
      }

      const response = await fetch(`http://localhost:2023/api/productos/${selectedProduct._id}`, {
        method: "PUT",
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
    try {
      const response = await fetch(`http://localhost:2023/api/productos/${selectedProduct._id}`, {
        method: "DELETE",
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
            {categories.map((category, index) => (
              <div
                key={index}
                className={`${styles.contenedorCategoria} ${category === selectedCategory ? styles.categoriaSeleccionada : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                <p>{category.charAt(0).toUpperCase() + category.slice(1)}</p>
              </div>
            ))}
          </div>
          <div className={styles.contenedorClientes}>
            {loading ? (
              <p>Cargando productos...</p>
            ) : (
              filteredProducts.map((product, index) => (
                <div key={index} className={styles.tarjetaProductoPanelClientes}>
                  <h3>{product.name}</h3>
                  <div>
                    <button onClick={() => handleEditProduct(product)} className={styles.botonEditar}>
                      <Image src="/editar.svg" alt="Editar" width={10} height={10} />
                    </button>
                    <button onClick={() => handleDeleteProduct(product)} className={styles.botonEliminar}>
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
          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            required
          />
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">Imagen:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
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
          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            name="category"
            value={selectedProduct?.category || ""}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={selectedProduct?.description || ""}
            onChange={handleChange}
            required
          />
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={selectedProduct?.price || ""}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">Imagen:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => setSelectedProduct({ ...selectedProduct, image: e.target.files[0] })}
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
