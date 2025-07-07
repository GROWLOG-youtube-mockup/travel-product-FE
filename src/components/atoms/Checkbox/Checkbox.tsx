import React from 'react';

import styles from './Checkbox.module.scss';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, disabled, onChange }) => {
  return (
    <label className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        className={styles.checkboxInput}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <span className={styles.checkmark} />
      {label && <span className={styles.labelText}>{label}</span>}
    </label>
  );
};

export default Checkbox;
