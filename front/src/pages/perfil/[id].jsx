import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import Modal from 'react-modal';
import styles from "@/styles/Home.module.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = localStorage.getItem("userData");
        if (!userData) {
          router.push("/login");
          return;
        }
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.cuenta._id !== id) {
          router.push("/login");
          return;
        }
        setUser(parsedUserData.cuenta);

        const response = await fetch(`http://localhost:2023/api/orders`);
        const data = await response.json();

        const userOrders = data.filter(order => order.userId === id);
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error al cargar los datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  const handleUpdateProfile = async () => {
    if (!newUserName || newUserName.trim().length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres");
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData.token;

      const response = await fetch(`http://localhost:2023/api/cuenta/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userName: newUserName })
      });

      if (response.ok) {
        setUser(prevUser => ({
          ...prevUser,
          userName: newUserName
        }));

        setShowModal(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <Layout>
        <p>Cargando...</p>
        <Footer />
      </Layout>
    );
  }

  if (!user) return <p>Cargando...</p>;

  return (
    <Layout>
      <div className={styles.contenedorPerfilUsuario}>
        <div className={styles.contenidoPerfilUsuario}>
          <h1>Perfil de {user.userName}</h1>
          <p className={styles.idUsuario}>{user._id}</p>
          <button onClick={() => setShowModal(true)} className={styles.botonEditarPerfil}>Editar Perfil</button>
        </div>
      </div>
      <div className={styles.contenedorPedidoUsuario}>
        <h2>Listado de pedidos realizados</h2>
        <div className={styles.contenidoOrdenes}>
          {orders.length === 0 ? (
            <p>No hay pedidos realizados</p>
          ) : (
            <ul>
              {orders.map(order => (
                <li key={order._id} className={styles.ordenes}>
                  <h3>Orden # {order._id}</h3>
                  <p><span>Total:</span> ${order.total}</p>
                  <p><span>Estado:</span> {order.estado}</p>
                  <p><span>Fecha:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <ul>
                    {order.items.map(item => (
                      <li key={item.nombre}>
                        <div>
                          <p>{item.nombre} - ${item.precio}</p>
                          <p><span>Cantidad:</span> {item.unidades}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Editar Perfil"
        className={styles.ModalEditarPerfil}
      >
        <h2>Editar Perfil</h2>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Escribe nuevo nombre de usuario"
        />
        <div className={styles.contenedorBotonModalEditarPerfil}>
          <button onClick={handleUpdateProfile} className={styles.botonGuardarCambiosPerfil}>Guardar Cambios</button>
          <button onClick={() => setShowModal(false)} className={styles.botonCancelarCambiosPerfil}>Cancelar</button>
        </div>
      </Modal>
      <Footer />
    </Layout>
  );
};

export default Profile;
