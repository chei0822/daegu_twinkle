import React, { useState, useEffect, useRef } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from 'nanoid';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import "./font/font.css";

Modal.setAppElement('#root');

const clientKey = "test_ck_vZnjEJeQVxJYWbkjx0298PmOoBN0";
const customerKey = "LlDJaYngro1Rx5lPdGPm3ezGdRpX"

const menuData = [
    { name: "우동&주먹밥", image: "udong.jpg", price: 5000 },
    { name: "순두부찌개정식", image: "tofusoup.jpg", price: 5000 },
    { name: "양푼이돈육찜", image: "jjim.jpg", price: 5500 },
    { name: "돈가스정식", image: "dondon.jpg", price: 5000 },
    { name: "육회비빔밥", image: "bibim.jpg", price: 6000 },
    { name: "냉면", image: "myeon.jpg", price: 5000 }
];

const translations = {
    ko: {
        title: "주문서",
        subtitle: "주문 정보를 확인해주세요",
        menu: "메뉴",
        quantity: "수량",
        price: "가격",
        totalAmount: "총 금액",
        payment: "결제하기",
        paymentConfirmation: "결제 확인",
        totalPaymentAmount: "총 결제 금액",
        proceedPayment: "결제 진행",
        cancel: "취소"
    },
    en: {
        title: "Order Sheet",
        subtitle: "Please confirm your order information",
        menu: "Menu",
        quantity: "Quantity",
        price: "Price",
        totalAmount: "Total Amount",
        payment: "Pay",
        paymentConfirmation: "Payment Confirmation",
        totalPaymentAmount: "Total Payment Amount",
        proceedPayment: "Proceed Payment",
        cancel: "Cancel"
    },
    zh: {
        title: "订单",
        subtitle: "请确认您的订单信息",
        menu: "菜单",
        quantity: "数量",
        price: "价格",
        totalAmount: "总金额",
        payment: "支付",
        paymentConfirmation: "支付确认",
        totalPaymentAmount: "总支付金额",
        proceedPayment: "进行支付",
        cancel: "取消"
    },
    ja: {
        title: "注文書",
        subtitle: "注文情報をご確認ください",
        menu: "メニュー",
        quantity: "数量",
        price: "価格",
        totalAmount: "合計金額",
        payment: "支払う",
        paymentConfirmation: "支払い確認",
        totalPaymentAmount: "総支払金額",
        proceedPayment: "支払いを進める",
        cancel: "キャンセル"
    },
    es: {
        title: "Hoja de Pedido",
        subtitle: "Por favor, confirme la información de su pedido",
        menu: "Menú",
        quantity: "Cantidad",
        price: "Precio",
        totalAmount: "Importe Total",
        payment: "Pagar",
        paymentConfirmation: "Confirmación de Pago",
        totalPaymentAmount: "Importe Total del Pago",
        proceedPayment: "Proceder con el Pago",
        cancel: "Cancelar"
    }
};

const styles = {
    h1: {
        fontFamily: "NanumSquareNeoExtraBold",
        fontWeight: '900',
        textAlign: 'center'
    },
    h2: {
        fontFamily: "NanumSquareNeoExtraBold",
        textAlign: 'center'
    },
    table: {
        width: '80%',
        margin: '0 auto',
        borderCollapse: 'collapse',
        marginTop: '20px'
    },
    th: {
        border: '1px solid #000',
        padding: '10px',
        fontFamily: "'NanumSquareNeoExtraBold'",
        backgroundColor: '#f1f1f1',
        textAlign: 'center'
    },
    td: {
        border: '1px solid #000',
        padding: '10px',
        fontFamily: "'NanumSquareNeo'",
        textAlign: 'center'
    },
    totalRow: {
        fontWeight: 'bold',
        backgroundColor: '#f9f9f9'
    },
    buttonContainer: {
        display: 'flex',            // Flexbox로 버튼 컨테이너 설정
        justifyContent: 'center',   // 가운데 정렬
        marginTop: '20px'
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#DA2127',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontFamily: "'NanumSquareNeoExtraBold'",
        fontSize: '16px',
        width: '120px',
        height: '55px'
    },
    p:{
        fontFamily: "'NanumSquareNeoExtraBold'",
        textAlign: 'center'
    },
    popup:{
        padding: '10px 25px',
        backgroundColor: '#DA2127',
        color: 'white',
        borderColor:"#CD9731",
        borderRadius: '5px',
        cursor: 'pointer',
        fontFamily: "'NanumSquareNeoExtraBold'",
        fontSize: '15px',
        width: '150px',
        height: '55px'
    },
    languageButtons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '20px'
    },
    languageButton: {
        padding: '5px 10px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#f0f0f0'
    },
    paymentWidget: {
        width: '100%',
        minHeight: '300px',  // 충분한 높이 확보
        marginTop: '20px',
        marginBottom: '20px'
    },
    agreementWidget: {
        width: '100%',
        minHeight: '150px',  // 충분한 높이 확보
        marginTop: '20px',
        marginBottom: '20px'
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        width: '100%'  // 전체 너비 사용
    }
};

export default function Payment() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [language, setLanguage] = useState('ko');
    const paymentWidgetRef = useRef(null);
    const location = useLocation();
    const selectedItems = location.state?.selectedItems || [];
    const totalAmount = selectedItems.reduce((total, item) => {
        const price = menuData.find(menu => menu.name === item.name).price;
        return total + (price * item.quantity);
    }, 0);

    const t = translations[language];

    useEffect(() => {
        const initializePaymentWidget = async () => {
            try {
                const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
                console.log("Payment widget initialized:", paymentWidget);
                paymentWidgetRef.current = paymentWidget;
            } catch (error) {
                console.error("Error initializing payment widget:", error);
            }
        };
    
        initializePaymentWidget();
    }, []);

    useEffect(() => {
        if (modalIsOpen && paymentWidgetRef.current) {
            const paymentWidget = paymentWidgetRef.current;

            const renderPaymentWidgets = async () => {
                try {
                    console.log("결제 수단 렌더링 시도 중...");
                    await paymentWidget.renderPaymentMethods("#payment-widget", {
                        value: totalAmount,
                        currency: 'KRW',
                        country: 'KR',
                        variantKey: 'DEFAULT',
                    });
                    console.log("결제 수단이 정상적으로 렌더링되었습니다.");

                    await paymentWidget.renderAgreement('#agreement');
                    console.log("약관이 정상적으로 렌더링되었습니다.");
                } catch (error) {
                    console.error("결제 수단을 렌더링하는 도중 오류가 발생했습니다:", error);
                }
            };

            // 모달이 열린 후 약간의 지연을 두고 렌더링 시도
            setTimeout(renderPaymentWidgets, 200);
        }
    }, [modalIsOpen, totalAmount]);
    
    
    
    

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handlePayment = async () => {
        const paymentWidget = paymentWidgetRef.current;

        try {
            await paymentWidget?.requestPayment({
                orderId: nanoid(),
                orderName: selectedItems.map(item => item.name).join(", "),
                customerName: "Jenni",
                customerEmail: "customer123@knu.ac.kr",
                successUrl: `${window.location.origin}/success`,
                failUrl: `${window.location.origin}/fail`,
            });
        } catch (err) {
            console.log(err);
        }
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <div className="App">
            <div style={styles.languageButtons}>
                <button style={styles.languageButton} onClick={() => changeLanguage('ko')}>한국어</button>
                <button style={styles.languageButton} onClick={() => changeLanguage('en')}>English</button>
                <button style={styles.languageButton} onClick={() => changeLanguage('zh')}>中文</button>
                <button style={styles.languageButton} onClick={() => changeLanguage('ja')}>日本語</button>
                <button style={styles.languageButton} onClick={() => changeLanguage('es')}>Español</button>
            </div>
            <h1 style={styles.h1}>{t.title}</h1>
            <h2 style={styles.h2}>{t.subtitle}</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>{t.menu}</th>
                        <th style={styles.th}>{t.quantity}</th>
                        <th style={styles.th}>{t.price}</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedItems.map((item, index) => {
                        const menu = menuData.find(menu => menu.name === item.name);
                        return (
                            <tr key={index}>
                                <td style={styles.td}>{item.name}</td>
                                <td style={styles.td}>{item.quantity}</td>
                                <td style={styles.td}>{menu.price * item.quantity} 원</td>
                            </tr>
                        );
                    })}
                    <tr style={styles.totalRow}>
                        <td colSpan="2" style={styles.td}>{t.totalAmount}</td>
                        <td style={styles.td}>{totalAmount} 원</td>
                    </tr>
                </tbody>
            </table>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={openModal}>
                    {t.payment}
                </button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="결제 모달"
                style={{
                    content: {
                        width: '50%',
                        height: '80%',
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }
                }}
            >
               <div style={styles.modalContent}>
                    <h2 style={styles.h2}>{t.paymentConfirmation}</h2>
                    <p style={styles.p}>{t.totalPaymentAmount}: {totalAmount}원</p>
                    <h3 style={styles.h2}>{t.selectPaymentMethod}</h3>
                    <div id="payment-widget" style={{width:'80%'}}></div>
                    <div id="agreement" style={{ minHeight: '150px' ,width:'50%'}}></div>
                    <div style={styles.buttonContainer}>
                        <button className="popup" onClick={handlePayment} style={styles.popup}>{t.proceedPayment}</button>
                        <button onClick={closeModal} style={styles.popup}>{t.cancel}</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}