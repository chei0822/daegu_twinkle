import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import logo from "../src/image/04-2.jpg"
import React, { useState, useEffect } from 'react';

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
    title: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#262626',
        fontFamily: 'NanumSquareNeoExtraBold',
        marginBottom: '20px',
        textAlign: 'center',
        flex:1,
        marginTop:'5px'
    },
    languageButtons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '5px',
    },
    languageButton: {
        padding: '5px 10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#e0e0e0',
    },
    body: {
        marginTop: '120px', // Adjust based on your header height
        flexGrow: 1,
        overflowY: 'auto',
        padding: '20px 15px',
    },
    registerFrame: {
        maxWidth: '500px',
        margin: '0 auto',
        backgroundColor: '#F7f7f7',
        padding: '0 10px',
    },
    infoOptionalText: {
        fontFamily: 'NanumSquareNeoExtraBold',
        marginBottom: '15px',
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
    },
    completeButton: {
        width: '100%',
        height: '48px',
        border: 'none',
        fontWeight: '700',
        backgroundColor: '#DA2127',
        borderRadius: '64px',
        color: 'white',
        cursor: 'pointer',
        marginTop: '20px',
    },
    errorMessage: {
        color: '#ef0000',
        fontSize: '12px',
        fontFamily: 'NanumSquareNeo',
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
const translations = {
    ko: {
        title: "사용자 등록 페이지",
        requiredInfo: "필수 사항",
        studentId: "학번",
        password: "비밀번호",
        confirmPassword: "비밀번호 확인",
        birthDate: "생년월일",
        phoneNumber: "전화번호",
        register: "등록하기",
        employeeIdError: "학번을 입력해주세요.",
        passwordError: "비밀번호를 입력해주세요.",
        confirmPasswordError: "비밀번호 확인을 입력해주세요.",
        birthDateError: "생년월일을 입력해주세요.",
        phoneNumberError: "전화번호를 입력해주세요.",
        idError: "학번은 숫자만 사용할 수 있습니다.",
        idLengthError: "학번은 5자 이상이어야 합니다.",
        passwordcheckError: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
        passwordLengthError: "비밀번호는 8자 이상이어야 합니다.",
        passwordMismatch: "비밀번호가 일치하지 않습니다.",
        phoneNumbercheckError: "올바른 전화번호 형식을 입력하세요.",
        phonePlaceholder: "010-1234-5678 형태로 입력하세요",
        successMessage: "사용자 등록에 성공하였습니다!",
        checkInputs: "입력 값을 확인해주세요."
    },
    en: {
        title: "User Registration Page",
        requiredInfo: "Required Information",
        studentId: "Student ID",
        password: "Password",
        confirmPassword: "Confirm Password",
        birthDate: "Date of Birth",
        phoneNumber: "Phone Number",
        register: "Register",
        employeeIdError: "Please enter your student ID.",
        passwordError: "Please enter a password.",
        confirmPasswordError: "Please confirm your password.",
        birthDateError: "Please enter your date of birth.",
        phoneNumberError: "Please enter your phone number.",
        idError: "Student ID can only contain numbers.",
        idLengthError: "Student ID must be at least 5 characters long.",
        passwordcheckError: "Password must include letters, numbers, and special characters.",
        passwordLengthError: "Password must be at least 8 characters long.",
        passwordMismatch: "Passwords do not match.",
        phoneNumbercheckError: "Please enter a valid phone number format.",
        phonePlaceholder: "Enter in 010-1234-5678 format",
        successMessage: "User registration successful!",
        checkInputs: "Please check your inputs."
    },
    zh: {
        title: "用户注册页面",
        requiredInfo: "必填项",
        studentId: "学号",
        password: "密码",
        confirmPassword: "确认密码",
        birthDate: "出生日期",
        phoneNumber: "电话号码",
        register: "注册",
        employeeIdError: "请输入学号。",
        passwordError: "请输入密码。",
        confirmPasswordError: "请确认密码。",
        birthDateError: "请输入出生日期。",
        phoneNumberError: "请输入电话号码。",
        idError: "学号只能使用数字。",
        idLengthError: "学号至少需要5个字符。",
        passwordcheckError: "密码必须包含字母、数字和特殊字符。",
        passwordLengthError: "密码至少需要8个字符。",
        passwordMismatch: "密码不匹配。",
        phoneNumbercheckError: "请输入正确的电话号码格式。",
        phonePlaceholder: "请按010-1234-5678格式输入",
        successMessage: "用户注册成功！",
        checkInputs: "请检查输入值。"
    },
    ja: {
        title: "ユーザー登録ページ",
        requiredInfo: "必須項目",
        studentId: "学籍番号",
        password: "パスワード",
        confirmPassword: "パスワード確認",
        birthDate: "生年月日",
        phoneNumber: "電話番号",
        register: "登録する",
        employeeIdError: "学籍番号を入力してください。",
        passwordError: "パスワードを入力してください。",
        confirmPasswordError: "パスワード確認を入力してください。",
        birthDateError: "生年月日を入力してください。",
        phoneNumberError: "電話番号を入力してください。",
        idError: "学籍番号は数字のみ使用可能です。",
        idLengthError: "学籍番号は5文字以上である必要があります。",
        passwordcheckError: "パスワードは英字、数字、特殊文字を含む必要があります。",
        passwordLengthError: "パスワードは8文字以上である必要があります。",
        passwordMismatch: "パスワードが一致しません。",
        phoneNumbercheckError: "正しい電話番号の形式を入力してください。",
        phonePlaceholder: "010-1234-5678の形式で入力してください",
        successMessage: "ユーザー登録に成功しました！",
        checkInputs: "入力値を確認してください。"
    },
    es: {
        title: "Página de Registro de Usuario",
        requiredInfo: "Información Requerida",
        studentId: "ID de Estudiante",
        password: "Contraseña",
        confirmPassword: "Confirmar Contraseña",
        birthDate: "Fecha de Nacimiento",
        phoneNumber: "Número de Teléfono",
        register: "Registrarse",
        employeeIdError: "Por favor, ingrese su ID de estudiante.",
        passwordError: "Por favor, ingrese una contraseña.",
        confirmPasswordError: "Por favor, confirme su contraseña.",
        birthDateError: "Por favor, ingrese su fecha de nacimiento.",
        phoneNumberError: "Por favor, ingrese su número de teléfono.",
        idError: "El ID de estudiante solo puede contener números.",
        idLengthError: "El ID de estudiante debe tener al menos 5 caracteres.",
        passwordcheckError: "La contraseña debe incluir letras, números y caracteres especiales.",
        passwordLengthError: "La contraseña debe tener al menos 8 caracteres.",
        passwordMismatch: "Las contraseñas no coinciden.",
        phoneNumbercheckError: "Por favor, ingrese un formato de número de teléfono válido.",
        phonePlaceholder: "Ingrese en formato 010-1234-5678",
        successMessage: "¡Registro de usuario exitoso!",
        checkInputs: "Por favor, verifique sus entradas."
    }
};

export default function Register() {
    const navigate = useNavigate();
    const [language, setLanguage] = useState('ko');
    const [formData, setFormData] = useState({
        employeeId: '',
        password: '',
        confirmPassword: '',
        birthDate: '',
        phoneNumber: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const t = translations[language];

    useEffect(() => {
        // 언어가 변경될 때마다 오류 메시지를 새 언어로 업데이트
        const updatedErrors = {};
        Object.keys(errors).forEach(key => {
            if (errors[key]) {
                updatedErrors[key] = t[`${key}Error`] || t.fieldRequired;
            }
        });
        setErrors(updatedErrors);
    }, [language]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let tempErrors = { ...errors };
    
        switch (name) {
            case 'employeeId':
                const idValid = /^[0-9]*$/.test(value);
                if (!value) {
                    tempErrors.employeeId = t.employeeIdError;
                } else if (!idValid) {
                    tempErrors.employeeId = t.idError;
                } else if (value.length < 5) {
                    tempErrors.employeeId = t.idLengthError;
                } else {
                    tempErrors.employeeId = '';
                }
                break;
            case 'password':
                const passwordValid = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value);
                if (!value) {
                    tempErrors.password = t.passwordError;
                } else if (!passwordValid) {
                    tempErrors.password = t.passwordcheckError;
                } else if (value.length < 8) {
                    tempErrors.password = t.passwordLengthError;
                } else {
                    tempErrors.password = '';
                }
                break;
            case 'confirmPassword':
                if (!value) {
                    tempErrors.confirmPassword = t.confirmPasswordError;
                } else if (value !== formData.password) {
                    tempErrors.confirmPassword = t.passwordMismatch;
                } else {
                    tempErrors.confirmPassword = '';
                }
                break;
            case 'birthDate':
                if (!value) {
                    tempErrors.birthDate = t.birthDateError;
                } else {
                    tempErrors.birthDate = '';
                }
                break;
            case 'phoneNumber':
                if (!value) {
                    tempErrors.phoneNumber = t.phoneNumberError;
                } else if (!value.match(/^\d{3}-\d{4}-\d{4}$/)) {
                    tempErrors.phoneNumber = t.phoneNumberError;
                } else {
                    tempErrors.phoneNumber = '';
                }
                break;
            default:
                break;
        }
    
        setErrors(tempErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let tempErrors = { ...errors };
        let isValid = true;

        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                tempErrors[key] = t[`${key}Error`] || t.fieldRequired;
                isValid = false;
            } else {
                validateField(key, formData[key]);
            }
        });

        setErrors(tempErrors);

        if (isValid && Object.values(tempErrors).every(error => error === '')) {
            try {
                // API로 데이터 전송 (여기에 실제 API 호출)
                setSuccessMessage(t.successMessage);
                // 성공 메시지 표시 후 로그인 페이지로 이동하는 버튼을 표시
            } catch (error) {
                console.error("회원가입 중 오류 발생:", error);
                setSuccessMessage(t.registrationError);
            }
        } else {
            setSuccessMessage('');
        }
    };
    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <div style={styles.pageContainer}>
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <Btnstyle onClick={() => navigate("/login")}/>
                </div>    

                <h1 style={styles.title}>{t.title}</h1>
                <div style={styles.languageButtons}>
                    <button onClick={() => changeLanguage('ko')}>한국어</button>
                    <button onClick={() => changeLanguage('en')}>English</button>
                    <button onClick={() => changeLanguage('zh')}>中文</button>
                    <button onClick={() => changeLanguage('ja')}>日本語</button>
                    <button onClick={() => changeLanguage('es')}>Español</button>
                </div>
                    
                
            </header>
            <div style={styles.body}>
                <div style={styles.registerFrame}>
                    <form onSubmit={handleSubmit}>
                        <div className="infoTextFrame">
                            <p style={styles.infoOptionalText}>{t.requiredInfo}</p>
                        </div>

                        <div className="userInputFrame">
                            <div style={styles.inputTitle}>{t.studentId}</div>
                            <div style={styles.inputWrap}>
                                <input
                                    type="text"
                                    onChange={handleInputChange}
                                    style={styles.input} 
                                    name="employeeId"/>
                            </div>
                            {errors.employeeId && <div style={styles.errorMessage}>{errors.employeeId}</div>}
                        </div>

                        <div className="userInputFrame">
                            <div style={styles.inputTitle}>{t.password}</div>
                            <div style={styles.inputWrap}>
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            </div>
                            {errors.password && <div style={styles.errorMessage}>{errors.password}</div>}
                        </div>

                        <div className="userInputFrame">
                            <div style={styles.inputTitle}>{t.confirmPassword}</div>
                            <div style={styles.inputWrap}>
                                <input 
                                    type="password" 
                                    name="confirmPassword" 
                                    value={formData.confirmPassword} 
                                    onChange={handleInputChange}
                                    style={styles.input} 
                                />
                            </div>
                            {errors.confirmPassword && <div style={styles.errorMessage}>{errors.confirmPassword}</div>}
                        </div>

                        <div className="userInputFrame">
                            <div style={styles.inputTitle}>{t.birthDate}</div>
                            <div style={styles.inputWrap}>
                                <input 
                                    type="date" 
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleInputChange}
                                    style={styles.input} 
                                />
                            </div>
                        </div>

                        <div className="userInputFrame">
                            <div style={styles.inputTitle}>{t.phoneNumber}</div>
                            <div style={styles.inputWrap}>
                                <input 
                                    type="tel" 
                                    name="phoneNumber" 
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange} 
                                    placeholder={t.phonePlaceholder}
                                    style={styles.input}
                                />
                            </div>
                            {errors.phoneNumber && <div style={styles.errorMessage}>{errors.phoneNumber}</div>}
                        </div>

                        <div className="complete">
                            <button type="submit" style={styles.completeButton}>{t.register}</button>
                        </div>
                    </form>
                    
                    {successMessage && (
                        <div style={{ color: 'green', marginTop: '10px' }}>
                            {successMessage}
                            <button onClick={() => navigate('/login')}>{t.goToLogin}</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}