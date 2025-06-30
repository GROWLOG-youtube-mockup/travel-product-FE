// 이메일을 qw****@gm***.com 형태로 마스킹
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain) return email;

  // 로컬 파트 마스킹 (앞 2글자만 노출, 나머지 *)
  const localMasked =
    local.length <= 2
      ? local[0] + '*'.repeat(local.length - 1)
      : local.slice(0, 2) + '*'.repeat(local.length - 2);

  // 도메인 마스킹 (앞 2글자만 노출, 나머지 *)
  const [domainName, ...domainRest] = domain.split('.');
  const domainMasked =
    domainName.length <= 2
      ? domainName[0] + '*'.repeat(domainName.length - 1)
      : domainName.slice(0, 2) + '*'.repeat(domainName.length - 2);
  const domainSuffix = domainRest.length > 0 ? '.' + domainRest.join('.') : '';

  return `${localMasked}@${domainMasked}${domainSuffix}`;
}
