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
                <el-menu-item index="1" @click="loginDialog = true" v-if="!user.memberId">
                  登入
                </el-menu-item>
                <el-menu-item index="2" v-if="!user.memberId" @click="registerDialog = true">
                  註冊
                </el-menu-item>
                <el-menu-item index="3" v-if="user.memberId">
                  <el-avatar  size="default" :src="user.avatar" style="margin-right:8px;" />
                  {{user.name}}
                </el-menu-item>
                <el-menu-item index="4" v-if="user.memberId" @click="logout">退出</el-menu-item>
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
            <el-col :span="8" :lg="8" :sm="12" :xs="24"
            v-for="item in articleList" :key="item.article_id">
              <!-- index 的部分，卡片 -->
              <el-card :body-style="{ padding: '0px' }" @click="cardDetail(item)">
                <img
                  :src="item.cover_path"
                  class="image"
                  :alt="item.title"
                  style="width: 400px; height: 380px;"
                />
                <div class="txt">
                  <h2>{{ item.title }}</h2>
                  <p>{{ item.introduction }}</p>
                </div>
              </el-card>
              <!-- 卡片結束 -->
            </el-col>
          </el-row>
          <!-- 分頁 -->
          <el-row class="pagination">
            <el-pagination background layout="prev, pager, next"
            :total="articleTotal"
            :page-size="articlePageSize"
            @current-change="handleCurrentChange" />
          </el-row>
          <!-- 分頁結束 -->
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
        <el-form-item label="信箱" prop="username">
          <el-input v-model="loginForm.username" />
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
        <el-form-item label="暱稱" prop="name">
          <el-input v-model="registerForm.name" />
        </el-form-item>
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
  <!-- 註冊結束 -->
  <!-- 卡片明細對話框 -->
  <el-dialog v-model="cardDetaildialog"
  width="80%" max-height="80%">
    <el-row :gutter="8">
      <el-col>
        <h1>{{cardDetaildData.title}}</h1>
      </el-col>
      <el-col>
        <div>
          <p><el-avatar size="default" src="https://i.pravatar.cc/300" style="margin-right:8px;" />台灣阿成</p>
        </div>
        <div>
          <p>更新時間</p>
        </div>
      </el-col>
      <el-col>
        <el-image :src="cardDetaildData.cover" fit="none" />
      </el-col>
      <el-col>
        <p>{{cardDetaildData.introduction}}</p>
      </el-col>
      <el-col>
        <p>{{cardDetaildData.content}}</p>
      </el-col>
      <el-col>
        <p v-if="cardDetaildData.file_download_path">{{cardDetaildData.file_download_path}}</p>
        <el-empty v-else description="沒有檔案" />

      </el-col>
      <el-col>
        <p>{{cardDetaildData.github_download_path}}</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col v-for="message in cardDetaildData.message" :key="message.message_id">
        <p>{{message.content}}</p>
      </el-col>
    </el-row>
  </el-dialog>
  <!-- 卡片對話框結束 -->
  <!-- 增加文章按鈕 -->
  <el-button type="primary" circle
  style="position: fixed; right: 40px; bottom: 40px;
  width: 80px; height: 80px;"
  @click="addArticleDialog = true"
  v-if="auth">
    <el-icon :size="50" :color="color">
        <CirclePlusFilled />
    </el-icon>
  </el-button>
  <!--會員管理按鈕-->
  <el-button type="danger" circle
  style="position: fixed; right: 40px; bottom: 140px;
  width: 80px; height: 80px;"
  @click="manageDialog = true"
  v-if="auth==='admin'">
    <el-icon :size="50" :color="color">
        <User />
    </el-icon>
  </el-button>
  <!--會員管理結束-->
  <!--文章管理按鈕-->
  <el-button type="warning" circle
  style="position: fixed; right: 40px; bottom: 240px;
  width: 80px; height: 80px;"
  @click="manageDialog = true"
  v-if="auth==='admin'">
    <el-icon :size="50" :color="color">
        <EditPen />
    </el-icon>
  </el-button>
  <!--文章管理結束-->
  <!-- 文章編輯頁面 -->
  <div class="editArticle">
    <el-dialog v-model="addArticleDialog" title="新增文章"
    max-width="1000px" width="80%"
    align-center>
      <el-form
        label-width="200px"
        style="max-width: 460px"
        label-position="top"
        :model="editArticleForm"
        ref="ruleEditArticleForm"
        :rules="editArticleRules"
      >
        <el-form-item label="標題" prop="title" >
          <el-input placeholder="請輸入專題標題" v-model="editArticleForm.title" />
        </el-form-item>
        <el-form-item label="介紹" prop="introduction" >
          <el-input placeholder="請在 80 個字內簡短的介紹專題" v-model="editArticleForm.introduction" />
        </el-form-item>
        <el-form-item label="內文" prop="content" >
          <el-input placeholder="請輸入內文"
          type="textarea"
          :autosize="{ minRows: 5}"
          v-model="editArticleForm.content" />
        </el-form-item>
        <el-form-item label="封面（圖片大小要求 500*500，且圖片容量需小於 2MB）">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            ref="upload"
            :limit="1"
            :on-remove="handleRemove"
            :on-change="handleEditChange"
            :before-upload="uploadPreview"
            accept=".png, .jpg"
            action=""
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="GitHub 路徑" prop="git_file_path" >
          <el-input placeholder="請輸入專題的 GitHub 路徑"
          v-model="editArticleForm.git_file_path" />
        </el-form-item>
        <el-form-item>
          <el-button type="success"
          @click="editArt('ruleEditArticleForm')">送出</el-button>
          <el-button type="danger"
          @click="deleteEditArticleForm">清除</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
  <!-- 文章編輯頁面結束 -->
  <!-- 管理員頁面 -->
  <el-dialog v-model="manageDialog"
  width="80%" max-height="80%" title="文章管理">
    <el-table :data="articleTableData" border style="width: 720px">
      <el-table-column prop="article_id" label="文章編號" width="180" />
      <el-table-column prop="title" label="文章標題" width="180" />
      <el-table-column prop="member_id" label="作者" width="180" />
      <el-table-column prop="last_modified_date" label="最後修改日期" width="180" />
    </el-table>
  </el-dialog>
  <!-- 管理員頁面結束 -->

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
        username: [
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
        name: [
          {
            required: true, message: '請輸入暱稱', trigger: 'blur',
          },
          {
            max: 12, message: '暱稱最多12個字元', trigger: 'change',
          },
        ],
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
      editArticleRules: {
        title: [
          {
            required: true, message: '請輸入文章標題', trigger: 'blur',
          },
          {
            max: 30, message: '標題最多 30 個字元', trigger: 'change',
          },
        ],
        introduction: [
          {
            required: true, message: '請簡短的輸入介紹', trigger: 'blur',
          },
          {
            max: 90, message: '介紹最多 90 個字元', trigger: 'change',
          },
        ],
        content: [
          {
            required: true, message: '請輸入內文', trigger: 'blur',
          },
          {
            max: 65535, message: '內文最多 65535 個字元', trigger: 'change',
          },
        ],
        git_file_path: [
          {
            required: true, message: '請輸入 GitHub 路徑', trigger: 'blur',
          },
          {
            max: 100, message: '路徑請在 100 個字元以內', trigger: 'change',
          },
          {
            pattern: /^https:\/\/github\.com\/[^\s]+\/[^\s]/,
            message: 'GitHub 路徑有誤',
          },
        ],
      },
      user: {
        authority: '',
        name: '',
        avatar: '',
        email: '',
        memberId: '',
      },
      articleList: [],
      cardDetaildialog: false,
      cardDetaildData: {},
      auth: '',
      addArticleDialog: false,
      manageDialog: false,
      memberTableData: [],
      articleTableData: [],
      param: {},
      imageUrl: '',
      editArticleForm: {
        title: '',
        introduction: '',
        content: '',
        cover: '',
        git_file_path: '',
      },
      // 請求的筆數
      limit: 12,
      // 忽略的筆數
      offset: 12,
      // 文章的筆數
      articleTotal: 0,
      // 顯示的筆數
      articlePageSize: 12,
    };
  },
  methods: {
    /* 登入按鈕事件 */
    login(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.loginForm);
        if (valid) {
          const api = `${process.env.VUE_APP_API}login`;
          this.$http.post(api, { ...this.loginForm }).then((res) => {
            console.log(res.data.data);
            if (res.data.data) {
              this.$store.commit('setAuth', res.data.data.authority);
              this.$store.commit('setID', res.data.data.memberId);
              this.$store.commit('setEMAIL', res.data.data.email);
              this.$store.commit('setUSERNAME', res.data.data.name);
              this.$store.commit('setAVATAR', res.data.data.avatar);
              this.$store.commit('setTOKEN', res.headers.authorization);
              sessionStorage.setItem('Auth', res.data.data.authority);
              sessionStorage.setItem('ID', res.data.data.memberId);
              sessionStorage.setItem('EMAIL', res.data.data.email);
              sessionStorage.setItem('USERNAME', res.data.data.name);
              sessionStorage.setItem('AVATAR', res.data.data.avatar);
              sessionStorage.setItem('TOKEN', res.headers.authorization);
              this.auth = res.data.data.authority;
              this.user = res.data.data;
              this.user.avatar = `data:image/jpeg;base64,${this.user.avatar}`;
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
      const api = `${process.env.VUE_APP_API}logout`;
      this.$http.get(api).then((res) => {
        if (res.data.code === 200) {
          this.$store.commit('setAuth', null);
          this.$store.commit('setID', null);
          this.$store.commit('setEMAIL', null);
          this.$store.commit('setUSERNAME', null);
          this.$store.commit('setAVATAR', null);
          this.$store.commit('setTOKEN', null);
          this.user = {};
          this.auth = '';
          localStorage.clear();
          sessionStorage.clear();
          ElMessage({
            showClose: true,
            message: '登出成功',
            type: 'warning',
          });
        }
      });
    },
    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const api = `${process.env.VUE_APP_API}register`;
          this.$http.post(api, { ...this.registerForm }).then((res) => {
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
    handleCurrentChange(val) {
      console.log(val);
      const offsetNum = this.offset * (val - 1);
      const api = `${process.env.VUE_APP_API}articles?limit=${this.limit}&offset=${offsetNum}`;
      this.$http.get(api).then((res) => {
        this.articleTotal = res.data.total;
        this.articleList = res.data.data;
        // const min = (val - 1) * this.articlePageSize;
        // const max = min + this.articlePageSize;
      });
    },
    cardDetail(item) {
      this.cardDetaildData = item;
      this.cardDetaildialog = true;
    },
    // before-upload
    // 上傳文件之前的鈎子，參數為上傳的文件，
    // 若返回 false 或返回 Promise 且被 reject，則停止上傳
    uploadPreview(file) {
      this.editArticleForm.cover = file;
      const isPng = /^.png$/.test(file.name.substring(file.name.lastIndexOf('.')));
      const isJpg = /^.jpg$/.test(file.name.substring(file.name.lastIndexOf('.')));
      // bit 位元、byte 位元組、KB
      // 1Byte = 8Bits、1KB = 1024Bytes
      const isLt100KB = file.size / 1024 < 2048;
      console.log(file.size);
      if (!(isPng || isJpg)) {
        ElMessage.error('上傳圖片只能是 PNG 或 JPG 格式');
        return false;
      }
      if (!isLt100KB) {
        console.log(file.size / 1024);
        ElMessage.error('上傳圖片不能超過 2MB');
        return false;
      }

      // 判斷圖片長寛
      const reader = new FileReader();
      // 使用 base-64 進行編碼，
      reader.readAsDataURL(file);

      // 檔案轉換完成後執行
      reader.onload = (theFile) => {
        console.log(theFile);
        const image = new Image();
        image.src = theFile.target.result;
        // 圖片載入後要進行的操作
        image.onload = () => {
          const { width, height } = image;
          if (width !== 500 || height !== 500) {
            ElMessage.error('請上傳 500*500 圖片');
          } else {
            this.imageUrl = image.src;
          }
        };
      };
      return false;
    },
    // 上傳文章
    editArt(formName) {
      if (!this.imageUrl) {
        ElMessage.error('還沒上傳封面圖片');
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = new FormData();
          form.append('title', this.editArticleForm.title);
          form.append('introduction', this.editArticleForm.introduction);
          form.append('content', this.editArticleForm.content);
          form.append('cover', this.editArticleForm.cover);
          form.append('git_file_path', this.editArticleForm.git_file_path);
          const api = `${process.env.VUE_APP_API}article`;
          this.$http.post(api, form, {
            headers: {
              'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
              authorization: sessionStorage.getItem('TOKEN'),
            },
          }).then((res) => {
            console.log(res);
            if (res.data.code === 200) {
              ElMessage({
                showClose: true,
                message: '上傳成功',
                type: 'success',
              });
              this.deleteEditArticleForm();
              this.addArticleDialog = false;
            } else {
              ElMessage({
                showClose: true,
                message: res.data.message,
                type: 'error',
              });
            }
          });
        }
        return false;
      });
    },
    deleteEditArticleForm() {
      this.editArticleForm = {};
      this.imageUrl = '';
    },
  },
  created() {
    this.handleCurrentChange(1);
    console.log(sessionStorage.getItem('ID'));
    if (sessionStorage.getItem('ID')) {
      this.$store.commit('setAuth', sessionStorage.getItem('Auth'));
      this.$store.commit('setID', sessionStorage.getItem('ID'));
      this.$store.commit('setEMAIL', sessionStorage.getItem('EMAIL'));
      this.$store.commit('setUSERNAME', sessionStorage.getItem('USERNAME'));
      this.$store.commit('setAVATAR', sessionStorage.getItem('AVATAR'));
      this.$store.commit('setTOKEN', sessionStorage.getItem('TOKEN'));
      this.user.authority = this.$store.state.AUTH;
      this.user.memberId = this.$store.state.ID;
      this.user.email = this.$store.state.EMAIL;
      this.user.name = this.$store.state.USERNAME;
      this.user.avatar = `data:image/jpeg;base64,${this.$store.state.AVATAR}`;
      this.auth = this.$store.state.AUTH;
    }
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
.editArticle {
  .avatar-uploader .avatar {
    width: 200px;
    height: 200px;
    display: block;
  }
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    text-align: center;
  }
}

@media (max-width: 575.99px) {  }

@media (min-width: 576px) and (max-width: 767.99px) {  }

@media (min-width: 768px) and (max-width: 991.99px) {  }

@media (min-width: 992px) and (max-width: 1199.99px) {  }

@media (min-width: 1200px) {  }

</style>
