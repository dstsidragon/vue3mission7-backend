<template>
    <h2 class="shadow-sm p-3 mt-1 mb-5 bg-yellow-lighten rounded
     text-primary fz-3 fz-sm-4">訂單列表</h2>
     <div class='container'>
       <div v-if="pagination.total_pages" class="d-flex justify-content-end">
       <button class="btn btn-danger " @click="this.$refs.deleteAllModal.openModal()"
       >清空全部訂單</button>
       </div>
    <table class="table table-hover">
    <thead >
    <tr >
      <th scope="col" class="col-1">#</th>
      <th scope="col" class="d-none d-md-table-cell col-md-3">建立時間</th>
      <th scope="col" class="col-2">姓名</th>
      <th scope="col" class="col-3 d-none d-ssm-table-cell">付款</th>
      <th scope="col" class="col-3">刪除</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for = "(item, i) in orders" :key="item.id" >
      <th scope="row" class="col-1"> {{item.num}}</th>
      <td class="d-none d-md-table-cell col-md-3">{{ $toLocaleDate(item.create_at)}}</td>
      <td class="col-2">{{item.user.name}}</td>
      <td  class="col-3 position-relative d-none d-ssm-table-cell">
        <div class="btn__enable--center">
          <div class='onoffswitch '>
                <input
                  type='checkbox'
                  name='onoffswitch'
                  class='onoffswitch-checkbox'
                  @click='orderEnable'
                  :id="'myonoffswitch_' + item.id"
                  tabindex='0'
                  v-if="item.is_paid == 1"
                  checked
                  :data-orderData="JSON.stringify(item)"
                />
                <input
                  type='checkbox'
                  name='onoffswitch'
                  class="onoffswitch-checkbox"
                  @click='orderEnable'
                  :id="'myonoffswitch_' + item.id"
                  tabindex='0'
                  v-else
                  :data-orderData="JSON.stringify(item) "
                />
                <label class='onoffswitch-label' :for="'myonoffswitch_' + item.id"></label>
              </div>
        </div>
            </td>
      <td class='col-3 position-relative'>
        <div class="btn__del--center">
           <button
                type='button'
                :id="'getOne_' + i"
                @click='getOneData'
                class='btn btn-sm btn-primary btn-left'
                :data-item='JSON.stringify(item)'
              >
                查看
              </button>
              <button
                type='button'
                :id="'delOrder_' + item.id"
                @click='this.$refs.deleteModal.openModal(item)'
                class='btn btn-sm btn-danger btn-right'
                :data-id='item.id'
              >
                刪除
              </button>
        </div>
            </td>
    </tr>
  </tbody>
    </table>

     <!-- 沒資料的圖片 -->
    <img v-if="orders.length === 0" src="@/assets/images/notfound.png" alt="not found">

  <!-- Alert元件 start -->
  <Alert class="alert-position"  v-if="alertMessage" :message="alertMessage"
  :status="alertStatus" />
  <!-- Alert元件 end -->
  <!-- 訂單Moadal start-->
  <ReditOrderModal ref="reditOrder"
    :redi-datas='rediOrderData'
    @emit-redit-new-nata='reditOneData'/>
  <!-- 訂單Moadal end-->

  <!-- 分頁 start-->
  <div v-if="pagination.total_pages" class='d-flex justify-content-center'>
    <Pagination :pagination='pagination' @get-product='getOrdersData'></Pagination>
</div>
  <!-- 分頁 end-->

  <!-- 刪除單一Modal start-->
  <Delete ref="deleteModal"  @send="delOneData" />
  <!-- 刪除單一Modal end-->

  <!-- 刪除全部Modal start-->
  <DeleteAll ref="deleteAllModal"  @send="deleteAll" />
  <!-- 刪除全部Modal end-->

   <!-- 讀取畫面 start -->
  <div class="container">
  <Loading :isVueLoading='isLoading' />
  </div>
   <!-- 讀取畫面 end -->
  </div>
</template>

<script>
// Alert元件
import Alert from '@/components/Alert.vue';
// 分頁
import Pagination from '@/components/Pagination.vue';
// 編輯訂單Modal
import ReditOrderModal from '@/components/ReditOrderModal.vue';
// 刪除全部 Modal
import DeleteAll from '@/components/DeleteAll.vue';
// 讀取畫面
import Loading from '@/components/Loading.vue';
// 刪除單一Modal
import Delete from '@/components/Delete.vue';

export default {
  components: {
    // 刪除單一Modal
    Delete,
    // Alert元件
    Alert,
    // 分頁
    Pagination,
    // 編輯訂單Modal
    ReditOrderModal,
    // 刪除全部 Modal
    DeleteAll,
    // 讀取畫面
    Loading,
  },
  data() {
    return {
      // alert元件參數
      alertMessage: '',
      alertStatus: false,
      // 訂單資料
      orders: [],
      // 分頁
      pagination: [],
      // 編輯的訂單資料
      rediOrderData: [],
      // 讀取畫面
      isLoading: false,
    };
  },
  methods: {
    // 取得訂單
    getOrdersData(page = 1) {
      this.isLoading = true;
      // console.log(page);
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.$http
        .get(url)
        .then(
          (res) => {
            // console.log(res);
            if (res.data.success) {
              this.orders = res.data.orders;
              this.pagination = res.data.pagination;
              this.isLoading = false;
            } else {
              // console.log(res.data.message);
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
            // console.log(err.data.message);
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
    // 修改付款狀態
    orderEnable(e) {
      const obj = JSON.parse(e.target.dataset.orderdata);
      const { id } = obj;
      // console.log(obj);
      obj.is_paid = !obj.is_paid;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${id}`;
      this.$http
        .put(url, {
          data: {
            create_at: obj.create_at,
            is_paid: obj.is_paid,
            message: obj.message,
            payment_method: obj.payment_method,
            products: obj.products,
            total: parseInt(obj.total, 10),
            user: obj.user,
          },
        })
        .then(
          (res) => {
            // console.log(res);
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
              this.getOrdersData();
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
            // console.log(err);
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
    // 刪除單一筆訂單
    delOneData(e) {
      console.log(e);
      const { id } = e;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${id}`;
      this.$http
        .delete(url)
        .then(
          (res) => {
            // console.log(res);
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
              // 刷新畫面
              this.getOrdersData();
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
            // console.log(err.data.message);
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
    // 取得編輯訂單
    getOneData(e) {
      const order = JSON.parse(e.target.dataset.item);
      // console.log(order);
      this.rediOrderData = order;
      this.$refs.reditOrder.openModal();
    },
    // 編輯 訂單
    reditOneData(item) {
      // console.log(item);
      this.$refs.reditOrder.closeModal();
      const { id } = item;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${id}`;
      this.$http
        .put(url, {
          data: {
            create_at: item.create_at,
            is_paid: item.is_paid,
            message: item.message,
            payment_method: item.payment_method,
            products: item.products,
            total: parseInt(item.total, 10),
            user: item.user,
          },
        })
        .then(
          (res) => {
            // console.log(res);
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
              this.getOrdersData();
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
            // console.log(err);
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
    // 刪除 全部訂單
    deleteAll() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/all`;
      this.$http
        .delete(url)
        .then(
          (res) => {
            // console.log(res);
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
              // 刷新畫面
              this.getOrdersData();
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
            // console.log(err.data.message);
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
  },
  mounted() {
    this.getOrdersData();
  },

};

</script>
