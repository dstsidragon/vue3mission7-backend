// 匯入 Vue 主套件
import { createApp } from 'vue';

// 匯入 Axios 套件
import axios from 'axios';
import VueAxios from 'vue-axios';

// 匯入 amimate.css
// import animated from 'animate.css';
import 'animate.css';

// 匯入vue-kinesis
import VueKinesis from 'vue-kinesis';

// 匯入時間轉換js
import toLocaleDate from '@/assets/js/toLocaleDate';
import toTimestamp from '@/assets/js/toTimestamp';

// 匯入 Bootstrap 主套件
import 'bootstrap';

// 匯入 vee-validate 主套件
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';

// 匯入 vee-validate 相關規則
import { required, email, min } from '@vee-validate/rules';

// 匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n';

// 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router';

// 定義驗證規則
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});

// 設定預設語系
setLocale('zh_TW');

const app = createApp(App);

// 註冊 amimate.css
// app.use(animated);

// 註冊 vee-validate 三個全域元件
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);

// 使用vue-kinesis
app.use(VueKinesis);

// 匯入時間轉換js
app.config.globalProperties.$toTimestamp = toTimestamp;
app.config.globalProperties.$toLocaleDate = toLocaleDate;

// 註冊 axios 全域元件
app.use(VueAxios, axios);

app.use(router);
app.mount('#app');
