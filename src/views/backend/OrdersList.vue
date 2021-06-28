<template>
    <h1>訂單列表</h1>
    <table class="table table-hover">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">建立時間</th>
      <th scope="col">姓名</th>
      <th scope="col">金額</th>
      <th scope="col">付款</th>
      <th scope="col">刪除</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for = "(item, i) in orders" :key="item.id" >
      <th scope="row"> {{item.num}}</th>
      <td>{{ $toLocaleDate(item.create_at)}}</td>
      <td>{{item.user.name}}</td>
      <td>{{item.total}}</td>
      <td>{{i}}</td>
    </tr>
  </tbody>
    </table>
  <!-- 分頁 start-->
  <div class='d-flex justify-content-center'>
    <Pagination :pagination='pagination' @get-product='getOrdersData'></Pagination>
</div>
  <!-- 分頁 end-->
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      // 訂單資料
      orders: [],
      // 分頁
      pagination: [],
    };
  },
  methods: {
    // 取得訂單
    getOrdersData(page = 1) {
      console.log(page);
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.$http
        .get(url)
        .then(
          (res) => {
            console.log(res);
            if (res.data.success) {
              this.orders = res.data.orders;
              this.pagination = res.data.pagination;
            } else {
              console.log(res.data.message);
            }
          },
        )
        .catch(
          (err) => {
            console.log(err.data.message);
          },
        );
    },
  },
  mounted() {
    this.getOrdersData();
  },

};

</script>
