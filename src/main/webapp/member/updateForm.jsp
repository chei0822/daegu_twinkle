<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script>
	function deleteMember() {
		if(confirm("정말로 삭제하시겠습니까?")) {
			var form = document.getElementById("updateForm");
			form.action="/members_mvc/member/list?action=deleteMember";
			form.submit();
		}	
	}
</script>
</head>
<body>
	<h1>회원정보수정 및 삭제</h1>
	<hr>
	<form id="updateForm" action="/members_mvc/member/list?action=updateMember" method="post">
		번 호 : <input type="text" name="mno" value="${member.mno}" readonly="readonly"><br>
		아이디 : <input type="id" name="id" value="${member.id}"><br>
		<input type="submit" value="수정"> 
		<input type="button" value="삭제" onclick="deleteMember()"> 
		<input type="reset" value="취소">
	</form>
</body>
</html>