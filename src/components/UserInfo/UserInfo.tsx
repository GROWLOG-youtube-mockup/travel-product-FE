import styles from './UserInfo.module.scss';

interface UserInfoProps {
  name: string;
  phone: string;
  email: string;
}

const UserInfo = ({ name, phone, email }: UserInfoProps) => (
  <div className={styles.userInfoWrapper}>
    <div>이름 : {name}</div>
    <div>전화번호 : {phone}</div>
    <div>이메일주소 : {email}</div>
  </div>
);

export default UserInfo;
