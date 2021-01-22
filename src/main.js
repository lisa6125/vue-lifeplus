import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "../plugins/bootstrap-vue.js";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuegtag from "vue-gtag";

import axios from "axios";
import VueAxios from "vue-axios";
// import VueSweetalert2 from 'vue-sweetalert2'
import "sweetalert2/dist/sweetalert2.min.css";
import ImgInputer from "vue-img-inputer";
import "vue-img-inputer/dist/index.css";
import Photoswipe from "vue-pswipe";
//載入效果
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import "bootstrap";
import "jquery";
import "popper.js";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import thousandsFilter from "./assets/js/thousands.js";
import VueStar from "vue-star";
// vue form wizard
import VueFormWizard from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
// 彈跳視窗
import alert from "@/api/alert.js";
import { VueMasonryPlugin } from "vue-masonry";
// vue-fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faInstagram,
  faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";
import {
  faShoppingCart,
  faUser,
  faSignInAlt,
  faPlus,
  faMinus,
  faSignOutAlt,
  faListAlt,
  faTruck,
  faReceipt,
  faThumbsUp,
  faCheck,
  faArchive,
  faPenNib,
  faNewspaper,
  faMailBulk,
  faIdCard,
  faHeart,
  faAngleLeft,
  faAngleRight,
  faFolderPlus,
  faHandHoldingHeart,
  faDraftingCompass,
  faHands,
  faShippingFast,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faInstagram,
  faShoppingCart,
  faUser,
  faSignInAlt,
  faPlus,
  faMinus,
  faFacebookSquare,
  faSignOutAlt,
  faListAlt,
  faTruck,
  faReceipt,
  faThumbsUp,
  faCheck,
  faArchive,
  faPenNib,
  faNewspaper,
  faMailBulk,
  faIdCard,
  faHeart,
  faAngleLeft,
  faAngleRight,
  faFolderPlus,
  faHandHoldingHeart,
  faDraftingCompass,
  faHands,
  faShippingFast
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VueMasonryPlugin);
Vue.component("ImgInputer", ImgInputer);
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.use(Photoswipe);
Vue.use(VueAxios, axios);
Vue.use(alert);
Vue.component("VueStar", VueStar);
Vue.use(VueAwesomeSwiper);
Vue.filter("thousands", thousandsFilter);
// 使用全域的方式啟用此元件
Vue.component("Loading", Loading);
Vue.use(VueFormWizard);
Vue.use(Vuegtag, {
  config: {
    id: process.env.VUE_APP_GA,
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
