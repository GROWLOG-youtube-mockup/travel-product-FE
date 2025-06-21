// src/constants/errorMessages.ts
interface ErrorMessage {
  title: string;
  description: string;
}

const errorMessages: Record<number | string, ErrorMessage> = {
  400: {
    title: '잘못된 요청입니다',
    description: '요청한 내용을 처리할 수 없습니다. 입력 정보를 확인해 주세요.'
  },
  401: {
    title: '인증이 필요합니다',
    description: '해당 서비스를 이용하기 위해서는 로그인이 필요합니다.'
  },
  402: {
    title: '결제가 필요합니다',
    description: '서비스 이용을 위해 결제가 필요합니다.'
  },
  403: {
    title: '접근 권한이 없습니다',
    description: '해당 리소스에 대한 접근 권한이 없습니다. 관리자에게 문의해 주세요.'
  },
  404: {
    title: '페이지를 찾을 수 없습니다',
    description:
      '요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다. URL을 다시 확인해 주세요.'
  },
  405: {
    title: '허용되지 않은 메서드입니다',
    description: '지원되지 않는 요청 방식입니다. 요청 방식을 확인해 주세요.'
  },
  406: {
    title: '허용되지 않는 형식입니다',
    description: '서버가 요청한 형식을 처리할 수 없습니다.'
  },
  407: {
    title: '프록시 인증이 필요합니다',
    description: '프록시 서버 인증이 필요합니다.'
  },
  408: {
    title: '요청 시간이 초과되었습니다',
    description: '서버 응답 대기 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.'
  },
  409: {
    title: '충돌이 발생했습니다',
    description: '리소스 상태 충돌로 요청을 완료할 수 없습니다.'
  },
  410: {
    title: '삭제된 리소스입니다',
    description: '요청하신 리소스는 더 이상 이용할 수 없습니다.'
  },
  411: {
    title: '길이 정보가 필요합니다',
    description: 'Content-Length 헤더가 필요합니다.'
  },
  412: {
    title: '사전 조건 실패',
    description: '요청 전제 조건이 충족되지 않았습니다.'
  },
  413: {
    title: '페이로드가 너무 깁니다',
    description: '요청 본문 크기가 서버에서 허용한 한도를 초과했습니다.'
  },
  414: {
    title: 'URI가 너무 깁니다',
    description: '요청 URI의 길이가 너무 깁니다.'
  },
  415: {
    title: '지원되지 않는 미디어 타입입니다',
    description: '요청한 미디어 형식을 서버가 지원하지 않습니다.'
  },
  416: {
    title: '요청 범위 불만족',
    description: '요청한 범위를 만족할 수 없습니다.'
  },
  417: {
    title: '예상 실패',
    description: 'Expect 헤더의 요구사항을 충족할 수 없습니다.'
  },
  429: {
    title: '요청이 너무 많습니다',
    description: '짧은 시간 동안 너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해 주세요.'
  },
  500: {
    title: '서버 오류가 발생했습니다',
    description:
      '일시적인 서버 오류가 발생했습니다. 잠시 후 다시 시도하시거나 관리자에게 문의해 주세요.'
  },
  501: {
    title: '구현되지 않은 기능입니다',
    description: '서버가 요청한 기능을 지원하지 않습니다.'
  },
  502: {
    title: '일시적인 서버 오류입니다',
    description: '서버가 일시적으로 응답할 수 없는 상태입니다. 잠시 후 다시 시도해 주세요.'
  },
  503: {
    title: '서비스를 사용할 수 없습니다',
    description: '서비스가 일시적으로 중단되었습니다. 잠시 후 다시 시도해 주세요.'
  },
  504: {
    title: '게이트웨이 타임아웃',
    description: '서버 간 통신이 시간 내에 완료되지 않았습니다.'
  },
  505: {
    title: 'HTTP 버전을 지원하지 않습니다',
    description: '서버가 요청한 HTTP 버전을 지원하지 않습니다.'
  }
};

export default errorMessages;
