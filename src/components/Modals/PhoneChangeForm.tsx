import { useState } from 'react';

import Button from '../atoms/Button/Button';
import Input from '../atoms/Input/Input';

interface PhoneChangeFormProps {
  onSuccess: () => void;
}

const PhoneChangeForm = ({ onSuccess }: PhoneChangeFormProps) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = async () => {
    setError('');
    try {
      const res = await fetch('/users/me/phone', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phone })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          setSuccess(false);
        }, 5000);
      } else {
        setError(data.error || '서버 오류로 실패하였습니다.');
      }
    } catch {
      setError('서버 오류로 실패하였습니다.');
    }
  };

  if (success) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        정보 변경이 완료되었습니다.
        <br />
        5초 후 창이 닫힙니다.
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <label htmlFor="phone-change">새 전화번호</label>
      <Input
        id="phone-change"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="새 전화번호를 입력하세요"
        variant="long"
      />
      <Button variant="account" onClick={handleChange} style={{ marginTop: 16 }}>
        전화번호 변경
      </Button>
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
    </div>
  );
};

export default PhoneChangeForm;
