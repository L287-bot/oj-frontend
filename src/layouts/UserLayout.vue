<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img class="logo" src="../assets/oj-logo.svg" />
          <div>SZU -OJ</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer"
        >© 1983–2024 SZU. All rights reserved.
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout {
  text-align: center;
}

#userLayout .header {
  padding: 20px;
}

#userLayout .logo {
  width: 64px;
  height: 64px;
}

#userLayout .content {
  margin-bottom: 16px;
  background: url("../assets/bg2.svg"),
    /* 修正路径 */ url("../assets/loginBackground.svg"); /* 修正路径 */

  background-repeat: no-repeat; /* 防止背景图片重复 */
  background-position: 350px, 900px;
}

#userLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script></script>
