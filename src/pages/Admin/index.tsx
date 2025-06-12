import styles from './Admin.module.scss';

const AdminPage = () => {
  return (
    <div className={styles['admin-page']}>
      <h1>Admin Page</h1>
      <p>This is the admin page where you can manage the application settings.</p>
    </div>
  );
};

export default AdminPage;
