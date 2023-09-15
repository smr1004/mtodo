import React, { useContext } from 'react';
import './TodoItem.css';
import { TodoContext } from '../App';
import moment from 'moment';

// 할일  아이템 삭제
function TodoItem(props) {
  // 전달받은 데이터를 각각의 JSX 위치에 삽입하여 렌더링
  const { id, content, checked, createdDate } = props;
  // Context를 통해 프롭스 드릴링 없이 필요한 곳에 바로 공급
  const { onUpdate, onDelete } = useContext(TodoContext);

  console.log(` ${id} TodoItem update`);
  return (
    <div className="TodoItem">
      <input
        type="checkbox"
        onChange={() => {
          onUpdate(id);
        }}
        className="checkbox"
        checked={checked}
      />
      <div className="title">{content}</div>
      {/* <div className="date">{new Date(createdDate).toLocaleDateString()}</div> */}
      <div className="date">{moment(createdDate).format('YYYY-MM-DD')}</div>
      <button
        className="btn"
        onClick={() => {
          onDelete(id);
        }}
      >
        삭제
      </button>
    </div>
  );
}

export default React.memo(TodoItem);
