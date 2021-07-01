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

串接取得、新增、刪除、更新優惠券 API
啟用狀態顯示
Modal 細節欄位
分頁功能

#貼文頁面（加分項目）：

串接取得、新增、刪除、更新貼文 API
啟用公開狀態
Modal 細節欄位
分頁功能
登入 / 登出

小功能
時間搓轉換
千分符號
alert 元件
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