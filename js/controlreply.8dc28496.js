(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["controlreply"],{"031e":function(t,s,e){},"715f":function(t,s,e){"use strict";e("031e")},a89e:function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"container-fluid p-5",attrs:{id:"OrderReply"}},[e("div",{staticClass:"row mx-5 px-5 pb-4 border-bottom border-dark"},[e("h5",{staticClass:"col-7"},[t._v("回覆管理")]),e("div",{staticClass:"col-5 text-right"},[e("div",{staticClass:"btn btn-outline-secondary mr-3",on:{click:function(s){t.filter="全部"}}},[t._v(" 全部 ")]),e("div",{staticClass:"btn btn-outline-secondary mr-3",on:{click:function(s){t.filter="已回覆"}}},[t._v(" 已回覆 ")]),e("div",{staticClass:"btn btn-outline-secondary mr-3",on:{click:function(s){t.filter="未回覆"}}},[t._v(" 未回覆 ")]),t.changelist?e("div",{staticClass:"btn btn-outline-secondary",on:{click:function(s){return t.liststatus()}}},[t._v(" 現在是新到舊 ")]):e("div",{staticClass:"btn btn-outline-secondary",on:{click:function(s){return t.liststatus()}}},[t._v(" 現在是舊到新 ")])])]),e("div",{staticClass:"row mx-5 px-5"},[e("div",{staticClass:"row w-100 mb-4 pt-3"}),e("div",{staticClass:"row w-100"},[e("div",{staticClass:"w-100 p-2"},t._l(t.orderfilter,(function(s){return e("div",{key:s._id,staticClass:"orders_item border"},[e("div",{staticClass:"item_status row px-4 py-3 d-flex align-items-center"},[e("div",{staticClass:"text-left col-2"},[t._v("訂單編號: "+t._s(s.item))]),e("div",{staticClass:"col-2"},[e("span",{staticClass:"mr-2"},[t._v("回覆狀態:")]),e("span",[t._v(t._s(s.askstatus))])]),e("div",{staticClass:"col-5"},[e("span",{staticClass:"mr-1"},[t._v("用戶:")]),t._v(" "+t._s(s.account)+" ")]),e("div",{staticClass:"text-right col-3"},[e("div",{staticClass:"btn btn-outline-secondary",on:{click:function(t){s.showoederdetail=!s.showoederdetail}}},[t._v(" 訂單細項 ")])])]),e("div",{directives:[{name:"show",rawName:"v-show",value:s.showoederdetail,expression:"order.showoederdetail"}],staticClass:"user_item_connect row m-0 w-100 border-top bg-white"},[e("div",{staticClass:"col-2"},[e("div",{staticClass:"text-left mx-1 my-2"},[t._v(" 總價: NT"+t._s(t._f("thousands")(s.total))+" ")]),e("div",{staticClass:"text-left mx-1 my-2"},[t._v(" 付款方式: "+t._s(s.payment)+" ")]),e("div",{staticClass:"text-left mx-1 my-2"},[t._v(" 付款狀態: "+t._s(s.pay)+" ")]),e("div",{staticClass:"text-left mx-1 my-2"},[t._v(" 出貨狀態: "+t._s(s.status)+" ")])]),e("div",{staticClass:"col-3 border-left my-2"},[e("div",{staticClass:"item_connect d-flex flex-column justify-content-center align-items-start"},[e("div",{staticClass:"account mx-1 my-2"},[t._v(" 用戶: "+t._s(s.account)+" ")]),e("div",{staticClass:"username mx-1 my-2"},[t._v(" 收件人: "+t._s(s.connect.userName)+" ")]),e("div",{staticClass:"userphone mx-1 my-2"},[t._v(" 連絡電話: "+t._s(s.connect.userPhone)+" ")]),e("div",{staticClass:"useremail mx-1 my-2"},[t._v(" 連絡信箱: "+t._s(s.connect.userEmail)+" ")]),e("div",{staticClass:"useraddress mx-1 my-2"},[t._v(" 收件地址: "+t._s(s.connect.userAddress)+" ")])])]),e("div",{staticClass:"reply_area col-7 m-0 border-left bg-white p-2"},[e("div",{staticClass:"row p-3"},[e("div",{staticClass:"col-10"},t._l(s.ask,(function(s,i){return e("p",{key:i,staticClass:"text-left"},[t._v(" "+t._s(s)+" ")])})),0),e("div",{staticClass:"col-2"},[e("div",{directives:[{name:"show",rawName:"v-show",value:s.ask.length>0,expression:"order.ask.length > 0"}],staticClass:"btn btn-outline-success",on:{click:function(t){s.edit=!0}}},[t._v(" 建立回覆 ")])])]),e("div",{directives:[{name:"show",rawName:"v-show",value:s.edit,expression:"order.edit"}],staticClass:"row p-3 mt-5"},[e("div",{staticClass:"col-12 d-flex"},[e("input",{directives:[{name:"model",rawName:"v-model",value:s.reply,expression:"order.reply"}],staticClass:"form-control col-8 mr-4",attrs:{type:"text"},domProps:{value:s.reply},on:{input:function(e){e.target.composing||t.$set(s,"reply",e.target.value)}}}),e("div",{staticClass:"btn btn-outline-success mr-auto",on:{click:function(e){return t.submit(s)}}},[t._v(" 送出 ")])])])])])])})),0)])])])},a=[],r=(e("4de4"),e("d81d"),{name:"OrderDetail",data:function(){return{allorders:[],changelist:!1,filter:"全部"}},computed:{orderfilter:function(){var t=this;return"全部"===this.filter?this.allorders:this.allorders.filter((function(s){return s.askstatus===t.filter}))}},methods:{getallorder:function(){var t=this;this.axios.get("https://lifepluss.herokuapp.com/orders").then((function(s){t.allorders=s.data.result.map((function(t){return t.payModel=t.pay,t.statusModel=t.status,t.showoederdetail=!1,t.edit=!1,t.reply="",t}))}))},liststatus:function(){this.allorders=this.allorders.reverse(),this.changelist?this.changelist=!1:this.changelist=!0},goDetail:function(t){this.$router.push("/productdetail/".concat(t))},submit:function(t){this.axios.patch("https://lifepluss.herokuapp.com/orders/reply/"+t.item,{reply:t.reply,askstatus:"已回覆"}),this.getallorder(),t.reply="",this.$alert.success("回覆問題成功")}},created:function(){this.getallorder()}}),l=r,o=(e("715f"),e("2877")),n=Object(o["a"])(l,i,a,!1,null,"624fe128",null);s["default"]=n.exports},d81d:function(t,s,e){"use strict";var i=e("23e7"),a=e("b727").map,r=e("1dde"),l=e("ae40"),o=r("map"),n=l("map");i({target:"Array",proto:!0,forced:!o||!n},{map:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=controlreply.8dc28496.js.map