import styles from './AdminProducts.module.scss';

const AdminProductsPage = () => {
  return (
    <div className={styles['adminWrapper']}>
      <h1>AdminProducts Page</h1>
      <p>This is the admin page where you can manage the application settings.</p>
    </div>
  );
};

export default AdminProductsPage;
