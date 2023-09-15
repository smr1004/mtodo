import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
import React, { useRef, useReducer, useCallback } from 'react'; //useState ,createContext
import moment from 'moment';

export const TodoContext = React.createContext();
// 2023.9.14.
// 최적화 : 불필요하게 낭비되는 연산을 줄여 성능(랜더링)을 높이는 방법
// 리액트 에서 최적화 : 메모이제이션(Memoization)
// 변하지 않는 값, 함수 호출 등을 메모해두었다가,함수 호출 없이 값만 던져주고,랜더링을 하지 않는다.
// 컴포넌트의 랜더링 : 처음 (마운트), 수정(업데이트) <= setState( 상태값의 변경이 일어날때마다 리랜더링)=>
// 메모이제이션 된 컴포넌트 함수 등을 확인하여 불필요한 랜더링을 막는 법
// useMemo,React.memo,useCallback
// 리턴 값을 메모,컴포넌트 메모,함수 메모
// 최적화 주의 사항 : 모든것을 최적화 할 필요는 없다.많은 연산을 수행하는 경우, 부하가 많은 경우, 반복적인 수행이 잦은 경우 사용.
// 최적화 전에 설계를 돌아 볼 것.-최적화는 마지막에 할 것.
// 데이터 모델링하기
/*
const item = {
  id: 0, // 식별자
  checked: false, // bool 완료여부
  content: '할 일', // string 할 일
  createdDate: new Date().getTime(), // timestamp 생성시간
};
*/
const mockTodo = [
  // 임시 데이터 만들기 Mock
  {
    id: 0,
    checked: false,
    content: '할 일 ',
    // createDate: new Date().getTime(),
    createDate: moment().format('YYYY-MM-DD'),
  },
  {
    id: 1,
    checked: false,
    content: '할 일 하기 1',
    createDate: new Date().getTime(),
  },
  {
    id: 2,
    checked: false,
    content: '할 일 하기 2',
    createDate: new Date().getTime(),
  },
];
// reducer 함수는 상태와 ,액션(객체)를 매개변수로 받아,상태를 반환한다.
function reducer(state, action) {
  switch (action.type) {
    case 'CREATE': {
      return [action.item, ...state];
    }

    case 'UPDATE': {
      return state.map((item) =>
        item.id === action.id ? { ...item, checked: !item.checked } : item
      );
    }
    case 'DELETE': {
      return state.filter((item) => item.id !== action.id);
    }
    default:
      return state;
  }
}

function App() {
  // 데이터 설정하기 => useReducer 로 변경
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  // ref 훅으로 id 변수를 초기화
  const idRef = useRef(3);
  // 추가(생성) 함수 매개변수로 할일을 입력받아,todo(할일 배열)에 추가
  const onCreate = (content) => {
    dispatch({
      type: 'CREATE',
      item: {
        id: idRef.current, //식별자,idRef로 받음.
        checked: false, //bool 완료 여부
        content, // content: content 변수명 : 변수값, string 할 일
        createDate: new Date().getTime(), //timestamp 생성 시간
      },
    });
    idRef.current += 1; // 식별자 번호를 변경
  };
  /*  const item={
  id: idRef.current,     //식별자,idRef로 받음.
  checked: false,   //bool 완료 여부
  content,  // content: content 변수명 : 변수값, string 할 일
  createDate:new Date().getTime(),  //timestamp 생성 시간
}; 
    // 전개 연산자로 기존 목록을 펼치고, 새 아이템을 가장 처음에 삽입하여 todo 를 update
    // setTodo([item,...todo]);
    idRef.current += 1; // 식별자 번호를 변경
  };
*/
  // useCallback Hook => 함수가 리랜더링될때 다시 생성되지 않도록 메모이제이션하는 훅 useCallback (콜백함수,의존성배열)
  // 수정 (Update) 함수 => props 로 전달
  const onUpdate = useCallback((id) => {
    dispatch({
      type: 'UPDATE',
      id,
    });
    // todo : [{id,content,checked},{},{}... ]
    /* setTodo(todo.map((item) => 
    //  해당 아이템 일 경우, isDone 을 논리연산자(Not) 으로 불리언 값을 변경
    //  스프레드 연산자로 변경 */
    // item.id === id ? { ...item, checked: !item.checked } : item;
    /*  if(item.id === id){
      return {
       ...item,
        checked: !item.checked,
      }; 
    }else{
      return item;
    }  
     )); */
  }, []);

  // 삭제 (Delete) 함수
  // 배열에서 아이템 삭제 하기, 상태 변경 함수,filter 함수
  // 삭제 버튼을 클릭한 아이템의 id 의 아이템만 배열에서 걸러낸 새 배열
  const onDelete = useCallback((id) => {
    // setTodo(todo.filter((item)=> item.id !==id)) ;
    dispatch({ type: 'DELETE', id });
  }, []);

  return (
    <div className="App">
      {/* <TestComp /> */}
      <Header />
      {/* Context 의 공급자를 통해 데이터를 전달하고,하위 콤포넌트는 props 가 필요 없게 됨 */}
      <TodoContext.Provider value={{ todo, onCreate, onUpdate, onDelete }}>
        {/* props로 생성함수 전달 */}
        {/* <TodoEditor onCreate = {onCreate}/> */}
        <TodoEditor />
        {/* todo props 로 할 일 목록 전달 */}
        {/* <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} /> */}
        <TodoList />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
