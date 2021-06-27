<template>
  <router-view/>
</template>

<style lang="scss">
@import './assets/scss/all';

.nav-link {
  padding: 30px;

  a,.routerLink{
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
