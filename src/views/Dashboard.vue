<template>
<div class="navbar pt-4 pb-4   d-none bg-yellow-lighten  ">
        <div class="navbar-content ">
          <h1 class=" mb-4 pl-4">
            <router-link class="d-block"
            to="/admin">
            <img src="../assets/images/logo4.svg" alt=""
            width="100" height="100" srcset=""></router-link>
          </h1>
          <ul class="list-group nav-link   flex-row justify-content-between"
          >
            <li class="mb-2 ">
                <router-link class="nav-link active"
            to="/admin">
            <span class="material-icons ">
                assessment
                </span>
                </router-link>
            </li>
            <li class="mb-2 ">
                <router-link class="nav-link active"
            to="/productsControl">
            <span class="material-icons ">
                store
                </span>
                </router-link>
            </li>
            <li class="mb-2 ">
                <router-link class="nav-link active"
            to="/coupons">
            <span class="material-icons ">
                receipt
                </span>
                </router-link>
            </li>
            <li class="mb-2 ">
                <router-link class="nav-link active"
            to="/ordersList">
            <span class="material-icons ">
                payment
                </span>
                </router-link>
            </li>
            <li class="mb-2 ">
                <router-link class="nav-link active"
            to="/articles">
            <span class="material-icons ">
                article
                </span>
                </router-link>
            </li>
            <li class="mb-2 ">
               <a class="nav-link"
            type="button" v-if="loginStatus" @click.prevent="openiSgnOutUserModal">
            <span class="material-icons ">
                logout
                </span>
                </a>
            </li>
            <li class="mb-2 ">
                <router-link class="nav-link active"
            to="/">
            <span class="material-icons ">
                home
                </span>
                </router-link>
            </li>
          </ul>
        </div>

        <div class="sidebar-footer d-flex justify-content-center ">
          <img class="sidebar-footer-img" src="../assets/images/admin.png">
            <ul class="ms-2 mb-0 text-start fz-0 ">
              <li>{{userName}}</li>
              <li class="">{{userEmail}}</li>
            </ul>
        </div>
      </div>
    <div class="d-flex ">
      <div class="sidebar bg-yellow-lighten  d-flex flex-column  justify-content-between">
       <div >
         <h1 class=" mb-4 pl-4">
            <router-link class="logo d-block"
            to="/admin">logo</router-link>
          </h1>
       <div class="nav flex-column nav-link" >
            <router-link class="nav-link active"
            to="/admin">後台首頁</router-link>
            <router-link class="nav-link"
              to="/productsControl">商品管理</router-link>
            <router-link class="nav-link"
             to="/coupons">優惠券管理</router-link>
            <router-link class="nav-link"
             to="/ordersList">訂單管理</router-link>
            <router-link class="nav-link"
             to="/articles">貼文管理</router-link>
            <a class="nav-link"
            type="button" v-if="loginStatus" @click.prevent="openiSgnOutUserModal">登出</a>
            <router-link class="nav-link"
             v-else to="/Login">登入</router-link>
            <router-link class="nav-link"
              to="/">返回前台</router-link>
            </div>
       </div>
            <div class=" d-flex justify-content-center align-items-center ">
            <img class="sidebar-footer-img" src="../assets/images/admin.png">
            <ul class="ms-2 mb-0 text-start fz-0">
              <li>{{userName}}</li>
              <li class="">{{userEmail}}</li>
            </ul>
        </div>
    </div>
    <div class=" container Main">
         <router-view />

      </div>
    </div>
    <!-- Alert元件 start -->
    <Alert class="alert-position"  v-if="alertMessage" :message="alertMessage"
    :status="alertStatus" />
    <!-- Alert元件 end -->

   <!-- 登出Modal -->
  <LoginOut ref="signOutUserModal" @sign-out-admin="signOutAdmin"></LoginOut>
</template>
<script>
// Alert元件
import Alert from '@/components/Alert.vue';
import LoginOut from '@/components/LoginOut.vue';

export default {
  components: {
    // Alert元件
    Alert,
    // modal-登出
    LoginOut,
  },
  data() {
    return {
      // alert元件參數
      alertMessage: '',
      alertStatus: false,
      // 使用者名稱
      userName: '訪客',
      // 信箱
      userEmail: `@${document.cookie.replace(/(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/, '$1').split('@')[1]}`,
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
            // alert(res.data.message);// alert 元件顯示
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
            // document.cookie = 'hexToken=;expires=;';
            // 跳轉頁面
            this.$router.push('/Login');
          } else {
            // alert('未知的錯誤!');// alert 元件顯示
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
    // 驗證登入
    chkLogin() {
      const url = `${process.env.VUE_APP_API}/api/user/check`;
      this.$http.post(url)
        .then(
          (res) => {
            // console.log(res);
            if (res.data.success === true) {
              this.checkSuccess = true;
            } else {
              // alert('您尚未登入!');// alert 元件顯示
              this.alertMessage = '您尚未登入!';
              this.alertStatus = false;
              setTimeout(
                () => {
                  this.alertMessage = '';
                  this.alertStatus = false;
                }, 2000,
              );
              // 跳轉頁面
              this.$router.push('/login');
            }
          },
        )
        .catch(
          (err) => {
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

<style lang="scss" scoped >
.logo {
  margin-top: 20px;
  background: center center no-repeat url('../assets/images/logo4.svg');
background-size: 45%;
  height: 80px;
  text-indent: 101%;
  overflow: hidden;
  white-space: nowrap; }
.nav-link {
  padding: 10px;

  a,.routerLink{
    font-family: 'Kosugi Maru', sans-serif;
    font-weight: bold;
    color: #7f5625 ;

    &.router-link-exact-active {
      color: #0054d1;
    }
  }
}
.sidebar-footer-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.sidebar {
    min-width: 200px;
    height: 100%;
}
.navbarLogo {
  background: center center no-repeat url(https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/085a62fb22df4bf21c605a180648c6c6e35c2b32/week5/logo-ANSWER.svg);
  width: 100%;
  margin: 0 auto;
  height: 40px;
  text-indent: 101%;
  overflow: hidden;
  white-space: nowrap; }
@media (min-width: 631px){
    .Main{
        margin-left: 206px !important;
    }
    .sidebar {
    position: fixed;
  }
  .nav-link{
    a,.routerLink{
    &:hover{
    border-left: 4px solid #66451e !important;
    }
    &.router-link-exact-active {
    border-left: 4px solid #0054d1 !important;
    }
    }
  }
 }
@media(max-width:630px){
    .sidebar{
        display: none !important;
    }
    .navbar {
    display: block !important; }

}
</style>
