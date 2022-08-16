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
                <el-menu-item index="1" @click="loginDialog = true" v-if="!user.id">
                  登入
                </el-menu-item>
                <el-menu-item index="2" v-if="!user.id" @click="registerDialog = true">
                  註冊
                </el-menu-item>
                <el-menu-item index="3" v-if="user.id">
                  <el-avatar  size="default" :src="user.avatar" style="margin-right:8px;" />
                  {{user.name}}
                </el-menu-item>
                <el-menu-item index="4" v-if="user.id" @click="logout">退出</el-menu-item>
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
            <el-col :span="8" :lg="8" :sm="12" :xs="24" v-for="item in 7" :key="item">
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
    <el-dialog v-model="loginDialog" title="登入" center @close="resetForm('ruleloginForm')"
    width="440px">
      <el-form
        label-position="top"
        label-width="100px"
        :model="loginForm"
        ref="ruleloginForm"
        :rules="loginRules"
      >
        <el-form-item label="信箱" prop="account">
          <el-input v-model="loginForm.account" />
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input v-model="loginForm.password" type="password" />
        </el-form-item>
        <el-form-item>
          <div style="width: 100%">
              <a href="#" style="float: right; padding: 4px; margin-top: -16px;">忘記密碼</a>
          </div>
        </el-form-item>
        <el-form-item>
          <div style="width:100%; text-align: -webkit-center">
            <el-button type="primary"
            @click="login('ruleloginForm')"
            style="width: 70%; display: block;">登入</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
  <!-- 註冊 -->
  <div class="registerDialogSection">
    <el-dialog v-model="registerDialog" title="註冊" center @close="resetForm('ruleRegisterForm')"
    width="440px">
      <el-form
        label-position="top"
        label-width="100px"
        :model="registerForm"
        ref="ruleRegisterForm"
        :rules="registerRules"
      >
        <el-form-item label="電子信箱" prop="email">
          <el-input v-model="registerForm.email" />
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input v-model="registerForm.password" type="password" />
        </el-form-item>
        <el-form-item label="確認密碼" prop="checkPassword">
          <el-input v-model="registerForm.checkPassword" type="password" />
        </el-form-item>
        <el-form-item>
          <div style="width:100%; text-align: -webkit-center; margin-top: 16px;">
            <el-button type="success"
            @click="register('ruleRegisterForm')"
            style="width: 70%; display: block;">註冊</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';

export default {
  components: {
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請輸入密碼'));
      } else {
        if (this.registerForm.checkPassword !== '') {
          this.$refs.ruleRegisterForm.validateField('checkPassword');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請再次輸入密碼'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('兩次輸入密碼不一致！'));
      } else {
        callback();
      }
    };
    return {
      loginDialog: false,
      registerDialog: false,
      loginForm: {},
      registerForm: {},
      loginRules: {
        account: [
          {
            type: 'email', required: true, message: '請輸入電子信箱', trigger: 'blur',
          },
        ],
        password: [
          {
            required: true, message: '請輸入密碼', trigger: 'blur',
          },
          {
            min: 8, max: 16, message: '長度在 8 ~ 16 個', trigger: 'blur',
          },
        ],
      },
      registerRules: {
        email: [
          {
            type: 'email', required: true, message: '請輸入電子信箱', trigger: 'blur',
          },
        ],
        password: [
          {
            required: true, message: '請輸入密碼', validator: validatePass, trigger: 'blur',
          },
          {
            pattern: /[a-zA-Z]/,
            message: '密碼需字母開頭',
          },
          {
            min: 8, max: 16, message: '長度在 8 ~ 16 個', trigger: 'change',
          },
        ],
        checkPassword: [
          {
            required: true, validator: validatePass2, trigger: 'change',
          },
        ],
      },
      user: {},
    };
  },
  methods: {
    /* 登入按鈕事件 */
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/login', { ...this.loginForm }).then((res) => {
            let loginFlag = false;
            for (let i = 0; i < res.data.data.length; i += 1) {
              if (res.data.data[i].email === this.loginForm.account
              && res.data.data[i].password === this.loginForm.password) {
                loginFlag = true;
                this.$store.commit('setAuth', res.data.data[i].auth);
                this.$store.commit('setID', res.data.data[i].id);
                this.$store.commit('setEMAIL', res.data.data[i].email);
                this.user = res.data.data[i];
                break;
              }
            }
            if (loginFlag) {
              ElMessage({
                showClose: true,
                message: '登入成功',
                type: 'success',
              });
              this.loginDialog = false;
            } else {
              this.loginForm.password = '';
              ElMessage({
                showClose: true,
                message: '帳號或密碼錯誤',
                type: 'error',
              });
            }
          });
        }
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    logout() {
      this.$store.commit('setAuth', null);
      this.$store.commit('setID', null);
      this.$store.commit('setEMAIL', null);
      this.user = {};
      ElMessage({
        showClose: true,
        message: '登出成功',
        type: 'warning',
      });
    },
    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/register', { ...this.registerForm }).then((res) => {
            console.log(res);
            if (res.data.code === 200) {
              ElMessage({
                showClose: true,
                message: '註冊成功，現在你可以使用此信箱登錄',
                type: 'success',
              });
              this.registerDialog = false;
            } else {
              ElMessage({
                showClose: true,
                message: '抱歉信箱已使用',
                type: 'error',
              });
            }
          });
        }
        return false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>

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

@media (max-width: 575.99px) {  }

@media (min-width: 576px) and (max-width: 767.99px) {  }

@media (min-width: 768px) and (max-width: 991.99px) {  }

@media (min-width: 992px) and (max-width: 1199.99px) {  }

@media (min-width: 1200px) {  }

</style>
