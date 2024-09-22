package member;

import java.io.IOException;
import java.lang.reflect.Method;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;

@WebServlet("/member/list")
public class MembersController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private MembersDAO dao;
	private ServletContext ctx;
	
	private final String START_PAGE = "member/memberList.jsp";

	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		dao = new MembersDAO();
		ctx = this.getServletContext();
	}

	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String action = request.getParameter("action");
		
		Method m;
		String view = "";
		
		if(action == null) {
			action = "listMember";
		}
		
		try {
			m = this.getClass().getMethod(action, HttpServletRequest.class);
			view = (String)m.invoke(this, request);
		} catch (NoSuchMethodException e) {
 		   e.printStackTrace();
 		   ctx.log("요청 action 없음!!");
 		   request.setAttribute("error",  "action 파라미터가 잘못되었습니다!!");
 		   view = START_PAGE;
		} catch (Exception e) {
			e.printStackTrace();
		}
       
		//viw 위임
		if(view.startsWith("redirect:/")) {
    	   String rview = view.substring("redirect:/".length());
    	   response.sendRedirect(rview);
        } else {
    	   RequestDispatcher dispatcher = request.getRequestDispatcher(view);
    	   dispatcher.forward(request, response);
        }
	}
	
	public String deleteMember(HttpServletRequest request) {
		try {
			dao.deleteMember(Integer.parseInt(request.getParameter("mno")));
		} catch(Exception e) {
			e.printStackTrace();
			ctx.log("멤버 삭제 오류!!");
			request.setAttribute("error", "멤버 삭제 과정에서 오류가 발생했습니다.");
		}
		
		return "redirect:/list?action=listMember";
	}
	
	public String updateMember(HttpServletRequest request) {
		Members m = new Members();
		try {
			BeanUtils.populate(m, request.getParameterMap());
			dao.updateMember(m);
		} catch (Exception e) {
			e.printStackTrace();
			ctx.log("멤버 수정 오류!!");
			request.setAttribute("error", "멤버 수정 과정에서 오류가 발생했습니다.");
		}
		
		return "redirect:/list?action=listMember";
		
	}
	
	public String getMember(HttpServletRequest request) {
		try {
			request.setAttribute("member", dao.getMember(Integer.parseInt(request.getParameter("mno"))));
		} catch(Exception e) {
			e.printStackTrace();
		}
		return "/member/updateForm.jsp";
	}
	
	public String logout(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.invalidate();
		
		return "redirect:/list?action=listMember";
	}
	
	public String login(HttpServletRequest request) {
		if(request.getParameter("id")==null) {
			return "loginForm.jsp";
		}
		
		Members m = new Members();
		try {
			BeanUtils.populate(m, request.getParameterMap());
			HttpSession session = request.getSession();
			session.setAttribute("lm", dao.login(m));
		} catch(Exception e) {
			e.printStackTrace();
			ctx.log("로그인 정보조회 오류!!");
			request.setAttribute("error", "아이디와 비밀번호가 일치하지 않습니다."); //이메일, 비밀번호 일치 x
			return "loginForm.jsp";
		}
		
		return "redirect:/list?action=listMember";
	}
	
	public String listMember(HttpServletRequest request) {
		//dao에게 목록 요청 --> 결과를 request에 저장
		try {
			request.setAttribute("memberList", dao.getAll());
		} catch(Exception e) {
			e.printStackTrace();
			ctx.log("멤버목록 생성 오류!!");
			request.setAttribute("error", "멤버 목록이 정상적으로 처리되지 않았습니다!!");
		}
		
		return "/member/memberList.jsp";
	}
	public String addMember(HttpServletRequest request) {
	    if (request.getParameter("id") == null) {
	        return "addForm.jsp";
	    }

	    String id = request.getParameter("id");
	    String tel = request.getParameter("tel");
	    String password = request.getParameter("pwd");
	    String password2 = request.getParameter("pwd2");

	    // 비밀번호 확인 로직
	    if (!password.equals(password2)) {
	        request.setAttribute("error", "비밀번호가 일치하지 않습니다!");
	        return "addForm.jsp";
	    }

	    try {
	        // 중복 체크
	        if (dao.isIdExists(id)) {
	            request.setAttribute("error", "이미 존재하는 아이디입니다.");
	            return "addForm.jsp";
	        }
	        if (dao.isTelExists(tel)) {
	            request.setAttribute("error", "이미 존재하는 전화번호입니다.");
	            return "addForm.jsp";
	        }
	        
	        Members m = new Members();
	        BeanUtils.populate(m, request.getParameterMap());
	        dao.addMember(m);
	    } catch (Exception e) {
	        e.printStackTrace();
	        ctx.log("멤버 추가 과정에서 문제 발생!!");
	        request.setAttribute("error", "멤버가 정상적으로 등록되지 않았습니다!!");
	    }

	    return "redirect:/list?action=listMember";
	}

//	public String addMember(HttpServletRequest request) {
//	    if(request.getParameter("id") == null) {
//	        return "addForm.jsp";
//	    }
//
//	    String password = request.getParameter("pwd");
//	    String password2 = request.getParameter("pwd2");
//
//	    // 비밀번호 확인 로직
//	    if (!password.equals(password2)) {
//	    	request.setAttribute("error", "비밀번호가 같지 않습니다."); //이메일, 비밀번호 일치 x"
//			return "addForm.jsp"; // 다시 폼으로 리다이렉트
//	    }
//	    Members m = new Members();
//	    
//	    try {
//	        BeanUtils.populate(m, request.getParameterMap());
//	        dao.addMember(m);
//	    } catch (Exception e) {
//	        e.printStackTrace();
//	        ctx.log("멤버 추가 과정에서 문제 발생!!");
//	        request.setAttribute("error", "멤버가 정상적으로 등록되지 않았습니다!!");
//	    }
//
//	    return "redirect:/list?action=listMember";
//	}

}
