<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <MainHeader/>
      </el-header>
      <!-- header 背景 -->
      <div class="main-img-wrap">
        <div class="main-img">
          <el-image src="https://picsum.photos/1920/1080?random=39" fit="none" />
        </div>
        <div class="text">
          <h2>線上作品集</h2>
          <p>深受設計師青睞的自由創作平台（並沒有），
            數百萬求職者的選擇，適用各類型的作品與職業，軟體工程師、設計師、行銷人才愛用推薦。（不要瞎掰好嗎）
          </p>
        </div>
      </div>
      <!-- header 背景結束 -->
      <el-main>
        <!-- router-view/ -->
        <div class="wrap">
            <el-row :gutter="16">
              <el-col :span="24">Hello</el-col>
            </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue';

export default {
  components: {
    MainHeader,
  },
};
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');

body {
  padding: 0;
  margin: 0;
  list-style: none;
  background-repeat: repeat;
  background-image: url("@/assets/image/sushi.png");
}

#app {
  font-family: 'Noto Sans TC', sans-serif, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x:hidden;
}

.flex-grow {
  flex-grow: 1;
}

.main-img-wrap {
  max-width: 1920px;
  height: 665px;
  .el-image {
    width: 100%;
    position: absolute;
    height: 725px;
    left: 0;
    top: 0;
    filter:brightness(.1);
    z-index: -2;
  }
  .text {
    padding-top: 150px;
    max-width: 600px;
    margin: 0 auto;
    height: auto;
    h2 {
      font-size: 50px;
      font-weight: 500;
      line-height: 1.2;
      color: #fff;
      display: block;
      margin-bottom: 24px;
    }
    p {
      font-size: 18px;
      font-weight: 300;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.5);
      display: block;
      padding: 0 8px;
    }
  }
}

.el-main {
  background-color: Beige;
  --el-main-padding: 0;
  margin: 40px auto;
  width: 98%;
  max-width: 1486px;
  border-radius: 8px;
  overflow-x:hidden;
  height: 600px;
  .wrap {
    margin: 40px;
    background-color: red;
    height: 300px;
    width: 80.75%;
    max-width: 1200px;
    margin: 40px auto;
  }
}

@media (max-width: 575.99px) {  }

@media (min-width: 576px) and (max-width: 767.99px) {  }

@media (min-width: 768px) and (max-width: 991.99px) {  }

@media (min-width: 992px) and (max-width: 1199.99px) {  }

@media (min-width: 1200px) {  }
</style>
