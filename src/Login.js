import React, { useState } from 'react';

export default function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [idError, setIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false); // 로그인 성공 여부 상태 추가

    const validatePassword = (password) => {
        // 영문, 숫자, 특수문자가 포함된 8자 이상의 비밀번호 정규식
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // 비밀번호 유효성 검사
        if (!validatePassword(newPassword)) {
            setPasswordError('영문, 숫자, 특수문자 포함 8자 이상 입력해주세요');
        } else {
            setPasswordError(''); // 유효성 검사를 통과하면 에러 메시지 제거
        }
    };

    const handleIdChange = (e) => {
        const newId = e.target.value;
        setId(newId);

        // 아이디 입력 여부 확인
        if (newId === '') {
            setIdError('올바른 아이디를 입력해주세요');
        } else {
            setIdError(''); // 올바른 아이디가 입력되면 에러 메시지 제거
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 제출 시 입력값 검증
        if (id === '') {
            setIdError('올바른 아이디를 입력해주세요');
        }
        if (!validatePassword(password)) {
            setPasswordError('영문, 숫자, 특수문자 포함 8자 이상 입력해주세요');
        }

        // 아이디와 비밀번호가 정확하면 로그인 성공 처리
        if (id === 'knu2024' && password === '1946knu@@') {
            setLoginSuccess(true); // 로그인 성공 상태 설정
            setIdError('');
            setPasswordError('');
        } else {
            setLoginSuccess(false); // 실패 시 상태 초기화
            setIdError('아이디 또는 비밀번호가 일치하지 않습니다.');
            setPasswordError('');
        }
    };

    return (
        <div className="page">
            <div className="titleWrap">
                관리자 로그인
            </div>
            <form onSubmit={handleSubmit}>
                <div className="contentWrap">
                    <label className="inputTitle" htmlFor="id">
                        아이디
                    </label>
                    <div className="inputWrap">
                        <input
                            id="id"
                            type="text"
                            placeholder="knu1946"
                            value={id}
                            onChange={handleIdChange}
                        />
                    </div>
                </div>

                <div className="errorMessageWrap">
                    {idError && <div>{idError}</div>}
                </div>

                <div className="contentWrap">
                    <label className="inputTitle" htmlFor="password">
                        비밀번호
                    </label>
                    <div className="inputWrap">
                        <input
                            id="password"
                            type="password"
                            placeholder="영문,숫자,특수문자 포함 8자 이상"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                </div>

                <div className="errorMessageWrap">
                    {passwordError && <div>{passwordError}</div>}
                </div>

                <div>
                    <button type="submit">
                        로그인하기
                    </button>
                </div>
            </form>

            {/* 로그인 성공 시 메시지 출력 */}
            {loginSuccess && <div>로그인 성공!</div>}
        </div>
    );
}
