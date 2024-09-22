import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Manger_Login';
import Register from './Register';
import Main from './Main'; // 메인 컴포넌트 임포트
import MemberRegister from "./Member_Register"
import Member_login from "./Member_login"
import Payment from "./Payment"
import success from "./paysuccess"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/main" element={<Main />} /> 
                <Route path="/member_register" element={<MemberRegister/>}/>
                <Route path="/member_login" element={<Member_login/>}/>
                <Route path="/payment" element={<Payment/>}/>
                <Route path="/success" element={<success/>}/>
            </Routes>
        </Router>
    );
}

export default App;
