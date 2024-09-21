# <키퍼스> - <메뉴버디>
## 서비스 요약
- 메뉴버디는 외국어 지원 학식 키오스크 웹서비스입니다.
- 메뉴버디 서비스는 관리자가 학식 메뉴를 등록하면, 일본어, 중국어, 스페인어, 영어로 메뉴가 번역되며 외국인 학우가 손쉽게 학식을 주문할 수 있는 서비스입니다.

## 주제 구분
-	E타입 경북대에 다니는 다양한 배경의 학우들을 위한 서비스

## 팀원 소개
### FE
---
- 신채이: IT대학 컴퓨터학부 인공지능컴퓨팅전공, 로그인, 관리자 등록 페이지 제작. 메인 페이지와 연동
- 황원영: IT대학 컴퓨터학부 인공지능컴퓨팅전공, 메인 페이지(학식 지원 페이지) 제작
### BE
---
- 신지우: // 관리자 등록 DB 및 연동 제작
### PM
---
- 김나현: IT대학 컴퓨터학부 인공지능컴퓨팅전공, Github 및 각종 문서관리, 제작 도움 

## 시연 영상
(필수) Youtube 링크
(선택) Github Repository 페이지에서 바로 볼 수 있도록 넣어주셔도 좋습니다.

## 서비스 소개
### 서비스 개요
경북대학교 학식 키오스크는 언어 서비스가 제한돼 있어 이를 해결하고자 서비스를 제작하였음.
사용자는 키오스크 사용 전, 미리 학식 메뉴를 알 수 있으며 한국어가 아닌 언어로도 볼 수 있음에 편의성을 제공하고 있음.
또한 웹으로도 미리 주문할 수 있게하여 실용성을 높임.
이러한 점을 통해 외국인들의 학식 이용률을 증가시키며, 언어 소외계층을 최소화함.


### 타서비스와의 차별점
1. 외국인 계층도 접근 가능하게 하여 상업 이용도를 높임.
2. 디지털 소외계층을 내국인뿐만 아니라 외국인까지 폭넓게 정의하여 디지털 소외계층 해소에 이바지함.
3. 실제 결제까지 이어진다는 점에서, 식사 대기 시간을 줄일 수 있음.

### 구현 내용 및 결과물
1. 관리자 등록 및 로그인 시스템
 - 교직원 ID와 password를 입력 받아 관리자 등록을 실시함.
 - 로그인 시, 교직원 ID와 password를 통해 로그인함
2. 학식 외국어 지원 페이지
 - 학식 이용자수가 제일 많은 공대식당 기준으로 메뉴판을 제작함.
 - 일어, 스페인어, 중국어, 영어를 지원함.



### 구현 방식
- 프론트엔드: React 환경 기반 Html+css+javascript를 사용
- 벡앤드: Servlet JSP 사용
<div align=center><h1>📚 STACKS</h1></div>
<div align=center>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
  <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
</div>


## 향후 개선 혹은 발전 방안
### 발전 방안
- 결제 팝업창 등 실제 주문으로 연동시킬 것.
- 주문 번호 등 고유 ID를 부여하여 키오스크에 가면 주문번호로 바로 번호표를 뽑을 수 있게 함.
- 키오스크에서 쓸 DB와 웹 서비스에서 쓸 공동 DB를 개발해야함.

