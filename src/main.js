import { createApp } from 'vue';
import "@/assets/less/index.less";
import App from './App.vue';
import router from '@/router/index.js';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import '@/api/mockjs.js'
import { createPinia } from "pinia";
import api from "@/api/api";
import { useloginStore } from "./store/loginStore";
const pinia = createPinia()

const app = createApp(App);

//挂载api在全局使用
app.config.globalProperties.$api = api
//pinia
app.use(pinia);
const login = useloginStore()
login.addMenu(router,"refresh")
// 注册路由和 Element Plus
app.use(router);
app.use(ElementPlus);

// 全局注册 Element Plus 图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component); // 使用 app.component 注册组件
}

app.mount('#app');