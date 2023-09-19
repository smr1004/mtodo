import React, { memo, useState, useEffect } from 'react';
import './Header.css';
import moment from 'moment';

// 2023.9.14.
// const Header =(Header) =>{}
function Header() {
  /* const weeks = ['월', '화', '수', '목', '금', '토', '일'];
  weeks().day('dddd');
  day = [5];*/
  const [date, setDate] = useState(moment().format());
  useEffect(() => {
    if (date) {
      // setDate(getFormatDate(new Date()));
      setDate(moment().format());
      // setContent(initData.content);
    }
  }, []);
  const handleOnChange = (event) => {
    setDate(event.target.value);
  };

  // console.log('헤더 리랜더링');
  return (
    <div className="Header">
      <h2>하루살이 일정 관리</h2>
      <h3>
        <span style={{ color: 'rgba(128,0,0)' }}>오늘 날짜 : </span>
        {new Date().toLocaleDateString()}
        {moment().format('dddd')}
        <input
          type="date"
          value={date}
          onChange={handleOnChange}
        />
      </h3>
    </div>
  );
}
// 컴포넌트가 변경되지 않았을때 불필요한 랜더링을 하지 않는다.(업데이트)
// 강화된 컴포넌트(메모이제이션된 컴포넌트)를 반환
// export default React.memo(Header);
export default memo(Header);
