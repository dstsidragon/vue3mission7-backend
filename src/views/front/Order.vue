<template>
  <!-- 訂單列表 start-->
  <div class="container mt_navbar ">
    <div class="container">
      <h2 class="text-center ">訂單列表</h2>
      <ul>
        <li v-for="(item, i) in orderList.orders" :key="i" class="mb-3">
          <div class="card ">
            <h5 class="card-header bg-danger text-white fs-5">
              #{{ (orderList.pagination.current_page - 1) * 10 + i + 1 }}
            </h5>
            <div class="card-body">
              <h5 class="card-title">訂單編號 : {{ item.id }}</h5>
              <p class="card-text">
                <small>{{ item.create_at }}</small>
              </p>
              <p class="card-text">備註: {{ item.message }}</p>
              <ul>
                訂單內容
                <li v-for="(prd) in item.products" :key="prd.id">
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
                            <small>*{{ prd.qty }}</small
                            ><small>${{ prd.total }}</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <ul class="d-flex flex-wrap justify-content-between align-items-center fw-bold ">
                <!-- <li><p>目前有{{cartsNum}}項產品</p></li> -->
                <!-- <li>總共 {{item.product}} 項商品</li> -->
                <li class="fs-3 text-danger">
                  <p>總計:{{ item.total }} 元</p>
                </li>
                <li v-if="item.is_paid" class="fs-3 text-success"><p>已付款</p></li>
                <li v-else class="fs-3 text-danger"><p>未付款</p></li>

                <li>
                  <button class="btn btn-success me-2" @click="viewSeller">
                    聯絡賣家
                  </button>
                  <button class="btn btn-danger" @click="checkOut">付款</button>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>

      <!-- 訂單列表 end -->
      <!-- 訂單分頁 start -->
      <div class="d-flex justify-content-center">
        <Pagination :pagination="orderPagination" @get-product="getOrderList"></Pagination>
      </div>
      <!-- 訂單分頁 end -->

      <!-- 賣家資訊 start-->
      <ViewSellerModal ref="viewSeller"></ViewSellerModal>
      <!-- 賣家資訊 end-->
    </div>

      <!-- Alert元件 start -->
      <Alert class=" alert-position"  v-if="alertMessage" :message="alertMessage"
      :status="alertStatus" />
      <!-- Alert元件 end -->
  </div>
</template>

<script>
// 分頁元件
import Pagination from '@/components/Pagination.vue';
// 查看賣家
import ViewSellerModal from '@/components/ViewSellerModal.vue';
// Alert元件
import Alert from '@/components/Alert.vue';

export default {
  components: {
    // Alert元件
    Alert,
    // 分頁元件
    Pagination,
    // 查看賣家
    ViewSellerModal,
  },
  data() {
    return {
      // alert元件參數
      alertMessage: '',
      alertStatus: false,
      // 訂單資料
      orderList: {
      },
      // 訂單分頁
      orderPagination: {},
    };
  },
  methods: {
    // 取得訂單列表
    getOrderList(page = 1) {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/orders?page=${page}`)
        .then((res) => {
          // console.log(res)
          if (res.data.success) {
            // console.log(res.data);
            this.orderList = res.data;
            this.orderPagination = res.data.pagination;
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
          // console.log(err)
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
    // 查看賣家
    viewSeller() {
      // this.$refs.viewSeller.openModal();
      this.$refs.viewSeller.openModal();
    },
    // 付款
    checkOut() {
      // alert('要付款嗎? 先看看賣家是誰好了~');
      this.alertMessage = '要付款嗎? 先看看賣家是誰好了~';
      this.alertStatus = true;
      setTimeout(
        () => {
          this.alertMessage = '';
          this.alertStatus = false;
        }, 2000,
      );
    },
  },
  mounted() {
    // 取得訂單資料
    this.getOrderList();
  },
};
</script>
