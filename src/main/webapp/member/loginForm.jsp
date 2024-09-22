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

	<h1>관리자 로그인</h1>
	<hr>
	<form action="/members_mvc/member/list?action=login" method="post">
		아이디 : <input type="id" name="id" required="required"><br>
		비 번 : <input type="password" name="pwd" required="required"><br>
		<input type="submit" value="로그인">
	</form>
</body>
</html>