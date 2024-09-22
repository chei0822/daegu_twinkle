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
};

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
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (!validatePassword(newPassword)) {
            setPasswordError('영문, 숫자, 특수문자 포함 8자 이상 입력해주세요');
        } else {
            setPasswordError('');
        }
    };

    const handleIdChange = (e) => {
        const newId = e.target.value;
        setId(newId);

        if (newId === '') {
            setIdError('올바른 아이디를 입력해주세요');
        } else {
            setIdError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id === '') {
            setIdError('올바른 아이디를 입력해주세요');
        }
        if (!validatePassword(password)) {
            setPasswordError('영문, 숫자, 특수문자 포함 8자 이상 입력해주세요');
        }

        if (id === 'knu2024' && password === '1946knu@@') {
            navigate('/Main');
            setIdError('');
            setPasswordError('');
            setLoginSuccess(true);
        } else {
            setIdError('아이디 또는 비밀번호가 일치하지 않습니다.');
            setPasswordError('');
        }
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
                    <h1 style={styles.title}>관리자 로그인</h1>
                    
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div style={styles.inputTitle}>아이디</div>
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
                            <div style={styles.inputTitle}>비밀번호</div>
                            <div style={styles.inputWrap}>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    style={styles.input}
                                />
                            </div>
                            {passwordError && <div style={styles.errorMessage}>{passwordError}</div>}
                        </div>

                        <button type="submit" style={styles.loginButton}>
                            로그인하기
                        </button>
                    </form>

                    <div>
                        <button onClick={() => navigate('/register')} style={styles.registerButton}>
                            관리자 등록
                        </button>
                    </div>

                    {loginSuccess && <div style={{ color: 'green', marginTop: '10px', textAlign: 'center' }}>로그인 성공!</div>}
                </div>
            </div>
        </div>
    );
}