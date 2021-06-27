<template>
  <div
    ref="addProductModal"
    class="modal fade"
    id="addProduct"
    tabindex="-1"
    aria-labelledby="addProductModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addProductModal">新增產品</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="card card-body row">
            <div class="form-group mb-2">
              <label for="bg_add_title2">標題</label>
              <input
                type="text"
                id="bg_add_title2"
                placeholder="請輸入標題"
                class="form-control"
                required
                v-model="addProducts.bg_add_title"
              />
            </div>

            <div class="form-group mb-2">
              <label for="bg_add_description2">描述</label>
              <textarea
                type="text"
                id="bg_add_description2"
                placeholder="請輸入描述"
                class="form-control"
                v-model="addProducts.bg_add_description"
              ></textarea>
            </div>
            <div class="form-group mb-2">
              <label for="bg_add_content">說明</label>
              <textarea
                type="text"
                id="bg_add_content"
                placeholder="請輸入說明"
                class="form-control"
                v-model="addProducts.bg_add_content"
              ></textarea>
            </div>
            <div class="form-row d-flex flex-wrap justify-content-between mb-2">
              <div class="form-group col-md-5">
                <label for="bg_add_category2">分類</label>
                <input
                  type="text"
                  id="bg_add_category2"
                  placeholder="請輸入分類"
                  class="form-control"
                  v-model="addProducts.bg_add_category"
                />
              </div>

              <div class="form-group col-md-5">
                <label for="bg_add_unit">單位</label>
                <input
                  type="unit"
                  id="bg_add_unit"
                  placeholder="請輸入單位"
                  class="form-control"
                  v-model="addProducts.bg_add_unit"
                />
              </div>
            </div>
            <div class="form-row d-flex flex-wrap justify-content-between mb-2">
              <div class="form-group col-md-5">
                <label for="bg_add_origin_price">原價</label>
                <input
                  type="number"
                  id="bg_add_origin_price"
                  placeholder="請輸入原價"
                  min="0"
                  oninput="value=value.replace('-', '')"
                  class="form-control"
                  v-model="addProducts.bg_add_origin_price"
                />
              </div>

              <div class="form-group col-md-5">
                <label for="bg_add_price">售價</label>
                <input
                  type="number"
                  id="bg_add_price"
                  placeholder="請輸入售價"
                  class="form-control"
                  min="0"
                  oninput="value=value.replace('-', '')"
                  v-model="addProducts.bg_add_price"
                />
              </div>
            </div>
            <hr class="mt-5" />
            <div class="form-group">
              <label for="bg_add_image">點此上傳主圖</label>
              <input
                type="text"
                disabled
                v-model="addProducts.imageUrl"
                placeholder="請輸入主圖連結"
                class="form-control mb-2"
              />
              <img
                id="bg_image"
                :class="{ 'd-none': !addProducts.imageUrl }"
                :src="addProducts.imageUrl"
                alt="主圖"
                width="250"
                class="img-fluid"
              />
              <input
                id="bg_add_image"
                ref="UpLoadImgInp"
                type="file"
                name="file-to-upload"
                class="d-none"
              />
            </div>

            <div class="form-row d-flex flex-wrap">
              <div item="0" class="form-group col-md-6">
                <label for="bg_add_image12">輸入圖片網址 1 </label>
                <input
                  type="text"
                  id="bg_add_image12"
                  v-model="addProducts.imageUrls.url1"
                  placeholder="請輸入圖片連結"
                  class="form-control mb-2"
                />
                <img
                  id="bg_image1"
                  :class="{ 'd-none': !addProducts.imageUrls.url1 }"
                  :src="addProducts.imageUrls.url1"
                  alt="圖片1"
                  width="250"
                  class="img-fluid"
                />
              </div>
              <div item="1" class="form-group col-md-6">
                <label for="bg_add_image22">輸入圖片網址 2 </label>
                <input
                  type="text"
                  id="bg_add_image22"
                  v-model="addProducts.imageUrls.url2"
                  placeholder="請輸入圖片連結"
                  class="form-control mb-2"
                />
                <img
                  id="bg_image2"
                  :class="{ 'd-none': !addProducts.imageUrls.url2 }"
                  :src="addProducts.imageUrls.url2"
                  alt="圖片2"
                  width="250"
                  class="img-fluid"
                />
              </div>
              <div item="2" class="form-group col-md-6">
                <label for="bg_add_image32">輸入圖片網址 3 </label>
                <input
                  type="text"
                  id="bg_add_image32"
                  v-model="addProducts.imageUrls.url3"
                  placeholder="請輸入圖片連結"
                  class="form-control mb-2"
                />
                <img
                  id="bg_image3"
                  :class="{ 'd-none': !addProducts.imageUrls.url3 }"
                  :src="addProducts.imageUrls.url3"
                  alt="圖片3"
                  width="250"
                  class="img-fluid"
                />
              </div>
              <div item="3" class="form-group col-md-6">
                <label for="bg_add_image42">輸入圖片網址 4 </label>
                <input
                  type="text"
                  id="bg_add_image42"
                  v-model="addProducts.imageUrls.url4"
                  placeholder="請輸入圖片連結"
                  class="form-control mb-2"
                />
                <img
                  id="bg_image4"
                  :class="{ 'd-none': !addProducts.imageUrls.url4 }"
                  :src="addProducts.imageUrls.url4"
                  alt="圖片4"
                  width="250"
                  class="img-fluid"
                />
              </div>
              <div item="4" class="form-group col-md-6">
                <label for="bg_add_image52">輸入圖片網址 5 </label>
                <input
                  type="text"
                  id="bg_add_image52"
                  v-model="addProducts.imageUrls.url5"
                  placeholder="請輸入圖片連結"
                  class="form-control mb-2"
                />
                <img
                  id="bg_image5"
                  :class="{ 'd-none': !addProducts.imageUrls.url5 }"
                  :src="addProducts.imageUrls.url5"
                  alt="圖片5"
                  width="250"
                  class="img-fluid"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  type="checkbox"
                  true-value="1"
                  false-value="0"
                  id="bg_add_is_enabled"
                  class="form-check-input"
                  v-model="addProducts.bg_add_is_enabled"
                />
                <label for="bg_add_is_enabled" class="form-check-label">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal"
          data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="addPrductData"
           >建立產品資料</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: ['addProduct'],
  data() {
    return {
      modal: '',
      addProducts: {
        bg_add_title: '',
        bg_add_category: '',
        bg_add_origin_price: '',
        bg_add_price: '',
        bg_add_unit: '',
        bg_add_description: '',
        bg_add_content: '',
        bg_add_is_enabled: false,
        imageUrl: '',
        imageUrls: {
          url1: '',
          url2: '',
          url3: '',
          url4: '',
          url5: '',
        },
      },
    };
  },
  methods: {
    addPrductData() {
      // 新增的產品資料
      const product = {
        data: {
          title: this.addProducts.bg_add_title,
          category: this.addProducts.bg_add_category,
          // eslint-disable-next-line radix
          origin_price: parseInt(this.addProducts.bg_add_origin_price),
          // eslint-disable-next-line radix
          price: parseInt(this.addProducts.bg_add_price),
          unit: this.addProducts.bg_add_unit,
          description: this.addProducts.bg_add_description,
          content: this.addProducts.bg_add_content,
          is_enabled: this.addProducts.bg_add_is_enabled,
          imageUrl: this.addProducts.imageUrl,
          imagesUrl: [
            this.addProducts.imageUrls.url1,
            this.addProducts.imageUrls.url2,
            this.addProducts.imageUrls.url3,
            this.addProducts.imageUrls.url4,
            this.addProducts.imageUrls.url5,
          ],
        },
      };
      //   console.log(typeof this.addProduct.bg_add_is_enabled);
      this.$emit('emit-product-data', product);
    //   this.closeModal();
    },
    // 開啟modal
    openModal() {
      // 開啟modal
      this.modal.show();
      this.cleadData();
    },
    // 隱藏modal
    closeModal() {
      // 隱藏modal
      this.modal.hide();
      this.cleadData();
    },
    cleadData() {
      this.addProducts = {
        bg_add_price: null,
        bg_add_origin_price: null,
        bg_add_unit: '',
        bg_add_category: '',
        bg_add_content: '',
        bg_add_description: '',
        bg_add_title: '',
        bg_add_is_enabled: false,
        imageUrl: '',
        imageUrls: {
          url1: '',
          url2: '',
          url3: '',
          url4: '',
          url5: '',
        },
      };
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.addProductModal);
    console.log(this.$refs.addProductModal);
  },
};
</script>
