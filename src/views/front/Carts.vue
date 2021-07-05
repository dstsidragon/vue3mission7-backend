<template>
  <!-- 購物車列表 start-->
  <div class="container mt_navbar ">
    <div class="container">

    <!-- Alert元件 start -->
    <Alert class="alert-position"  v-if="alertMessage" :message="alertMessage"
    :status="alertStatus" />
    <!-- Alert元件 end -->

      <h2 class="text-center ">購物車列表</h2>
      <div class="d-flex justify-content-end">
        <button
          :class="{ 'd-none': cartList.carts == 0 }"
          class="btn btn-danger "
          @click.prevent="clearCart"
        >
          <span
            :class="{ 'd-none': loadingStatue.clearCart !== 1 }"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          清空購物車
        </button>
      </div>
    </div>
    <table class="table mt-4 row">
      <thead class="co1-12">
        <tr class="row">
          <th class="col-3 d-none d-md-table-cell">商品圖片</th>
          <th class="col-2">商品名稱</th>
          <th class="col-2 " width="120">
            原價
          </th>
          <th class="col-2 col-md-1">
            售價
          </th>
          <th class="col-3 col-md-2">
            數量
          </th>
          <th class="col-3 col-md-2">
            刪除
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in cartList.carts" class="row" :key="'delCar_' + i">
          <td class="col-3  d-none d-md-table-cell d-flex align-items-center">
            <img class="prd_img " :src="item.product.imageUrl" :alt="item.product.title" />
          </td>
          <td class="col-2 d-flex align-items-center justify-content-center">
            {{ item.product.title }}</td>
          <td class="col-2 d-flex align-items-center justify-content-center">
            {{ item.product.origin_price }}
          </td>
          <td class="col-2 col-md-1 d-flex align-items-center justify-content-center">
            {{ item.product.price }}
          </td>
          <td class="col-3 col-md-2  d-flex align-items-center justify-content-center">
            <input
              class="carNum"
              type="number"
              min="1"
              oninput="value=value.replace('-', '');if(value>999)value=999"
              v-model="cartList.carts[i].qty"
              @change="rediCartItemsNum(item)"
            />
          </td>
          <td class="col-3 col-md-2 d-flex align-items-center justify-content-center">
            <button
              type="button"
              :class="{ disabled: loadingStatue.delCart == item.id }"
              @click="delCartItem(item.id)"
              class="btn btn-sm btn-danger btn_white "
              data-action="remove"
            >
              <span
                :class="{ 'd-none': loadingStatue.delCart !== item.id }"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-cart-dash"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
                <path
                  d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5
                  0 0 0 4 12h1a2 2 0 1 0 0 4 2 2
                  0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0
                  .491-.408l1.5-8A.5.5 0 0 0 14.5
                  3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102
                  4h10.796l-1.313 7h-8.17zM6 14a1 1 0
                  1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <ul class="d-flex justify-content-between align-items-center fw-bold ">
      <!-- <li><p>目前有{{cartsNum}}項產品</p></li> -->
      <li class="fs-3 text-decoration-line-through">
        <p>總價:{{ cartList.total }}</p>
      </li>
      <li class="fs-3 text-danger">
        <p>優惠價:{{ cartList.final_total }}</p>
      </li>
    </ul>
    <div class="d-flex justify-content-end">
      <button
        :class="{ 'd-none': cartList.carts == 0 }"
        class="btn btn-success "
        @click.prevent="sendCartsList"
      >
        <span
          :class="{ 'd-none': loadingStatue.sendCart !== 1 }"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        送出訂單 ( {{ cartsNum }} )筆商品
      </button>
    </div>
  </div>
  <!-- 購物車列表 end -->
  <hr />
  <!-- 送出表單 start-->
  <Createorder
    ref="createOrder"
    @re-get-cart-list="getCartList"
  ></Createorder>
  <!-- 送出表單 end -->

  <!-- 讀取畫面 start-->
  <Loading :isVueLoading='isLoading' />
  <!-- 讀取畫面 end -->
</template>

<script>
// Alert元件
import Alert from '@/components/Alert.vue';
// 送出訂單
import Createorder from '@/components/CreateOrderModal.vue';
// 讀取畫面
import Loading from '@/components/Loading.vue';

export default {
  components: {
    // Alert元件
    Alert,
    // 送出訂單
    Createorder,
    // 讀取畫面
    Loading,
  },
  data() {
    return {
      // alert元件參數
      alertMessage: '',
      alertStatus: false,
      // 讀取畫面
      isLoading: false,
      // 購物車資料
      cartList: {},
      // 購物車數量
      cartsNum: 0,
      // 讀取狀態
      loadingStatue: {
        addCart: '',
        // 刪除購物車鈕
        delCart: '',
        // 清空購物車鈕
        clearCart: '',
        // 送出購物車鈕
        sendCart: '',
      },
    };
  },
  methods: {
    // 取得購物車列表
    getCartList() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          if (res.data.success) {
            this.cartList = res.data.data;
            // 關掉讀取畫面
            this.isLoading = false;
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
            // 關掉讀取畫面
            this.isLoading = false;
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
          // 關掉讀取畫面
          this.isLoading = false;
        });
    },
    // 刪除購物車商品
    delCartItem(id) {
      // console.log(id)
      this.loadingStatue.delCart = id;
      this.$http
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then((res) => {
          // console.log(res);
          if (res.data.success) {
            // 刷新購物車
            this.getCartList();
            // 清空讀取狀態
            this.loadingStatue.delCart = '';
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
    // 清空購物車商品
    clearCart() {
      // console.log(id)
      this.loadingStatue.clearCart = 1;
      this.$http
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
        .then((res) => {
          // console.log(res);
          if (res.data.success) {
            // 刷新購物車
            this.getCartList();
            // alert(res.data.message);

            // alert 元件顯示
            this.alertMessage = res.data.message;
            this.alertStatus = true;
            setTimeout(
              () => {
                this.alertMessage = '';
                this.alertStatus = false;
              }, 2000,
            );
            this.loadingStatue.clearCart = '';
          } else {
            // alert(res.data.message);
          // alert 元件顯示
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
    // 改動購物車商品數量
    rediCartItemsNum(item) {
      // console.log(item)
      const cartItem = {
        data: { product_id: item.product_id, qty: parseInt(item.qty, 10) },
      };
      // console.log(cart_item)
      this.$http
        .put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, cartItem)
        .then((res) => {
          // console.log(res)
          if (res.data.success) {
            this.getCartList();
          } else {
            // alert(res.data.message);
            // alert 元件顯示
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
    // 送出購物車訂單
    sendCartsList() {
      this.loadingStatue.sendCart = 1;
      setTimeout(() => {
        this.loadingStatue.sendCart = '';
      }, 1000);

      this.$refs.createOrder.$refs.creatForm.resetForm();
      this.$refs.createOrder.openModal();
    },
  },
  watch: {
    // 刷新購物車數量
    cartList() {
      this.cartsNum = this.cartList.carts.length;
    },
  },
  mounted() {
    this.isLoading = true;
    // 刷新購物車列表
    this.getCartList();
  },
};
</script>

<style lang="scss" scoped>

.carNum{
  width: 50px;
}

</style>
