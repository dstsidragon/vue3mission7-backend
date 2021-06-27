<template>
  <div class="nav-link">
    <a  class="nav-link disabled" href="#" >{{userName}},你好</a>
    <router-link to="/admin">後台首頁</router-link> |
    <router-link to="/productsControl">產品管理列表</router-link>|
    <router-link to="/coupons">優惠券列表</router-link>|
    <router-link to="/ordersList">訂單列表</router-link>|
    <a  href="#" v-if="loginStatus" @click.prevent="openiSgnOutUserModal">登出</a>
    <router-link v-else to="/Login">登入</router-link>|
    <router-link to="/">前台</router-link>
    <router-view />

   <!-- 登出Modal -->
  <LoginOut ref="signOutUserModal" @sign-out-admin="signOutAdmin"></LoginOut>
  </div>
</template>
<script>
import LoginOut from '@/components/LoginOut.vue';

export default {
  components: {
    // modal-登出
    LoginOut,
  },
  data() {
    return {
      // 使用者名稱
      userName: '訪客',
      // 登入/登出鈕
      loginStatus: false,
      // 取得token
      token: document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1'),
      // 登入狀態
      checkSuccess: '',
    };
  },
  methods: {
    // 登出
    signOutAdmin() {
      const url = `${process.env.VUE_APP_API}/logout`;
      this.$http
        .post(url)
        .then((res) => {
          // console.log(res);
          // 如果成功就執行
          if (res.data.success) {
            alert(res.data.message);

            // 刪除cookie
            this.deleteAllCookies();
            // document.cookie = 'hexToken=;expires=;';
            // 跳轉頁面
            this.$router.push('/Login');
          } else {
            alert('未知的錯誤!');

            // 跳轉頁面
            this.$router.push('/Login');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 登出Modal
    openiSgnOutUserModal() {
      this.$refs.signOutUserModal.openModal();
    },
    // 刪除cookie
    deleteAllCookies() {
      const cookies = document.cookie.split(';');

      for (let i = 0; i < cookies.length; i += 1) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    },
    // 判斷使用者值
    chkUserName() {
      // 如果有取到值 ，代表已登入
      if (document.cookie.replace(/(?:(?:^|.*;\s*)username\s*=\s*([^;]*).*$)|^.*$/, '$1') !== '') {
        this.userName = document.cookie.replace(
          /(?:(?:^|.*;\s*)username\s*=\s*([^;]*).*$)|^.*$/,
          '$1',
        );
        // 登入狀態
        this.loginStatus = true;
      } else {
        this.userName = '訪客';
        // 登入狀態
        this.loginStatus = false;
      }
    },
    // 驗證登入
    chkLogin() {
      const url = `${process.env.VUE_APP_API}/api/user/check`;
      this.$http.post(url)
        .then(
          (res) => {
            console.log(res);
            if (res.data.success === true) {
              this.checkSuccess = true;
            } else {
              alert('您尚未登入!');
              // 跳轉頁面
              this.$router.push('/login');
            }
          },
        )
        .catch(
          (err) => {
            console.log(err);
          },
        );
    },
  },
  created() {
    // 使用token驗證
    this.$http.defaults.headers.common.Authorization = this.token;
    // 判斷使用者值
    this.chkUserName();
    // 判斷是否登入
    this.chkLogin();
  },
};
</script>
