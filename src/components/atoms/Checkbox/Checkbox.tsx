import styles from './Checkbox.module.scss';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <label className={styles.checkboxWrapper}>
      <input type="checkbox" className={styles.checkboxInput} {...props} />
      <span className={styles.checkmark} />
      {label && <span className={styles.labelText}>{label}</span>}
    </label>
  );
};

export default Checkbox;
