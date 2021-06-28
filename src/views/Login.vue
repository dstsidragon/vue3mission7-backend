<template>
  <div class="loginBackground ">
    <div
    class="container position-absolute top-50 start-50 translate-middle div_shadow rounded bg-light"
    >
    <div class="row justify-content-center ">
      <h1
        class="h1 mb-3 font-weight-normal text-center  fw-bold text-info bg-dark rounded-top py-2"
      >
        {{ h1 }}
      </h1>

      <div class="d-flex align-items-start ">
        <div
          class="nav flex-column nav-pills me-3 col-4"
          id="login-page-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            class="nav-link active"
            id="login-tab"
            @click="chkMenuData"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-login"
            type="button"
            role="tab"
            aria-controls="v-pills-login"
            aria-selected="true"
          >
            登入
          </button>
          <button
            class="nav-link"
            id="signup-tab"
            data-bs-toggle="pill"
            @click="chkMenuData"
            data-bs-target="#v-pills-signup"
            type="button"
            role="tab"
            aria-controls="v-pills-signup"
            aria-selected="false"
          >
            註冊
          </button>
          <button
            class="nav-link "
            id="forget-tab"
            @click="chkMenuData"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-forget"
            type="button"
            role="tab"
            aria-controls="v-pills-forget"
            aria-selected="true"
          >
            忘記密碼
          </button>
        </div>
        <div class="tab-content col-8" id="v-pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="v-pills-login"
            role="tabpanel"
            aria-labelledby="login-tab"
          >
            <!-- 登入元件 -->
            <Login ref="Login"
              @login-emit="getLoginEmitData"
              :statusprompt="statusPromptLogin"
              :statu-bool="statuBoolLogin"
              :login-in-fall-or-success="loginInFallOrSuccess"
              :chk-menu="chkMenu"
            ></Login>
          </div>
          <div
            class="tab-pane fade"
            id="v-pills-signup"
            role="tabpanel"
            aria-labelledby="signup-tab"
          >
            <!-- 註冊元件 -->
            <Signup ref="Signup"
              @signup-emit="getSignupEmitData"
              :statusprompt="statusPromptSignup"
              :statu-bool="statuBoolSignup"
              :sign-up-fall-or-success="signUpFallOrSuccess"
              :chk-menu="chkMenu"
            ></Signup>
          </div>
           <div
            class="tab-pane fade"
            id="v-pills-forget"
            role="tabpanel"
            aria-labelledby="forget-tab"
          >
            <!-- 忘記密碼 -->
            <ForgetPasswordPart />
          </div>
        </div>
      </div>
    </div>
    <p class="mt-5 pb-3 text-muted text-center">&copy; {{ footer }}</p>
  </div>
  </div>
</template>
<script>
import Login from '@/components/LoginPart.vue';
import Signup from '@/components/SignupPart.vue';
import ForgetPasswordPart from '@/components/ForgetPasswordPart.vue';

export default {
  components: {
    Login,
    Signup,
    ForgetPasswordPart,
  },
  data() {
    return {
      h1: '請先登入',
      footer: '2021~∞ - 六角學院',
      // 信箱
      username: '',
      // 密碼
      password: '',
      passwordRepit: '',
      // 註冊提示
      statusPromptSignup: '',
      // 登入提示
      statusPromptLogin: '',
      // 註冊狀態
      statuBoolSignup: '',
      // 登入狀態
      statuBoolLogin: '',
      // 註冊錯誤或成功
      signUpFallOrSuccess: '',
      // 登入錯誤或成功
      loginInFallOrSuccess: '',
      // 切換選單
      chkMenu: '',
    };
  },
  methods: {
    // 登入
    login() {
      // 信箱驗證
      const myreg = /^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      const adminInfo = {
        username: this.username,
        password: this.password,
      };
      // console.log(adminInfo);

      if (this.username !== '' && myreg.test(this.username) && this.password !== '') {
        // 送出登入帳號資料做驗證
        this.$http.post(`${process.env.VUE_APP_API}/admin/signin`, adminInfo)
          .then((res) => {
            console.log(res);
            // 如果成功就執行
            if (res.data.success) {
              // alert(`${res.data.message}!!`);

              const [token, expired] = [res.data.token, res.data.expired];
              // console.log(token,expired)
              // res塞到data
              this.statusPromptLogin = `${res.data.message}!!`;
              this.statuBoolLogin = true;
              // 存到cookies
              document.cookie = `hexToken=${token}; expires=${new Date(expired)};username=${
                this.username
              }`;
              document.cookie = `username=${this.username.split('@')[0]}; expires=${new Date(
                expired,
              )};`;
              document.cookie = `email=${res.config.data.split('"')[3]}; expires=${new Date(
                expired,
              )};`;
              // 跳轉頁面
              this.$router.push('/admin');
            } else {
              // alert(`${res.data.message}!!請檢查帳號密碼!`);
              // 密碼錯誤 清空密碼
              this.password = '';

              // res塞到data
              this.statusPromptLogin = `${res.data.message}!!請檢查帳號密碼!`;
              this.statuBoolLogin = false;
            }
          })
          .catch((err) => {
            console.dir(err);
          });
      } else {
        // alert("帳號密碼錯誤!");
        // 帳號密碼錯誤 清空帳號密碼錯誤
        this.username = '';
        this.password = '';

        // res塞到data
        this.statusPromptLogin = '帳號密碼錯誤!';
        this.statuBoolLogin = false;
      }
    },
    // 取得loginEmit
    getLoginEmitData(e) {
      // 將取得的資料賦予到data
      this.username = e.username;
      this.password = e.password;
      // console.log( this.username, this.password)3

      // 登入
      this.login();
    },

    // 註冊
    signup() {
      // 信箱驗證
      const myreg = /^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      const adminInfo = {
        username: this.username,
        password: this.password,
        confirm_password: this.passwordRepit,
      };
      // console.log(adminInfo);

      if (
        this.username !== ''
        && myreg.test(this.username)
        && this.password !== ''
        && this.passwordRepit !== ''
      ) {
        // 送出註冊帳號資料做驗證
        const url = `${process.env.VUE_APP_API}/signup`;
        this.$http.post(url, adminInfo)
          .then((res) => {
            // console.log(res);
            // 如果成功就執行
            if (res.data.success) {
              // res塞到data
              this.statusPromptSignup = `${res.data.message}!!`;
              // 改變狀態顏色
              this.statuBoolSignup = true;

              // 傳入變化的時間 讓元件的watch監聽
              this.signUpFallOrSuccess = new Date();
            } else {
              // alert(`${res.data.message}!!請檢查帳號密碼!`);
              // 密碼錯誤 清空密碼
              this.password = '';
              // res塞到data
              this.statusPromptSignup = `${res.data.message}!!請檢查帳號密碼!`;
              this.statuBoolSignup = false;
              // 傳入變化的時間 讓元件的watch監聽
              this.signUpFallOrSuccess = new Date();
            }
          })
          .catch((err) => {
            // console.dir(err);
            // console.dir(err.response.data.code);
            if (err.response.data.code === 'auth/weak-password') {
              // alert("密碼強度太弱!!")
              // 帳號密碼錯誤 清空帳號密碼錯誤
              this.username = '';
              this.password = '';
              this.passwordRepit = '';
              // 把err塞到data
              this.statusPromptSignup = '密碼強度太弱!! 請填入6~20位英數字';
              this.statuBoolSignup = false;
              // 傳入變化的時間 讓元件的watch監聽
              this.signUpFallOrSuccess = new Date();
            } else if (err.response.data.code === 'auth/email-already-in-use') {
              // alert("帳號已經被使用!!")
              // 帳號密碼錯誤 清空帳號密碼錯誤
              this.username = '';
              this.password = '';
              this.passwordRepit = '';
              // 把err塞到data
              this.statusPromptSignup = '帳號已經被使用!!';
              this.statuBoolSignup = false;
              // 傳入變化的時間 讓元件的watch監聽
              this.signUpFallOrSuccess = new Date();
            }
          });
      } else {
        // alert("帳號格式錯誤!");
        // 帳號密碼錯誤 清空帳號密碼錯誤
        this.username = '';
        this.password = '';
        this.passwordRepit = '';
        // 把err塞到data
        this.statusPromptSignup = '輸入格式錯誤!!';
        this.statuBoolSignup = false;
        // 傳入變化的時間 讓元件的watch監聽
        this.signUpFallOrSuccess = new Date();
      }
    },
    // 取得signupEmit
    getSignupEmitData(e) {
      // console.log(e)

      // 將取得的資料賦予到data
      this.username = e.username;
      this.password = e.password;
      this.passwordRepit = e.passwordRepit;

      // 註冊
      this.signup();
    },
    // 刷新表單
    chkMenuData() {
    // 刷新表單
      this.$refs.Login.$refs.loginForm.resetForm();
      this.$refs.Signup.$refs.signupForm.resetForm();
    },
  },
};
</script>
<style lang="scss">
.loginBackground{
  height: 1000px;
  background-color: #000;
}
</style>
