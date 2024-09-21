import React from 'react'

export default function Login(){
    return (
        <div className="page">
           <div className="titleWrap">
            관리자 로그인
           </div>
           <div className="contentWrap">
            <div className="inputTitle">
                아이디
            </div>
            <div className="inputWrap">
                <input placeholder="knu1946"></input>
            </div>
           </div>

           <div className="errorMessageWrap">
            <div>올바른 아이디를 입력해주세요</div>
           </div>

           <div className="contentWrap">
            <div className="inputTitle">
                비밀번호
            </div>
            <div className="inputWrap">
                <input placeholder="영문,숫자,특수문자 포함 8자 이상"></input>
            </div>
           </div>

           <div className="errorMessageWrap">
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>
           </div>

           <div>
            <button>
                로그인하기
            </button>
           </div>
        </div>
    )
}