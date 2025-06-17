import styles from './AdminUsers.module.scss';

const AdminUsersPage = () => {
  return (
    <div className={styles['adminWrapper']}>
      <h1>AdminUsers Page</h1>
      <p>This is the admin page where you can manage the application settings.</p>
    </div>
  );
};

export default AdminUsersPage;
