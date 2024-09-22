import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import "./font/font.css";
import logo from "./image/04-2.jpg";

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
    headerTitle: {
        fontFamily: 'NanumSquareNeoExtraBold',
        fontSize: '30px',
        flex: 1,
        textAlign: 'center',
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 15px',
    },
    loginFrame: {
        maxWidth: '500px',
        width: '100%',
        backgroundColor: '#F7f7f7',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom:'20px'
    },
    title: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#262626',
        fontFamily: 'NanumSquareNeoExtraBold',
        marginBottom: '30px',
        textAlign: 'center',
    },
    loginButton: {
        width: '100%',
        height: '60px',
        border: 'none',
        fontWeight: 700,
        backgroundColor: '#DA2127',
        borderRadius: '8px',
        color: 'white',
        cursor: 'pointer',
        marginBottom: '20px',
        fontSize: '18px',
        fontFamily: "'NanumSquareNeoExtraBold'",
        transition: 'background-color 0.3s',
    },
    languageButtons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '20px',
    },
    languageButton: {
        padding: '5px 10px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#f0f0f0',
        fontFamily: "'NanumSquareNeo'",
        fontSize: '14px',
    },
}
const translations={
    ko: {
        title: "로그인 유형 선택",
        managerLogin: "관리자 로그인",
        userLogin: "사용자 로그인"
    },
    en: {
        title: "Select Login Type",
        managerLogin: "Manager Login",
        userLogin: "User Login"
    },
    zh: {
        title: "选择登录类型",
        managerLogin: "管理员登录",
        userLogin: "用户登录"
    },
    ja: {
        title: "ログインタイプの選択",
        managerLogin: "管理者ログイン",
        userLogin: "ユーザーログイン"
    },
    es: {
        title: "Seleccionar tipo de inicio de sesión",
        managerLogin: "Inicio de sesión del administrador",
        userLogin: "Inicio de sesión del usuario"
    }
}
const Btnstyle = styled.button`
    width: 80px;
    height: 50px; 
    background: url(${logo}) no-repeat center;
    background-size: contain; 
    border: none; 
    cursor: pointer;
`;

export default function First() {
    const navigate = useNavigate();
    const [language, setLanguage] = useState('ko');

    const handleManagerLogin = () => {
        navigate('/manager-login');
    };

    const handleMemberLogin = () => {
        navigate('/member_login');
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    const t = translations[language];

    return (
        <div style={styles.pageContainer}>
            <header style={styles.header}>
                <div style={styles.headerTitle}>학식키오스크</div>
                <div style={styles.headerContent}>
                    <Btnstyle onClick={() => navigate("/main")}/>
                </div>
            </header>
            <div style={styles.body}>
                <div style={styles.loginFrame}>
                    <div style={styles.languageButtons}>
                        <button onClick={() => changeLanguage('ko')} style={styles.languageButton}>한국어</button>
                        <button onClick={() => changeLanguage('en')} style={styles.languageButton}>English</button>
                        <button onClick={() => changeLanguage('zh')} style={styles.languageButton}>中文</button>
                        <button onClick={() => changeLanguage('ja')} style={styles.languageButton}>日本語</button>
                        <button onClick={() => changeLanguage('es')} style={styles.languageButton}>Español</button>
                    </div>
                    <h1 style={styles.title}>{t.title}</h1>
                    
                    <button 
                        onClick={handleManagerLogin} 
                        style={{...styles.loginButton, marginBottom: '20px'}}
                    >
                        {t.managerLogin}
                    </button>
                    <button 
                        onClick={handleMemberLogin} 
                        style={styles.loginButton}
                    >
                        {t.userLogin}
                    </button>
                </div>
            </div>
        </div>
    );
}