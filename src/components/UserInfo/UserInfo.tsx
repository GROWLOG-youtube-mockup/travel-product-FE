import styles from './UserInfo.module.scss';

interface UserInfoProps {
  name: string;
  phone: string;
  email: string;
}

const UserInfo = ({ name, phone, email }: UserInfoProps) => (
  <div className={styles.userInfoWrapper}>
    <ul className={styles.userInfoList}>
      <li className={styles.userInfoItem}>이름 : {name}</li>
      <li className={styles.userInfoItem}>전화번호 : {phone}</li>
      <li className={styles.userInfoItem}>이메일주소 : {email}</li>
    </ul>
  </div>
);

export default UserInfo;
