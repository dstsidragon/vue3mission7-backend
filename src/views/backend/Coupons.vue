<template>
    <h2  class="shadow-sm p-3 mt-1 mb-5 bg-yellow-lighten rounded
     text-primary fz-3 fz-sm-4 ">優惠券管理</h2>
     <div class='container'>
        <!-- Alert元件 start -->
  <Alert class="alert-position"  v-if="alertMessage" :message="alertMessage"
  :status="alertStatus" />
   <!-- Alert元件 end -->
       <div class="d-flex justify-content-end">
       <button class="btn btn-primary " @click="addCouponModal">新增產品</button>
       </div>
    <table class="table table-hover">
    <thead >
    <tr >
      <th  class="col-1">#</th>
      <th  class="d-none d-md-table-cell col-2">期限</th>
      <th  class="col-4 col-md-2">標題</th>
      <th  class="d-none d-lg-table-cell col-2">折扣</th>
      <th  class="col-2 d-none d-ssm-table-cell">使用</th>
      <th class="col-5 col-md-4">刪除</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for = "(item, i) in coupons" :key="item.id" >
      <th scope="row" class="col-1"> {{i+1}}</th>
      <td class="d-none d-md-table-cell col-md-2">{{ $toLocaleDate(item.due_date)}}</td>
      <td class="col-4 col-md-2">{{item.title}}</td>
      <td class="d-none d-lg-table-cell col-1">{{item.percent}}%</td>
      <td  class="col-3 position-relative d-none d-ssm-table-cell">
        <div class="btn__enable--center">
          <div class='onoffswitch '>
                <input
                  type='checkbox'
                  name='onoffswitch'
                  class='onoffswitch-checkbox'
                  @click='couponsEnable'
                  :id="'myonoffswitch_' + item.id"
                  tabindex='0'
                  v-if="item.is_enabled == 1"
                  checked
                  :data-couponsdata="JSON.stringify(item)"
                />
                <input
                  type='checkbox'
                  name='onoffswitch'
                  class="onoffswitch-checkbox"
                  @click='couponsEnable'
                  :id="'myonoffswitch_' + item.id"
                  tabindex='0'
                  v-else
                  :data-couponsdata="JSON.stringify(item) "
                />
                <label class='onoffswitch-label' :for="'myonoffswitch_' + item.id"></label>
              </div>
        </div>
            </td>
      <td class='col-5  position-relative'>
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
    <img v-if="coupons.length ===0 " src="@/assets/images/notfound.png" alt="not found">

  <!-- 編輯優惠券Moadal start-->
  <RediCouponModal ref="reditCoupon"
    :redi-datas='redicouponData'
    @emit-redit-new-nata='reditOneData'/>
  <!-- 編輯優惠券Moadal end-->

  <!-- 分頁 start-->
  <div v-if="pagination.total_pages" class='d-flex justify-content-center'>
    <Pagination :pagination='pagination' @get-product='getCouponsData'></Pagination>
</div>
  <!-- 分頁 end-->

  <!-- 新增優惠券Modal start-->
  <AddCouponsModal ref="addCouponModal"  @send="addCoupon" />
  <!-- 新增優惠券Modal end-->

  <!-- 刪除單一Modal start-->
  <Delete ref="deleteModal"  @send="delOneData" />
  <!-- 刪除單一Modal end-->

   <!-- 讀取畫面 start -->
  <div class="container">
  <Loading :isVueLoading='isLoading' />
  </div>
   <!-- 讀取畫面 end -->
  </div>
</template>

<script>
// 分頁
import Pagination from '@/components/Pagination.vue';
// 編輯訂單Modal
import RediCouponModal from '@/components/RediCouponModal.vue';
// 刪除全部 Modal
import AddCouponsModal from '@/components/AddCouponsModal.vue';
// 讀取畫面
import Loading from '@/components/Loading.vue';
// 刪除單一Modal
import Delete from '@/components/Delete.vue';
// Alert元件
import Alert from '@/components/Alert.vue';

export default {
  components: {
  // Alert元件
    Alert,
    // 分頁
    Pagination,
    // 編輯優惠券Modal
    RediCouponModal,
    // 新增優惠券 Modal
    AddCouponsModal,
    // 讀取畫面
    Loading,
    // 刪除單一Modal
    Delete,
  },
  data() {
    return {
      // alert元件參數
      alertMessage: '',
      alertStatus: false,
      // 優惠券資料
      coupons: [],
      // 分頁
      pagination: [],
      // 編輯的優惠券資料
      redicouponData: [],
      // 讀取畫面
      isLoading: false,
    };
  },
  methods: {
    // 取得優惠券
    getCouponsData(page = 1) {
      // this.isLoading = true;
      // console.log(page);
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.$http
        .get(url)
        .then(
          (res) => {
            // console.log(res);
            if (res.data.success) {
              this.coupons = res.data.coupons;
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
    // 修改優惠券狀態
    couponsEnable(e) {
      const obj = JSON.parse(e.target.dataset.couponsdata);
      const { id } = obj;
      console.log(obj);
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`;
      this.$http
        .put(url, {
          data: {
            title: obj.title,
            is_enabled: (obj.is_enabled === 0 ? 1 : 0),
            percent: obj.percent,
            due_date: obj.due_date,
            code: obj.code,
          },
        })
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
              this.getCouponsData();
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
    // 刪除單一筆優惠券
    delOneData(e) {
      const { id } = e;
      // console.log(id);
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`;
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
              this.getCouponsData();
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
            this.alertStatus = true;
            setTimeout(
              () => {
                this.alertMessage = '';
                this.alertStatus = false;
              }, 2000,
            );
          },
        );
    },
    // 取得編輯優惠券
    getOneData(e) {
      const coupon = JSON.parse(e.target.dataset.item);
      // console.log(coupon);
      this.redicouponData = coupon;
      this.$refs.reditCoupon.openModal();
    },
    // 編輯 優惠券
    reditOneData(item) {
      // console.log(item);
      this.$refs.reditCoupon.closeModal();
      const { id } = item;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`;
      this.$http
        .put(url, {
          data: {
            title: item.title,
            is_enabled: item.is_enabled,
            percent: item.percent,
            due_date: item.due_date,
            code: item.code,
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
              this.getCouponsData();
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
    // 開啟addCouponModal
    addCouponModal() {
      this.$refs.addCouponModal.$refs.addOrderForm.resetForm();
      this.$refs.addCouponModal.openModal();
    },
    // 新增 優惠券
    addCoupon(item) {
      // console.log(item);
      this.$refs.addCouponModal.closeModal();
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
      this.$http
        .post(url, {
          data: {
            title: item.title,
            is_enabled: item.is_enabled,
            percent: parseInt(item.percent, 10),
            due_date: item.due_date,
            code: item.code,
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
              // 刷新畫面
              this.getCouponsData();
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
    this.getCouponsData();
  },

};

</script>

<style lang="scss">

</style>
