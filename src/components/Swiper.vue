<template>
<!-- :effect="'fade'" -->
  <swiper  :spaceBetween="30" :centeredSlides="true" :autoplay='{
  "delay": 2500,
  "disableOnInteraction": false
}'
:loop="true"
  >
    <swiper-slide class="banner banner-img1"></swiper-slide>
    <swiper-slide class="banner banner-img2"></swiper-slide>
    <swiper-slide class="banner banner-img3"></swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/swiper.scss';

import 'swiper/components/effect-fade/effect-fade.min.css';
// import Swiper core and required modules
import SwiperCore, {
  EffectFade, Autoplay,
} from 'swiper/core';
// install Swiper modules
SwiperCore.use([EffectFade, Autoplay]);

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log('slide change');
    },
  },
};
</script>
