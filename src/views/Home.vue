<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light overflow-hidden py-4 py-lg-0
bg-transparent sticky-top  ">
  <div class="container-fluid position-relative justify-content-end text-secondary">
    <router-link class="navbar-brand position-absolute top-20px start-50 d-lg-none
    translate-middle " to="/">
    <img class="h-40"
    src="@/assets/images/logo4.svg" alt="logo"></router-link>
    <router-link class="navbar-brand position-absolute top-50px start-50 d-none d-lg-block
    translate-middle" to="/">
    <img class="h-40"
    src="@/assets/images/logo4.svg" alt="logo"></router-link>
    <button class="navbar-toggler text-primary"
    type="button" data-bs-toggle="collapse"
    data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false"
    aria-label="Toggle navigation">
    <span class="navbar-toggler-icon text-primary"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-between
    mt-4 mt-lg-0 " id="navbarText">
      <ul class="navbar-nav   mb-lg-0">
        <li  >
          <router-link  class="nav-link fw-bold nav-drown "  href="#"
          aria-current="page" to="/" @click="closeHamburger">首頁</router-link>
        </li>
        <li>
          <router-link  class="nav-link fw-bold nav-drown"  href="#"
          to="/products" @click="closeHamburger">商品列表</router-link>
        </li>
        <li >
          <router-link class="nav-link fw-bold nav-drown" to="/carts"
           @click="closeHamburger">購物車列表</router-link>
        </li>
        <li>
          <router-link class="nav-link fw-bold nav-drown" to="/orders"
          @click="closeHamburger">訂單列表</router-link>
        </li>
        <li >
          <router-link class="nav-link fw-bold nav-drown" to="/admin"
          >後台</router-link>
        </li>
      </ul>
      <span class="navbar-text">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="fw-bold nav-link d-none d-lg-block ">
          你好,{{userName}}
        </li>
        <li >
          <a class="nav-link fw-bold nav-drown "  href="#" v-if="loginStatus"
          @click.prevent="openiSgnOutUserModal">登出</a>
          <a  class="nav-link fw-bold nav-drown" href="#" v-else to="/Login">登入</a>
        </li>
      </ul>
      </span>
    </div>
  </div>
</nav>

<Loading></Loading>
   <!-- 登出Modal -->
  <LoginOut ref="signOutUserModal" @sign-out-admin="signOutAdmin"></LoginOut>

<router-view/>
</template>
<script>
import LoginOut from '@/components/LoginOut.vue';
import Loading from '@/components/Loading.vue';
import $ from 'jquery';

export default {
  components: {
    // modal-登出
    LoginOut,
    Loading,
  },
  data() {
    return {
      // 使用者名稱
      userName: '訪客',
      // 登入/登出鈕
      loginStatus: false,
      // 讀取狀態
      loadingStatue: {
        // 查看內容鈕
        viewContentStatus: '',
        // 加到購物車鈕
        addCart: '',
      },
    };
  },
  methods: {
    // 登出
    signOutAdmin() {
      this.$http
        .post(`${process.env.VUE_APP_API}/logout`)
        .then((res) => {
          // console.log(res);
          // 如果成功就執行
          if (res.data.success) {
            alert(res.data.message);

            // 刪除cookie
            this.deleteAllCookies();
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
    // NavBar滾動
    jqScrollNavbar() {
      $(window).scroll(() => {
        if ($(window).scrollTop() > 5) {
          $('.navbar').removeClass('bg-transparent');
        } else {
          $('.navbar').addClass('bg-transparent');
        }
      });
    },
    // 關閉漢堡選單
    closeHamburger() {
      $('#navbarText').removeClass('show');
    },
  },
  created() {
    // 判斷使用者值
    this.chkUserName();
  },
  mounted() {
    // NavBar滾動
    this.jqScrollNavbar();
  },
};
</script>

<style lang="scss">
@import '../assets/scss/mixin/mixin';
.top-20px{
  top:20px;
}
.top-50px{
  top:50px;
}
.nav-drown{
  border-bottom: 5px solid transparent;
    color: #7f5625 !important;
  &:focus,&:hover{
  color: #0054d1  !important;
  border-bottom: 5px solid #0054d1 ;
  }
  @include pc{
    font-size: 1.5rem;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top:#7f5625 1px dashed;
    border-bottom: 0;
    &:hover{
    border-bottom: 0;
    background-color: #7f5625;
    color: #ffffff !important;

  }
  }
}
.navbar-collapse{
  @include pc{
  margin-bottom: -32px;
  }
}
</style>
