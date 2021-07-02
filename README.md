# vue3mission7-backend
GitHub:https://github.com/dstsidragon/vue3mission7-backend


GitPages:https://dstsidragon.github.io/vue3mission7-backend/

sh deploy.sh
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



後台

#產品頁面：

V串接取得、新增、刪除、更新產品 API
V啟用狀態顯示
VModal 細節欄位
V上傳圖片API 
V分頁功能

#訂單頁面：

V串接取得
V刪除
V刪除全部訂單
V更新訂單 
VModal 細節欄位
V付款狀態切換
V分頁功能

#優惠券頁面：

V串接取得
V新增
V刪除
V更新優惠券 API
V啟用狀態顯示
VModal 細節欄位
V分頁功能

#貼文頁面（加分項目）：

串接取得、新增、刪除、更新貼文 API
啟用公開狀態
Modal 細節欄位
分頁功能
登入 / 登出

小功能
V時間搓轉換
千分符號
Valert 元件
Vloading 元件
V串接圖片上傳 API

LV3：完成以上功能及撰寫完整的產品文案、圖片



前台

結帳付款
[API]: /api/:api_path/pay/:order_id
[方法]: post
[參數]:
	@api_path: 'thisismycourse2'
	@order_id: 訂單編號
[成功回傳]:
	{
    "success": true,
    "message": "付款完成"
  }

  
        "payment_method": "credit_card",




///////////////////

<!-- Alert元件 start -->
<Alert class="alert-position"  v-if="alertMessage" :message="alertMessage"
:status="alertStatus" />
<!-- Alert元件 end -->


// Alert元件
import Alert from '@/components/Alert.vue';


    // Alert元件
    Alert,

      // alert元件參數
      alertMessage: '',
      alertStatus: false,



          // alert 元件顯示
          this.alertMessage = res.data.message;
          this.alertStatus = true;
          setTimeout(
            () => {
              this.alertMessage = '';
              this.alertStatus = false;
            }, 2000,
          );

//////////


////////// 刪除單一元件

  <!-- 刪除單一Modal start-->
  <Delete ref="deleteModal"  @send="delOneData" />
  <!-- 刪除單一Modal end-->


// 刪除單一Modal
import Delete from '@/components/Delete.vue';

    // 刪除單一Modal
    Delete,

    
                @click='this.$refs.deleteModal.openModal(item)'
//////////

/////////刪除全部

  <!-- 刪除全部Modal start-->
  <DeleteAll ref="deleteAllModal"  @send="deleteAll" />
  <!-- 刪除全部Modal end-->

    // 刪除全部 Modal
    DeleteAll,

// 刪除全部 Modal
import DeleteAll from '@/components/DeleteAll.vue';

                @click='this.$refs.deleteAllModal.openModal();'

//////////


前台>>產品>>你可能會喜歡
https://swiperjs.com/demos#

前台>>產品>>詳細>>圖片
https://codesandbox.io/s/xntne

前台>>首頁>>滿版介紹
https://swiperjs.com/demos/360-parallax/core.html


前台>>NAVBAR>>手機板
https://codesandbox.io/s/nqfd2

前台 >> 結帳>>進度條
https://bootstrap5.hexschool.com/docs/5.0/components/progress/