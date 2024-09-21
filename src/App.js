import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Main from './Main'; // 메인 컴포넌트 임포트

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/main" element={<Main />} /> {/* 메인 페이지 라우트 추가 */}
            </Routes>
        </Router>
    );
}

export default App;
