import React from 'react';

import PasswordInput from './PasswordInput';

interface PasswordInputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  validate?: (value: string) => string | undefined;
  label?: string;
  [key: string]: unknown;
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  value,
  onChange,
  error,
  validate,
  label,
  ...rest
}) => {
  const [touched, setTouched] = React.useState(false);
  const [validationError, setValidationError] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (validate && touched) {
      setValidationError(validate(value));
    }
  }, [value, validate, touched]);

  const handleBlur = () => {
    setTouched(true);
    if (validate) {
      setValidationError(validate(value));
    }
  };

  return (
    <div>
      {label && <label>{label}</label>}
      <PasswordInput value={value} onChange={onChange} onBlur={handleBlur} {...rest} />
      {touched && (error || validationError) && (
        <div style={{ color: 'red', fontSize: '0.9em' }}>{error || validationError}</div>
      )}
    </div>
  );
};

export default PasswordInputField;
