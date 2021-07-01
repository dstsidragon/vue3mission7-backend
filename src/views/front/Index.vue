<template>
  <div class="position-relative">
    <div class="banner"></div>
    <div class="banner__font bgc-transparent rounded text-dark ff-HachiMaruPop">
      <p class="banner__subtitle">創意演繹極致口感</p>
      <br>
      <p >-勾起你心中的餓</p>
    </div>
  </div>
  <div class="box"></div>
   <!-- 讀取畫面 start -->
  <div class="container">
  <Loading :isVueLoading='isLoading' />
  </div>
   <!-- 讀取畫面 end -->
</template>

<script>
import Loading from '@/components/Loading.vue';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/mixin/_mixin';

.banner{
  height: 600px;
  background: center center no-repeat
    // url('https://images.unsplash.com/photo-1621857426350-ddab819cf0cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80');
    //  url('https://images.unsplash.com/photo-1591299177061-2151e53fcaea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=925&q=80');
     url('https://images.unsplash.com/photo-1575613425642-7ff66d570b52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80');

  background-size: cover;
  background-attachment: fixed;
  opacity: 0.5;

  &__font{
  position:absolute;
  top:20%;
  left:5%;
  font-size: 2rem;
  color: #ffffff;
  font-weight: bold;
  text-align: left;
  }
  &__subtitle{
  font-size:3rem;
  }
  @include mobile{
    height: 500px;
    &__font{
  top:30%;
    font-size: 1.5rem;
  }
  &__subtitle{
  font-size:2rem;
  }
  }
}
.box {
  margin-top: 10px;
  margin-bottom: 10px;
  margin: 0 auto;
  background-color: #000;
  height: 200px;
}
.bgc-transparent{
  background-color: rgba(1, 2, 0.1, 0.1);
}
</style>
