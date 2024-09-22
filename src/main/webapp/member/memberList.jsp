<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<a href="/members_mvc/member/list?action=addMember">신규등록</a>
	<c:if test="${empty lm.id}">
		<a href="/members_mvc/member/list?action=login">로그인</a>
	</c:if>
	<c:if test="${!empty lm.id}">
		 ${lm.id} <a href="/members_mvc/member/list?action=logout">로그아웃</a>
	</c:if>
<%-- 	<hr>	
	<c:forEach var="m" items="${memberList}">
		${m.mno}
		 <a href="/members_mvc/member/list?action=getMember&mno=${m.mno}">${m.id}</a>
		  <br>
	</c:forEach> --%>
</body>
</html>