<template>
          <div class="mt-3">
              <h2 class="text-center" >
            產品詳細內容
          </h2>
          <div class="card mb-3" >
            <div class="row g-0">
              <div class="col-md-4">
                <img class="prd_img_100" :src="product.imageUrl" />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h3 class="card-title bg-dark">{{ product.title }}</h3>
                  <p class="card-text">{{ product.description }}</p>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">{{ product.content }}</li>
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
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      product: '',
    };
  },
  methods: {
    getProductData() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.$http
        .get(url)
        .then((res) => {
          // console.log(res);
          // 如果成功就執行
          if (res.data.success) {
            console.log(res.data);
            this.product = res.data.product;
          } else {
            alert('驗證錯誤，請重新登入!');
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    console.log(this.$route.params.id);
  },
  mounted() {
    // 取得產品資訊
    this.getProductData();
  },
};
</script>
