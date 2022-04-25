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
//------------ALL PAGES------------
//Font-family
* {
  font-family: 'Cormorant', serif;
  text-decoration: none;
}
.font-title, .font-btn {
  font-family: SF;
}

//Background Groupomania
#app, .signup, .login, .profil, .home, .edit, .posts{
  background-color:#f9f9f9;
}

//------------SIGNUP AND LOGIN------------
//Input and link signup/login
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

//Btn signup and login
.btn-primary:hover {
  background-color:#EC3E1B;
}
.btn-primary {
  background-color:#ec3e1b52;
  border: transparent;
  box-shadow: 3px 3px 5px rgba(0,0,0,0.14);
}

//------------AVATAR------------
//Avatar
.avatar {
  width: 3rem;
  height: 3rem;
}
.image-profile {
  width: 10rem;
  height: 10rem;
}

//------------HOME------------
//Icons nav home
.icons {
  color:#ec3e1b52;
}
.nav {
  text-decoration: none;
  color:#5A5C60;
}
.nav:hover {
  color:#EC3E1B;
  border-bottom: solid 1px;
}

//------------USER PROFILE------------
//Btn profil and btn post
.btn-update, .btn-post {
  background-color:#E0E2E8;
  color:#191C1D;
}
.btn-post {
  border: none;
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

//------------USER EDIT PROFILE------------
//Icons edit profile
.icon-camera:hover {
  background-color: #305580a4;
  color: #EEF0F3;
}
.icon-camera {
  background-color: #ec3e1b52;
}
.close-post, .close-profile {
  color: #c5c6ca;
  z-index: 1;
}
.close-post:hover {
  color:#626971;
}
.icons:hover, .close-profile:hover {
  color:#EC3E1B;
}
.info-icons {
  color:#305580;
}
.pencil-edit {
  color:black;
}

//Textarea edit profile
.textarea, .textarea-name:hover {
  background-color:#F7F8F9;
}
.textarea, .textarea-name, .textarea-post {
  border: none;
}
.textarea:hover {
  background-color:white;
}

//Btn save and cancel edit profile
.btn-cancel {
  background-color:#c5c6ca48;
}
.btn-save {
  background-color:#3055809f;
  color:#5A5C60
}
.btn-save:hover {
  background-color:#305580;
  color:white;
}
.btn-cancel:hover {
  background-color:#EC3E1B;
  color:white;
}

//------------POSTS------------
//Btn posts
.btn-update-post a :hover {
  color:#1328a1;
}
.btn-post-update a {
  text-decoration: none;
  color: black;
  font-family: SF;
}
.btn-post-delete:hover {
  color:#EC3E1B;
}

//New post
.file {
  position: relative;
  overflow: hidden;
}
.btn-file {
  position: absolute;
  opacity: 0;
  right: 0;
  top: 0;
}
.icon-file{
  color:green;
}
.btn-select-file:hover {
  background-color: green;
  color: white;
  .icon-file {
    color: white;
  }
}

//------------COMMENTS------------
.comment-avatar {
  width: 2rem;
  height: 2rem;
}
.comment-textarea {
  height: 25px;
}
.comment-send {
  color: #3055809f;
}
.comment-send:hover {
    color: #1328a1;
  }
</style>