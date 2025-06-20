import styles from './AdminOrders.module.scss';

const AdminOrdersPage = () => {
  return (
    <div className={styles['adminWrapper']}>
      <h1>AdminOrders Page</h1>
      <p>This is the admin page where you can manage the application settings.</p>
    </div>
  );
};

export default AdminOrdersPage;
