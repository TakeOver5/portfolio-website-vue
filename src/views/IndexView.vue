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
                <el-menu-item index="3" v-if="user.memberId" @click="pesronManage(user.memberId)">
                  <el-avatar v-if="user.avatar != `data:image/jpeg;base64,null`"
                  size="default" :src="user.avatar"
                  style="margin-right:8px;" />
                  <el-avatar v-else size="default" style="margin-right:8px;">user</el-avatar>
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
              <el-card :body-style="{ padding: '0px' }" @click="cardDetail(item.article_id)">
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
              <a href="#" style="float: right; padding: 4px; margin-top: -16px;"
              @click="sendMailDialog=true; loginDialog=false;">忘記密碼</a>
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
      <el-col @click="pesronManage(cardDetaildData.memberId)">
        <div class="header-avatar-highlight">
          <el-avatar size="default" :src="cardDetaildData.avatar" style="margin-right:8px;"
          alt="點我查看更多" />
          <p>{{cardDetaildData.name}}</p>
        </div>
      </el-col>
      <el-col>
        <div>
          <p>文章創建時間：{{cardDetaildData.createdDate}}</p>
          <p>最後修改時間：{{cardDetaildData.lastModifiedDate}}</p>
        </div>
      </el-col>
      <el-col>
        <el-popconfirm :title="`確定刪除文章嗎？`"
        @confirm="deleteArticle(cardDetaildData.articleId)"
        width="175px"
        v-if="user.memberId == cardDetaildData.memberId">
          <template #reference>
            <el-button
              type="danger">刪除文章
            </el-button>
          </template>
        </el-popconfirm>
      </el-col>
      <el-col>
        <h2>專題封面</h2>
        <el-image :src="cardDetaildData.coverPath" fit="none" />
      </el-col>
      <el-col>
        <h2>專題介紹</h2>
        <p>{{cardDetaildData.introduction}}</p>
      </el-col>
      <el-col>
        <h2>專題內文</h2>
        <div v-html="cardDetaildData.content" class="myContent"></div>
      </el-col>
      <el-col>
        <div class="header-avatar" style="margin-top:16px;">
          <el-button type="primary" v-if="cardDetaildData.gitFilePath">
            <a href="#" :download="cardDetaildData.gitFilePathZip"
            style="text-decoration:none;color:#fff;">
              檔案下載<el-icon class="el-icon--right"><Download /></el-icon>
            </a>
          </el-button>
          <el-empty v-else description="沒有檔案" />
          <div style="margin-left:8px;">
            <p>專題 GitHub 連結：<a :href="cardDetaildData.gitFilePath">
              {{cardDetaildData.gitFilePath}}</a>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
    <hr>
    <el-row>
      <el-col><h1>留言</h1></el-col>
      <el-col v-if="cardDetaildData.messageDetail.length === 0"><p>目前沒有留言～</p></el-col>
      <el-col v-for="message in cardDetaildData.messageDetail" :key="message.message_id">
        <div class="header-avatar"
        style="justify-content: left; margin-left:8px; width:100%;">
          <el-avatar size="default" :src="`data:image/jpeg;base64,${message.avatar}`"
          style="margin-right:8px;" />
          <p>{{message.name}}</p>
          <div class="header-avatar" style="width:80%; justify-content: space-between;">
            <div style="margin-right:8px;"><p>：{{message.content}}</p></div>
            <div style="width:150px;"><p>{{message.createdDate}}</p></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col v-if="checkAuth === 'ROLE_user' || checkAuth === 'ROLE_admin'">
        <el-form
        label-position="top"
        :model="messageForm"
        ref="ruleMessageForm"
        :rules="messageRules"
        style="margin-top: 24px"
        >
          <el-form-item label="" prop="message">
            <div class="header-avatar" style="width:100%; margin: 0 16px">
              <el-input v-model="messageForm.message" placeholder="我要留言"
                size="large"
                style="margin-right:8px;"
                show-word-limit
                maxlength="80"
                />
              <el-button type="success"
              @click="leaveMessage">留言
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col v-else-if="checkAuth === 'ROLE_banner'">
        <el-form
        label-position="top"
        :model="messageForm"
        ref="ruleMessageForm"
        :rules="messageRules"
        style="margin-top: 24px"
        >
          <el-form-item label="" prop="message">
            <div class="header-avatar" style="width:100%; margin: 0 16px">
              <el-input v-model="messageForm.message" placeholder="你違反數位中介法，暫時無法留言"
                size="large"
                style="margin-right:8px;"
                show-word-limit
                maxlength="80"
                disabled
                />
              <el-button type="danger" disabled
              @click="leaveMessage">留言
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col v-else>
        <p>登入後即可留言~</p>
      </el-col>
    </el-row>
  </el-dialog>
  <!-- 卡片對話框結束 -->
  <!-- 按鈕群組 -->
  <!-- 增加文章按鈕 -->
  <el-button type="primary" circle
  style="position: fixed; right: 40px; bottom: 40px;
  width: 80px; height: 80px;"
  @click="addArticleDialog = true"
  v-if="auth==='ROLE_admin' || auth==='ROLE_user'">
    <el-icon :size="50" :color="color">
        <CirclePlusFilled />
    </el-icon>
  </el-button>
  <!--會員管理按鈕-->
  <el-button type="danger" circle
  style="position: fixed; right: 40px; bottom: 140px;
  width: 80px; height: 80px;"
  @click="manageMemberAPI(1)"
  v-if="auth==='ROLE_admin'">
    <el-icon :size="50" :color="color">
        <User />
    </el-icon>
  </el-button>
  <!--會員管理結束-->
  <!--文章管理按鈕-->
  <el-button type="warning" circle
  style="position: fixed; right: 40px; bottom: 240px;
  width: 80px; height: 80px;"
  @click="manageArticleAPI(1)"
  v-if="auth==='ROLE_admin'">
    <el-icon :size="50" :color="color">
        <EditPen />
    </el-icon>
  </el-button>
  <!--文章管理結束-->
  <!-- 文章編輯頁面 -->
  <div class="editArticle">
    <el-dialog v-model="addArticleDialog" title="新增文章"
    max-width="1000px" width="80%"
    align-center
    append-to-body
    >
      <el-form
        label-width="200px"
        style="max-width: 100%"
        label-position="top"
        :model="editArticleForm"
        ref="ruleEditArticleForm"
        :rules="editArticleRules"
        :append-to-body="false"
      >
        <el-form-item label="標題" prop="title" >
          <el-input placeholder="請輸入專題標題" v-model="editArticleForm.title" />
        </el-form-item>
        <el-form-item label="介紹" prop="introduction" >
          <el-input placeholder="請在 80 個字內簡短的介紹專題" v-model="editArticleForm.introduction" />
        </el-form-item>
        <el-form-item label="內文">
          <div class="editor" style="width: 100%">
            <editor v-model="editorValue" :init="init"></editor>
          </div>
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
  <!-- 文章管理頁面 -->
  <el-dialog v-model="manageArticleDialog"
  width="80%" max-height="80%" title="文章管理"
  :before-close="manageArticleDialogHandleClose">
    <el-table :data="manageArticleData" border style="width: 100%;" stripe>
      <el-table-column prop="articleId" label="文章ID" width="80" align="center" />
      <el-table-column prop="title" label="文章標題" align="center" width="500">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><List /></el-icon>
            <span style="margin-left: 8px">{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="memberId" label="會員ID" width="80" align="center" />
      <el-table-column label="頭像" width="70" align="center" >
        <template #default="scope">
          <el-avatar v-if="scope.row.avatar" size="default"
          :src="`data:image/jpeg;base64,${scope.row.avatar}`"/>
          <el-avatar v-else>user</el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="作者" width="180" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><UserFilled /></el-icon>
            <span style="margin-left: 8px">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="信箱" width="180" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><Message /></el-icon>
            <span style="margin-left: 8px">{{ scope.row.email }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="lastModifiedDate" label="最後修改日期" width="180" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 8px">{{ scope.row.lastModifiedDate }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="viewable" label="狀態" align="center" fixed="right">
        <template #default="scope">
          <el-popconfirm :title="`隱藏 ${scope.row.articleId} 號文章嗎？`"
          @confirm="changeViewable(scope.$index, scope.row.articleId, scope.row.viewable)"
          width="175px" v-if="scope.row.viewable">
            <template #reference>
              <el-button size="small"
                type="success">顯示
              </el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm :title="`顯示 ${scope.row.articleId} 號文章嗎？`"
          @confirm="changeViewable(scope.$index, scope.row.articleId, scope.row.viewable)"
          width="175px" v-else>
            <template #reference>
              <el-button size="small"
                type="danger">隱藏
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next"
      :total="articleManagerTotal"
      :page-size="20"
      @current-change="manageArticleAPI" />
    </div>
  </el-dialog>

  <!-- 會員管理 -->
  <el-dialog v-model="manageMemberDialog"
  width="80%" max-height="80%" title="會員管理">
    <el-table :data="manageMemberData" border style="width: 100%;" stripe>
      <el-table-column prop="memberId" label="會員編號" width="100" align="center" />
      <el-table-column label="頭像" width="70" align="center" >
        <template #default="scope">
          <el-avatar v-if="scope.row.avatar" size="default"
          :src="`data:image/jpeg;base64,${scope.row.avatar}`"/>
          <el-avatar v-else>user</el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="作者" width="200" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><UserFilled /></el-icon>
            <span style="margin-left: 8px">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="信箱" align="center" width="500">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><Message /></el-icon>
            <span style="margin-left: 8px">{{ scope.row.email }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createdDate" label="加入日期" align="center" width="500">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 8px">{{ scope.row.createdDate }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="auth" label="狀態" align="center" fixed="right">
        <template #default="scope">
          <el-popconfirm :title="`禁言 ${scope.row.memberId} 號會員嗎？`"
          @confirm="changeAuth(scope.$index, scope.row.memberId, scope.row.auth)"
          width="175px" v-if="scope.row.auth  === 'ROLE_user'">
            <template #reference>
              <el-button size="small"
                type="success">正常
              </el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm :title="`解禁 ${scope.row.memberId} 號會員嗎？`"
          @confirm="changeAuth(scope.$index, scope.row.memberId, scope.row.auth)"
          width="175px" v-else-if="scope.row.auth === 'ROLE_banner'">
            <template #reference>
              <el-button size="small"
                type="danger">禁言
              </el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm :title="`禁言 ${scope.row.memberId} 號會員嗎？`"
          @confirm="changeAuth(scope.$index, scope.row.memberId, scope.row.auth)"
          width="175px" v-else>
            <template #reference>
              <el-button size="small"
                disabled
                type="info">管理員
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next"
      :total="memberManagerTotal"
      :page-size="20"
      @current-change="manageMemberAPI" />
    </div>
  </el-dialog>
  <!-- 管理員頁面結束 -->
  <!-- 個人頁面 -->
  <el-dialog v-model="pesronManageDialog"
  align-center
  :top="0"
  width="80%" title="個人中心"
  :before-close="pesronManageDialogHandleClose">
    <div class="personDataPage">
      <el-avatar shape="square" :size="200" fit="none"
      :src="`data:image/jpeg;base64,${personManageData.avatar}`"
      v-if="personManageData.avatar" />
      <el-avatar v-else :size="200" shape="square">尚未設置頭像</el-avatar>
      <p>
        <el-button type="primary" v-if="personManageData.memberId == user.memberId"
        @click="editPersonDialog = true; pesronManageDialog = false; editNameForm.name = user.name">
        編輯資料</el-button>
      </p>
      <p>{{personManageData.name}}</p>
      <p>聯絡信箱：{{personManageData.email}}</p>
      <p>加入時間：{{personManageData.createdDate}}</p>
      <h1>我的作品</h1>
      <el-carousel :interval="4000" height="380px" :initial-index="0" indicator-position="outside"
      v-if="personManageArticleNum > 0">
        <el-carousel-item v-for="item in personManageData.articles"
        :key="item.article_id">
          <el-card :body-style="{ padding: '0px' }"
          @click="cardDetail(item.article_id)">
            <img
              :src="item.cover_path"
              class="card-image"
              :alt="item.title"
              style="width: 500px; height: 380px;"
            />
            <div class="txt">
              <h2>{{ item.title }}</h2>
              <p>{{ item.introduction }}</p>
            </div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
      <el-empty v-else description="空空如也" />
    </div>
  </el-dialog>
  <!-- 個人頁面結束 -->
  <!-- 編輯個人資料 -->
  <el-dialog v-model="editPersonDialog"
  align-center
  :top="0"
  width="440px" title="編輯個人資料">
    <div class="personDataPage">
      <p>頭像上傳後會馬上更新（200*200，且小於 64KB）</p>
      <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          ref="upload"
          :limit="1"
          :on-remove="handleRemove"
          :on-change="handleEditChange"
          :before-upload="uploadAvatar"
          accept=".png, .jpg"
          action=""
        >
          <el-avatar shape="square" :size="200" fit="none" v-if="user.avatar"
          :src="user.avatar" alt="" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <el-form
        label-position="top"
        label-width="100px"
        :model="editNameForm"
        ref="ruleEditNameForm"
        :rules="editNameRules"
        >
          <el-form-item label="更改暱稱" prop="name">
            <el-input v-model="editNameForm.name" placeholder="輸入新名字"
            show-word-limit maxlength="12" />
          </el-form-item>
          <el-button type="primary"
              @click="uploadName('ruleEditNameForm')">修改暱稱
          </el-button>
      </el-form>
        <el-form
        label-position="top"
        label-width="100px"
        :model="editPwForm"
        ref="ruleeditPwForm"
        :rules="editPwRules"
        >
          <el-form-item label="舊密碼" prop="oldPassword">
            <el-input v-model="editPwForm.oldPassword" maxlength="16" type="password"
            show-word-limit placeholder="請輸入密碼"/>
          </el-form-item>
          <el-form-item label="新密碼" prop="newPassword">
            <el-input v-model="editPwForm.newPassword" maxlength="16" type="password"
            show-word-limit placeholder="請輸入 8~16 英數混合的新密碼" />
          </el-form-item>
          <el-form-item label="確認新密碼" prop="checkPassword">
            <el-input v-model="editPwForm.checkPassword" maxlength="16" type="password"
            show-word-limit placeholder="請再次輸入新密碼" />
          </el-form-item>
          <el-button type="success"
              @click="uploadPassword('ruleeditPwForm')">修改密碼
          </el-button>
      </el-form>
    </div>
  </el-dialog>
  <!-- 忘記密碼 -->
  <el-dialog v-model="sendMailDialog"
  align-center
  :top="0"
  width="440px" title="找回密碼">
    <div class="personDataPage">
        <el-form
        label-position="top"
        label-width="100px"
        :model="forgetPwForm"
        ref="ruleforgetPwForm"
        :rules="forgetPwRules"
        >
          <el-form-item label="輸入信箱" prop="email">
            <el-input v-model="forgetPwForm.email" placeholder="輸入信箱"
            show-word-limit maxlength="64" />
          </el-form-item>
          <el-button type="primary"
              @click="sendMail('ruleforgetPwForm')" :disabled="sendMailBtn">找回密碼
          </el-button>
      </el-form>
    </div>
  </el-dialog>

</template>

<script>
import { ElMessage } from 'element-plus';
import tinymce from 'tinymce/tinymce';
// import 'tinymce/models/dom'; (TinyMCE 6)

// 外觀
import 'tinymce/skins/ui/oxide/skin.css';
import 'tinymce/themes/silver';

// Icon
import 'tinymce/icons/default';

// 用到的外掛
import 'tinymce/plugins/table';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/image';
import 'tinymce/plugins/imagetools';

// 語言包
import 'tinymce-i18n/langs5/zh_TW';
// import 'tinymce-i18n/langs/zh_Hans.js' (TinyMCE 6 的簡體中文)

// TinyMCE-Vue
import Editor from '@tinymce/tinymce-vue';

export default {
  components: {
    Editor,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    plugins: {
      type: [String, Array],
      default: 'quickbars table image',
    },
    toolbar: {
      type: [String, Array],
      default:
        ' bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify|bullist numlist |outdent indent blockquote | undo redo | axupimgs | removeformat | table | image',
    },
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
    const validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請輸入舊密碼'));
      } else {
        if (this.editPwForm.oldPassword !== '') {
          this.$refs.ruleeditPwForm.validateField('oldPassword');
        }
        callback();
      }
    };
    const validatePass4 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請輸入新密碼'));
      } else if (value === this.editPwForm.oldPassword) {
        callback(new Error('新舊密碼需要不一致！'));
      } else {
        callback();
      }
    };
    const validatePass5 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請再次輸入新密碼'));
      } else if (value !== this.editPwForm.newPassword) {
        callback(new Error('兩次輸入密碼不一致！'));
      } else {
        callback();
      }
    };
    const validatePass6 = (rule, value, callback) => {
      if (value === this.user.name) {
        callback(new Error('您輸的暱稱與現在的一樣！'));
      } else {
        callback();
      }
    };
    return {
      init: {
        language: 'zh_TW',
        height: 500,
        menubar: false,
        content_css: false,
        skin: false,
        plugins: this.plugins,
        toolbar: this.toolbar,
        quickbars_insert_toolbar: false,
        branding: false,
        images_file_types: 'jpg,png',
        file_picker_types: 'image',
        object_resizing: true,
        content_style: 'img{width: 50%}',
      },
      editorValue: this.value,
      loginDialog: false,
      registerDialog: false,
      loginForm: {
        username: '',
        password: '',
      },
      registerForm: {},
      forgetPwRules: {
        email: [
          {
            type: 'email', required: true, message: '請輸入電子信箱', trigger: 'blur',
          },
        ],
      },
      editNameRules: {
        name: [
          {
            required: true, message: '請輸入暱稱', trigger: 'blur',
          },
          {
            max: 12, message: '暱稱最多12個字元', trigger: 'change',
          },
          {
            required: true, message: '您輸的暱稱與現在的一樣！', validator: validatePass6, trigger: 'blur',
          },
        ],
      },
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
      editPwRules: {
        oldPassword: [
          {
            required: true, message: '請輸入舊密碼', validator: validatePass3, trigger: 'blur',
          },
          {
            pattern: /[a-zA-Z]/,
            message: '密碼需字母開頭',
          },
          {
            min: 8, max: 16, message: '長度在 8 ~ 16 個', trigger: 'change',
          },
        ],
        newPassword: [
          {
            required: true, message: '請輸入新密碼', validator: validatePass4, trigger: 'blur',
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
            required: true, validator: validatePass5, trigger: 'change',
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
      cardDetaildData: {
        articleId: '',
        name: '',
        title: '',
        introduction: '',
        content: '',
        coverPath: '',
        createdDate: '',
        lastModifiedDate: '',
        gitFilePath: '',
        avatar: '',
        messageDetail: [],
        gitFilePathZip: '',
      },
      auth: '',
      addArticleDialog: false,
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
      messageForm: {
        message: '',
      },
      // 請求的筆數
      limit: 12,
      // 忽略的筆數
      offset: 12,
      // 文章的筆數
      articleTotal: 0,
      // 顯示的筆數
      articlePageSize: 12,
      pesronManageDialog: false,
      personManageData: {},
      manageArticleDialog: false,
      manageArticleData: [],
      manageMemberDialog: false,
      manageMemberData: [],
      memberManagerTotal: 0,
      memberAuthList: [
        'ROLE_banner',
        'ROLE_user',
      ],
      avatarUrl: '',
      editPersonDialog: false,
      editPwForm: {},
      editNameForm: {
        name: '',
      },
      ruleeditPwForm: {
        oldPassword: '',
        newPassword: '',
        checkPassword: '',
      },
      ruleEditNameForm: {
        name: '',
      },
      forgetPwForm: {
        email: '',
      },
      personManageArticleNum: 0,
      sendMailBtn: false,
      sendMailDialog: false,
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
              this.loginForm.username = '';
              this.loginForm.password = '';
              ElMessage({
                showClose: true,
                message: '登入成功',
                type: 'success',
              });
              if (this.auth === 'ROLE_banner') {
                ElMessage({
                  showClose: true,
                  duration: 10000,
                  message: '你已違法數位中介法，現在無法發文或留言',
                  type: 'error',
                });
              }
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
    cardDetail(articleId) {
      const api = `${process.env.VUE_APP_API}article/${articleId}`;
      this.$http.get(api).then((res) => {
        this.cardDetaildData = res.data.data;
        this.cardDetaildData.avatar = `data:image/jpeg;base64,${this.cardDetaildData.avatar}`;
        this.cardDetaildData.gitFilePathZip = `${this.cardDetaildData.gitFilePath}archive/refs/heads/master.zip`;
      });
      console.log(this.cardDetailData);
      console.log(this.user);
      this.pesronManageDialog = false;
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
    // 上傳頭像
    uploadAvatar(file) {
      const isPng = /^.png$/.test(file.name.substring(file.name.lastIndexOf('.')));
      const isJpg = /^.jpg$/.test(file.name.substring(file.name.lastIndexOf('.')));
      // bit 位元、byte 位元組、KB
      // 1Byte = 8Bits、1KB = 1024Bytes
      const isLt100KB = file.size / 1024 < 64;
      console.log(file.size);
      if (!(isPng || isJpg)) {
        ElMessage.error('上傳圖片只能是 PNG 或 JPG 格式');
        return false;
      }
      if (!isLt100KB) {
        console.log(file.size / 1024);
        ElMessage.error('上傳圖片不能超過 64KB');
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
          if (width !== 200 || height !== 200) {
            ElMessage.error('請上傳 200*200 圖片');
          } else {
            const form = new FormData();
            form.append('file', file);
            const api = `${process.env.VUE_APP_API}member/avatar`;
            this.$http.post(api, form, {
              headers: {
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                authorization: sessionStorage.getItem('TOKEN'),
              },
            }).then((res) => {
              if (res.data.code === 200) {
                ElMessage({
                  showClose: true,
                  message: '替換成功',
                  type: 'success',
                });
                this.user.avatar = image.src;
                this.$store.commit('setAVATAR', image.src.split(',')[1]);
                sessionStorage.setItem('AVATAR', image.src.split(',')[1]);
              } else {
                ElMessage({
                  showClose: true,
                  message: '替換失敗',
                  type: 'success',
                });
              }
            }).catch(() => {
              ElMessage({
                showClose: true,
                message: '登入過期，請重新登入',
                type: 'error',
              });
            });
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
          console.log(this.editorValue);
          const form = new FormData();
          form.append('title', this.editArticleForm.title);
          form.append('introduction', this.editArticleForm.introduction);
          form.append('content', this.editorValue);
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
              this.editorValue = '';
              this.addArticleDialog = false;
              this.handleCurrentChange(1);
            } else {
              ElMessage({
                showClose: true,
                message: res.data.message,
                type: 'error',
              });
            }
          }).catch(() => {
            ElMessage({
              showClose: true,
              message: '登入過期，請重新登入',
              type: 'error',
            });
          });
        }
        return false;
      });
    },
    deleteEditArticleForm() {
      this.editArticleForm = {};
      this.imageUrl = '';
    },
    leaveMessage() {
      if (this.messageForm.message === '') {
        ElMessage({
          showClose: true,
          message: '請輸入留言',
          type: 'warning',
        });
        return;
      }
      const api = `${process.env.VUE_APP_API}article/${this.cardDetaildData.articleId}/message`;
      this.$http.post(api, { content: this.messageForm.message }, {
        headers: {
          authorization: sessionStorage.getItem('TOKEN'),
        },
      }).then((res) => {
        if (res.data.code === 200) {
          ElMessage({
            showClose: true,
            message: '留言成功',
            type: 'success',
          });
          this.cardDetail(this.cardDetaildData.articleId);
          this.messageForm.message = '';
        } else {
          ElMessage({
            showClose: true,
            message: res.data.message,
            type: 'error',
          });
        }
      }).catch(() => {
        ElMessage({
          showClose: true,
          message: '登入過期，請重新登入',
          type: 'error',
        });
      });
    },
    pesronManage(memberId) {
      const api = `${process.env.VUE_APP_API}member/${memberId}/info`;
      this.$http.get(api).then((res) => {
        this.personManageData = res.data.data;
        console.log(this.personManageData);
        this.personManageArticleNum = this.personManageData.articles.length;
        this.cardDetaildialog = false;
        this.pesronManageDialog = true;
      });
    },
    manageArticleAPI(val) {
      const offset = 20 * (val - 1);
      const api = `${process.env.VUE_APP_API}articles/simple/?limit=20&offset=${offset}`;
      console.log(api);
      this.manageArticleDialog = true;
      this.$http.get(api, {
        headers: {
          authorization: sessionStorage.getItem('TOKEN'),
        },
      }).then((res) => {
        this.manageArticleData = res.data.data;
        this.articleManagerTotal = res.data.total;
      }).catch(() => {
        ElMessage({
          showClose: true,
          message: '登入過期，請重新登入',
          type: 'error',
        });
      });
    },
    manageMemberAPI(val) {
      const offset = 20 * (val - 1);
      const api = `${process.env.VUE_APP_API}members?limit=20&offset=${offset}`;
      console.log(api);
      this.manageMemberDialog = true;
      this.$http.get(api, {
        headers: {
          authorization: sessionStorage.getItem('TOKEN'),
        },
      }).then((res) => {
        this.manageMemberData = res.data.data;
        this.memberManagerTotal = res.data.total;
      }).catch(() => {
        ElMessage({
          showClose: true,
          message: '登入過期，請重新登入',
          type: 'error',
        });
      });
    },
    changeViewable(index, articleId, viewState) {
      console.log(index);
      console.log(articleId);
      console.log(viewState);
      const setView = viewState ? 0 : 1;
      const api = `${process.env.VUE_APP_API}article/${articleId}/viewable?view=${setView}`;
      this.$http.post(api, {}, {
        headers: {
          authorization: sessionStorage.getItem('TOKEN'),
        },
      }).then((res) => {
        if (res.data.code === 200) {
          this.manageArticleData[index].viewable = !viewState;
          ElMessage({
            showClose: true,
            message: '修改成功',
            type: 'success',
          });
        }
      }).catch(() => {
        ElMessage({
          showClose: true,
          message: '登入過期，請重新登入',
          type: 'error',
        });
      });
    },
    changeAuth(index, memberId, authState) {
      console.log(index);
      console.log(memberId);
      console.log(authState);
      const setAuth = authState === 'ROLE_user' ? 0 : 1;
      const api = `${process.env.VUE_APP_API}member/${memberId}/auth?auth=${setAuth}`;
      this.$http.post(api, {}, {
        headers: {
          authorization: sessionStorage.getItem('TOKEN'),
        },
      }).then((res) => {
        if (res.data.code === 200) {
          this.manageMemberData[index].auth = this.memberAuthList[setAuth];
          ElMessage({
            showClose: true,
            message: '修改成功',
            type: 'success',
          });
        }
      }).catch(() => {
        ElMessage({
          showClose: true,
          message: '登入過期，請重新登入',
          type: 'error',
        });
      });
    },
    manageArticleDialogHandleClose(done) {
      this.handleCurrentChange(1);
      done();
    },
    pesronManageDialogHandleClose(done) {
      this.personManageData = {};
      done();
    },
    // 更新密碼
    uploadPassword(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.editPwForm);
        if (valid) {
          const api = `${process.env.VUE_APP_API}member/changepw`;
          this.$http.post(
            api,
            { ...this.editPwForm },
            {
              headers: {
                authorization: sessionStorage.getItem('TOKEN'),
              },
            },
          ).then((res) => {
            if (res.data.code === 200) {
              ElMessage({
                showClose: true,
                message: '修改成功',
                type: 'success',
              });
              this.editPwForm = {};
            } else {
              ElMessage({
                showClose: true,
                message: res.data.message,
                type: 'error',
              });
            }
          }).catch(() => {
            ElMessage({
              showClose: true,
              message: '登入過期，請重新登入',
              type: 'error',
            });
          });
        }
        return false;
      });
    },
    // 更新暱稱
    uploadName(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.editNameForm);
        if (valid) {
          const api = `${process.env.VUE_APP_API}member/changename`;
          this.$http.post(
            api,
            { ...this.editNameForm },
            {
              headers: {
                authorization: sessionStorage.getItem('TOKEN'),
              },
            },
          ).then((res) => {
            if (res.data.code === 200) {
              ElMessage({
                showClose: true,
                message: '修改成功',
                type: 'success',
              });
              this.user.name = this.editNameForm.name;
              this.$store.commit('setUSERNAME', this.editNameForm.name);
              sessionStorage.setItem('USERNAME', this.editNameForm.name);
            } else {
              ElMessage({
                showClose: true,
                message: res.data.message,
                type: 'error',
              });
            }
          }).catch(() => {
            ElMessage({
              showClose: true,
              message: '登入過期，請重新登入',
              type: 'error',
            });
          });
        }
        return false;
      });
    },
    // 寄出信件
    sendMail(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.forgetPwForm);
        if (valid) {
          this.sendMailBtn = true;
          const api = `${process.env.VUE_APP_API}forgotpw`;
          this.$http.post(
            api,
            { ...this.forgetPwForm },
          ).then((res) => {
            if (res.data.code === 200) {
              ElMessage({
                showClose: true,
                message: '寄送成功',
                type: 'success',
              });
              this.sendMailDialog = false;
            } else {
              ElMessage({
                showClose: true,
                message: res.data.message,
                type: 'error',
              });
            }
            this.sendMailBtn = false;
            this.sendMailDialog = false;
            this.forgetPwForm.email = '';
          }).catch((err) => {
            ElMessage({
              showClose: true,
              message: err,
              type: 'error',
            });
            this.forgetPwForm.email = '';
            this.sendMailBtn = false;
          });
        }
      });
    },
    deleteArticle(articleId) {
      const api = `${process.env.VUE_APP_API}article/${articleId}`;
      this.$http.delete(
        api,
        {
          headers: {
            authorization: sessionStorage.getItem('TOKEN'),
          },
        },
      ).then((res) => {
        if (res.data.code === 200) {
          ElMessage({
            showClose: true,
            message: '刪除成功',
            type: 'success',
          });
          this.cardDetaildialog = false;
          this.handleCurrentChange(1);
        } else {
          ElMessage({
            showClose: true,
            message: res.data.message,
            type: 'error',
          });
        }
      }).catch((err) => {
        ElMessage({
          showClose: true,
          message: err,
          type: 'error',
        });
      });
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
    document.addEventListener('focusin', (e) => {
      const closest = e.target.closest('.tox-tinymce-aux, .tox-dialog, .moxman-window, .tam-assetmanager-root');
      if (closest !== null && closest !== undefined) {
        e.stopImmediatePropagation();
      }
    });
  },
  mounted() {
    tinymce.init({});
  },
  watch: {
    value(newValue) {
      this.editorValue = newValue;
    },
    editorValue(newValue) {
      this.$emit('input', newValue);
    },
  },
  computed: {
    checkId: {
      get() {
        return this.$store.state.ID;
      },
    },
    checkAuth: {
      get() {
        return this.$store.state.AUTH;
      },
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

.el-carousel {
  .el-card {
    cursor: pointer;
    height: auto;
    --el-card-bg-color: transparent;
    font-size: 0;
    border: none;
    .card-image {
      vertical-align: middle;
      position: relative;
    }
    .txt {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
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
        text-align: center;
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

.header-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-avatar-highlight {
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    color: rgb(36, 16, 216);
    cursor: pointer;
    text-decoration: underline;
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

.el-pagination {
  text-align: center;
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

.el-carousel__item {
  background-color:transparent;
}

@media (max-width: 575.99px) {  }

@media (min-width: 576px) and (max-width: 767.99px) {  }

@media (min-width: 768px) and (max-width: 991.99px) {  }

@media (min-width: 992px) and (max-width: 1199.99px) {  }

@media (min-width: 1200px) {  }

</style>
