import styles from './AdminSidebar.module.scss';

const AdminSidebar = () => {
  const sidebarItems = [
    { name: '상품 관리', icon: '📦' },
    { name: '주문 관리', icon: '📋' },
    { name: '회원 관리', icon: '👤' },
    { name: '관리자 계정 관리', icon: '🔑' },
    { name: '운영 로그', icon: '📝' }
  ];

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.sidebar__nav}>
        <ul className={styles.sidebar__list}>
          {sidebarItems.map((item) => (
            <li className={styles.sidebar__item} key={item.name}>
              {/* <Link to="/admin/dashboard" className={styles.sidebar__link}> */}
              <span className={styles.sidebar__icon}>{item.icon}</span>
              {item.name}
              {/* </Link> */}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
