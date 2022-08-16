// 引入 module
import { mock } from 'mockjs';

const Result = {
  code: 200,
  msg: '操作成功',
  data: null,
};

const MemberData = [
  {
    id: 1,
    avatar: 'https://i.pravatar.cc/300',
    name: '台灣阿成',
    email: 'demo1@gmail.com',
    state_code: 0,
    auth: 'user',
    password: 'a12345678',
  },
  {
    id: 2,
    avatar: 'https://i.pravatar.cc/300',
    name: 'KoreanFish',
    email: 'demo2@gmail.com',
    state_code: 1,
    auth: 'user',
    password: 'a87654321',
  },
  {
    id: 3,
    avatar: 'https://i.pravatar.cc/300',
    name: '蔡EE',
    email: 'demo3@gmail.com',
    state_code: 0,
    auth: 'user',
    password: 'a22334455',
  },
  {
    id: 4,
    avatar: 'https://i.pravatar.cc/300',
    name: '管理員一號',
    email: 'demo4@gmail.com',
    state_code: 0,
    auth: 'admin',
    password: 'm12345678',
  },
  {
    id: 5,
    avatar: 'https://i.pravatar.cc/300',
    name: '管理員二號',
    email: 'demo5@gmail.com',
    state_code: 0,
    auth: 'admin',
    password: 'm87654321',
  },
];

mock('/succ', 'get', () => Result);

mock('/fail', 'get', () => {
  Result.code = 400;
  Result.msg = '操作失敗';
  return Result;
});

mock('/login', 'post', () => {
  Result.data = MemberData;
  return Result;
});

mock('/register', 'post', () => Result);
