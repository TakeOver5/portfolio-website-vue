<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="wrap">
          <el-row :gutter="16">
            <el-col :span="24">
              <el-menu
                class="el-menu-demo"
                mode="horizontal"
                :ellipsis="false"
                @select="handleSelect"
                :default-active="0"
              >
                <el-menu-item index="0"></el-menu-item>
                <div class="flex-grow"></div>
                <el-menu-item index="1" @click="loginDialog = true">登入</el-menu-item>
                <el-menu-item index="2">註冊</el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </div>
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
        <div class="main-content-wrap">
          <el-row :gutter="16">
            <el-col :span="8" :lg="8" :sm="12" :xs="24" v-for="item in 12" :key="item">
              <el-card :body-style="{ padding: '0px' }">
                <img
                  src="https://picsum.photos/400/380?random={{item}}"
                  class="image"
                  alt="漢堡"
                />
                <div class="txt">
                  <h2>你一定愛讀的極簡國學：國學包括經史子集蒙，從112本浩瀚經典中， 薈萃出生活與生存的智慧。</h2>
                  <p>我們為什麼要讀國學？因為這是文學素養的入門，讓你精準用字、懂語感、通世事。但國學普遍深奧難懂且資料龐大，
                    包括先秦經典及諸子、兩漢經學、魏晉玄學、宋明理學和同時期的漢賦、六朝駢文、唐宋詩詞、元曲，到明清小說與歷代史學，
                    沒有人有時間都看過，更難以理解其內容</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row class="pagination">
            <el-pagination background layout="prev, pager, next" :total="300" />
          </el-row>
          <el-row class="footer">
            <div class="copyright">
              <p>版權宣告</p>
            </div>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
  <!-- 登入 -->
  <div class="loginDialogSection">
    <el-dialog v-model="loginDialog" title="登入" center>
      <el-form
        label-position="top"
        label-width="100px"
        :model="loginForm"
        style="max-width: 460px"
      >
        <el-form-item label="帳號">
          <el-input v-model="loginForm.account" />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input v-model="loginForm.password" />
        </el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      loginDialog: false,
      loginForm: {},
    };
  },
};
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');

.el-menu {
  border: none;
  background-color: transparent;
  .el-menu-item,
  .el-menu-item:link,
  .el-menu--horizontal .el-menu-item:not(.is-disabled):link,
  .el-menu--horizontal .el-menu-item:not(.is-disabled):active,
  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
  .el-menu--horizontal .el-menu-item:not(.is-disabled):visited,
  .el-menu-item:hover, .el-menu-item:active, .el-menu-item:focus, .el-menu-itme:visited {
    color: yellow !important;
    background-color: transparent !important;
    border: none;
  }

  .el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
  .el-menu-item:hover, .el-menu-item.is-active:hover {
    background-color: rgba($color: #e1e1e1, $alpha: .5) !important;
  }

  .el-menu-item.is-active,
  .el-menu-item.is-active:link,
  .el-menu-item.is-active:active,
  .el-menu-item.is-active:focus,
  .el-menu-item:visited
  {
    color: yellow !important;
    background-color: transparent !important;
    border: none;
  }
}

.el-header {
  width: 100%;
  max-width: 1320px;
  padding: 0;
  margin: 0 auto;
  position: relative;
}

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
  height: auto;
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
  position: relative;
  background-color: rgba(245, 245, 220, .6);
  --el-main-padding: 0;
  margin: 324px auto 24px;
  width: 98%;
  max-width: 1486px;
  border-radius: 8px;
  overflow-x:hidden;
  height: auto;
  .main-content-wrap {
    margin: 40px;
    /* 內文背景 */
    background-color: transparent;
    height: auto;
    width: 80.75%;
    max-width: 1200px;
    margin: 40px auto;
    .title {
      margin-bottom: 8px;
    }
  }
}

.el-row {
  .el-col {
    .el-card {
      cursor: pointer;
      height: auto;
      margin-top: 16px;
      position: relative;
      --el-card-bg-color: transparent;
      font-size: 0;
      border: none;
      .el-image {
        vertical-align: middle;
      }
      .txt {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 40px;
        background-color: rgba(0, 0, 0, .6);
        display: flex;
        justify-content: center;
        flex-direction: column;
        opacity: 0;
        transition: opacity .5s;
        h2 {
          font-size: 24px;
          color: #ff0;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        p {
          font-size: 18px;
          color: #fff;
          font-weight: 100;
          text-align: left;
          line-height: 1.6;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      }
    }
    .el-card:hover .txt {
      opacity: 1;
    }
  }
}

.footer {
  margin-top: 32px;
  background-color: transparent;
  height: 30px;
  width: 100%;
  background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
  background-size: 10px 2px;
  background-repeat: repeat-x;
  .copyright {
    width: 100%;
    margin: auto;
    p {
      margin-top: 24px;
      display: block;
      color: #333;
      font-size: 14px;
    }
  }
}

.pagination {
  padding: 0 auto;
  .el-pagination {
    justify-content: center;
    width: 100%;
    padding-top: 36px;
  }
}

.loginDialogSection {
  .el-dialog {
    width: 440px;
  }
}

@media (max-width: 575.99px) {  }

@media (min-width: 576px) and (max-width: 767.99px) {  }

@media (min-width: 768px) and (max-width: 991.99px) {  }

@media (min-width: 992px) and (max-width: 1199.99px) {  }

@media (min-width: 1200px) {  }
</style>
