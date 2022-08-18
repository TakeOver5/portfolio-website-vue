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

const fakeimg = 'https://picsum.photos/400/380?random';

const ArticleData = [
  {
    article_id: 1,
    member_id: 1,
    title: '自動避障六足音效機器人',
    introduction: '寫程式、玩科技，好玩就能夠學得快，組裝一部仿昆蟲動作行走的六足機器人，組好立刻就能玩。除了行走外，也加上了超音波測距模組，可以偵測前方的障礙物，讓六足機器人可以自動躲避障礙，暢行無阻。我們還為六足機器人加上了圓圓可愛的喇叭，偵測到障礙物時，會發出驚嚇的尖叫聲，再搭配惹人憐愛的發抖動作，讓六足機器人更加趣味好玩。',
    content: '功能: 1. 採用了與 Arduino 相容的控制板作為六足機器人的心臟 2. 撰寫的程式指揮 Arduino 相容控制板去操控六足機 器人行走、偵測障礙、躲避障礙、發出音效',
    cover: `${fakeimg}=1196`,
    created_date: '2022/07/02',
    last_modified_date: '2022/07/02',
    file_download_path: null,
    github_download_path: 'https://github.com/TakeOver5/C',
    message: [
      {
        message_id: 1,
        content: '寫得好',
      },
      {
        message_id: 2,
        content: '謝謝',
      },
      {
        message_id: 3,
        content: '很爛',
      },
    ],
  },
  {
    article_id: 2,
    member_id: 2,
    title: '3D光立方體音樂播放顯示器',
    introduction: '我們製作了一個8*8*8的3D光立方體，使用Arduino做為控制器，寫程式，讓Arduino擷取音源訊號，將聲音訊號做快速傅立葉轉換成頻譜，用來控制3D光立方體的顯示，讓3D光立方體隨著音樂旋律做不同的變化，看起來很炫、很吸引人。另外我們也加裝了一個控制按鈕，用來控制3D光立方體的顯示模式，當使用者每按一次按鈕，就更換3D光立方體隨著音樂旋律改變的顯示模式，有從左上角顯示、有從下方顯示、也有以方塊顯示，增加整個3D光立方體的顯示型態。',
    content: '功能: 1.顯示音樂的頻率 2.可以切換3D光立方體的顯式模式 3.隨著不同的音樂頻譜，做出炫人的顯示特效',
    cover: `${fakeimg}=1499`,
    created_date: '2022/07/02',
    last_modified_date: '2022/07/02',
    file_download_path: null,
    github_download_path: 'https://github.com/TakeOver5/C',
    message: [],
  },
  {
    article_id: 3,
    member_id: 3,
    title: '智慧型太陽光電割草機器人',
    introduction: '智慧型太陽光電割草機器人其內容包含：機器人避障、割草機具機構設計、機器人定向以及無線定位技術。',
    content: '首先以Zigbee無線感測器網路作為無線定位平台，將所得到之訊號強度使用模糊演算法計算精確之機器人位置，配合電子羅盤與避障機構，完成自動巡航割草的目標。',
    cover: `${fakeimg}=307`,
    created_date: '2022/07/02',
    last_modified_date: '2022/07/02',
    file_download_path: null,
    github_download_path: 'https://github.com/TakeOver5/C',
    message: [],
  },
  {
    article_id: 4,
    member_id: 1,
    title: '太陽能水車監控系統',
    introduction: '本作品擷取太陽光電提供水產養殖水車所需之能源，增加養殖含氧量並節省業者用電成本。',
    content: '安裝低功耗無線水質感測器網路，以雲端資訊化方式結合智慧型裝置，即時監測養殖魚塭環境，降低管理負擔及減少因水質變化所造成的損失。',
    cover: `${fakeimg}=1596`,
    created_date: '2022/07/02',
    last_modified_date: '2022/07/02',
    file_download_path: null,
    github_download_path: 'https://github.com/TakeOver5/C',
    message: [],
  },
  {
    article_id: 5,
    member_id: 2,
    title: '控制氣流之智慧窗戶',
    introduction: '為改善室內空氣流通情形，常見做法為窗戶上加裝抽風機，不僅不美觀、危險且擋住窗外視線。',
    content: '本發明設計一扇智慧窗戶，將橫流風扇裝置於窗戶上，以氣旋加速之原理製造流動的氣流。同時本窗戶所吹出的風之氣流方向可透過機構控制，在沒有風扇葉片遮擋的情況下，達成最佳室內通風的效果，保持窗戶原有之開闊視野，連結窗戶之電動結構，可讓窗戶以機械方式開關。結合窗戶上四組溫度、灰塵、雨滴與風速感測器，依這些感測器之數據決定是否需將窗戶關閉及所需要的氣流方向，使室內環境達到最舒適的溫度與品質，減少不必要的空調能源消耗。',
    cover: `${fakeimg}=635`,
    created_date: '2022/07/02',
    last_modified_date: '2022/07/02',
    file_download_path: null,
    github_download_path: 'https://github.com/TakeOver5/C',
    message: [],
  },
  {
    article_id: 6,
    member_id: 3,
    title: '結合影像追蹤與定位巡航之高爾夫檢球機具。',
    introduction: '本作品設計完整展現自動化機具取代人力撿球的優點',
    content: '不僅考量單純的撿球的機械動作，還考慮到周邊定位、定向、球體追蹤與辨識、充電、控制等多線實務上的問題，未來可實際運用於高爾夫球練習場，可有效且精確撿球，極具實用價值。',
    cover: `${fakeimg}=806`,
    created_date: '2022/07/02',
    last_modified_date: '2022/07/02',
    file_download_path: null,
    github_download_path: 'https://github.com/TakeOver5/C',
    message: [],
  },
  {
    article_id: 7,
    member_id: 1,
    title: '浪跡天涯',
    introduction: '近年來養寵物的人逐漸增加，因此寵物走失是非常令大家頭痛且傷心的事情，在智慧型手機普及大家生活的情況下，蘋果在2013年部屬了iBeacon系統，並將它和行動裝置的藍牙做結合，達到範圍小卻精準的搜尋系統。',
    content: 'iBeacon這項科技看重於現在各家廠牌的手機都有藍牙搜尋的功能，因此本研究便利用iBeacon這項技術來尋找走失的寵物，而狗項圈的部分則是採用近年盛行的3D列印技術製作，3D列印技術採用層層堆疊的加法方式製作，可避免不必要的浪費。 而本組別所製作的APP是想達到讓iBeacon可以鑲在項圈上，當人們出門散步遛狗時如果有走失情況發生，可以藉由此APP來尋找到自己的寵物，並且開啟通知提醒主人，同時也會發現到附近可能同時有走失的寵物，以線上互動的概念提供飼主們有另一個尋找寵物的管道。',
    cover: `${fakeimg}=747`,
    created_date: '2022/07/02',
    last_modified_date: '2022/07/02',
    file_download_path: null,
    github_download_path: 'https://github.com/TakeOver5/C',
    message: [],
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

mock('/article', 'get', () => {
  Result.data = ArticleData;
  return Result;
});
