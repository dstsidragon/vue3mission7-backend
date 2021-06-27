<template>
    <HelloWorld />
  <div class="container">
  <Loading :isVueLoading='isLoading' />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import Loading from '@/components/Loading.vue';

export default {
  components: {
    HelloWorld,
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
