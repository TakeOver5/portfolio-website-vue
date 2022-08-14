<template>
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
          <div class="flex-grow" />
          <el-menu-item index="1">登入</el-menu-item>
          <el-menu-item index="2">註冊</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
  .el-header {
  width: 100%;
  max-width: 1320px;
  padding: 0;
  margin: 0 auto;
  position: relative;
}

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

</style>
