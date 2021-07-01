<template>
  <div
    class="modal fade"
    ref="reditOrderModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog ">
      <div class="modal-content">
        <div class="modal-header bg-dark text-warning fw-bold">
          <h5 class="modal-title fz-4" id="exampleModalLabel">修改訂單</h5>
          <button
            type="button"
            class="btn-close bg-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="card card-body row fw-bold fz-2">
             <div class="card ">
            <div class="card-body">
              <h5 class="card-title">訂單編號 : {{ rediData.id }}</h5>
              <p class="card-text">
                <small>{{ rediData.create_at }}</small>
              </p>
              <p class="card-text">備註: {{ rediData.message }}</p>
              <ul>
                訂單內容
                <li v-for="(prd) in rediData.products" :key="prd.id">
                  <div class="card mb-3">
                    <div class="row g-0">
                      <div class="col-md-2">
                        <img class="prd_img_100" :src="prd.product.imageUrl" alt="..." />
                      </div>
                      <div class="col-md-10">
                        <div class="card-body">
                          <h5 class="card-title">{{ prd.product.title }}</h5>
                          <p class="card-text">
                            <small class="text-muted">{{ prd.product.description }}</small>
                          </p>
                          <p class="card-text d-flex justify-content-between">
                            <small>{{ prd.qty }}</small
                            ><small>${{ prd.total }}</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <ul class="d-flex justify-content-between align-items-center fw-bold ">
                <!-- <li><p>目前有{{cartsNum}}項產品</p></li> -->
                <!-- <li>總共 {{item.product}} 項商品</li> -->
                <li class="fs-3 text-danger">
                  <p>總計:{{ rediData.total }} 元</p>
                </li>
                <li v-if="rediData.is_paid" class="fs-3 text-success"><p>已付款</p></li>
                <li v-else class="fs-3 text-danger"><p>未付款</p></li>
<!--
                <li>
                  <button class="btn btn-danger" @click="checkOut">付款</button>
                </li> -->
              </ul>
            </div>
          </div>
            <hr class="mt-5" />

            <div class="form-group">
              <div class="form-check">
                <input
                  type="checkbox"
                  v-model="rediData.is_paid"
                  v-if="rediData.is_paid"
                  checked
                  true-value=true
                  false-value=false
                  id="bg_redit_is_paid"
                  class="form-check-input"
                />
                <input
                  type="checkbox"
                  v-model="rediData.is_paid"
                  v-else
                  true-value=true
                  false-value=false
                  id="bg_redit_is_paid"
                  class="form-check-input"
                />
                <label for="bg_redit_is_paid" class="form-check-label">
                  是否已付款 {{rediData.is_paid}}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            id="btn_redit_cance"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消修改
          </button>
          <button type="button" data-backdrop="false" data-dismiss="modal"  class="btn btn-primary"
           @click="reditOneData">儲存修改</button>
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
      Modal: '',
      // 編輯資料索引
      rediData: {
      },
    };
  },
  methods: {
    reditOneData() {
      const reditNewData = {
        id: this.rediData.id,
        create_at: this.rediData.create_at,
        is_paid: (this.rediData.is_paid === 'true'),
        message: this.rediData.message,
        payment_method: this.rediData.payment_method,
        products: this.rediData.products,
        total: parseInt(this.rediData.total, 10),
        user: this.rediData.user,
      };
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
  },
  watch: {
    rediDatas() {
      this.rediData = this.rediDatas;
    },
  },
  mounted() {
    this.Modal = new Modal(this.$refs.reditOrderModal);
  },
};
</script>
