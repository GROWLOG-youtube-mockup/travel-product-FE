import { useState } from 'react';

import Button from '../atoms/Button/Button';
import Input from '../atoms/Input/Input';

interface NameChangeFormProps {
  onSuccess: () => void;
}

const NameChangeForm = ({ onSuccess }: NameChangeFormProps) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = async () => {
    setError('');
    try {
      const res = await fetch('/users/me/name', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
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
      <label htmlFor="name-change">새 이름</label>
      <Input
        id="name-change"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="새 이름을 입력하세요"
        variant="long"
      />
      <Button variant="account" onClick={handleChange} style={{ marginTop: 16 }}>
        이름 변경
      </Button>
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
    </div>
  );
};

export default NameChangeForm;
