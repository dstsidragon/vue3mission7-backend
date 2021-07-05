<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light navbar-padding
 fixed-top  "  :class="navBarClass">
  <div class="container-fluid position-relative justify-content-end text-secondary">
    <!-- LOGO start-->
    <router-link class="navbar-brand position-absolute  nav-logo  start-50
    translate-middle " to="/">
    <img class="nav-logo-img"
    src="@/assets/images/logo4.svg" alt="logo"></router-link>
    <!-- <router-link class="navbar-brand position-absolute top-50px start-50 d-none d-lg-block
    translate-middle" to="/">
    <img class="nav-logo-img"
    src="@/assets/images/logo4.svg" alt="logo"></router-link> -->
    <!-- LOGO end-->

    <!-- 漢堡選單 start-->
    <button v-if="btnHamStatus" class="navbar-toggler text-primary"
    type="button" data-bs-toggle="collapse"
    data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false"
    aria-label="Toggle navigation" @click="openHamBtn">
    <span class="material-icons text-primary">menu</span>
    </button>
    <button v-else class="navbar-toggler text-primary"
    type="button" data-bs-toggle="collapse"
    data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false"
    aria-label="Toggle navigation"  @click="closeHamBtn">
    <span class="material-icons text-primary">close</span>
    </button>
    <!-- 漢堡選單 end-->
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
      <span >
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="fw-bold nav-link d-none d-lg-block ">
          你好,{{userName}}
        </li>
        <li >
          <a class="nav-link fw-bold nav-drown "  href="#" v-if="loginStatus"
          @click.prevent="openiSgnOutUserModal">登出</a>
          <router-link  class="nav-link fw-bold nav-drown" href="#" v-else to="/Login">
          登入</router-link>
        </li>
      </ul>
      </span>
    </div>
  </div>
</nav>

<!-- Alert元件 start -->
<Alert class="alert-position"  v-if="alertMessage" :message="alertMessage"
:status="alertStatus" />
<!-- Alert元件 end -->
<Loading></Loading>
   <!-- 登出Modal -->
  <LoginOut ref="signOutUserModal" @sign-out-admin="signOutAdmin"></LoginOut>

<router-view/>
</template>
<script>
// Alert元件
import Alert from '@/components/Alert.vue';
import LoginOut from '@/components/LoginOut.vue';
import Loading from '@/components/Loading.vue';
import $ from 'jquery';

export default {
  components: {
    // Alert元件
    Alert,
    // modal-登出
    LoginOut,
    Loading,
  },
  data() {
    return {
      // alert元件參數
      alertMessage: '',
      alertStatus: false,
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
      // NAVBAR 被景色
      navBarClass: 'bg-transparent',
      // 漢堡選單狀態
      btnHamStatus: true,
    };
  },
  methods: {
    // openHamBtn
    openHamBtn() {
      this.navBarClass = 'bg-veryGray';
      this.btnHamStatus = !this.btnHamStatus;
    },
    // closeHamBtn
    closeHamBtn() {
      this.btnHamStatus = !this.btnHamStatus;
      const bodyh = document.documentElement.scrollTop || document.body.scrollTop;
      if (bodyh < 5) {
        this.navBarClass = 'bg-transparent';
      }
    },
    // 登出
    signOutAdmin() {
      this.$http
        .post(`${process.env.VUE_APP_API}/logout`)
        .then((res) => {
          // console.log(res);
          // 如果成功就執行
          if (res.data.success) {
            // alert(res.data.message);
          // alert 元件顯示
            this.alertMessage = res.data.message;
            this.alertStatus = true;
            setTimeout(
              () => {
                this.alertMessage = '';
                this.alertStatus = false;
              }, 2000,
            );

            // 刪除cookie
            this.deleteAllCookies();
            // 跳轉頁面
            this.$router.push('/Login');
          } else {
            // alert('未知的錯誤!');
            // alert 元件顯示
            this.alertMessage = '未知的錯誤!';
            this.alertStatus = false;
            setTimeout(
              () => {
                this.alertMessage = '';
                this.alertStatus = false;
              }, 2000,
            );

            // 跳轉頁面
            this.$router.push('/Login');
          }
        })
        .catch((err) => {
          // console.log(err);
          // alert 元件顯示
          this.alertMessage = err.data.message;
          this.alertStatus = false;
          setTimeout(
            () => {
              this.alertMessage = '';
              this.alertStatus = false;
            }, 2000,
          );
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
    ScrollNavbar() {
      window.onscroll = () => {
        const bodyh = document.documentElement.scrollTop || document.body.scrollTop;
        if (bodyh > 5) {
          this.navBarClass = 'bg-veryGray';
        } else if (bodyh < 5 && this.btnHamStatus) {
          this.navBarClass = 'bg-transparent';
        }
      };
    },
    // 關閉漢堡選單
    closeHamburger() {
      $('#navbarText').removeClass('show');
      this.btnHamStatus = true;
    },
  },
  created() {
    // 判斷使用者值
    this.chkUserName();
  },
  mounted() {
    // NavBar滾動
    this.ScrollNavbar();
  },
  unmounted() {
  },
};
</script>

<style lang="scss">
@import '../assets/scss/mixin/mixin';
.top-20px{
  top:20px;
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
.nav-logo{
    top:45px;
     @include pc {
    top:20px;
    }

    &-img{
    height: 80px !important;
    color:  red;

    @include pc {
    height:60px !important;
    }
    }
  }
.navbar-padding{
  padding: 0px;
  @include pc{
    padding: 15px;
  }
}
</style>
