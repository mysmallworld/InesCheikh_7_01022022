<template>
  <div id="app" class="vh-100">
    <nav>
      <router-link to="/"></router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import signup from '@/components/user-signup.vue';

export default {
  signup
}
</script>

<style lang="scss">
* {
  font-family: SF;
  text-decoration:none;
}
#app {
  background-color:#f9f9f9;
}
input, .link {
  color: black;
}
.link:hover{
  text-decoration: underline;
  color: black;
}
.link {
  font-size: 14px;
  text-decoration: none;
}
.btn-primary:hover{
  background-color:#EC3E1B;
}
.btn-primary {
  background-color:#ec3e1b52;
  border: transparent;
  box-shadow: 3px 3px 5px rgba(0,0,0,0.14);
}
</style>