<template>
  <router-view></router-view>
</template>

<script></script>

<style lang="scss">

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

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.tox-tinymce-aux {
  z-index: 9999 !important;
}

</style>
