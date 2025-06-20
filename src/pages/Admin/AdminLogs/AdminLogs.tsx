import styles from './AdminLogs.module.scss';

const AdminLogsPage = () => {
  return (
    <div className={styles['adminWrapper']}>
      <h1>AdminLogs Page</h1>
      <p>This is the admin page where you can manage the application settings.</p>
    </div>
  );
};

export default AdminLogsPage;
