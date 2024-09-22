import React, { useState } from 'react';
import "./font/font.css";
import { useNavigate } from 'react-router-dom';
import './buttonaction.css';

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
    /*marginTop: '20px'*/ // 메뉴판 아래로 20px 띄움
    float:'center'
  },
  paybutton:{
    backgroundColor:'#DA2127',
    width:'225px',
    height:'30px',
    float:'right',
    fontSize:'25px',
    cursor:'pointer',
    fontWeight:'700',
    fontFamily: "'NanumSquareNeo'",
    border:'none',
    borderRadius:'10px'
  },
  menuImg: {
    width: '300px', 
    height: '300px', 
    objectFit: 'cover',
    borderRadius: '15px',
    marginTop: '20px'
  },
  menuImgContainer: {
    position: 'relative',
    width: '300px',
    height: '300px',
    marginBottom: '40px'
  },
  ingredientIcon: {
    position: 'absolute',
    bottom: '-40px',
    right: '0px',
    width: '30px',
    height: '30px',
  },
  warningBubble: {
    position: 'absolute',
    bottom: '-70px',
    right: '0px',
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '12px',
    /*whiteSpace: 'nowrap',*/ //엔터 치려면 있어야 함
    whiteSpace: 'pre-wrap', 
    textAlign: 'center'
  },
  quantityInput: {
    width: '50px',
    height: '30px',
    fontSize: '16px',
    textAlign: 'center',
    borderRadius: '10px',
    border: '1px solid #ccc',
    marginLeft: '-5px',
    marginTop: '10px',
    fontFamily: "'NanumSquareNeo'",
  },
  quantityLabel: {
    fontFamily: "'NanumSquareNeo'",
    fontSize: '16px',
    marginRight: '10px',
  },
  languageContainer: {
    /*display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',*/
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  appContainer: {
    position: 'relative',
    width: '100%',
    paddingTop: '60px',
  },  
  langButton: {
    padding: '10px 20px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '15px',
    color: 'white',
    cursor: 'pointer',
    fontFamily: "'NanumSquareNeo'",
  },
};

const languages = ['한국어', 'English', '中文', '日本語'];

const menuTitle = {
  '한국어': '메뉴판',
  'English': 'Menu',
  '中文': '菜单',
  '日本語': 'メニュー'
};

const menuDataMultiLang = [
  {
    name: {
      '한국어': '우동&주먹밥',
      'English': 'Udon & Rice Ball',
      '中文': '乌冬面和饭团',
      '日本語': 'うどんとおにぎり'
    },
    image: "udong.jpg",
    price: 5000,
    ingredients: []
  },
  { 
    name: {
      '한국어': "순두부찌개정식",
      'English': 'Soft tofu stew set',
      '中文': '嫩豆腐汤套餐',
      '日本語': 'スンドゥブチゲ定食'
    },
    image: "tofusoup.jpg", 
    price: 5000, ingredients: [] },
  { 
    name: {
      '한국어': "양푼이돈육찜",
      'English': 'Braised spicy pork\nwith sauce on the pot',
      '中文': '辣炖猪肉锅',
      '日本語': '鍋のピリ辛豚肉の蒸し物'
    },
    image: "jjim.jpg", 
    price: 5500, 
    ingredients: ['pork'] },
  { 
    name: {
      '한국어': "돈가스정식",
      'English': 'Pork cutlet set',
      '中文': '炸猪排套餐',
      '日本語': '豚カツ定食'
    }, 
    image: "dondon.jpg", 
    price: 5000, ingredients: ['pork'] },
  { 
    name: {
      '한국어': "육회비빔밥",
      'English': 'Raw beef mixed with rice',
      '中文': '生牛肉拌饭',
      '日本語': 'ユッケビビンバ'
    }, 
    image: "bibim.jpg", 
    price: 6000, ingredients: ['beef'] },
  { 
    name: {
      '한국어': "냉면",
      'English': 'Cold noodles',
      '中文': '冷面',
      '日本語': '冷麺'
    }, 
    image: "myeon.jpg", 
    price: 5000, ingredients: [] }
];
const warningMessages = {
  pork: {
    '한국어': "돼지고기가\n포함되어 있습니다",
    'English': "This menu\ncontains pork",
    '中文': "此菜品\n含有猪肉",
    '日本語': "このメニューには\n豚肉が含まれています"
  },
  beef: {
    '한국어': "소고기가\n포함되어 있습니다",
    'English': "This menu\ncontains beef",
    '中文': "此菜品\n含有牛肉",
    '日本語': "このメニューには\n牛肉が含まれています"
  }
};
  

function Main() {
    const [selectedItems, setSelectedItems] = useState([]);
    
    const [showWarning, setShowWarning] = useState({});

    const [currentLang, setCurrentLang] = useState('한국어');
  
    /*const handleSelect = (menuName) => {
      setSelectedItems((prevItems) =>
        prevItems.some(item => item.name === menuName[currentLang])
          ? prevItems.filter(item => item.name !== menuName[currentLang])
          : [...prevItems, { name: menuName[currentLang], quantity: 1 }]
      );
    };*/
    const handleSelect = (menuName) => {
      setSelectedItems((prevItems) => {
        const existingItem = prevItems.find(item => item.name === menuName[currentLang]);
        if (existingItem) {
          return prevItems.filter(item => item.name !== menuName[currentLang]);
        } else {
          return [...prevItems, { name: menuName[currentLang], quantity: 1 }];
        }
      });
    };

    const navigate = useNavigate();
    /*const handleIconClick = (menuName, ingredient) => {
      setShowWarning(prev => ({
        ...prev,
        [menuName]: prev[menuName] ? null : ingredient
      }));
    };*/
    const handleIconClick = (menuName, ingredient) => {
      setShowWarning(prev => ({
        ...prev,
        [menuName]: ingredient
      }));

      setTimeout(() => {
        setShowWarning(prev => ({
          ...prev,
          [menuName]: null
        }));
      }, 2000);
    };

    const LanguageButtons = () => (
      <div style={styles.languageContainer}>
        {languages.map(lang => (
          <button
            key={lang}
            onClick={() => setCurrentLang(lang)}
            style={{
              ...styles.langButton,
              backgroundColor: currentLang === lang ? 'blue' : 'gray'
            }}
          >
            {lang}
          </button>
        ))}
      </div>
    );
  
    const handleQuantityChange = (menuName, quantity) => {
      setSelectedItems((prevItems) =>
        prevItems.map(item =>
          item.name === menuName ? { ...item, quantity: Math.max(1, quantity) } : item
        )
      );
    };
  
    const calculateTotal = () => {
      return selectedItems.reduce((total, item) => {
        const menu = menuDataMultiLang.find(menu => menu.name[currentLang] === item.name);
        return total + (menu.price * item.quantity);
      }, 0);
    };

    const handlePaymentClick =() => {
      navigate('/Payment', {
        state:{selectedItems}
      })
    }

  return (
    
      <div style={styles.App}>
      <div style={styles.headname}>
        <h4>{menuTitle[currentLang]}</h4>
      </div>
      <div style={styles.appContainer}>
      <LanguageButtons />
      <div style={styles.menuContainer}>
        {menuDataMultiLang.map((menu, index) => (
          <div key={index} style={styles.menuItem}>
            <div style={styles.menuImgContainer}>
              <img src={`image/${menu.image}`} alt={menu.name[currentLang]} style={styles.menuImg} />
              {menu.ingredients.includes('pork') && (
                <div style={{position: 'relative'}}>
                  <img src="image/pork.png" alt="돼지고기" style={styles.ingredientIcon} onClick={() => handleIconClick(menu.name[currentLang], 'pork')} />
                  {showWarning[menu.name[currentLang]] === 'pork' && (
                    <div style={styles.warningBubble}>{warningMessages.pork[currentLang]}</div>
                  )}
                </div>
              )}
              {menu.ingredients.includes('beef') && (
                <div style={{position: 'relative'}}>
                  <img src="image/beef.png" alt="소고기" style={styles.ingredientIcon} onClick={() => handleIconClick(menu.name[currentLang], 'beef')} />
                  {showWarning[menu.name[currentLang]] === 'beef' && (
                    <div style={styles.warningBubble}>{warningMessages.beef[currentLang]}</div>
                  )}
                </div>
              )}
            </div>
            <h3 style={styles.h3}>{menu.name[currentLang]}</h3>
            <p style={{ fontSize: '16px', fontWeight: 'bold' ,fontFamily: "'NanumSquareNeo'"}}>
              {menu.price} {currentLang === '한국어' ? '원' : 'KRW'}
            </p>
            {selectedItems.some(item => item.name === menu.name[currentLang]) ? (
              <>
                <button onClick={() => handleSelect(menu.name)} className='cancel-button'>
                  {currentLang === '한국어' ? '취소' : 'Cancel'}
                </button>
                <div>
                  <label style={styles.quantityLabel}>
                    {currentLang === '한국어' ? '수량:' : 'Quantity:'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={
                      selectedItems.find(item => item.name === menu.name[currentLang])?.quantity || 1
                    }
                    onChange={(e) =>
                      handleQuantityChange(menu.name[currentLang], parseInt(e.target.value))
                    }
                    style={styles.quantityInput}
                  />
                </div>
              </>
            ) : (
              <button onClick={() => handleSelect(menu.name)} className='select-button'>
                {currentLang === '한국어' ? '선택' : 'Select'}
              </button>
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
                const menu = menuDataMultiLang.find(menu => menu.name[currentLang] === item.name);
                return (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' ,fontFamily: "'NanumSquareNeo'"}}>{menu.name[currentLang]}</td>
                    <td style={{ border: '1px solid #000' ,fontFamily: "'NanumSquareNeo'"}}>{item.quantity}</td>
                    <td style={{ border: '1px solid #000' ,fontFamily: "'NanumSquareNeo'"}}>{menu.price * item.quantity} {currentLang === '한국어' ? '원' : 'KRW'}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="2" style={{ textAlign: 'right', border: '1px solid #000', fontWeight: 'bold' ,fontFamily: "'NanumSquareNeoExtraBold'"}}>Total</td>
                <td style={{ border: '1px solid #000', fontWeight: 'bold',fontFamily: "'NanumSquareNeo'" }}>{calculateTotal()} {currentLang === '한국어' ? '원' : 'KRW'}</td>
              </tr>
            </tbody>
          </table>
          <button className="paybutton" style={styles.paybutton} onClick={handlePaymentClick}>결제하기</button>
        </div>
      )}
      </div>
    </div>
  );
}
export default Main;

