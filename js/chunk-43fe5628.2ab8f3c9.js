(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-43fe5628"],{"7fc4":function(e,t,a){},"885b":function(e,t,a){"use strict";a("7fc4")},b0c0:function(e,t,a){var s=a("83ab"),c=a("9bf2").f,r=Function.prototype,o=r.toString,l=/^\s*function ([^ (]*)/,n="name";s&&!(n in r)&&c(r,n,{configurable:!0,get:function(){try{return o.call(this).match(l)[1]}catch(e){return""}}})},bcba:function(e,t,a){"use strict";a.r(t);var s=a("7a23"),c=Object(s["withScopeId"])("data-v-379d9a2e");Object(s["pushScopeId"])("data-v-379d9a2e");var r={class:"container mt_navbar "},o={class:"container"},l=Object(s["createVNode"])("h2",{class:"text-center "},"購物車列表",-1),n={class:"d-flex justify-content-end"},i=Object(s["createTextVNode"])(" 清空購物車 "),d={class:"table mt-4 row"},u=Object(s["createVNode"])("thead",{class:"co1-12"},[Object(s["createVNode"])("tr",{class:"row"},[Object(s["createVNode"])("th",{class:"col-3 d-none d-md-table-cell"},"商品圖片"),Object(s["createVNode"])("th",{class:"col-2"},"商品名稱"),Object(s["createVNode"])("th",{class:"col-2 ",width:"120"}," 原價 "),Object(s["createVNode"])("th",{class:"col-2 col-md-1"}," 售價 "),Object(s["createVNode"])("th",{class:"col-3 col-md-2"}," 數量 "),Object(s["createVNode"])("th",{class:"col-3 col-md-2"}," 刪除 ")])],-1),b={class:"col-3  d-none d-md-table-cell d-flex align-items-center"},m={class:"col-2 d-flex align-items-center justify-content-center"},f={class:"col-2 d-flex align-items-center justify-content-center"},p={class:"col-2 col-md-1 d-flex align-items-center justify-content-center"},g={class:"col-3 col-md-2  d-flex align-items-center justify-content-center"},h={class:"col-3 col-md-2 d-flex align-items-center justify-content-center"},j=Object(s["createVNode"])("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-cart-dash",viewBox:"0 0 16 16"},[Object(s["createVNode"])("path",{d:"M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"}),Object(s["createVNode"])("path",{d:"M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5\n                  0 0 0 4 12h1a2 2 0 1 0 0 4 2 2\n                  0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0\n                  .491-.408l1.5-8A.5.5 0 0 0 14.5\n                  3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102\n                  4h10.796l-1.313 7h-8.17zM6 14a1 1 0\n                  1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"})],-1),O={class:"d-flex justify-content-between align-items-center fw-bold "},V={class:"fs-3 text-decoration-line-through"},N={class:"fs-3 text-danger"},v={class:"d-flex justify-content-end"},C=Object(s["createVNode"])("hr",null,null,-1);Object(s["popScopeId"])();var S=c((function(e,t,a,c,S,M){var y=Object(s["resolveComponent"])("Alert"),L=Object(s["resolveComponent"])("Createorder"),x=Object(s["resolveComponent"])("Loading");return Object(s["openBlock"])(),Object(s["createBlock"])(s["Fragment"],null,[Object(s["createVNode"])("div",r,[Object(s["createVNode"])("div",o,[S.alertMessage?(Object(s["openBlock"])(),Object(s["createBlock"])(y,{key:0,class:"alert-position",message:S.alertMessage,status:S.alertStatus},null,8,["message","status"])):Object(s["createCommentVNode"])("",!0),l,Object(s["createVNode"])("div",n,[Object(s["createVNode"])("button",{class:[{"d-none":0==S.cartList.carts},"btn btn-danger "],onClick:t[1]||(t[1]=Object(s["withModifiers"])((function(){return M.clearCart&&M.clearCart.apply(M,arguments)}),["prevent"]))},[Object(s["createVNode"])("span",{class:[{"d-none":1!==S.loadingStatue.clearCart},"spinner-border spinner-border-sm"],role:"status","aria-hidden":"true"},null,2),i],2)])]),Object(s["createVNode"])("table",d,[u,Object(s["createVNode"])("tbody",null,[(Object(s["openBlock"])(!0),Object(s["createBlock"])(s["Fragment"],null,Object(s["renderList"])(S.cartList.carts,(function(e,t){return Object(s["openBlock"])(),Object(s["createBlock"])("tr",{class:"row",key:"delCar_"+t},[Object(s["createVNode"])("td",b,[Object(s["createVNode"])("img",{class:"prd_img ",src:e.product.imageUrl,alt:e.product.title},null,8,["src","alt"])]),Object(s["createVNode"])("td",m,Object(s["toDisplayString"])(e.product.title),1),Object(s["createVNode"])("td",f,Object(s["toDisplayString"])(e.product.origin_price),1),Object(s["createVNode"])("td",p,Object(s["toDisplayString"])(e.product.price),1),Object(s["createVNode"])("td",g,[Object(s["withDirectives"])(Object(s["createVNode"])("input",{class:"carNum",type:"number",min:"1",oninput:"value=value.replace('-', '');if(value>999)value=999","onUpdate:modelValue":function(e){return S.cartList.carts[t].qty=e},onChange:function(t){return M.rediCartItemsNum(e)}},null,40,["onUpdate:modelValue","onChange"]),[[s["vModelText"],S.cartList.carts[t].qty]])]),Object(s["createVNode"])("td",h,[Object(s["createVNode"])("button",{type:"button",class:[{disabled:S.loadingStatue.delCart==e.id},"btn btn-sm btn-danger btn_white "],onClick:function(t){return M.delCartItem(e.id)},"data-action":"remove"},[Object(s["createVNode"])("span",{class:[{"d-none":S.loadingStatue.delCart!==e.id},"spinner-border spinner-border-sm"],role:"status","aria-hidden":"true"},null,2),j],10,["onClick"])])])})),128))])]),Object(s["createVNode"])("ul",O,[Object(s["createVNode"])("li",V,[Object(s["createVNode"])("p",null,"總價:"+Object(s["toDisplayString"])(S.cartList.total),1)]),Object(s["createVNode"])("li",N,[Object(s["createVNode"])("p",null,"優惠價:"+Object(s["toDisplayString"])(S.cartList.final_total),1)])]),Object(s["createVNode"])("div",v,[Object(s["createVNode"])("button",{class:[{"d-none":0==S.cartList.carts},"btn btn-success "],onClick:t[2]||(t[2]=Object(s["withModifiers"])((function(){return M.sendCartsList&&M.sendCartsList.apply(M,arguments)}),["prevent"]))},[Object(s["createVNode"])("span",{class:[{"d-none":1!==S.loadingStatue.sendCart},"spinner-border spinner-border-sm"],role:"status","aria-hidden":"true"},null,2),Object(s["createTextVNode"])(" 送出訂單 ( "+Object(s["toDisplayString"])(S.cartsNum)+" )筆商品 ",1)],2)])]),C,Object(s["createVNode"])(L,{ref:"createOrder",onReGetCartList:M.getCartList},null,8,["onReGetCartList"]),Object(s["createVNode"])(x,{isVueLoading:S.isLoading},null,8,["isVueLoading"])],64)})),M=(a("99af"),a("98ab")),y=(a("b0c0"),{class:"modal fade",ref:"createOrderModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}),L={class:"modal-dialog"},x={class:"modal-content"},w=Object(s["createVNode"])("div",{class:"modal-header bg-primary text-white"},[Object(s["createVNode"])("h5",{class:"modal-title css_wordInput_13 fz-2 fz-sm-3"},"請輸入詳細資訊~ ~ (・ω・)"),Object(s["createVNode"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),k={class:"modal-body"},D={class:"col-md-6"},T=Object(s["createVNode"])("label",{for:"name",class:"form-label"},"姓名:",-1),_={class:"col-md-6"},B=Object(s["createVNode"])("label",{for:"tel",class:"form-label"},"電話",-1),$={class:"col-md-6"},z=Object(s["createVNode"])("label",{for:"email",class:"form-label"},"Email:",-1),A={class:"col-12"},I=Object(s["createVNode"])("label",{for:"address",class:"form-label"},"地址",-1),F={class:"col-12"},U=Object(s["createVNode"])("label",{for:"text",class:"form-label"},"留言:",-1),q=Object(s["createVNode"])("button",{type:"submit",class:"btn btn-primary"}," 抱歉!錢錢，我真的需要這些酷東西 ",-1),G=Object(s["createVNode"])("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," 下個月在解決你們! ",-1);function E(e,t,a,c,r,o){var l=Object(s["resolveComponent"])("Field"),n=Object(s["resolveComponent"])("error-message"),i=Object(s["resolveComponent"])("Form"),d=Object(s["resolveComponent"])("Alert");return Object(s["openBlock"])(),Object(s["createBlock"])(s["Fragment"],null,[Object(s["createVNode"])("div",y,[Object(s["createVNode"])("div",L,[Object(s["createVNode"])("div",x,[w,Object(s["createVNode"])("div",k,[Object(s["createVNode"])(i,{ref:"creatForm",class:"row g-3",onSubmit:o.closeModal},{default:Object(s["withCtx"])((function(e){var a=e.errors;return[Object(s["createVNode"])("div",D,[T,Object(s["createVNode"])(l,{id:"name",ref:"name",name:"姓名",type:"text",class:["form-control",{"is-invalid":a["姓名"]}],placeholder:"請輸入 姓名",rules:"required",modelValue:r.userData.user.name,"onUpdate:modelValue":t[1]||(t[1]=function(e){return r.userData.user.name=e})},null,8,["class","modelValue"]),Object(s["createVNode"])(n,{name:"姓名",class:"invalid-feedback"})]),Object(s["createVNode"])("div",_,[B,Object(s["createVNode"])(l,{id:"tel",ref:"tel",name:"電話",type:"tel",class:["form-control",{"is-invalid":a["電話"]}],placeholder:"請輸入 手機號碼",rules:o.isPhone,modelValue:r.userData.user.tel,"onUpdate:modelValue":t[2]||(t[2]=function(e){return r.userData.user.tel=e})},null,8,["class","rules","modelValue"]),Object(s["createVNode"])(n,{name:"電話",class:"invalid-feedback"})]),Object(s["createVNode"])("div",$,[z,Object(s["createVNode"])(l,{id:"email",ref:"email",name:"信箱",type:"email",class:["form-control",{"is-invalid":a["信箱"]}],placeholder:"請輸入 信箱",rules:o.isEmail,modelValue:r.userData.user.email,"onUpdate:modelValue":t[3]||(t[3]=function(e){return r.userData.user.email=e})},null,8,["class","rules","modelValue"]),Object(s["createVNode"])(n,{name:"信箱",class:"invalid-feedback"})]),Object(s["createVNode"])("div",A,[I,Object(s["createVNode"])(l,{id:"address",ref:"address",name:"地址",type:"tel",class:["form-control",{"is-invalid":a["地址"]}],placeholder:"請輸入 地址",rules:"required",modelValue:r.userData.user.address,"onUpdate:modelValue":t[4]||(t[4]=function(e){return r.userData.user.address=e})},null,8,["class","modelValue"]),Object(s["createVNode"])(n,{name:"地址",class:"invalid-feedback"})]),Object(s["createVNode"])("div",F,[U,Object(s["withDirectives"])(Object(s["createVNode"])("textarea",{type:"text",id:"text",placeholder:"請輸入想說的話",class:"form-control","onUpdate:modelValue":t[5]||(t[5]=function(e){return r.userData.message=e})},null,512),[[s["vModelText"],r.userData.message]])]),q,G]})),_:1},8,["onSubmit"])])])])],512),r.alertMessage?(Object(s["openBlock"])(),Object(s["createBlock"])(d,{key:0,class:" alert-position",message:r.alertMessage,status:r.alertStatus},null,8,["message","status"])):Object(s["createCommentVNode"])("",!0)],64)}var Z=a("7c2b"),H=a.n(Z),J={emits:["re-get-cart-list"],components:{Alert:M["a"]},data:function(){return{alertMessage:"",alertStatus:!1,user:{},Modal:"",userData:{user:{name:"",email:"",tel:"",address:""},message:""}}},methods:{openModal:function(){this.Modal.show()},closeModal:function(){var e=this;this.Modal.hide();var t={data:this.userData};this.$http.post("".concat("https://vue3-course-api.hexschool.io","/api/").concat("sim322on","/order"),t).then((function(t){t.data.success?(e.alertMessage=t.data.message,e.alertStatus=!0,setTimeout((function(){e.alertMessage="",e.alertStatus=!1}),2e3),e.reGetCartList()):(e.alertMessage=t.data.message,e.alertStatus=!1,setTimeout((function(){e.alertMessage="",e.alertStatus=!1}),2e3))})).catch((function(t){e.alertMessage=t.data.message,e.alertStatus=!1,setTimeout((function(){e.alertMessage="",e.alertStatus=!1}),2e3)}))},reGetCartList:function(){this.$emit("re-get-cart-list")},isPhone:function(e){var t=/^(09)[0-9]{8}$/;return!!t.test(e)||"需要輸入正確的手機號碼"},isEmail:function(e){var t=/^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;return!!t.test(e)||"需要輸入正確的信箱"}},mounted:function(){this.Modal=new H.a(this.$refs.createOrderModal)}};J.render=E;var P=J,R=a("3a5e"),K={components:{Alert:M["a"],Createorder:P,Loading:R["a"]},data:function(){return{alertMessage:"",alertStatus:!1,isLoading:!1,cartList:{},cartsNum:0,loadingStatue:{addCart:"",delCart:"",clearCart:"",sendCart:""}}},methods:{getCartList:function(){var e=this;this.$http.get("".concat("https://vue3-course-api.hexschool.io","/api/").concat("sim322on","/cart")).then((function(t){t.data.success?(e.cartList=t.data.data,e.isLoading=!1):(e.alertMessage=t.data.message,e.alertStatus=!1,setTimeout((function(){e.alertMessage="",e.alertStatus=!1}),2e3),e.isLoading=!1)})).catch((function(t){e.alertMessage=t.data.message,e.alertStatus=!1,setTimeout((function(){e.alertMessage="",e.alertStatus=!1}),2e3),e.isLoading=!1}))},delCartItem:function(e){var t=this;this.loadingStatue.delCart=e,this.$http.delete("".concat("https://vue3-course-api.hexschool.io","/api/").concat("sim322on","/cart/").concat(e)).then((function(e){e.data.success?(t.getCartList(),t.loadingStatue.delCart="",t.alertMessage=e.data.message,t.alertStatus=!0,setTimeout((function(){t.alertMessage="",t.alertStatus=!1}),2e3)):(t.alertMessage=e.data.message,t.alertStatus=!1,setTimeout((function(){t.alertMessage="",t.alertStatus=!1}),2e3))})).catch((function(e){t.alertMessage=e.data.message,t.alertStatus=!1,setTimeout((function(){t.alertMessage="",t.alertStatus=!1}),2e3)}))},clearCart:function(){var e=this;this.loadingStatue.clearCart=1,this.$http.delete("".concat("https://vue3-course-api.hexschool.io","/api/").concat("sim322on","/carts")).then((function(t){t.data.success?(e.getCartList(),e.alertMessage=t.data.message,e.alertStatus=!0,setTimeout((function(){e.alertMessage="",e.alertStatus=!1}),2e3),e.loadingStatue.clearCart=""):(e.alertMessage=t.data.message,e.alertStatus=!1,setTimeout((function(){e.alertMessage="",e.alertStatus=!1}),2e3))})).catch((function(t){e.alertMessage=t.data.message,e.alertStatus=!1,setTimeout((function(){e.alertMessage="",e.alertStatus=!1}),2e3)}))},rediCartItemsNum:function(e){var t=this,a={data:{product_id:e.product_id,qty:parseInt(e.qty,10)}};this.$http.put("".concat("https://vue3-course-api.hexschool.io","/api/").concat("sim322on","/cart/").concat(e.id),a).then((function(e){e.data.success?t.getCartList():(t.alertMessage=e.data.message,t.alertStatus=!1,setTimeout((function(){t.alertMessage="",t.alertStatus=!1}),2e3))})).catch((function(e){t.alertMessage=e.data.message,t.alertStatus=!1,setTimeout((function(){t.alertMessage="",t.alertStatus=!1}),2e3)}))},sendCartsList:function(){var e=this;this.loadingStatue.sendCart=1,setTimeout((function(){e.loadingStatue.sendCart=""}),1e3),this.$refs.createOrder.$refs.creatForm.resetForm(),this.$refs.createOrder.openModal()}},watch:{cartList:function(){this.cartsNum=this.cartList.carts.length}},mounted:function(){this.isLoading=!0,this.getCartList()}};a("885b");K.render=S,K.__scopeId="data-v-379d9a2e";t["default"]=K}}]);
//# sourceMappingURL=chunk-43fe5628.2ab8f3c9.js.map