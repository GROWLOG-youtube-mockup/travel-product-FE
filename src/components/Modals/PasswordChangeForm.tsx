import { useState } from 'react';

import Button from '../atoms/Button/Button';
import Input from '../atoms/Input/Input';

interface PasswordChangeFormProps {
  onSuccess: () => void;
}

const PasswordChangeForm = ({ onSuccess }: PasswordChangeFormProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = async () => {
    setError('');
    try {
      const res = await fetch('/users/me/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword })
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
      <label htmlFor="current-password">현재 비밀번호</label>
      <Input
        id="current-password"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        placeholder="현재 비밀번호를 입력하세요"
        variant="long"
      />
      <label htmlFor="new-password" style={{ marginTop: 12, display: 'block' }}>
        새 비밀번호
      </label>
      <Input
        id="new-password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="새 비밀번호를 입력하세요"
        variant="long"
      />
      <Button variant="account" onClick={handleChange} style={{ marginTop: 16 }}>
        비밀번호 변경
      </Button>
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
    </div>
  );
};

export default PasswordChangeForm;
