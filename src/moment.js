import React from 'react';
import moment from 'moment';
import './moment.css';
import 'moment/locale/ko';

// 2023.9.15(금)
/*function MomentExample() {
  const momentDate = moment();
  const newMomentDate = momentDate.add(1, 'week');
  const cloneNewMomentDate = newMomentDate.clone().add(1, 'week');
  return (
    <div>
      <span style={{ color: 'red' }}>moment:</span>
      {momentDate.format()}
      <br />
      <span style={{ color: 'blue' }}>newMomentDate:</span>
      {newMomentDate.format()}
      <br />
      <span style={{ color: 'green' }}>cloneNewMomentDate:</span>
      {cloneNewMomentDate.format()}
    </div>
  );
}
*/
moment().format();
moment().format('YYYY-MM-DD');
moment().format('hh:mm:ss');
moment().format('dddd');

moment(updateDate).fromNow();
moment('20230202', 'YYYYMMDD').fromNow();
moment().startOf('day').fromNow(); //한시간전
moment().endOf('day').fromNow(); //하루후
moment().startOf('hour').fromNow(); //32분전

export default moment;
