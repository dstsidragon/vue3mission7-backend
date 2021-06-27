<template>
  <div class="banner position-relative">
    <span class="banner__font ">
      <em >創意演繹極致口感</em>
      <br>
      <em class="banner__subtitle">-勾起你心中的餓</em>
    </span>
  </div>
  <div class="box"></div>
</template>

<style lang="scss">
@import "../assets/scss/mixin/mixin";
.banner{
  height: 600px;
  background: center center no-repeat
    url('https://images.unsplash.com/photo-1621857426350-ddab819cf0cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80');
  background-size: cover;
  background-attachment: fixed;

  &__font{
  position:absolute;
  top:20%;
  left:5%;
  font-size:3rem;
  color: #ffffff;
  font-weight: bold;
  text-align: left;
  }
  &__subtitle{
    font-size: 2rem;
  }
  @include mobile{
    &__font{
  top:30%;
  font-size:2rem;
  }
  &__subtitle{
    font-size: 1.5rem;
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

</style>
