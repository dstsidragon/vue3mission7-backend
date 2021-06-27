<template>
  <div class="col-8 ">
     <h2>忘記密碼</h2>
    <Form  class="form" ref="forgetForm" v-slot="{ errors }" @submit="sendData">
      <div class="form-floating mb-3">
        <Field
          type="email"
          class="form-control"
          id="forget-username"
          placeholder="name@example.com"
          name="信箱"
          :class="{ 'is-invalid': errors['信箱'] }"
          :rules="isEmail"
          v-model="email.username"
        />
        <error-message name="信箱" class="invalid-feedback"></error-message>
        <label for="forget-username">Email address</label>
      </div>
      <button class="btn btn-lg btn-success  w-100 mt_90 "  type="submit">
        送出信件
      </button>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
      },
      email: {
        username: '',
      },
    };
  },
  methods: {
    //   送出資料
    sendData() {
      const url = `${process.env.VUE_APP_API}/forgetPassword`;
      this.$http.post(url, this.email)
        .then(
          (res) => {
            console.log(res);
            if (res.data.success) {
              alert(res.data.message);
            } else {
              alert(res.data.message);
            }
          },
        )
        .catch(
          (err) => {
            alert(err.data.message);
          },
        );
    },
    // 驗證信箱格式
    isEmail(value) {
      const mail = /^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return mail.test(value) ? true : '需要輸入正確的信箱';
    },
  },
};
</script>
