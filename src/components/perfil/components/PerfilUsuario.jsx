import styles from '@/styles/Home.module.css';

const PerfilUsuario = ({ user, setShowEditModal }) => {
  // Check if user is null or undefined
  if (!user) {
    return (
      <div className={styles.contenedorPerfilUsuario}>
        <p>Cargando perfil...</p> {/* Loading message */}
      </div>
    );
  }

  return (
    <div className={styles.contenedorPerfilUsuario}>
      <div className={styles.contenidoPerfilUsuario}>
        <h1>Perfil de {user.userName}</h1>
        <p className={styles.idUsuario}>ID: {user._id}</p>

        {user.role !== 'admin' && (
          <p className={styles.emailUsuario}>Email: {user.email}</p>
        )}

        <button onClick={() => setShowEditModal(true)} className={styles.botonEditarPerfil}>
          Editar Perfil
        </button>
      </div>
    </div>
  );
};

export default PerfilUsuario;