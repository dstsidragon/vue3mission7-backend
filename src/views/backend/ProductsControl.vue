/* eslint-disable radix */
<template>
    <h2 class="shadow-sm p-3 mt-1 mb-5 bg-yellow-lighten text-primary
    rounded fz-3 fz-sm-4">商品管理</h2>
  <!-- 新增產品 start-->
  <div class='container mt-5 justify-content-evenly d-flex align-items-center'>

    <!-- Alert元件 start -->
    <Alert class="alert-position"  v-if="alertMessage" :message="alertMessage"
    :status="alertStatus" />
    <!-- Alert元件 end -->
    <!-- Button trigger modal -->
      <button
        class='btn btn-primary '
        type='button'
        @click='clearProductData'
      >
        新增產品
      </button>
    <button class='btn btn-primary d-none d-sm-block'
    type='button' @click='OneKeyAddDefaultProduct'>
      一鑑輸入預設商品
    </button>
    <button
    v-if="dataLength>0"
      :class="{ 'd-none': !this.productDataAll }"
      class='btn btn-danger d-none d-sm-block'
      type='button'
      @click='this.$refs.deleteAllModal.openModal();'
    >
      一鑑刪除全部商品
    </button>

    <!-- Modal -->
    <AddProductModal ref='UpLoadImg' :add-product='addProduct' @emit-product-data='addPrductData'>
    </AddProductModal>
  </div>
  <!-- 新增產品 end-->

  <!-- 刪除單一Modal start-->
  <Delete ref="deleteModal"  @send="delOneData" />
  <!-- 刪除單一Modal end-->

  <!-- 產品列表 -->
  <div class='container mt_5p '>
    <div class='container'>
      <table class='table mt-4 row'>
        <thead class='co1-12'>
          <tr class='row'>
            <th class='col-3 d-none d-md-table-cell'>產品圖片</th>
            <th class='col-3 '>產品名稱</th>
            <th class='col-2 col-md-1 d-none d-ssm-table-cell' width='120'>
              原價
            </th>
            <th class='col-3 col-ssm-2 col-md-1'>
              售價
            </th>
            <th class='col-3 col-ssm-2'>
              是否啟用
            </th>
            <th class='col-3 col-md-2'>
              編輯/刪除
            </th>
          </tr>
        </thead>
        <tbody id='productList'>
          <tr v-for='(item, i) in productData' class='row' :key="'bg_prd' + i">
            <td class='col-3 d-none d-md-table-cell d-flex align-items-center'>
              <img class='prd_img' :src='item.imageUrl' alt='' />
            </td>
            <td class='col-3  d-flex justify-content-center
            align-items-center'>{{ item.title }}
            </td>
            <td class='col-2 col-md-1 d-none d-ssm-table-cell
             d-flex justify-content-center align-items-center'>
              {{ item.origin_price }}
            </td>
            <td class='col-3 col-ssm-2 col-md-1 justify-content-center d-flex align-items-center'>
              {{ item.price }}
            </td>
            <td class='col-3 col-ssm-2  d-flex justify-content-center align-items-center'>
              <div class='onoffswitch'>
                <input
                  type='checkbox'
                  name='onoffswitch'
                  class='onoffswitch-checkbox'
                  @click='productEnable'
                  :id="'myonoffswitch_' + item.id"
                  tabindex='0'
                  v-if="item.is_enabled == 1"
                  checked
                  :data-is_enabled="item.is_enabled"
                  :data-id="item.id"
                  :data-title="item.title"
                  :data-category="item.category"
                  :data-unit="item.unit"
                  :data-origin_price="item.origin_price"
                  :data-price="item.price"
                />
                <input
                  type='checkbox'
                  name='onoffswitch'
                  class="onoffswitch-checkbox"
                  @click='productEnable'
                  :id="'myonoffswitch_' + item.id"
                  tabindex='0'
                  v-else
                  :data-is_enabled='item.is_enabled'
                  :data-id='item.id'
                  :data-title='item.title'
                  :data-category='item.category'
                  :data-unit='item.unit'
                  :data-origin_price='item.origin_price'
                  :data-price='item.price'
                />
                <label class='onoffswitch-label' :for="'myonoffswitch_' + item.id"></label>
              </div>
            </td>
            <td class='col-3 col-md-2 justify-content-center d-flex align-items-center'>
              <button
                type='button'
                :id="'redit_' + i"
                @click='getReditOneData'
                class='btn btn-sm btn-primary btn-left'
                data-action='remove'
                :data-id='item.id'
              >
                編輯
              </button>
              <button
                type='button'
                :id="'del_' + item.id"
                @click='this.$refs.deleteModal.openModal(item)'
                class='btn btn-sm btn-danger btn-right'
                data-action='remove'
                :data-id='item.id'
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p>目前頁面有 {{ dataLength }} 項產品</p>
    </div>
  </div>

  <!-- 修改商品Modal -->
  <ReditProductModal
  ref="ReditProductModal"
    :redi-datas='rediData'
    @emit-redit-new-nata='reditOneData'
  ></ReditProductModal>

  <!-- 分頁 start-->
  <div class='d-flex justify-content-center'>
    <Pagination :pagination='pagination' @get-product='getProduct'></Pagination>

  <!-- 分頁 end-->

  <!-- 讀取畫面 start-->
  <Loading :isVueLoading='isLoading' />
  <!-- 讀取畫面 end -->

  <!-- 刪除全部Modal start-->
  <DeleteAll ref="deleteAllModal"  @send="OneKeyDelAllProduct" />
  <!-- 刪除全部Modal end-->
  </div>
</template>
<script>
// 刪除單一Modal
import Delete from '@/components/Delete.vue';
// 分頁
import Pagination from '@/components/Pagination.vue';
// 新增商品 Modal
import AddProductModal from '@/components/AddProductModal.vue';
// 編輯商品 Modal
import ReditProductModal from '@/components/ReditProductModal.vue';
// 讀取畫面
import Loading from '@/components/Loading.vue';
// Alert元件
import Alert from '@/components/Alert.vue';
// 刪除全部 Modal
import DeleteAll from '@/components/DeleteAll.vue';

export default {
  components: {
    // 刪除全部 Modal
    DeleteAll,
    // 刪除單一Modal
    Delete,
    // Alert元件
    Alert,
    // 分頁
    Pagination,
    // 新增商品 Modal
    AddProductModal,
    // 編輯商品 Modal
    ReditProductModal,
    // 讀取畫面
    Loading,
  },
  data() {
    return {
      // alert元件參數
      alertMessage: '',
      alertStatus: false,
      // 讀取狀態
      isLoading: false,
      // 商品資料
      productData: [],
      // 全部商品資料
      productDataAll: {},
      allProductAry: [],
      // 分頁
      pagination: [],
      // 商品資料筆數
      dataLength: 0,
      // 取得token
      token: document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1'),
      // 預存的商品資料
      defaulData: [],
      // 編輯資料索引
      rediData: {
        redi_index: null,
        id: '',
        title: '',
        description: '',
        content: '',
        category: null,
        unit: '',
        origin_price: null,
        price: null,
        is_enabled: 0,
        num: 1,
        imageUrl: '',
        imagesUrl: {
          url1: '',
          url2: '',
          url3: '',
          url4: '',
          url5: '',
        },
      },
      // 新增產品
      addProduct: {
        imageUrls: {},
      },
    };
  },
  methods: {
    // 取得商品列表
    getProduct(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          // console.log(res);
          // console.log(res.data.success);

          // 如果成功就執行
          if (res.data.success) {
            this.productData = res.data.products;
            // console.log(this.productData);
            this.pagination = res.data.pagination;
            // 更新筆數
            this.dataLength = this.productData.length;

            // 取得全部商品
            this.getAllProduct();

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
            // 跳轉頁面
            this.$router.push('/login');
          }
        })
        .catch((err) => {
          // console.log(err);
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

    // 刪除單一資料
    delOneData(e) {
      const { id } = e;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          // console.log(res);

          // 如果成功就執行
          if (res.data.success) {
            // alert(`${res.data.message}`);
            this.alertMessage = res.data.message;
            this.alertStatus = true;
            setTimeout(
              () => {
                this.alertMessage = '';
                this.alertStatus = false;
              }, 2000,
            );
            this.getProduct();
          } else {
            // alert(`${res.data.message}`);
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
          this.alertMessage = err.data.message;
          this.alertStatus = true;
          setTimeout(
            () => {
              this.alertMessage = '';
              this.alertStatus = false;
            }, 2000,
          );
        });
    },
    // 啟用/未啟用事件
    productEnable(e) {
      const delId = e.target.dataset.id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${delId}`;
      this.$http
        .put(url, {
          data: {
            category: `${e.target.dataset.category}`,
            is_enabled: e.target.dataset.is_enabled === '1' ? 0 : 1,
            // eslint-disable-next-line radix
            origin_price: parseInt(e.target.dataset.origin_price),
            // eslint-disable-next-line radix
            price: parseInt(e.target.dataset.price),
            title: `${e.target.dataset.title}`,
            unit: `${e.target.dataset.unit}`,
          },
        })
        .then((res) => {
          // console.log(res)
          // 如果成功就執行
          if (res.data.success) {
            // alert('已變更啟用狀態!');
            this.alertMessage = res.data.message;
            this.alertStatus = true;
            setTimeout(
              () => {
                this.alertMessage = '';
                this.alertStatus = false;
              }, 2000,
            );
            this.getProduct();
          }
        })
        .catch((err) => {
          // console.log(err);
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

    // 建立產品
    addPrductData(emitproductData) {
      // console.log(emitproductData);
      // 判斷是否都不為空值
      if (
        emitproductData.bg_add_title !== ''
        && emitproductData.bg_add_category !== ''
        && emitproductData.bg_add_unit !== ''
        && emitproductData.bg_add_origin_price !== ''
        && emitproductData.bg_add_price !== ''
      ) {
        //   console.log(API_Path)
        const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;

        // 送至伺服器
        this.$http
          .post(url, emitproductData)
          .then((res) => {
            // alert(res.data.message);
            // 如果成功就執行
            if (res.data.success) {
              this.alertMessage = res.data.message;
              this.alertStatus = true;
              setTimeout(
                () => {
                  this.alertMessage = '';
                  this.alertStatus = false;
                }, 2000,
              );
              // 刷新
              this.getProduct();

              // 關掉新增產品選單
              this.$refs.UpLoadImg.closeModal();
              // 清空新增產品的資料
              this.clearProductData();
            }
          })
          .catch((err) => {
            // console.dir(err);
            this.alertMessage = err.data.message;
            this.alertStatus = false;
            setTimeout(
              () => {
                this.alertMessage = '';
                this.alertStatus = false;
              }, 2000,
            );
          });
      } else {
        // alert('標題、分類、單位、原價、售價為必填欄位!');
        this.alertMessage = '標題、分類、單位、原價、售價為必填欄位!';
        this.alertStatus = false;
        setTimeout(
          () => {
            this.alertMessage = '';
            this.alertStatus = false;
          }, 2000,
        );
      }
    },
    // 一鑑輸入預設商品
    OneKeyAddDefaultProduct() {
      this.defaulData = [
        {
          title: 'SON GOKU A賞',
          description:
            'ドラゴンボール超 SMSP 孫悟空 フィギュア リペイント GT悟空カラーに変更 BWFC SUPER MASTER STARS PIECE THE SON GOKU A賞',
          content:
            'GT悟空のカラーに変更いたしました。如意棒は接着してあるので手首を脱着式にしました。国内正規品の素体にエアーブラシ・ドライブラシにて立体感・リアル・存在感が出るようにリペイントしました。元箱付きになります。素人製作の為完璧品をお求めの方はご遠慮下さい。色ムラ・スレ・汚れ等がある場合もございますので、画像にて判断していただき入札の方お願いいたします。仕上げにトップコートを施していますが、傷等に弱いのでご注意して下さい。ご使用のモニター等により、色合いが若干異なる場合がありますがご了承願います。できる限り最小サイズにて発送を心がけていますので、元箱のあるものは、元箱に入れてプチプチ梱包にて発送になります。元箱の無いものは段ボールに入れて発送になります。24時間以内にご連絡・落札後3日以内に決済頂ける方のみご入札をお願いいたします。＊いたずら入札・落札がある為、評価0・新規の方・１ヶ月以内に評価悪いがある方は入札をご遠慮ください。(質問欄にて入札意思を示してもいたずらされる方がいますので)入札された場合はこちらの判断で入札を取り消しいたしますのでご了承ください。',
          category: '魂豪示像',
          unit: '種',
          origin_price: 7750,
          price: 6700,
          is_enabled: '1',
          imageUrl:
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img685x912-162263044450ffbi175280.jpg',
          imagesUrl: [
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img646x861-1622630444txn2eb175280.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img686x914-1622630444zcymyf175280.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img649x866-1622630444xdnyst175280.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img673x897-1622630444z5mkwc175280.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img607x607-1622630444jjtiqq175280.jpg',
          ],
        },
        {
          title: 'カナヘラ',
          description: 'LINE スタンプでも「カナヘイの小動物」大ヒット!',
          content: '大人気の小動物たちが、かわいく動きまわります',
          category: 'cute',
          unit: 'set',
          origin_price: 9999,
          price: 8888,
          is_enabled: '1',
          imageUrl:
            'https://tse3.mm.bing.net/th?id=OIP.nS40nYJJP_xB8UJzs-uiOwAAAA&pid=Api&P=0&w=300&h=300',
          imagesUrl: [
            'https://tse1.mm.bing.net/th?id=OIP.f19u7Min0Syi7UxVaWEpSAHaNK&pid=Api&P=0&w=300&h=300',
            'https://tse4.mm.bing.net/th?id=OIP.UsIbhrQNkeE2W_AaCbHtfgHaD5&pid=Api&P=0&w=327&h=173',
            'https://tse4.mm.bing.net/th?id=OIP.UsIbhrQNkeE2W_AaCbHtfgHaD5&pid=Api&P=0&w=327&h=173',
            'https://tse2.mm.bing.net/th?id=OIP.nK8BdFb8oZMFpAFsogSOGAAAAA&pid=Api&P=0&w=300&h=300',
            'https://tse4.mm.bing.net/th?id=OIP.biQM95mT36fG4rnYO1xM1QHaLH&pid=Api&P=0&w=300&h=300',
          ],
        },
        {
          title: '一番くじ ドラゴンボールVSオムニバスZ ラストワン賞',
          description:
            '一番くじ ドラゴンボールVSオムニバスZ ラストワン賞 ポルンガ フィギュア　ドラゴンボール超 リペイント　二次元彩色　2D',
          content:
            'フィギュアのイラスト風なリペイントになります。作業工程分解・洗浄・プライマー・塗装・トップコートの手順です。フィギュア本体は分解しておりません。あくまで分解はフィギュアと台座を取り外ししたのみですので、状態は非常に良いです。 こちらで活動してますので、興味のある方はこちらもご覧ください。よろしくお願い致します。→Twitter @takacompany1■注意・画像で気に入っていただけた方、画像にてご理解いただける方のみ入札参加お願い致します。また入札前に必ず注意事項をお読み下さい。2.ご入札に関しての注意事項トラブル防止の為、ご新規の方、評価の悪い方、また1か月以内にキャンセルのある方のご入札はご遠慮下さいませ。ご入札があった場合は削除させて頂きますので、ご了承下さい。※新規の方は入札前にDMなどくだされば問題ありません。3.Ⅰ.国内正規品を使用しています。Ⅱ.外箱に入れて発送致します。外箱はあくまでもおまけ程度でお考え下さい。外箱の状態は仕入れ時の状態で異なります。Ⅲ.細心の注意を払い丁寧に仕上げていますが、埃、繊維等の混入、はみ出しや色剥げ、塗りむら等見られる場合もございます。神経質な方、完璧なものをお求めな方は入札はお控えください。Ⅳ.お使いのモニターの違いにより、色味の感じ方が多少変わることがあります。Ⅴ.ノークレーム、ノーリターンが守れる方のみご入札をよろしくお願い致します。Ⅵ.落札後のキャンセルはお受けいたしかねます。Ⅶ.原則3日以内のご入金をよろしくお願いします。ご連絡なく決済期限内のお支払いがない場合、「落札者様都合」にてキャンセルさせて頂きます。その際ヤフオクのシステム上、自動的に「非常に悪い」の評価がついてしまいます事をご了承下さい。フィギュアのイラスト風なリペイントになります',
          category: '魂豪示像',
          unit: '種',
          origin_price: 91000,
          price: 81000,
          is_enabled: '1',
          imageUrl:
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img744x1200-1622457976qy979k310313.jpg',
          imagesUrl: [
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img778x1200-16224579769juw3w310313.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img870x1200-1622457976wd38wi310313.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img868x1200-1622457976dsrsqu310313.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img694x1200-1622457976puopei310313.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img686x1200-16224579764v5dk6310313.jpg',
          ],
        },
        {
          title: 'ワンピース　B賞マルコ リペイント',
          description: '１番くじ　B賞マルコ　リペイント',
          content: '趣味程度のリペイントになります。プライマー～塗装『全て筆の塗装』～トップコートで仕上げてます。気に入ってくれた方、購入お願い致します。完品をお求めの方はご遠慮ください。神経質な方もご遠慮ください。実際の物と写真では異なる場合がございます。',
          category: '魂豪示像',
          unit: '種',
          origin_price: 5000,
          price: 3100,
          is_enabled: '1',
          imageUrl:
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383zqrspz1337.jpg',
          imagesUrl: [
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383jary3q1337.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383zqrspz1337.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383cxihkt1337.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383wkgk9w1337.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383jl6ied1337.jpg',
          ],
        },
        {
          title: '一番くじ ワンピース EX 悪魔を宿す者達 A 賞 カイドウ 魂豪示像 フィギュア',
          description:
            '『一番くじ ワンピース EX 悪魔を宿す者達』より・A賞：カイドウ 魂豪示像（全1種）以上、１点の出品になります。',
          content:
            '数多くのオークションの中、当方の商品をご閲覧頂きありがとうございます。基本的にダブった景品などを出品しております。商品説明だけではなく、「ト書」や「備考・注意」もご確認・ご了承の上、入札ください。また入札時点で、ご理解、ご了承頂けたものとします。発送出来ない日などが出来た場合、自己紹介の方に追記されて頂きます。個別ページには入力しませんので、ご注意ください。当方では新規の方、キャンセルが多い方、マイナス評価の多い方からの入札・落札はお断りしております。当てはまる方が落札した場合、『落札者の都合』で削除いたします。ここ最近、当方の梱包が「過剰梱包」とのクレームが増えてきたので割れ物のみ梱包致します。ノークレーム・ノーリターン・ノーキャンセル(入札・落札を含む)厳守でお願い致します。',
          category: '魂豪示像',
          unit: '種',
          origin_price: 19000,
          price: 13000,
          is_enabled: '1',
          imageUrl:
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/92aff27e95794ad907dead7f02ab0b5f21115541/i-img1200x1115-16226389872u7wff282041.jpg',
          imagesUrl: [
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/92aff27e95794ad907dead7f02ab0b5f21115541/i-img1200x843-1622638987hwgyui282041.jpg',
            '',
            '',
            '',
            '',
          ],
        },
        {
          title: 'SON GOKU A賞',
          description:
            'ドラゴンボール超 SMSP 孫悟空 フィギュア リペイント GT悟空カラーに変更 BWFC SUPER MASTER STARS PIECE THE SON GOKU A賞',
          content:
            'GT悟空のカラーに変更いたしました。如意棒は接着してあるので手首を脱着式にしました。国内正規品の素体にエアーブラシ・ドライブラシにて立体感・リアル・存在感が出るようにリペイントしました。元箱付きになります。素人製作の為完璧品をお求めの方はご遠慮下さい。色ムラ・スレ・汚れ等がある場合もございますので、画像にて判断していただき入札の方お願いいたします。仕上げにトップコートを施していますが、傷等に弱いのでご注意して下さい。ご使用のモニター等により、色合いが若干異なる場合がありますがご了承願います。できる限り最小サイズにて発送を心がけていますので、元箱のあるものは、元箱に入れてプチプチ梱包にて発送になります。元箱の無いものは段ボールに入れて発送になります。24時間以内にご連絡・落札後3日以内に決済頂ける方のみご入札をお願いいたします。＊いたずら入札・落札がある為、評価0・新規の方・１ヶ月以内に評価悪いがある方は入札をご遠慮ください。(質問欄にて入札意思を示してもいたずらされる方がいますので)入札された場合はこちらの判断で入札を取り消しいたしますのでご了承ください。',
          category: '魂豪示像',
          unit: '種',
          origin_price: 7750,
          price: 6700,
          is_enabled: '1',
          imageUrl:
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img685x912-162263044450ffbi175280.jpg',
          imagesUrl: [
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img646x861-1622630444txn2eb175280.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img686x914-1622630444zcymyf175280.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img649x866-1622630444xdnyst175280.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img673x897-1622630444z5mkwc175280.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img607x607-1622630444jjtiqq175280.jpg',
          ],
        },
        {
          title: 'カナヘラ',
          description: 'LINE スタンプでも「カナヘイの小動物」大ヒット!',
          content: '大人気の小動物たちが、かわいく動きまわります',
          category: 'cute',
          unit: 'set',
          origin_price: 9999,
          price: 8888,
          is_enabled: '1',
          imageUrl:
            'https://tse3.mm.bing.net/th?id=OIP.nS40nYJJP_xB8UJzs-uiOwAAAA&pid=Api&P=0&w=300&h=300',
          imagesUrl: [
            'https://tse1.mm.bing.net/th?id=OIP.f19u7Min0Syi7UxVaWEpSAHaNK&pid=Api&P=0&w=300&h=300',
            'https://tse4.mm.bing.net/th?id=OIP.UsIbhrQNkeE2W_AaCbHtfgHaD5&pid=Api&P=0&w=327&h=173',
            'https://tse4.mm.bing.net/th?id=OIP.UsIbhrQNkeE2W_AaCbHtfgHaD5&pid=Api&P=0&w=327&h=173',
            'https://tse2.mm.bing.net/th?id=OIP.nK8BdFb8oZMFpAFsogSOGAAAAA&pid=Api&P=0&w=300&h=300',
            'https://tse4.mm.bing.net/th?id=OIP.biQM95mT36fG4rnYO1xM1QHaLH&pid=Api&P=0&w=300&h=300',
          ],
        },
        {
          title: '一番くじ ドラゴンボールVSオムニバスZ ラストワン賞',
          description:
            '一番くじ ドラゴンボールVSオムニバスZ ラストワン賞 ポルンガ フィギュア　ドラゴンボール超 リペイント　二次元彩色　2D',
          content:
            'フィギュアのイラスト風なリペイントになります。作業工程分解・洗浄・プライマー・塗装・トップコートの手順です。フィギュア本体は分解しておりません。あくまで分解はフィギュアと台座を取り外ししたのみですので、状態は非常に良いです。 こちらで活動してますので、興味のある方はこちらもご覧ください。よろしくお願い致します。→Twitter @takacompany1■注意・画像で気に入っていただけた方、画像にてご理解いただける方のみ入札参加お願い致します。また入札前に必ず注意事項をお読み下さい。2.ご入札に関しての注意事項トラブル防止の為、ご新規の方、評価の悪い方、また1か月以内にキャンセルのある方のご入札はご遠慮下さいませ。ご入札があった場合は削除させて頂きますので、ご了承下さい。※新規の方は入札前にDMなどくだされば問題ありません。3.Ⅰ.国内正規品を使用しています。Ⅱ.外箱に入れて発送致します。外箱はあくまでもおまけ程度でお考え下さい。外箱の状態は仕入れ時の状態で異なります。Ⅲ.細心の注意を払い丁寧に仕上げていますが、埃、繊維等の混入、はみ出しや色剥げ、塗りむら等見られる場合もございます。神経質な方、完璧なものをお求めな方は入札はお控えください。Ⅳ.お使いのモニターの違いにより、色味の感じ方が多少変わることがあります。Ⅴ.ノークレーム、ノーリターンが守れる方のみご入札をよろしくお願い致します。Ⅵ.落札後のキャンセルはお受けいたしかねます。Ⅶ.原則3日以内のご入金をよろしくお願いします。ご連絡なく決済期限内のお支払いがない場合、「落札者様都合」にてキャンセルさせて頂きます。その際ヤフオクのシステム上、自動的に「非常に悪い」の評価がついてしまいます事をご了承下さい。フィギュアのイラスト風なリペイントになります',
          category: '魂豪示像',
          unit: '種',
          origin_price: 91000,
          price: 81000,
          is_enabled: '1',
          imageUrl:
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img744x1200-1622457976qy979k310313.jpg',
          imagesUrl: [
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img778x1200-16224579769juw3w310313.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img870x1200-1622457976wd38wi310313.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img868x1200-1622457976dsrsqu310313.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img694x1200-1622457976puopei310313.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img686x1200-16224579764v5dk6310313.jpg',
          ],
        },
        {
          title: 'ワンピース　B賞マルコ リペイント',
          description: '１番くじ　B賞マルコ　リペイント',
          content: '趣味程度のリペイントになります。プライマー～塗装『全て筆の塗装』～トップコートで仕上げてます。気に入ってくれた方、購入お願い致します。完品をお求めの方はご遠慮ください。神経質な方もご遠慮ください。実際の物と写真では異なる場合がございます。',
          category: '魂豪示像',
          unit: '種',
          origin_price: 5000,
          price: 3100,
          is_enabled: '1',
          imageUrl:
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383zqrspz1337.jpg',
          imagesUrl: [
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383jary3q1337.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383zqrspz1337.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383cxihkt1337.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383wkgk9w1337.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383jl6ied1337.jpg',
          ],
        },
        {
          title: '一番くじ ワンピース EX 悪魔を宿す者達 A 賞 カイドウ 魂豪示像 フィギュア',
          description:
            '『一番くじ ワンピース EX 悪魔を宿す者達』より・A賞：カイドウ 魂豪示像（全1種）以上、１点の出品になります。',
          content:
            '数多くのオークションの中、当方の商品をご閲覧頂きありがとうございます。基本的にダブった景品などを出品しております。商品説明だけではなく、「ト書」や「備考・注意」もご確認・ご了承の上、入札ください。また入札時点で、ご理解、ご了承頂けたものとします。発送出来ない日などが出来た場合、自己紹介の方に追記されて頂きます。個別ページには入力しませんので、ご注意ください。当方では新規の方、キャンセルが多い方、マイナス評価の多い方からの入札・落札はお断りしております。当てはまる方が落札した場合、『落札者の都合』で削除いたします。ここ最近、当方の梱包が「過剰梱包」とのクレームが増えてきたので割れ物のみ梱包致します。ノークレーム・ノーリターン・ノーキャンセル(入札・落札を含む)厳守でお願い致します。',
          category: '魂豪示像',
          unit: '種',
          origin_price: 19000,
          price: 13000,
          is_enabled: '1',
          imageUrl:
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/92aff27e95794ad907dead7f02ab0b5f21115541/i-img1200x1115-16226389872u7wff282041.jpg',
          imagesUrl: [
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/92aff27e95794ad907dead7f02ab0b5f21115541/i-img1200x843-1622638987hwgyui282041.jpg',
            '',
            '',
            '',
            '',
          ],
        },
        {
          title: 'SON GOKU A賞',
          description:
            'ドラゴンボール超 SMSP 孫悟空 フィギュア リペイント GT悟空カラーに変更 BWFC SUPER MASTER STARS PIECE THE SON GOKU A賞',
          content:
            'GT悟空のカラーに変更いたしました。如意棒は接着してあるので手首を脱着式にしました。国内正規品の素体にエアーブラシ・ドライブラシにて立体感・リアル・存在感が出るようにリペイントしました。元箱付きになります。素人製作の為完璧品をお求めの方はご遠慮下さい。色ムラ・スレ・汚れ等がある場合もございますので、画像にて判断していただき入札の方お願いいたします。仕上げにトップコートを施していますが、傷等に弱いのでご注意して下さい。ご使用のモニター等により、色合いが若干異なる場合がありますがご了承願います。できる限り最小サイズにて発送を心がけていますので、元箱のあるものは、元箱に入れてプチプチ梱包にて発送になります。元箱の無いものは段ボールに入れて発送になります。24時間以内にご連絡・落札後3日以内に決済頂ける方のみご入札をお願いいたします。＊いたずら入札・落札がある為、評価0・新規の方・１ヶ月以内に評価悪いがある方は入札をご遠慮ください。(質問欄にて入札意思を示してもいたずらされる方がいますので)入札された場合はこちらの判断で入札を取り消しいたしますのでご了承ください。',
          category: '魂豪示像',
          unit: '種',
          origin_price: 7750,
          price: 6700,
          is_enabled: '1',
          imageUrl:
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img685x912-162263044450ffbi175280.jpg',
          imagesUrl: [
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img646x861-1622630444txn2eb175280.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img686x914-1622630444zcymyf175280.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img649x866-1622630444xdnyst175280.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img673x897-1622630444z5mkwc175280.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img607x607-1622630444jjtiqq175280.jpg',
          ],
        },
        {
          title: 'カナヘラ',
          description: 'LINE スタンプでも「カナヘイの小動物」大ヒット!',
          content: '大人気の小動物たちが、かわいく動きまわります',
          category: 'cute',
          unit: 'set',
          origin_price: 9999,
          price: 8888,
          is_enabled: '1',
          imageUrl:
            'https://tse3.mm.bing.net/th?id=OIP.nS40nYJJP_xB8UJzs-uiOwAAAA&pid=Api&P=0&w=300&h=300',
          imagesUrl: [
            'https://tse1.mm.bing.net/th?id=OIP.f19u7Min0Syi7UxVaWEpSAHaNK&pid=Api&P=0&w=300&h=300',
            'https://tse4.mm.bing.net/th?id=OIP.UsIbhrQNkeE2W_AaCbHtfgHaD5&pid=Api&P=0&w=327&h=173',
            'https://tse4.mm.bing.net/th?id=OIP.UsIbhrQNkeE2W_AaCbHtfgHaD5&pid=Api&P=0&w=327&h=173',
            'https://tse2.mm.bing.net/th?id=OIP.nK8BdFb8oZMFpAFsogSOGAAAAA&pid=Api&P=0&w=300&h=300',
            'https://tse4.mm.bing.net/th?id=OIP.biQM95mT36fG4rnYO1xM1QHaLH&pid=Api&P=0&w=300&h=300',
          ],
        },
        {
          title: '一番くじ ドラゴンボールVSオムニバスZ ラストワン賞',
          description:
            '一番くじ ドラゴンボールVSオムニバスZ ラストワン賞 ポルンガ フィギュア　ドラゴンボール超 リペイント　二次元彩色　2D',
          content:
            'フィギュアのイラスト風なリペイントになります。作業工程分解・洗浄・プライマー・塗装・トップコートの手順です。フィギュア本体は分解しておりません。あくまで分解はフィギュアと台座を取り外ししたのみですので、状態は非常に良いです。 こちらで活動してますので、興味のある方はこちらもご覧ください。よろしくお願い致します。→Twitter @takacompany1■注意・画像で気に入っていただけた方、画像にてご理解いただける方のみ入札参加お願い致します。また入札前に必ず注意事項をお読み下さい。2.ご入札に関しての注意事項トラブル防止の為、ご新規の方、評価の悪い方、また1か月以内にキャンセルのある方のご入札はご遠慮下さいませ。ご入札があった場合は削除させて頂きますので、ご了承下さい。※新規の方は入札前にDMなどくだされば問題ありません。3.Ⅰ.国内正規品を使用しています。Ⅱ.外箱に入れて発送致します。外箱はあくまでもおまけ程度でお考え下さい。外箱の状態は仕入れ時の状態で異なります。Ⅲ.細心の注意を払い丁寧に仕上げていますが、埃、繊維等の混入、はみ出しや色剥げ、塗りむら等見られる場合もございます。神経質な方、完璧なものをお求めな方は入札はお控えください。Ⅳ.お使いのモニターの違いにより、色味の感じ方が多少変わることがあります。Ⅴ.ノークレーム、ノーリターンが守れる方のみご入札をよろしくお願い致します。Ⅵ.落札後のキャンセルはお受けいたしかねます。Ⅶ.原則3日以内のご入金をよろしくお願いします。ご連絡なく決済期限内のお支払いがない場合、「落札者様都合」にてキャンセルさせて頂きます。その際ヤフオクのシステム上、自動的に「非常に悪い」の評価がついてしまいます事をご了承下さい。フィギュアのイラスト風なリペイントになります',
          category: '魂豪示像',
          unit: '種',
          origin_price: 91000,
          price: 81000,
          is_enabled: '1',
          imageUrl:
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img744x1200-1622457976qy979k310313.jpg',
          imagesUrl: [
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img778x1200-16224579769juw3w310313.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img870x1200-1622457976wd38wi310313.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img868x1200-1622457976dsrsqu310313.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img694x1200-1622457976puopei310313.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img686x1200-16224579764v5dk6310313.jpg',
          ],
        },
        {
          title: 'ワンピース　B賞マルコ リペイント',
          description: '１番くじ　B賞マルコ　リペイント',
          content: '趣味程度のリペイントになります。プライマー～塗装『全て筆の塗装』～トップコートで仕上げてます。気に入ってくれた方、購入お願い致します。完品をお求めの方はご遠慮ください。神経質な方もご遠慮ください。実際の物と写真では異なる場合がございます。',
          category: '魂豪示像',
          unit: '種',
          origin_price: 5000,
          price: 3100,
          is_enabled: '1',
          imageUrl:
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383zqrspz1337.jpg',
          imagesUrl: [
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383jary3q1337.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383zqrspz1337.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383cxihkt1337.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383wkgk9w1337.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383jl6ied1337.jpg',
          ],
        },
        {
          title: '一番くじ ワンピース EX 悪魔を宿す者達 A 賞 カイドウ 魂豪示像 フィギュア',
          description:
            '『一番くじ ワンピース EX 悪魔を宿す者達』より・A賞：カイドウ 魂豪示像（全1種）以上、１点の出品になります。',
          content:
            '数多くのオークションの中、当方の商品をご閲覧頂きありがとうございます。基本的にダブった景品などを出品しております。商品説明だけではなく、「ト書」や「備考・注意」もご確認・ご了承の上、入札ください。また入札時点で、ご理解、ご了承頂けたものとします。発送出来ない日などが出来た場合、自己紹介の方に追記されて頂きます。個別ページには入力しませんので、ご注意ください。当方では新規の方、キャンセルが多い方、マイナス評価の多い方からの入札・落札はお断りしております。当てはまる方が落札した場合、『落札者の都合』で削除いたします。ここ最近、当方の梱包が「過剰梱包」とのクレームが増えてきたので割れ物のみ梱包致します。ノークレーム・ノーリターン・ノーキャンセル(入札・落札を含む)厳守でお願い致します。',
          category: '魂豪示像',
          unit: '種',
          origin_price: 19000,
          price: 13000,
          is_enabled: '1',
          imageUrl:
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/92aff27e95794ad907dead7f02ab0b5f21115541/i-img1200x1115-16226389872u7wff282041.jpg',
          imagesUrl: [
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/92aff27e95794ad907dead7f02ab0b5f21115541/i-img1200x843-1622638987hwgyui282041.jpg',
            '',
            '',
            '',
            '',
          ],
        },
        {
          title: 'SON GOKU A賞',
          description:
            'ドラゴンボール超 SMSP 孫悟空 フィギュア リペイント GT悟空カラーに変更 BWFC SUPER MASTER STARS PIECE THE SON GOKU A賞',
          content:
            'GT悟空のカラーに変更いたしました。如意棒は接着してあるので手首を脱着式にしました。国内正規品の素体にエアーブラシ・ドライブラシにて立体感・リアル・存在感が出るようにリペイントしました。元箱付きになります。素人製作の為完璧品をお求めの方はご遠慮下さい。色ムラ・スレ・汚れ等がある場合もございますので、画像にて判断していただき入札の方お願いいたします。仕上げにトップコートを施していますが、傷等に弱いのでご注意して下さい。ご使用のモニター等により、色合いが若干異なる場合がありますがご了承願います。できる限り最小サイズにて発送を心がけていますので、元箱のあるものは、元箱に入れてプチプチ梱包にて発送になります。元箱の無いものは段ボールに入れて発送になります。24時間以内にご連絡・落札後3日以内に決済頂ける方のみご入札をお願いいたします。＊いたずら入札・落札がある為、評価0・新規の方・１ヶ月以内に評価悪いがある方は入札をご遠慮ください。(質問欄にて入札意思を示してもいたずらされる方がいますので)入札された場合はこちらの判断で入札を取り消しいたしますのでご了承ください。',
          category: '魂豪示像',
          unit: '種',
          origin_price: 7750,
          price: 6700,
          is_enabled: '1',
          imageUrl:
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img685x912-162263044450ffbi175280.jpg',
          imagesUrl: [
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img646x861-1622630444txn2eb175280.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img686x914-1622630444zcymyf175280.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img649x866-1622630444xdnyst175280.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img673x897-1622630444z5mkwc175280.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img607x607-1622630444jjtiqq175280.jpg',
          ],
        },
        {
          title: 'カナヘラ',
          description: 'LINE スタンプでも「カナヘイの小動物」大ヒット!',
          content: '大人気の小動物たちが、かわいく動きまわります',
          category: 'cute',
          unit: 'set',
          origin_price: 9999,
          price: 8888,
          is_enabled: '1',
          imageUrl:
            'https://tse3.mm.bing.net/th?id=OIP.nS40nYJJP_xB8UJzs-uiOwAAAA&pid=Api&P=0&w=300&h=300',
          imagesUrl: [
            'https://tse1.mm.bing.net/th?id=OIP.f19u7Min0Syi7UxVaWEpSAHaNK&pid=Api&P=0&w=300&h=300',
            'https://tse4.mm.bing.net/th?id=OIP.UsIbhrQNkeE2W_AaCbHtfgHaD5&pid=Api&P=0&w=327&h=173',
            'https://tse4.mm.bing.net/th?id=OIP.UsIbhrQNkeE2W_AaCbHtfgHaD5&pid=Api&P=0&w=327&h=173',
            'https://tse2.mm.bing.net/th?id=OIP.nK8BdFb8oZMFpAFsogSOGAAAAA&pid=Api&P=0&w=300&h=300',
            'https://tse4.mm.bing.net/th?id=OIP.biQM95mT36fG4rnYO1xM1QHaLH&pid=Api&P=0&w=300&h=300',
          ],
        },
        {
          title: '一番くじ ドラゴンボールVSオムニバスZ ラストワン賞',
          description:
            '一番くじ ドラゴンボールVSオムニバスZ ラストワン賞 ポルンガ フィギュア　ドラゴンボール超 リペイント　二次元彩色　2D',
          content:
            'フィギュアのイラスト風なリペイントになります。作業工程分解・洗浄・プライマー・塗装・トップコートの手順です。フィギュア本体は分解しておりません。あくまで分解はフィギュアと台座を取り外ししたのみですので、状態は非常に良いです。 こちらで活動してますので、興味のある方はこちらもご覧ください。よろしくお願い致します。→Twitter @takacompany1■注意・画像で気に入っていただけた方、画像にてご理解いただける方のみ入札参加お願い致します。また入札前に必ず注意事項をお読み下さい。2.ご入札に関しての注意事項トラブル防止の為、ご新規の方、評価の悪い方、また1か月以内にキャンセルのある方のご入札はご遠慮下さいませ。ご入札があった場合は削除させて頂きますので、ご了承下さい。※新規の方は入札前にDMなどくだされば問題ありません。3.Ⅰ.国内正規品を使用しています。Ⅱ.外箱に入れて発送致します。外箱はあくまでもおまけ程度でお考え下さい。外箱の状態は仕入れ時の状態で異なります。Ⅲ.細心の注意を払い丁寧に仕上げていますが、埃、繊維等の混入、はみ出しや色剥げ、塗りむら等見られる場合もございます。神経質な方、完璧なものをお求めな方は入札はお控えください。Ⅳ.お使いのモニターの違いにより、色味の感じ方が多少変わることがあります。Ⅴ.ノークレーム、ノーリターンが守れる方のみご入札をよろしくお願い致します。Ⅵ.落札後のキャンセルはお受けいたしかねます。Ⅶ.原則3日以内のご入金をよろしくお願いします。ご連絡なく決済期限内のお支払いがない場合、「落札者様都合」にてキャンセルさせて頂きます。その際ヤフオクのシステム上、自動的に「非常に悪い」の評価がついてしまいます事をご了承下さい。フィギュアのイラスト風なリペイントになります',
          category: '魂豪示像',
          unit: '種',
          origin_price: 91000,
          price: 81000,
          is_enabled: '1',
          imageUrl:
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img744x1200-1622457976qy979k310313.jpg',
          imagesUrl: [
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img778x1200-16224579769juw3w310313.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img870x1200-1622457976wd38wi310313.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img868x1200-1622457976dsrsqu310313.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img694x1200-1622457976puopei310313.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img686x1200-16224579764v5dk6310313.jpg',
          ],
        },
        {
          title: 'ワンピース　B賞マルコ リペイント',
          description: '１番くじ　B賞マルコ　リペイント',
          content: '趣味程度のリペイントになります。プライマー～塗装『全て筆の塗装』～トップコートで仕上げてます。気に入ってくれた方、購入お願い致します。完品をお求めの方はご遠慮ください。神経質な方もご遠慮ください。実際の物と写真では異なる場合がございます。',
          category: '魂豪示像',
          unit: '種',
          origin_price: 5000,
          price: 3100,
          is_enabled: '1',
          imageUrl:
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383zqrspz1337.jpg',
          imagesUrl: [
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383jary3q1337.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383zqrspz1337.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383cxihkt1337.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383wkgk9w1337.jpg',
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383jl6ied1337.jpg',
          ],
        },
        {
          title: '一番くじ ワンピース EX 悪魔を宿す者達 A 賞 カイドウ 魂豪示像 フィギュア',
          description:
            '『一番くじ ワンピース EX 悪魔を宿す者達』より・A賞：カイドウ 魂豪示像（全1種）以上、１点の出品になります。',
          content:
            '数多くのオークションの中、当方の商品をご閲覧頂きありがとうございます。基本的にダブった景品などを出品しております。商品説明だけではなく、「ト書」や「備考・注意」もご確認・ご了承の上、入札ください。また入札時点で、ご理解、ご了承頂けたものとします。発送出来ない日などが出来た場合、自己紹介の方に追記されて頂きます。個別ページには入力しませんので、ご注意ください。当方では新規の方、キャンセルが多い方、マイナス評価の多い方からの入札・落札はお断りしております。当てはまる方が落札した場合、『落札者の都合』で削除いたします。ここ最近、当方の梱包が「過剰梱包」とのクレームが増えてきたので割れ物のみ梱包致します。ノークレーム・ノーリターン・ノーキャンセル(入札・落札を含む)厳守でお願い致します。',
          category: '魂豪示像',
          unit: '種',
          origin_price: 19000,
          price: 13000,
          is_enabled: '1',
          imageUrl:
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/92aff27e95794ad907dead7f02ab0b5f21115541/i-img1200x1115-16226389872u7wff282041.jpg',
          imagesUrl: [
            'https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/92aff27e95794ad907dead7f02ab0b5f21115541/i-img1200x843-1622638987hwgyui282041.jpg',
            '',
            '',
            '',
            '',
          ],
        },
      ];
      // console.log(defaulData.length)
      this.defaulData.forEach((item, i) => {
        const product = {
          data: {
            title: item.title,
            category: item.category,
            // eslint-disable-next-line radix
            origin_price: parseInt(item.origin_price),
            // eslint-disable-next-line radix
            price: parseInt(item.price),
            unit: item.unit,
            description: item.description,
            content: item.content,
            is_enabled: item.is_enabled,
            imageUrl: item.imageUrl,
            imagesUrl: [
              item.imagesUrl[0],
              item.imagesUrl[1],
              item.imagesUrl[2],
              item.imagesUrl[3],
              item.imagesUrl[4],
            ],
          },
        };
        // console.log(product)
        const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
        this.$http
          .post(url, product)
          .then((res) => {
            // alert(res.data.message);
            // 如果成功就執行
            if (res.data.success) {
              if (i === this.defaulData.length - 1) {
                // 刷新
                this.getProduct();

                // alert('已輸入預設商品!');
                this.alertMessage = '已輸入預設商品!';
                this.alertStatus = true;
                setTimeout(
                  () => {
                    this.alertMessage = '';
                    this.alertStatus = false;
                  }, 2000,
                );
              }
            }
          })
          .catch((err) => {
            // console.dir(err);
            this.alertMessage = err.data.message;
            this.alertStatus = false;
            setTimeout(
              () => {
                this.alertMessage = '';
                this.alertStatus = false;
              }, 2000,
            );
          });
      });
    },
    // 取得全部商品
    getAllProduct() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/all`;
      // 取得全部商品
      this.$http
        .get(url)
        .then((res) => {
          // console.log(res);
          // console.log(res.data.success);

          // 如果成功就執行
          if (res.data.success) {
            this.productDataAll = res.data.products;
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
            // window.location='index.html';
          }
        })
        .catch((err) => {
          // console.log(err);
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
    // 一鑑刪除全部商品
    OneKeyDelAllProduct() {
      this.allProductAry.forEach((item, i) => {
        // console.log(item)
        const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${item}`;
        this.$http
          .delete(url)
          .then((res) => {
            // console.log(res);

            // 如果成功就執行
            if (res.data.success) {
              // alert(`${res.data.message}`);
              // console.log(i === this.allProductAry.length - 1);

              if (i === this.allProductAry.length - 1) {
                this.alertMessage = res.data.message;
                this.alertStatus = true;
                setTimeout(
                  () => {
                    this.alertMessage = '';
                    this.alertStatus = false;
                  }, 2000,
                );
                this.getProduct();
                // alert('已刪除全部商品!');
              }
            } else {
              // alert(`${res.data.message}`);
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
            this.alertMessage = err.data.message;
            this.alertStatus = false;
            setTimeout(
              () => {
                this.alertMessage = '';
                this.alertStatus = false;
              }, 2000,
            );
          });
      });
    },
    // 清空新增產品的資料
    clearProductData() {
      // 清空新增產品的資料
      this.$refs.UpLoadImg.$refs.addPrdForm.resetForm();
      // 打開新增產品視窗
      this.$refs.UpLoadImg.openModal();
    },
    // 取得編輯商品
    getReditOneData(e) {
      // 取得待編輯商品索引
      const index = e.target.id.split('_')[1];
      // 將索引傳至data
      this.rediData.redi_index = index;
      // 將資料傳至data
      const rediItem = this.productData[this.rediData.redi_index];
      this.rediData.title = rediItem.title;
      this.rediData.description = rediItem.description;
      this.rediData.id = rediItem.id;
      this.rediData.content = rediItem.content;
      this.rediData.category = rediItem.category;
      this.rediData.unit = rediItem.unit;
      this.rediData.origin_price = rediItem.origin_price;
      this.rediData.price = rediItem.price;
      // eslint-disable-next-line radix
      this.rediData.is_enabled = parseInt(rediItem.is_enabled);
      this.rediData.imageUrl = rediItem.imageUrl;
      this.rediData.imagesUrl = {
        url1: rediItem.imagesUrl[0],
        url2: rediItem.imagesUrl[1],
        url3: rediItem.imagesUrl[2],
        url4: rediItem.imagesUrl[3],
        url5: rediItem.imagesUrl[4],
      };
      this.$refs.ReditProductModal.openModal();
    },
    // 編輯商品
    reditOneData(reditNewData) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.rediData.id}`;
      // 編輯資料
      this.$http
        .put(url, reditNewData)
        .then((res) => {
          // console.log(res);
          // alert(res.data.message);
          // 如果成功就執行
          if (res.data.success) {
            this.alertMessage = res.data.message;
            this.alertStatus = true;
            setTimeout(
              () => {
                this.alertMessage = '';
                this.alertStatus = false;
              }, 2000,
            );
            // 刷新
            this.getProduct();
            // 關閉編輯視窗
            this.$refs.ReditProductModal.closeModal();
          }
        })
        .catch((err) => {
          // console.log(err);
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
  watch: {
    productDataAll() {
      // 如果productDataAll的資料不為空就取出ID
      if (this.productDataAll !== undefined && this.productDataAll !== null) {
        // 將取得全部商品物件轉陣列取出ID
        this.allProductAry = Object.keys(this.productDataAll);
      }
    },
  },
  created() {
    // 使用token驗證
    this.$http.defaults.headers.common.Authorization = this.token;
  },
  mounted() {
    this.isLoading = true;
    // 取得商品資料
    this.getProduct();
  },
};
</script>
