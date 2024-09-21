import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Manger_Login';
import Register from './Register';
import Main from './Main';
import MemberRegister from "./Member_Register"
import Member_login from "./Member_login"
import Payment from "./Payment"
import { SuccessPage } from "./Paysuccess"  // 수정된 부분

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
                <Route path="/paysuccess" element={<SuccessPage/>}/>  // 수정된 부분
            </Routes>
        </Router>
    );
}

export default App;