import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const styles = {
    registerFrame: {
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
    title: {
        marginTop: '8px',
        fontSize: '26px',
        fontWeight: '700',
        color: '#262626',
        fontFamily: 'NanumSquareNeoExtraBold',
        marginBottom: '5px',
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
    knuLogo: {
        float: 'left',
        width: '100px',
        marginBottom: '3px',
    },
    errorMessage: {
        color: '#ef0000',
        fontSize: '12px',
        fontFamily: 'NanumSquareNeo',
    },
};

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
                const idValid = /^[a-zA-Z0-9]*$/.test(value);
                if (!idValid) {
                    tempErrors.employeeId = '교직원 ID는 영문자와 숫자만 사용할 수 있습니다.';
                } else if (value.length < 5) {
                    tempErrors.employeeId = '교직원 ID는 5자 이상이어야 합니다.';
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

    const validateForm = () => {
        let tempErrors = { ...errors };
        let isValid = true;

        // 각 필드가 빈칸인지 체크
        if (!formData.employeeId) {
            tempErrors.employeeId = '교직원 ID를 입력하세요.';
            isValid = false;
        }
        if (!formData.password) {
            tempErrors.password = '비밀번호를 입력하세요.';
            isValid = false;
        }
        if (!formData.confirmPassword) {
            tempErrors.confirmPassword = '비밀번호 확인을 입력하세요.';
            isValid = false;
        }
        if (!formData.birthDate) {
            tempErrors.birthDate = '생년월일을 입력하세요.';
            isValid = false;
        }
        if (!formData.phoneNumber) {
            tempErrors.phoneNumber = '전화번호를 입력하세요.';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // 빈 입력 필드 체크
        const newErrors = {};
        if (!formData.employeeId) newErrors.employeeId = '교직원 ID는 필수입니다.';
        if (!formData.password) newErrors.password = '비밀번호는 필수입니다.';
        if (!formData.confirmPassword) newErrors.confirmPassword = '비밀번호 확인은 필수입니다.';
        if (!formData.birthDate) newErrors.birthDate = '생년월일은 필수입니다.';
        if (!formData.phoneNumber) newErrors.phoneNumber = '전화번호는 필수입니다.';
    
        // 기존 오류와 병합
        setErrors(newErrors);
    
        // 오류가 없으면 회원가입 처리
        if (Object.keys(newErrors).length === 0) {
            try {
                // API로 데이터 전송 (여기에 실제 API 호출)
                setSuccessMessage('관리자 등록에 성공하였습니다!');
                setTimeout(() => {
                    navigate('/login'); // 로그인 페이지로 이동
                }, 2000);
            } catch (error) {
                console.error("회원가입 중 오류 발생:", error);
            }
        } else {
            alert("모든 필드를 올바르게 입력해주세요.");
        }
    };
    
    return (
        <div style={styles.registerFrame}>
            <form onSubmit={handleSubmit}>
                <div className="header">
                    <img style={styles.knuLogo} alt="04-2" src="image/04-2.jpg" />
                </div>
                <br /> 
                <br/>
                <div style={styles.title}>관리자 등록 페이지</div>
                
                <div className="infoTextFrame">
                    <p style={styles.infoOptionalText}>필수 사항</p>
                </div>

                <div className="userInputFrame">
                    <div style={styles.inputTitle}>교직원 ID</div>
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
