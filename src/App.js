import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import First from './First';
import Login from './Manger_Login';
import Register from './Register';
import Main from './Main';
import MemberRegister from "./Member_Register";
import Member_login from "./Member_login";
import Payment from "./Payment";
import { SuccessPage } from "./paysuccess";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<First />} />
                <Route path="/manager-login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/main" element={<Main />} />
                <Route path="/member_register" element={<MemberRegister/>}/>
                <Route path="/member_login" element={<Member_login/>}/>
                <Route path="/payment" element={<Payment/>}/>
                <Route path="/paysuccess" element={<SuccessPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;