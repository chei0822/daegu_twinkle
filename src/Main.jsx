import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="headname">
        <h4>메뉴판</h4>
      </div>
      <div className='menu_container'>
        <div className='menu1'>
          <img src="/img2.png" alt="우동&주먹밥"/>
          <h3>우동&주먹밥</h3>
        </div>
        <div className='menu2'>
          <img src="/img2.png" alt="순두부찌개정식"/>
          <h3>순두부찌개정식</h3>
        </div>
        <div className='menu3'>
          <img src="/img2.png" alt="양푼이돈육찜"/>
          <h3>양푼이돈육찜</h3>
        </div>
        <div className='menu4'>
          <img src="/img2.png" alt="돈가스정식"/>
          <h3>돈가스정식</h3>
        </div>
        <div className='menu5'>
          <img src="/img2.png" alt="육회비빔밥"/>
          <h3>육회비빔밥</h3>
        </div>
        <div className='menu6'>
          <img src="/img2.png" alt="냉면"/>
          <h3>냉면</h3>
        </div>
      </div>
    </div>
  );
}

export default App;