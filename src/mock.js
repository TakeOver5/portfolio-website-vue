// 引入 module
import { mock } from 'mockjs';

const Result = {
  code: 200,
  msg: '操作成功',
  data: null,
};

mock('/succ', 'get', () => Result);

mock('/fail', 'get', () => {
  Result.code = 400;
  Result.msg = '操作失敗';
  return Result;
});
