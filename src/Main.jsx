import React, { useState } from 'react';
import "./font/font.css";

const styles = {
  App: {
    textAlign: 'center',
  },
  headname: {
    display: 'grid',
    background: 'red',
    width: '100%',
    color: 'white',
    fontFamily: "NanumSquareNeoExtraBold",
    borderRadius: '10px',
  },
  menuContainer: {
    width: '1000px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '20px',
    float: 'center',
  },
  h3: {
    fontFamily: "'NanumSquareNeo'",
  },
  h2:{
    fontFamily:"'NanumSquareNeoExtraBold'"
  },
  menuItem: {
    cursor: 'pointer',
    textAlign: 'center',
  },
  key:{
    fontFamily: "'NanumSquareNeo'",
    listStyleType:'none'
  },
  selectBox: {
    backgroundColor: '#F7f7f7', // 눈에 띄는 색상
    width: '100%', 
    padding: '33px',
    borderRadius: '10px',
    marginTop: '20px', // 메뉴판 아래로 20px 띄움
    float:'center'
  }
};

const menuData = [
    { name: "우동&주먹밥", image: "udong.jpg", price: 5000 },
    { name: "순두부찌개정식", image: "tofusoup.jpg", price: 5000 },
    { name: "양푼이돈육찜", image: "jjim.jpg", price: 5500 },
    { name: "돈가스정식", image: "dondon.jpg", price: 5000 },
    { name: "육회비빔밥", image: "bibim.jpg", price: 6000 },
    { name: "냉면", image: "myeon.jpg", price: 5000 }
];
  

function Main() {
    const [selectedItems, setSelectedItems] = useState([]);
  
    const handleSelect = (menuName) => {
      setSelectedItems((prevItems) =>
        prevItems.some(item => item.name === menuName)
          ? prevItems.filter(item => item.name !== menuName)
          : [...prevItems, { name: menuName, quantity: 1 }]
      );
    };
  
    const handleQuantityChange = (menuName, quantity) => {
      setSelectedItems((prevItems) =>
        prevItems.map(item =>
          item.name === menuName ? { ...item, quantity: Math.max(1, quantity) } : item
        )
      );
    };
  
    const calculateTotal = () => {
      return selectedItems.reduce((total, item) => {
        const menu = menuData.find(menu => menu.name === item.name);
        return total + (menu.price * item.quantity);
      }, 0);
    };

  return (
    <div style={styles.App}>
      <div style={styles.headname}>
        <h4>메뉴판</h4>
      </div>
      <div style={styles.menuContainer}>
        {menuData.map((menu, index) => (
          <div key={index} style={styles.menuItem}>
            <img src={`image/${menu.image}`} alt={menu.name} width='300' height='300' />
            <h3 style={styles.h3}>{menu.name}</h3>
            <p style={{ fontSize: '16px', fontWeight: 'bold' ,fontFamily: "'NanumSquareNeo'"}}>{menu.price} 원</p>
            {selectedItems.some(item => item.name === menu.name) ? (
              <>
                <button onClick={() => handleSelect(menu.name)}>취소</button>
                <div>
                  <label style={{fontFamily: "'NanumSquareNeo'"}}>수량: </label>
                  <input
                    type="number"
                    min="1"
                    value={
                      selectedItems.find(item => item.name === menu.name)?.quantity || 1
                    }
                    onChange={(e) =>
                      handleQuantityChange(menu.name, parseInt(e.target.value))
                    }
                  />
                </div>
              </>
            ) : (
              <button onClick={() => handleSelect(menu.name)}>선택</button>
            )}
          </div>
        ))}
      </div>
      {selectedItems.length > 0 && (
        <div className="selectBox" style={styles.selectBox}>
          <h2 style={styles.h2}>선택한 메뉴</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #000' ,fontFamily: "'NanumSquareNeoExtraBold'"}}>메뉴</th>
                <th style={{ border: '1px solid #000' ,fontFamily: "'NanumSquareNeoExtraBold'"}}>수량</th>
                <th style={{ border: '1px solid #000',fontFamily: "'NanumSquareNeoExtraBold'" }}>가격</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, index) => {
                const menu = menuData.find(menu => menu.name === item.name);
                return (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' ,fontFamily: "'NanumSquareNeo'"}}>{item.name}</td>
                    <td style={{ border: '1px solid #000' ,fontFamily: "'NanumSquareNeo'"}}>{item.quantity}</td>
                    <td style={{ border: '1px solid #000' ,fontFamily: "'NanumSquareNeo'"}}>{menu.price * item.quantity} 원</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="2" style={{ textAlign: 'right', border: '1px solid #000', fontWeight: 'bold' ,fontFamily: "'NanumSquareNeoExtraBold'"}}>Total</td>
                <td style={{ border: '1px solid #000', fontWeight: 'bold',fontFamily: "'NanumSquareNeo'" }}>{calculateTotal()} 원</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default Main;

