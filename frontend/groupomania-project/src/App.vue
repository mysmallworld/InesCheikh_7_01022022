<template>
  <div id="app" class="vh-100">
    <nav>
      <router-link to="/"></router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import login from '../src/views/user-login.vue';

export default {
  login,
}
</script>

<style lang="scss">
//font-family
* {
  font-family: 'Cormorant', serif;
  text-decoration: none;
}
.font-title, .font-btn {
  font-family: SF;
}

//background groupomania
#app {
  background-color:#f9f9f9;
}

//input and link signup/login
input, .link {
  color: black;
}
.link:hover{
  text-decoration: underline 1px;
  color: black;
}
.link {
  font-size: 14px;
  text-decoration: none;
}
.input-group-text {
  background-color:#F9D3D2; 
  color:#EC3E1B;
}

//btn signup and login
.btn-primary:hover {
  background-color:#EC3E1B;
}
.btn-primary {
  background-color:#ec3e1b52;
  border: transparent;
  box-shadow: 3px 3px 5px rgba(0,0,0,0.14);
}
//icons nav home
.icons {
  color:#ec3e1b52;
}
.nav {
  text-decoration: none;
  color:#5A5C60;
}
.nav:hover {
  color:#EC3E1B;
}

//btn profile
.btn-update {
  background-color:#E0E2E8;
  color:#191C1D;
}
.btn-delete {
  background-color: #ec3e1ba8;
  color:#5A5C60;
}
.btn-delete:hover {
  background-color: #EC3E1B;
  color:white;
}
.btn-update:hover {
  background-color: #EEF0F3;
}

//icons edit profile
.icon-camera {
  background-color: #305580a4;
  color:#EEF0F3;
}
.icon-camera:hover {
    background-color: #ec3e1b52;
    color:#305580;
  }
.icons:hover, .close-profile:hover {
  color:#EC3E1B;
}
.info-icons, .pencil-edit {
  color:#305580;
}

.pencil-edit:hover {
  color:black;
}

</style>