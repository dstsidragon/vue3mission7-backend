<template>
  <div
    class="modal fade"
    ref="reditCouponModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title fz-4" id="rediCouponModal">編輯優惠券</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body fs-2">
          <Form ref="addOrderForm" v-slot="{ errors }"  @submit="reditOneData">
          <div class="card card-body ">
         <div class=" d-flex flex-wrap justify-content-around mb-2">
              <div class="form-group ">
                <label for="redititle">標題</label>
                <Field
                type="text"
                id="redititle"
                name="標題"
                placeholder="請輸入標題"
                :class="{ 'is-invalid': errors['標題'] }"
                rules="required"
                class="form-control"
                required
                v-model="rediData.title"
              />
              <error-message name="標題" class="invalid-feedback"></error-message>
              </div>

              <div class="form-group">
                <label for="redipercent">折扣</label>
                <Field
                  type="number"
                  style="width:202px"
                  id="redipercent"
                  name="折扣"
                  :class="{ 'is-invalid': errors['折扣'] }"
                rules="required"
                  min="0"
                  max="100"
                  oninput="value=value.replace('-', '')"
                  placeholder="請輸入折扣"
                  class="form-control"
                  v-model="rediData.percent"
                />
              <error-message name="折扣" class="invalid-feedback"></error-message>
              </div>
            </div>
            <div class=" d-flex flex-wrap justify-content-around mb-2">
              <div class="form-group ">
                <label for="redidue_date">到期日</label>
                <Field
                ref="date"
                  style="width:202px"
                  type="date"
                  id="redidue_date"
                  name="到期日"
                  :class="{ 'is-invalid': errors['到期日'] }"
                   rules="required"
                  class="form-control"
                  :value="due_date"
                  v-model="due_date"
                />
              <error-message name="到期日" class="invalid-feedback"></error-message>
              </div>

              <div class="form-group col-md-5"
                  style="width:202px">
                <label for="redicode">折扣碼</label>
                <Field
                  type="text"
                  id="redicode"
                  name="折扣碼"
                  :class="{ 'is-invalid': errors['折扣碼'] }"
                  :rules="isCode"
                  placeholder="請輸入折扣碼"
                  class="form-control"
                  v-model="rediData.code"
                />
              <error-message name="折扣碼" class="invalid-feedback"></error-message>
              </div>
            </div>
            <hr class="mt-5" />
            <div class="form-group">
              <div class="form-check">
                <input
                  type="checkbox"
                  true-value="1"
                  false-value="0"
                  id="rediis_enabled"
                  class="form-check-input"
                  v-model="rediData.is_enabled"
                />
                <label for="rediis_enabled" class="form-check-label">
                  是否使用
                </label>
              </div>
            </div>
          </div>
        <div class="modal-footer d-block d-sm-flex">
          <button type="button" class="btn btn-secondary fs-2"
          data-bs-dismiss="modal">取消編輯</button>
          <button type="submit" class="btn btn-primary fs-2"
           >確認編輯</button>
        </div>
          </Form>
        </div>
        </div>
        </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: ['rediDatas'],
  data() {
    return {
      user: {},
      Modal: '',
      // 編輯資料索引
      rediData: {
      },
      due_date: '2021-07-04',
    };
  },
  methods: {
    reditOneData() {
      const reditNewData = {
        title: this.rediData.title,
        is_enabled: parseInt(this.rediData.is_enabled, 10),
        percent: this.rediData.percent,
        due_date: this.$toTimestamp(this.due_date),
        code: this.rediData.code,
        id: this.rediData.id,
      };
      console.log(reditNewData);
      this.$emit('emit-redit-new-nata', reditNewData);
    },
    // 開啟modal
    openModal() {
      // 開啟modal
      this.Modal.show();
    },
    // 隱藏modal
    closeModal() {
      // 隱藏modal
      this.Modal.hide();
    },
    // 驗證折扣碼格式
    isCode(value) {
      // const dcode = /^[a-zA-Z0-9]{8,10}$/;
      const dcode = /^([a-zA-Z0-9]{4,8})$/;
      return dcode.test(value) ? true : '需要輸入4~8碼英數組合';
    },
  },
  watch: {
    rediDatas() {
      this.rediData = this.rediDatas;
      const date = this.$toLocaleDate(this.rediData.due_date).split('/');
      // 轉成input date接受的格式
      this.due_date = `${date[0]}-${(date[1] < 10 ? '0' : '')}${date[1]}-${(date[2] < 10 ? '0' : '')}${date[2]}`;
    },
  },
  mounted() {
    this.Modal = new Modal(this.$refs.reditCouponModal);
  },
};
</script>
