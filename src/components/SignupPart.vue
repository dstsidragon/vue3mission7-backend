<template>
  <div class="col-8 ">
    <Form ref="signupForm" v-slot="{ errors }"  class="form-signin " @submit="sendData">
      <div class="form-floating mb-3">
        <div v-if="showStatus" class=" text-center fs-3">{{ statusPrompt }}</div>
        <div
          v-else
          class=" text-center"
          :class="statuBool ? 'alert alert-success' : 'alert alert-danger'"
        >
          {{ statusprompt }}
        </div>
      </div>
      <div class="form-floating mb-3">
        <Field
          type="email"
          class="form-control"
          id="signup-username"
          placeholder="name@example.com"
          name="信箱"
          :class="{ 'is-invalid': errors['信箱'] }"
          :rules="isEmail"
          v-model="username"
        />
        <error-message name="信箱" class="invalid-feedback"></error-message>
        <label for="signup-username">Email address</label>
      </div>
      <div class="form-floating mb-3">
        <Field
          type="password"
          class="form-control"
          id="signup-password"
          placeholder="Password"
          name="密碼"
          :class="{ 'is-invalid': errors['密碼'] }"
          rules="required"
          v-model="password"
        />
        <error-message name="密碼" class="invalid-feedback"></error-message>
        <label for="password">Password</label>
      </div>
      <div class="form-floating">
        <Field
          type="password"
          class="form-control"
          id="password-repit"
          placeholder="repitPassword"
          name="重複密碼"
          :class="{ 'is-invalid': errors['重複密碼'] }"
          rules="required"
          v-model="passwordRepit"
        />
        <error-message name="重複密碼" class="invalid-feedback"></error-message>
        <label for="password-repit">Password again</label>
      </div>
      <button class="btn btn-lg btn-warning w-100  text-white mt-3 " type="submit">
        註冊
      </button>
    </Form>
  </div>
</template>
<script>
export default {
  props: ['statusprompt', 'statuBool', 'signUpFallOrSuccess', 'chkMenu'],
  data() {
    return {
      statusPrompt: '帳號註冊',
      showStatus: true,
      username: '',
      password: '',
      passwordRepit: '',
    };
  },
  methods: {
    //   送出資料
    sendData() {
      this.showStatus = true;
      // console.log(1)
      const admin = {
        username: this.username,
        password: this.password,
        passwordRepit: this.passwordRepit,
      };
      // console.log(admin);
      this.$emit('signup-emit', admin);
    },
    // 驗證信箱格式
    isEmail(value) {
      const mail = /^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return mail.test(value) ? true : '需要輸入正確的信箱';
    },
  },
  watch: {
    signUpFallOrSuccess() {
      // 收到回傳註冊成功失敗資料 改變showStatus
      this.showStatus = false;
      // console.log(1)
    },
  },
};
</script>
