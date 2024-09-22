import React from 'react';
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import logo from "../src/image/04-2.jpg";

const translations = {
  ko: {
      successMessage: "결제가 성공적으로 완료되었습니다!",
      amountPaid: "결제 금액",
      goToMain: "메인으로 가기"
  },
  en: {
      successMessage: "Payment completed successfully!",
      amountPaid: "Amount Paid",
      goToMain: "Go to Main"
  },
  zh: {
      successMessage: "付款成功！",
      amountPaid: "支付金额",
      goToMain: "返回主页"
  },
  ja: {
      successMessage: "支払いが成功しました！",
      amountPaid: "支払金額",
      goToMain: "メインに戻る"
  },
  es: {
      successMessage: "¡Pago completado con éxito!",
      amountPaid: "Monto Pagado",
      goToMain: "Ir al Menú Principal"
  }
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#F7f7f7',
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F7f7f7',
    zIndex: 1000,
    padding: '10px 0',
    borderBottom: '1px solid #e0e0e0',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 15px',
  },
  body: {
    marginTop: '80px',
    flexGrow: 1,
    overflowY: 'auto',
    padding: '20px 15px',
    textAlign: 'center',
  },
  successMessage: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#262626',
    fontFamily: 'NanumSquareNeoExtraBold',
    marginBottom: '20px',
  },
  amount: {
    fontSize: '20px',
    fontWeight: '500',
    color: '#262626',
    fontFamily: "'NanumSquareNeo'",
    marginTop: '10px',
    marginBottom: '30px',
  },
  button: {
    width: '150px',
    height: '48px',
    border: 'none',
    fontWeight: 700,
    backgroundColor: '#DA2127',
    borderRadius: '64px',
    color: 'white',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

const Btnstyle = styled.button`
    width: 80px;
    height: 50px; 
    background: url(${logo}) no-repeat center;
    background-size: contain; 
    border: none; 
    cursor: pointer;
`;

export function SuccessPage() {
  const location = useLocation();
  const { orderId, amount, language } = location.state || {};
  const t = translations[language] || translations.ko;
  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <Btnstyle onClick={() => window.location.href = "/main"} />
        </div>
      </header>

      <div style={styles.body}>
        <h1>{t.successMessage}</h1>
        <p>{t.amountPaid}: {amount} 원</p>
        <button style={styles.button} onClick={() => window.location.href = "/"}>{t.goToMain}</button>
      </div>
    </div>
  );
}
