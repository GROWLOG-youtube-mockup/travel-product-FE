import styles from './Footer.module.scss';

const Footer = () => {
  const fullYear = new Date().getFullYear();

  return <footer className={styles.footer}>{`© ${fullYear} GᖇOᗯᒪOG. All rights reserved.`}</footer>;
};

export default Footer;
