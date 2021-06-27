<template>
  <!-- 產品列表 start-->
  <div class="container mt_5p ">
    <div class="container">
      <h2 class="text-center ">商品列表</h2>
      <table class="table mt-4 row">
        <thead class="co1-12">
          <tr class="row">
            <th class="col-3 d-none d-md-table-cell">產品圖片</th>
            <th class="col-2">產品名稱</th>
            <th class="col-2 " >
              原價
            </th>
            <th class="col-2 col-md-1">
              售價
            </th>
            <th class="col-6 col-md-4 text-center">
              加入購物車
            </th>
          </tr>
        </thead>
        <tbody id="productList">
          <tr class="row " v-for="(item, i) in productData"  :key="'prd_' + i"
          >
          <!-- 產品圖片 -->
            <td class="col-3  d-none d-md-table-cell d-flex align-items-center">
              <img class="prd_img  cursor-point" :src="item.imageUrl" :alt="item.title"
              @click="viewOneProduct(item)"
              />
            </td>
            <!-- 產品名稱 -->
            <td class="col-2 d-flex align-items-center cursor-point" @click="viewOneProduct(item)"
            >{{ item.title }}</td>
            <!-- 原價 -->
            <td class="col-2 d-flex align-items-center cursor-point text-center
             justify-content-center"
            @click="viewOneProduct(item)">
              {{ item.origin_price }}
            </td>
            <!-- 售價 -->
            <td class="col-2 col-md-1 d-flex justify-content-center align-items-center
            cursor-point text-center"
            @click="viewOneProduct(item)">
              {{ item.price }}
            </td>
            <td class="col-6 col-md-4 d-flex align-items-center justify-content-center">
              <button
                :class="{ disabled: item.id === loadingStatue.viewContentStatus }"
                type="button"
                :id="'content_' + item.id"
                class="btn btn-sm btn-success btn_white btn-left"
                data-id="item.id"
                @click.prevent="openViewContentModal(item)"
              >
                <span
                  :class="{ 'd-none': item.id !== loadingStatue.viewContentStatus }"
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span
                  :class="{ 'd-none': item.id !== loadingStatue.viewContentStatus }"
                  class="visually-hidden"
                  >Loading...</span
                >
                查看內容
              </button>
              <button
                :class="{ disabled: item.id === loadingStatue.addCart }"
                type="button"
                :id="'car_' + item.id"
                @click.prevent="addCart(item.id, item.qty)"
                class="btn btn-sm btn-info btn_white btn-right"
                data-action="remove"
                data-id="item.id"
              >
                <span
                  :class="{ 'd-none': item.id !== loadingStatue.addCart }"
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span
                  :class="{ 'd-none': item.id !== loadingStatue.addCart }"
                  class="visually-hidden"
                >
                  Loading...</span
                >
                加入購物車
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p>此頁面有{{ dataLength }}項產品</p>
    </div>
  </div>
  <!-- 產品列表 end -->
  <!-- 分頁 start -->
  <div class="d-flex justify-content-center">
    <Pagination :pagination="pagination" @get-product="getProduct"></Pagination>
  </div>
  <!-- 分頁 end -->
  <!-- 商品詳細內容Modal start -->
    <ViewContent ref="viewContent" :prd-data="product" @add-cart-moadl="addItemsToCart">
    </ViewContent>
    <!-- 商品詳細內容Modal end -->

  <!-- 讀取畫面 start-->
  <Loading :isVueLoading='isLoading' />
  <!-- 讀取畫面 end -->
</template>

<script>
// 分頁
import Pagination from '@/components/Pagination.vue';
// 商品內容
import ViewContent from '@/components/ViewContentModal.vue';
// 讀取畫面
import Loading from '@/components/Loading.vue';

export default {
  components: {
    // 分頁
    Pagination,
    // 商品內容
    ViewContent,
    // 讀取畫面
    Loading,
  },
  data() {
    return {
      // 讀取畫面
      isLoading: false,
      // 產品資料
      productData: [],
      // 分頁
      pagination: [],
      // 登入/登出鈕
      loginStatus: false,
      // 資料筆數
      dataLength: 0,
      // 單一產品資料
      product: {},
      // 讀取狀態
      loadingStatue: {
        // 查看內容鈕
        viewContentStatus: '',
        // 加到購物車鈕
        addCart: '',
      },
    };
  },
  methods: {
    // 取得商品列表
    getProduct(page = 1) {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`)
        .then((res) => {
          console.log(res);
          // 如果成功就執行
          if (res.data.success) {
            this.productData = res.data.products;
            this.pagination = res.data.pagination;
            // console.log(1);
            console.log(this.productData);
            // 將資料筆數更新
            this.dataLength = this.productData.length;
            // 關掉讀取畫面
            this.isLoading = false;
          } else {
            alert('驗證錯誤，請重新登入!');

            // 跳轉頁面
            this.$router.push('/Login');
          }
        })
        .catch((err) => {
          console.log(err);
          // 關掉讀取畫面
          this.isLoading = false;
        });
    },
    // 加入購物車
    addCart(id, qty = 1) {
      this.loadingStatue.addCart = id;
      // console.log(id)
      // console.log(qty)
      const product = {
        data: {
          product_id: id,
          qty: parseInt(qty, 10),
        },
      };
      // console.log(product)
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, product)
        .then((res) => {
          // console.log(res);
          // 如果成功就執行
          if (res.data.success) {
            this.loadingStatue.addCart = '';
            alert(`${res.data.message}!`);

            // 刷新購物車
            // this.getCartList();
          } else {
            // console.log(res.data.message)
            alert(`${res.data.message}!`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 打開商品詳細內容modal
    openViewContentModal(item) {
      // console.log(item)
      // console.log(item.id)

      this.loadingStatue.viewContentStatus = item.id;

      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${item.id}`)
        .then((res) => {
          // console.log(res);
          // 如果成功就執行
          if (res.data.success) {
            //   console.log(res.data)
            this.product = res.data.product;

            // 清空資料
            this.loadingStatue.viewContentStatus = '';
            this.$refs.viewContent.openModal();
          } else {
            alert('驗證錯誤，請重新登入!');
            console.log(res);
            // 跳轉頁面
            this.$router.push('/Login');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 大量加進購物車
    addItemsToCart(item) {
    //   console.log(item);
      const product = {
        data: {
          product_id: item.id,
          qty: item.qty,
        },
      };
      // console.log(product);
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, product)
        .then((res) => {
          // console.log(res);
          // 如果成功就執行
          if (res.data.success) {
            alert(`${res.data.message}!`);
            console.log(res);
            this.$refs.viewContent.closeModal();

            // 刷新購物車
            // this.getCartList();
          } else {
            // console.log(res.data.message)
            alert(`${res.data.message}!`);
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    // 單一商品詳細內容
    viewOneProduct(item) {
      // 跳轉頁面
      this.$router.push(`/product/${item.id}`);
    },
  },
  created() {
  },
  mounted() {
    this.isLoading = true;
    // 取得商品資料
    this.getProduct();
  },
};
</script>

<style lang="scss" scoped>
.prd_img{
 width: 50% ;
}

</style>
