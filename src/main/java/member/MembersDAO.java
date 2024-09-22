package member;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class MembersDAO {
	final String JDBC_DRIVER = "org.h2.Driver";
	final String JDBC_URL = "jdbc:h2:tcp://localhost/~/jwbookdb";
	
	public Connection open() { //DB 연결
		Connection conn = null;
		try {
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(JDBC_URL, "jwbook", "1234");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return conn;
	}
	
	public boolean isIdExists(String id) throws Exception {
	    String sql = "SELECT COUNT(*) FROM members WHERE id = ?";
	    try (Connection conn = open();
	         PreparedStatement pstmt = conn.prepareStatement(sql)) {
	        pstmt.setString(1, id);
	        ResultSet rs = pstmt.executeQuery();
	        if (rs.next()) {
	            return rs.getInt(1) > 0; // 0보다 크면 아이디가 존재함
	        }
	    }
	    return false;
	}

	public boolean isTelExists(String tel) throws Exception {
	    String sql = "SELECT COUNT(*) FROM members WHERE tel = ?";
	    try (Connection conn = open();
	         PreparedStatement pstmt = conn.prepareStatement(sql)) {
	        pstmt.setString(1, tel);
	        ResultSet rs = pstmt.executeQuery();
	        if (rs.next()) {
	            return rs.getInt(1) > 0; // 0보다 크면 전화번호가 존재함
	        }
	    }
	    return false;
	}

	//신규등록
	
	public void addMember(Members m) throws Exception {
		Connection conn = open();
		
		String sql = "insert into members(id, pwd, birth, tel) values(?,?,?,?)";
		PreparedStatement pstmt = conn.prepareStatement(sql);
		
		try(pstmt; conn;) {
			pstmt.setString(1, m.getId());
			pstmt.setString(2, m.getPwd());
			pstmt.setDate(3, m.getBirth());
			pstmt.setString(4, m.getTel());
			
			pstmt.executeUpdate();
		}
	}
	
	//로그인
	public Members login(Members m) throws Exception {
		Connection conn = open();
		
		String sql = "select mno, id from members where id=? and pwd=?";
		
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, m.getId());
		pstmt.setString(2, m.getPwd());
		ResultSet rs = pstmt.executeQuery();
		Members lm = null;
		
		try(rs; pstmt; conn;) {
			rs.next();
			
			lm = new Members();
			lm.setMno(rs.getInt("mno"));
			lm.setId(rs.getString("id"));
		}
		
		return lm;
	}

	//전체 목록 가져오기
	public List<Members> getAll() throws Exception {
		Connection conn = open();
		List<Members> membersList = new ArrayList<>();
		
		String sql = "select mno, id from members";
		Statement stm = conn.createStatement();
		ResultSet rs = stm.executeQuery(sql);

		try(conn; stm; rs) {
			while(rs.next()) {
				Members n = new Members();
				n.setMno(rs.getInt("mno"));
				n.setId(rs.getString("id"));
				
				membersList.add(n);
			}
			return membersList;
		}
	}
	
	public Members getMember(int mno) throws Exception {
		Connection conn = open();
		Members m = new Members();
		
		String sql = "select * from members where mno=?";
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setInt(1, mno);
		ResultSet rs = pstmt.executeQuery();
		
		try(rs; pstmt; conn;) {
			rs.next();
			m.setMno(rs.getInt("mno"));
			m.setId(rs.getString("id"));
			m.setPwd(rs.getString("pwd"));
		}
		
		return m;
	}
	
	public void updateMember(Members m) throws Exception {
		Connection conn = open();
		
		String sql = "update members set id=? where mno=?";
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, m.getId());
		pstmt.setInt(2, m.getMno());
		
		pstmt.executeUpdate();
	}
	
	public void deleteMember(int mno) throws Exception {
		Connection conn = open();
		
		String sql = "delete from members where mno=?";
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setInt(1, mno);
		pstmt.executeUpdate();
	}
}
