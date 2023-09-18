import React, { useState, useRef, useContext } from 'react';
import './TodoEditor.css';
import { TodoContext } from '../App';
import moment from 'moment';

// 새로운 할 일 생성
function TodoEditor() {
  const { onCreate } = useContext(TodoContext);
  const inputRef = useRef();
  const [content, setContent] = useState('');
  // 입력 태그 이벤트 핸들러
  const onChangeHandler = (event) => {
    setContent(event.target.value);
  };
  // 버튼 태그 이벤트 핸들러
  const onSubmitHandler = () => {
    if (!content) {
      // 컨텐츠가 빈 문자열이면 "1124" => truthy,""=>falsy
      inputRef.current.focus();
      return; //이벤트를 실행하지 말고, 함수 종료
    }
    onCreate(content);
    moment().format('YYYY-MM-DD');
    setContent(''); // 입력 초기화
  };
  // 키를 입력받았을 때(Enter) 제출 이벤트 실행
  const onKeyDownHandler = (event) => {
    //{...key : "Enter",keyCode :13,...}
    if (event.key === 'Enter') {
      onSubmitHandler();
    }
  };

  return (
    <div className="TodoEditor  ">
      <div className="editer_wrapper">
        <input
          ref={inputRef}
          value={content}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          type="text"
          date={moment().format('YYYY-MM-DD')}
          placeholder="할 일을 입력하세요 .창을 닫으면 기록은 삭제되니 주의 요망y."
        />
        <button onClick={onSubmitHandler}>추가</button>
      </div>
    </div>
  );
}

export default TodoEditor;
