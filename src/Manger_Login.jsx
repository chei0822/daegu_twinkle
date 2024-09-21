import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import "./font/font.css";
import logo from "../src/image/04-2.jpg";

const styles = {
    page: {
        position: 'absolute',
        top: '5px',
        bottom: '0',
        width: '100%',
        maxWidth: '500px',
        padding: '0 20px',
        left: '50%',
        transform: 'translate(-50%, 0)',
        backgroundColor: '#F7f7f7',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
    titleWrap: {
        marginTop: '87px',
        fontSize: '26px',
        fontWeight: 700,
        color: '#262626',
        fontFamily: "NanumSquareNeoExtraBold",
    },
    contentWrap: {
        marginTop: '15px',
        display: 'flex',
        flexDirection: 'column',
    },
    inputTitle: {
        fontSize: '15px',
        fontWeight: 600,
        color: '#262626',
        textAlign: 'left',
        fontFamily: "'NanumSquareNeo'",
        marginBottom: '5px',
        marginTop: '5px',
    },
    inputWrap: {
        display: 'flex',
        borderRadius: '8px',
        padding: '13px',
        marginTop: '4px',
        backgroundColor: 'white',
        border: '1px solid #e2e0c0',
        marginBottom: '5px',
    },
    inputError: {
        border: '1px solid #DA2127',
    },
    input: {
        width: '100%',
        outline: 'none',
        border: 'none',
        height: '15px',
        fontSize: '14px',
        fontWeight: 400,
        padding:'5px'
    },
    errorMessageWrap: {
        marginTop: '8px',
        color: '#ef0000',
        fontSize: '12px',
        fontFamily: "'NanumSquareNeo'",
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
        marginTop: '10px',
    },
    registerButton: {
        backgroundColor: '#F7f7f7',
        color: 'black',
        width: '20%',
        height: '25px',
        border: 'none',
        borderRadius: '5px',
        fontFamily: "'NanumSquareNeoExtraBold'",
        cursor: 'pointer',
        float: 'left',
        marginTop: '10px',
    },
    knuLogo: {
        float: 'left',
        width: '100px',
        marginBottom: '6px',
    },
};

const Btnstyle = styled.button`
    float: left;
    width: 100px;
    height: 100px; 
    margin-bottom: 6px;
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
            // 로그인 성공 시 메인 페이지로 이동
            navigate('/Main'); // 메인 페이지 경로로 이동
            setIdError('');
            setPasswordError('');
        } else {
            setIdError('아이디 또는 비밀번호가 일치하지 않습니다.');
            setPasswordError('');
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    }

    const handleHomeClick=()=> {
        navigate("main");
    }

    const handleMemberRegiserClick=()=> {
        navigate('/member_register')
    }

    return (
        <div style={styles.page}>
            <div className="header">
                <Btnstyle bg={logo} onClick={handleHomeClick} />
            </div>

            <div style={styles.titleWrap}>
                User Login
            </div>
            <form onSubmit={handleSubmit}>
                <div style={styles.contentWrap}>
                    <label style={styles.inputTitle} htmlFor="id">
                        ID
                    </label>
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
                </div>

                <div style={styles.errorMessageWrap}>
                    {idError && <div>{idError}</div>}
                </div>

                <div style={styles.contentWrap}>
                    <label style={styles.inputTitle} htmlFor="password">
                        PW
                    </label>
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
                </div>

                <div style={styles.errorMessageWrap}>
                    {passwordError && <div>{passwordError}</div>}
                </div>

                <div className="login">
                    <button type="submit" style={styles.loginButton}>
                        Login
                    </button>
                </div>

                <div className="register">
                    <button type="button" onClick={handleRegisterClick} style={styles.registerButton}>
                        관리자 등록
                    </button>
                </div>
                <div className='member_register'>
                    <button type="button" onClick={handleMemberRegiserClick} style={styles.registerButton}>
                        User Register
                    </button>
                </div>
            </form>


            {loginSuccess && <div>로그인 성공!</div>}
        </div>
    );
}
