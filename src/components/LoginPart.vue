<template>
  <div class="col-8 ">
    <Form  class="form-signin" ref="loginForm" v-slot="{ errors }" @submit="sendData">
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
          id="login-username"
          placeholder="name@example.com"
          name="信箱"
          :class="{ 'is-invalid': errors['信箱'] }"
          :rules="isEmail"
          v-model="username"
        />
        <error-message name="信箱" class="invalid-feedback"></error-message>
        <label for="login-username">Email address</label>
      </div>
      <div class="form-floating ">
        <Field
          type="password"
          class="form-control"
          id="login-password"
          placeholder="Password"
          name="密碼"
          :class="{ 'is-invalid': errors['密碼'] }"
          rules="required"
          v-model="password"
        ></Field>
        <error-message name="密碼" class="invalid-feedback"></error-message>
        <label for="login-password">Password</label>
      </div>
      <button class="btn btn-lg btn-success  w-100 mt_90 " id="btn-form" type="submit">
        登入
      </button>
    </Form>
  </div>
</template>

<script>

export default {
  props: ['statusprompt', 'statuBool', 'loginInFallOrSuccess'],
  data() {
    return {
      user: {},
      statusPrompt: '帳號登入',
      showStatus: true,
      username: '',
      password: '',
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
      };
      // console.log(admin);
      this.$emit('login-emit', admin);
    },
    // 驗證信箱格式
    isEmail(value) {
      const mail = /^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return mail.test(value) ? true : '需要輸入正確的信箱';
    },
  },
  watch: {
    // 收到回傳登入成功失敗資料 改變showStatus
    loginInFallOrSuccess() {
      this.showStatus = false;
    },
  },
};
</script>
