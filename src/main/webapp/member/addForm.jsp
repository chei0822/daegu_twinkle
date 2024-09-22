<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<c:if test="${!empty error}">
		<script>
			alert("${error}"); <!-- 컨트롤러에 있는 error 임. -->
		</script>
	</c:if>
	<h1>관리자 등록</h1>
	<hr>
	<form action="/members_mvc/member/list?action=addMember" method="post">
		교직원 ID : <input type="text" name="id"><br>
		비 번 : <input type="password" name="pwd"><br>
		비밀번호 확인 : <input type="password" name="pwd2"><br>
		생년월일 : <input type="date" name="birth"><br>
		전화번호 : <input type="text" name="tel"><br>
		<!-- 이 름 : <input type="text" name="name"><br>
		아이디 : <input type="id" name="id"><br> -->
		<input type="submit" value="등록"> 
		<button type="button" onclick="window.location.href='/members_mvc/member/list';">취소</button>
		<!-- <input type="reset" value="취소"> -->
	</form>
</body>
</html>