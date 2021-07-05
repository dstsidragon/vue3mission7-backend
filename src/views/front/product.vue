<template>
          <div class="mt_navbar">
              <h2 class="text-center" >
            商品詳細介紹
          </h2>
          <div class="card mb-3" >
            <div class="row g-0">
              <!-- <div class="col-md-4"
              :style="`height:300px; background:center center no-repeat
               url(${product.imageUrl});background-size: contain;`">
              </div> -->
                <img class="object-fit col-md-4" style="height:360px;weight:100%;"
                :src="product.imageUrl" />
              <div class="col-md-8">
                <div class="card-body">
                  <h3 class="card-title bg-primary text-white rounded">{{ product.title }}</h3>
                  <p class="card-text">{{ product.description }}</p>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-html="product.content"></li>
                  </ul>
                  <span class="row text-center">
                    <span class="text-decoration-line-through col-6">
                      原價
                      <em>{{ product.origin_price }}</em>
                      元
                    </span>
                    <span class="text-danger col-6">
                      特價
                      <em>{{ product.price }}</em>
                      元
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          </div>
          <!-- Alert元件 start -->
          <Alert class="alert-position"  v-if="alertMessage"
           :message="alertMessage"
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
      id: this.$route.params.id,
      product: '',
      // alert元件參數
      alertMessage: '',
      alertStatus: false,
    };
  },
  methods: {
    // 取得商品
    getProductData() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.$http
        .get(url)
        .then((res) => {
          // console.log(res);
          // 如果成功就執行
          if (res.data.success) {
            console.log(res.data);

            // alert 元件顯示
            this.alertMessage = res.data.message;
            this.alertStatus = true;
            setTimeout(
              () => {
                this.alertMessage = '';
                this.alertStatus = false;
              }, 2000,
            );
            this.product = res.data.product;
          } else {
            // alert('驗證錯誤，請重新登入!');
            // console.log(res);

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
  },
  created() {
    // console.log(this.$route.params.id);
  },
  mounted() {
    // 取得產品資訊
    this.getProductData();
  },
};
</script>
