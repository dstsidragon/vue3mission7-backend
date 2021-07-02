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
<!-- Alert元件 start -->
<Alert class="alert-position"  v-if="alertMessage" :message="alertMessage"
:status="alertStatus" />
<!-- Alert元件 end -->
</template>

<script>
// Alert元件
import Alert from '@/components/Alert.vue';

export default {
  components: {
    // Alert元件
    Alert,
  },
  data() {
    return {
      // alert元件參數
      alertMessage: '',
      alertStatus: false,
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
              // alert(res.data.message);
              this.alertMessage = res.data.message;
              this.alertStatus = true;
              setTimeout(
                () => {
                  this.alertMessage = '';
                  this.alertStatus = false;
                }, 2000,
              );
            } else {
              // alert(res.data.message);
              this.alertMessage = res.data.message;
              this.alertStatus = false;
              setTimeout(
                () => {
                  this.alertMessage = '';
                  this.alertStatus = false;
                }, 2000,
              );
            }
          },
        )
        .catch(
          (err) => {
            // alert(err.data.message);
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
    // 驗證信箱格式
    isEmail(value) {
      const mail = /^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return mail.test(value) ? true : '需要輸入正確的信箱';
    },
  },
};
</script>
