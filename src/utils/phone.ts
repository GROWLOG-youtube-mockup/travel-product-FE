export const normalizePhoneNumber = (raw: string): string => {
  if (!/^\d{10,11}$/.test(raw)) {
    throw new Error('숫자만 포함된 10자리 또는 11자리 번호여야 합니다.');
  }

  return raw.length === 10
    ? raw.replace(/(\d{2,3})(\d{3})(\d{4})/, '$1-$2-$3')
    : raw.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};

export const denormalizePhoneNumber = (formatted: string): string => {
  const cleaned = formatted.replace(/-/g, '');

  if (!/^\d{10,11}$/.test(cleaned)) {
    throw new Error('숫자만 포함된 10자리 또는 11자리 번호여야 합니다.');
  }

  return cleaned;
};
