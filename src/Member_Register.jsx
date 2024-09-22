import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios'; // axios 추가
import logo from "../src/image/04-2.jpg";


const styles = {
    registerFrame: {
        position: 'absolute',
        top: '10px',
        bottom: '0',
        width: '100%',
        maxWidth: '500px',
        padding: '0 30px',
        left: '50%',
        transform: 'translate(-50%, 0)',
        backgroundColor: '#F7f7f7',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        display:'flex-start',
        marginTop: '10px',
        fontSize: '20px',
        fontWeight: '700',
        color: '#262626',
        fontFamily: 'NanumSquareNeoExtraBold',
        marginBottom: '10px',
    },
    infoOptionalText: {
        fontFamily: 'NanumSquareNeoExtraBold',
        marginBottom: '20px',
    },
    inputTitle: {
        fontSize: '15px',
        fontWeight: 600,
        color: '#262626',
        textAlign: 'left',
        fontFamily: "'NanumSquareNeo'",
        marginBottom: '10px',
        marginTop: '10px',
        padding:'10px'
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
        marginTop: '10px',
    },
    errorMessage: {
        color: '#ef0000',
        fontSize: '12px',
        fontFamily: 'NanumSquareNeo',
    },
};

const Btnstyle = styled.button`
    float: left;
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
    
        // ID 입력 시 5자 이상인지 체크
        validateField(name, value);
    };
    
    const validateField = (name, value) => {
        let tempErrors = { ...errors };
    
        switch (name) {
            case 'employeeId':
                const idValid = /^[a-zA-Z0-9]*$/.test(value);
                if (!idValid) {
                    tempErrors.employeeId = '학번은 숫자만 사용할 수 있습니다.';
                } else if (value.length < 5) {
                    tempErrors.employeeId = '학번은 5자 이상이어야 합니다.';
                } else {
                    tempErrors.employeeId = '';
                }
                break;
            case 'password':
                const passwordValid = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value);
                if (!passwordValid) {
                    tempErrors.password = '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.';
                } else if (value.length < 8) {
                    tempErrors.password = '비밀번호는 8자 이상이어야 합니다.';
                } else {
                    tempErrors.password = '';
                }
                break;
            case 'confirmPassword':
                tempErrors.confirmPassword = value === formData.password ? '' : '비밀번호가 일치하지 않습니다.';
                break;
            case 'phoneNumber':
                tempErrors.phoneNumber = value.match(/^\d{3}-\d{4}-\d{4}$/) ? '' : '올바른 전화번호 형식을 입력하세요.';
                break;
            default:
                break;
        }
    
        setErrors(tempErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).every(key => !errors[key])) {
            axios({
                method: "post",
                url: "jdbc:h2:tcp://localhost/~/jwbookdb",
                data: {
                  email: formData.employeeId,  // corrected variable names
                  password: formData.password, // corrected variable names
                },
            })
            .then((res) => {
                console.log(res);
                const accessToken = res.data.token;
                // Set token in cookies
                document.cookie = `is_login=${accessToken}; path=/`;
                navigate("/");  
            })
            .catch((error) => {
                console.log(error);
            });
        } else {
            alert("입력 값을 확인해주세요.");
        }
    };
    

    const handleLoginClick=()=> {
        navigate("/login");
    }
    
    return (
        <div style={styles.registerFrame}>
            <form onSubmit={handleSubmit}>
                <div className="header">
                    <Btnstyle onClick={handleLoginClick}/>
                </div>
                <br /> 
                <br/>
                <div style={styles.title}>사용자 등록 페이지</div>
                
                <div className="infoTextFrame">
                    <p style={styles.infoOptionalText}>필수 사항</p>
                </div>

                <div className="userInputFrame">
                    <div style={styles.inputTitle}>Student ID</div>
                    <div style={styles.inputWrap}>
                        <input
                            type="text"
                            onChange={handleInputChange}
                            style={styles.input} 
                            name="employeeId"/>
                        {errors.employeeId && <div style={styles.errorMessage}>{errors.employeeId}</div>}
                    </div>
                </div>

                <div className="userInputFrame">
                    <div style={styles.inputTitle}>비밀번호</div>
                    <div style={styles.inputWrap}>
                        <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleInputChange}
                        style={styles.input}
                         />
                        {errors.password && <div style={styles.errorMessage}>{errors.password}</div>}
                    </div>
                </div>

                <div className="userInputFrame">
                    <div style={styles.inputTitle}>비밀번호 확인</div>
                    <div style={styles.inputWrap}>
                        <input 
                        type="password" 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleInputChange}
                        style={styles.input} />
                        {errors.confirmPassword && <div style={styles.errorMessage}>{errors.confirmPassword}</div>}
                    </div>
                </div>

                <div className="userInputFrame">
                    <div style={styles.inputTitle}>생년월일</div>
                    <div style={styles.inputWrap}>
                        <input 
                        type="date" 
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        style={styles.input} />
                    </div>
                </div>

                <div className="userInputFrame">
                    <div style={styles.inputTitle}>전화번호</div>
                    <div style={styles.inputWrap}>
                        <input 
                        type="tel" 
                        name="phoneNumber" 
                        value={formData.phoneNumber}
                        onChange={handleInputChange} 
                        placeholder="010-1234-5678 형태로 입력하세요" 
                        style={styles.input}/>
                        {errors.phoneNumber && <div style={styles.errorMessage}>{errors.phoneNumber}</div>}
                    </div>
                </div>

                <div className="complete">
                    <button type="submit" style={styles.completeButton}>등록하기</button>
                </div>
            </form>
            {successMessage && <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>}
        </div>
    );
}
