import React, { memo } from 'react';
import './Header.css';

// const Header =(Header) =>{}
function Header() {
  console.log('헤더 리랜더링');
  return (
    <div className="Header">
      <h3> 일정 관리 </h3>
      <h2> 오늘 날짜는 :{new Date().toLocaleDateString()}</h2>
    </div>
  );
}
// 컴포넌트가 변경되지 않았을때 불필요한 랜더링을 하지 않는다.(업데이트)
// 강화된 컴포넌트(메모이제이션된 컴포넌트)를 반환
// export default React.memo(Header);
export default memo(Header);
// export default Header;
