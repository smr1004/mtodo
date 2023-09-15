import moment from 'moment';
import './moment.css';
import 'moment/locale/ko';

// 2023.9.15(금)

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
