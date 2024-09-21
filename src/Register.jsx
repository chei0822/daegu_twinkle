import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import logo from "../src/image/04-2.jpg"

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
    registerFrame: {
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

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employeeId: '',
        password: '',
        confirmPassword: '',
        birthDate: '',
        phoneNumber: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

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
                tempErrors.employeeId = value.length < 5 ? '교직원 ID는 5자 이상이어야 합니다.' : '';
                break;
            case 'password':
                tempErrors.password = !/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value) || value.length < 8
                    ? '비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.'
                    : '';
                break;
            case 'confirmPassword':
                tempErrors.confirmPassword = value !== formData.password ? '비밀번호가 일치하지 않습니다.' : '';
                break;
            case 'phoneNumber':
                tempErrors.phoneNumber = !/^\d{3}-\d{4}-\d{4}$/.test(value) ? '올바른 전화번호 형식을 입력하세요.' : '';
                break;
            default:
                break;
        }

        setErrors(tempErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                newErrors[key] = `${key === 'employeeId' ? '교직원 ID' : key}는 필수입니다.`;
            }
        });

        if (Object.keys(newErrors).length === 0) {
            try {
                // API로 데이터 전송 (여기에 실제 API 호출)
                setSuccessMessage('관리자 등록에 성공하였습니다!');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } catch (error) {
                console.error("회원가입 중 오류 발생:", error);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div style={styles.pageContainer}>
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <Btnstyle onClick={() => navigate("/login")}/>
                </div>
            </header>
            <div style={styles.body}>
                <div style={styles.registerFrame}>
                    <h1 style={styles.title}>관리자 등록 페이지</h1>
                    
                    <form onSubmit={handleSubmit}>
                        <div style={styles.infoOptionalText}>필수 사항</div>

                        <div>
                            <div style={styles.inputTitle}>교직원 ID</div>
                            <div style={styles.inputWrap}>
                                <input
                                    type="text"
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleInputChange}
                                    style={styles.input} 
                                />
                            </div>
                            {errors.employeeId && <div style={styles.errorMessage}>{errors.employeeId}</div>}
                        </div>

                        <div>
                            <div style={styles.inputTitle}>비밀번호</div>
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

                        <div>
                            <div style={styles.inputTitle}>비밀번호 확인</div>
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

                        <div>
                            <div style={styles.inputTitle}>생년월일</div>
                            <div style={styles.inputWrap}>
                                <input 
                                    type="date" 
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleInputChange}
                                    style={styles.input} 
                                />
                            </div>
                            {errors.birthDate && <div style={styles.errorMessage}>{errors.birthDate}</div>}
                        </div>

                        <div>
                            <div style={styles.inputTitle}>전화번호</div>
                            <div style={styles.inputWrap}>
                                <input 
                                    type="tel" 
                                    name="phoneNumber" 
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange} 
                                    placeholder="010-1234-5678 형태로 입력하세요" 
                                    style={styles.input}
                                />
                            </div>
                            {errors.phoneNumber && <div style={styles.errorMessage}>{errors.phoneNumber}</div>}
                        </div>

                        <button type="submit" style={styles.completeButton}>등록하기</button>
                    </form>
                    
                    {successMessage && <div style={{ color: 'green', marginTop: '10px', textAlign: 'center' }}>{successMessage}</div>}
                </div>
            </div>
        </div>
    );
}