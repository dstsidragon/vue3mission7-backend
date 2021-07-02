<template>
  <div
    class="modal fade"
    ref="createOrderModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title css_wordInput_13 fz-2 fz-sm-3">請輸入詳細資訊~ ~ (・ω・)</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <Form ref="creatForm" v-slot="{ errors }" class="row g-3" @submit="closeModal">
            <!-- 姓名 -->
            <div class="col-md-6">
              <label for="name" class="form-label">姓名:</label>
              <Field
                id="name"
                ref="name"
                name="姓名"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入 姓名"
                rules="required"
                v-model="userData.user.name"
              ></Field>
              <error-message name="姓名" class="invalid-feedback"></error-message>
            </div>

            <!-- 電話 -->
            <div class="col-md-6">
              <label for="tel" class="form-label">電話</label>
              <Field
                id="tel"
                ref="tel"
                name="電話"
                type="tel"
                class="form-control"
                :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入 手機號碼"
                :rules="isPhone"
                v-model="userData.user.tel"
              ></Field>
              <error-message name="電話" class="invalid-feedback"></error-message>
            </div>

            <!-- 信箱 -->
            <div class="col-md-6">
              <label for="email" class="form-label">Email:</label>
              <Field
                id="email"
                ref="email"
                name="信箱"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['信箱'] }"
                placeholder="請輸入 信箱"
                :rules="isEmail"
                v-model="userData.user.email"
              ></Field>
              <error-message name="信箱" class="invalid-feedback"></error-message>
            </div>

            <!-- 地址 -->
            <div class="col-12">
              <label for="address" class="form-label">地址</label>
              <Field
                id="address"
                ref="address"
                name="地址"
                type="tel"
                class="form-control"
                :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入 地址"
                rules="required"
                v-model="userData.user.address"
              ></Field>
              <error-message name="地址" class="invalid-feedback"></error-message>
            </div>
            <div class="col-12">
              <label for="text" class="form-label">留言:</label>
              <textarea
                type="text"
                id="text"
                placeholder="請輸入想說的話"
                class="form-control"
                v-model="userData.message"
              ></textarea>
            </div>
              <button type="submit" class="btn btn-primary" >
                抱歉!錢錢，我真的需要這些酷東西
              </button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                下個月在解決你們!
              </button>
          </Form>
        </div>
      </div>
    </div>
  </div>
<!-- Alert元件 start -->
<Alert class=" alert-position"  v-if="alertMessage" :message="alertMessage"
:status="alertStatus" />
<!-- Alert元件 end -->
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
// Alert元件
import Alert from '@/components/Alert.vue';

export default {
  emits: ['re-get-cart-list'],
  components: {
    // Alert元件
    Alert,
  },
  data() {
    return {
      // alert元件參數
      alertMessage: '',
      alertStatus: false,
      user: {},
      Modal: '',
      userData: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    // 開啟modal
    openModal() {
      // 開啟modal
      this.Modal.show();
    },
    // 隱藏modal
    closeModal() {
      // 隱藏modal
      this.Modal.hide();

      const data = {
        data: this.userData,
      };

      // 送出訂單
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`, data)
        .then((res) => {
          // console.log(res)
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
            this.reGetCartList();
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
        })
        .catch((err) => {
          // console.log(err);

          // alert(err.data.message);
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
    // 刷新購物車列表
    reGetCartList() {
      this.$emit('re-get-cart-list');
    },
    // 驗證號碼格式
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要輸入正確的手機號碼';
    },
    // 驗證信箱格式
    isEmail(value) {
      const mail = /^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return mail.test(value) ? true : '需要輸入正確的信箱';
    },
  },
  mounted() {
    this.Modal = new Modal(this.$refs.createOrderModal);
  },
};
</script>
