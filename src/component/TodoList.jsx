import './TodoList.css';
import TodoItem from './TodoItem';
import { useState, useMemo, useContext } from 'react';
import { TodoContext } from '../App';

// 할 일 목록을 랜더링 (검색 결과)
function TodoList() {
  const { todo, onUpdate, onDelete } = useContext(TodoContext);
  // console.log(storedata);

  // 분석(전체 할 일 갯수,한 일, 하지 않은 일)
  // * useMemo 훅 * 매개변수 (콜백 함수,의존성 배열)
  // 리턴 값 : 콜백함수의 리턴 값을 저장한다.
  // 의존성 배열에 있는 상태값이 변경되는 경우에만,첫번째 파라미터의 콜백함수를 실행한다.
  const analyzeTodo = useMemo(() => {
    console.log('분석 함수 호출');
    const totalCount = todo.length;
    const doneCount = todo.filter((item) => item.checked).length;
    const dontCount = totalCount - doneCount;
    return { totalCount, doneCount, dontCount };
  }, [todo]);
  // useMemo 를 사용할 경우 analyzeTodo 는 더 이상 함수가 아니라
  // 객체를 가지고 있는 변수가 된다.호출은 지워준다.
  const { totalCount, doneCount, dontCount } = analyzeTodo;

  const [search, setSearch] = useState('');
  const onChangeHandler = (event) => {
    setSearch(event.target.value);
  };
  {
    const getSearchResult = () => {
      // 할 일 목록에서 단어를 포함하는 새로운 배열을 반환하는 함수
      return search === ''
        ? todo
        : todo.filter((item) => item.content.includes(search));
    };

    return (
      <div className="TodoList">
        <h4> 할 일 목록</h4>
        {/* 분석 */}
        <div>
          <div>총 할 일 개수 : {totalCount} ,</div>
          <div>
            완료된 할 일 : {doneCount} , 미완료 할 일 : {dontCount} ,
          </div>
        </div>
        <input
          value={search}
          onChange={onChangeHandler}
          className="searchbar"
          placeholder="검색어을 입력하세요"
        />
        <div className="list_wrapper">
          {/* [{id,content,date,checked},{},{}...] 검색어로 필터링된 배열 */}
          {getSearchResult().map((item) => (
            //스프레드 연산자로 key,value 가 각각 props 로 펼쳐져 하위 컴포넌트에 전달
            // 리엑트에서 배열로 컴포넌트를 구분할 필요가 있을때 반드시 key 라는 속성(props) 을 줘야한다.
            // key 는 반드시 고유한 속성을 가져야 한다.
            // Props Drilling : 위에서부터 전달 받은  props 가 땅을 파고 들어가듯이 컴포넌트에서 전달되는 것
            <TodoItem
              key={item.id}
              {...item}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
            //  props Drilling : 위에서부터 전달 받은 props 가 따을 파고 들어가듯이 컴포넌트에서 전달되는 것
            // PropsDrilling 을 제거하기 위한 방법으로 Context API 가 사용된다.Context가 Props를 대체한다.
          ))}
        </div>
      </div>
    );
  }
}

export default TodoList;
