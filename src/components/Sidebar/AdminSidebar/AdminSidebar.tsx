import { NavLink, useLocation } from 'react-router-dom';

import styles from './AdminSidebar.module.scss';

const sidebarItems = [
  { name: '상품 관리', icon: '📦', path: '/admin/products' },
  { name: '주문 관리', icon: '📋', path: '/admin/orders' },
  { name: '회원 관리', icon: '👤', path: '/admin/users' },
  { name: '관리자 계정 관리', icon: '🔑', path: '/admin/admins' },
  { name: '운영 로그', icon: '📝', path: '/admin/logs' }
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          {sidebarItems.map((item) => (
            <li
              key={item.name}
              className={[
                styles.item,
                location.pathname.startsWith(item.path) ? styles.selected : ''
              ].join(' ')}
            >
              <NavLink
                to={item.path}
                className={styles.link}
                aria-current={location.pathname.startsWith(item.path) ? 'page' : undefined}
                tabIndex={0}
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
