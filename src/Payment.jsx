import React, { useEffect } from 'react';

const Payment = () => {
  useEffect(() => {
    // jQuery 및 Iamport 스크립트를 동적으로 로드
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    
    // 컴포넌트가 언마운트될 때 스크립트 제거
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init('imp77220765'); // 아임포트 가맹점 식별코드

    const data = {
      pg: 'html5_inicis', // PG사
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      name: '결제 테스트', // 주문명
      amount: '1000', // 결제금액
      custom_data: {
        name: '부가정보',
        desc: '세부 부가정보',
      },
      buyer_name: '홍길동', // 구매자 이름
      buyer_tel: '01012345678', // 구매자 전화번호
      buyer_email: '14279625@gmail.com', // 구매자 이메일
      buyer_addr: '구천면로 000-00', // 구매자 주소
      buyer_postalcode: '01234', // 구매자 우편번호
    };

    IMP.request_pay(data, callback); // 결제 요청
  };

  const callback = response => {
    const { success, error_msg } = response;

    if (success) {
      alert('결제 성공');
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };

  return (
    <div>
      <h1>결제 테스트</h1>
      <button onClick={onClickPayment}>결제하기</button> 
    </div>
  );
};

export default Payment;
