<template>
  <h2
    class="shadow-sm p-3 mt-1 mb-5 bg-yellow-lighten rounded
     text-primary fz-3 fz-sm-4"
  >
    貼文
  </h2>
  <p class="fz-4">構思中</p>

   <!-- Alert元件 start -->
  <Alert v-if="alertMessage" :message="alertMessage" :status="alertStatus" />
   <!-- Alert元件 end -->

</template>

<script>
// Alert元件
import Alert from '@/components/Alert.vue';

export default {
  components: {
  // Alert元件
    Alert,
  },
  data() {
    return {
      // alert元件參數
      alertMessage: '',
      alertStatus: false,

    };
  },

};

</script>
