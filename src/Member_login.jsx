import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import "./font/font.css";
import logo from "../src/image/04-2.jpg";

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
    },
    loginFrame: {
        maxWidth: '500px',
        margin: '0 auto',
        backgroundColor: '#F7f7f7',
        padding: '0 10px',
    },
    title: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#262626',
        fontFamily: 'NanumSquareNeoExtraBold',
        marginBottom: '20px',
        textAlign: 'center',
    },
    inputTitle: {
        fontSize: '15px',
        fontWeight: 600,
        color: '#262626',
        textAlign: 'left',
        fontFamily: "'NanumSquareNeo'",
        marginBottom: '5px',
        marginTop: '15px',
    },
    inputWrap: {
        display: 'flex',
        borderRadius: '8px',
        padding: '13px',
        backgroundColor: 'white',
        border: '1px solid #e2e0c0',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        outline: 'none',
        border: 'none',
        height: '15px',
        fontSize: '14px',
        fontWeight: 400,
        padding: '5px',
    },
    loginButton: {
        width: '100%',
        height: '48px',
        border: 'none',
        fontWeight: 700,
        backgroundColor: '#DA2127',
        borderRadius: '64px',
        color: 'white',
        cursor: 'pointer',
        marginTop: '20px',
    },
    registerButton: {
        backgroundColor: '#F7f7f7',
        color: 'black',
        width: 'auto',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '5px',
        fontFamily: "'NanumSquareNeoExtraBold'",
        cursor: 'pointer',
        marginTop: '10px',
        marginRight: '10px',
    },
    errorMessage: {
        color: '#ef0000',
        fontSize: '12px',
        fontFamily: 'NanumSquareNeo',
        marginTop: '5px',
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
};
const translations ={
    ko: {
        title: "사용자 로그인",
        id: "아이디",
        password: "비밀번호",
        loginButton: "로그인하기",
        registerButton: "사용자 등록",
        idPlaceholder: "knu1946",
        passwordPlaceholder: "영문, 숫자, 특수문자 포함 8자 이상",
        idError: "올바른 아이디를 입력해주세요",
        passwordError: "영문, 숫자, 특수문자 포함 8자 이상 입력해주세요",
        loginSuccess: "로그인 성공!",
        loginFailure: "아이디 또는 비밀번호가 일치하지 않습니다."
    },
    en: {
        title: "User Login",
        id: "ID",
        password: "Password",
        loginButton: "Login",
        registerButton: "User Registration",
        idPlaceholder: "knu1946",
        passwordPlaceholder: "At least 8 characters including letters, numbers, and special characters",
        idError: "Please enter a valid ID",
        passwordError: "Please enter at least 8 characters including letters, numbers, and special characters",
        loginSuccess: "Login successful!",
        loginFailure: "ID or password does not match."
    },
    zh: {
        title: "用户登录",
        id: "账号",
        password: "密码",
        loginButton: "登录",
        registerButton: "用户注册",
        idPlaceholder: "knu1946",
        passwordPlaceholder: "至少8个字符，包括字母、数字和特殊字符",
        idError: "请输入有效的账号",
        passwordError: "请输入至少8个字符，包括字母、数字和特殊字符",
        loginSuccess: "登录成功！",
        loginFailure: "账号或密码不匹配。"
    },
    ja: {
        title: "ユーザーログイン",
        id: "ID",
        password: "パスワード",
        loginButton: "ログイン",
        registerButton: "ユーザー登録",
        idPlaceholder: "knu1946",
        passwordPlaceholder: "英字、数字、特殊文字を含む8文字以上",
        idError: "有効なIDを入力してください",
        passwordError: "英字、数字、特殊文字を含む8文字以上を入力してください",
        loginSuccess: "ログイン成功！",
        loginFailure: "IDまたはパスワードが一致しません。"
    },
    es: {
        title: "Inicio de sesión de usuario",
        id: "ID",
        password: "Contraseña",
        loginButton: "Iniciar sesión",
        registerButton: "Registro de usuario",
        idPlaceholder: "knu1946",
        passwordPlaceholder: "Al menos 8 caracteres incluyendo letras, números y caracteres especiales",
        idError: "Por favor, introduzca un ID válido",
        passwordError: "Por favor, introduzca al menos 8 caracteres incluyendo letras, números y caracteres especiales",
        loginSuccess: "¡Inicio de sesión exitoso!",
        loginFailure: "El ID o la contraseña no coinciden."
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

export default function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [idError, setIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [language, setLanguage] = useState('ko');
    const navigate = useNavigate();

    const t = translations[language];

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (!validatePassword(newPassword)) {
            setPasswordError(t.passwordError);
        } else {
            setPasswordError('');
        }
    };

    const handleIdChange = (e) => {
        const newId = e.target.value;
        setId(newId);

        if (newId === '') {
            setIdError(t.idError);
        } else {
            setIdError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id === '') {
            setIdError(t.idError);
        }
        if (!validatePassword(password)) {
            setPasswordError(t.passwordError);
        }

        if (id === 'knu2024' && password === '1946knu@@') {
            navigate('/Main');
            setIdError('');
            setPasswordError('');
            setLoginSuccess(true);
        } else {
            setIdError(t.loginFailure);
            setPasswordError('');
        }
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <div style={styles.pageContainer}>
            <header style={styles.header}>
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
                    
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div style={styles.inputTitle}>{t.id}</div>
                            <div style={styles.inputWrap}>
                                <input
                                    id="id"
                                    type="text"
                                    placeholder="knu1946"
                                    value={id}
                                    onChange={handleIdChange}
                                    style={styles.input}
                                />
                            </div>
                            {idError && <div style={styles.errorMessage}>{idError}</div>}
                        </div>

                        <div>
                            <div style={styles.inputTitle}>{t.password}</div>
                            <div style={styles.inputWrap}>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder={t.passwordPlaceholder}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    style={styles.input}
                                />
                            </div>
                            {passwordError && <div style={styles.errorMessage}>{passwordError}</div>}
                        </div>

                        <button type="submit" style={styles.loginButton}>
                            {t.loginButton}
                        </button>
                    </form>

                    <div>
                        <button onClick={() => navigate('/member_register')} style={styles.registerButton}>
                            {t.registerButton}
                        </button>
                    </div>

                    {loginSuccess && <div style={{ color: 'green', marginTop: '10px', textAlign: 'center' }}>로그인 성공!</div>}
                </div>
            </div>
        </div>
    );
}