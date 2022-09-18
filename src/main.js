import { createApp } from 'vue';
// ElementPlus 相關
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import locale from 'element-plus/lib/locale/lang/zh-tw';
// loading
import VueLoading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
// ElementPlus icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// axios 相關
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';

// 請求模擬
// require('./mock');

const app = createApp(App);

Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
  app.component(key, component);
});

app.component('VueLoading', VueLoading);

app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.use(ElementPlus, { locale });
app.mount('#app');
