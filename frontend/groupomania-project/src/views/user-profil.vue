<template>
<div class="profil">
  <!-- Header -->
  <Nav/>

<div class="row py-3 px-3">
    <!-- Profile -->
    <div class="col-md-8 col-lg-6 mx-auto">
        <!-- Avatar -->
        <div class="bg-white shadow rounded overflow-hidden">
            <div class="px-4 pt-2">
              <div class="d-flex justify-content-center">
                <img src="http://localhost:3000/images/avatar.png" alt="avatar" width="130">
              </div>
              <div class="d-flex justify-content-center">
                <h2 class="firstname mx-1">{{user.firstname}}</h2><h2 class="mx-1 lastname">{{user.lastname}}</h2>
              </div>
            </div>
          <!-- Nav -->
          <div class="d-flex bd-highlight py-3 mx-2">
            <a href="#posts" class="p-2 bd-highlight nav fs-4">Publications</a>
            <a href="#info" class="p-2 bd-highlight nav fs-4">Infos</a>
            <a href="#bio" class="p-2 bd-highlight nav fs-4">Biographie</a>
          
          <div class="ms-auto py-1 bd-highlight">
              <router-link to="/edit">
                <button type="submit" class="btn rounded shadow-sm px-2 btn-update fs-6 font-btn"><i class="bi bi-pencil-fill me-1"></i> Modifier le profil</button>
              </router-link>
              <router-view/>
          </div>
          </div>
          <!-- Infos -->
          <div class="py-4 px-4 mb-2">
            <h4 id="info" class="mb-3">Infos</h4>
            <div class="p-4 rounded shadow-sm bg-light">
              <div class="d-flex flex-row">
              <i class="bi bi-envelope info-icons"></i> 
              <p class="text-muted mx-auto">{{user.email}}</p>
              </div>
              <div class="d-flex flex-row">
              <i class="bi bi-lock info-icons"></i>
              <p class="text-muted mx-auto">********</p>
              </div>
            </div>
          </div>
          
            <div class="py-4 px-4 mb-2">
                <h4 id="bio" class="mb-3">Biographie</h4>
                <div class="p-4 rounded shadow-sm bg-light">
                <p>{{user.bio}}</p>
                </div>
            </div>
            <!-- Posts -->
            <div class="py-4 px-4 mb-2">
                <div class="d-flex justify-content-start mb-3">
                    <h4 id="posts">Publications</h4>
                </div>
                <div class="row">
                    <div class="col-lg-6 mb-2 pr-lg-1"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
import Nav from '../components/home-nav.vue'
import axios from 'axios'

export default {
name: 'user-profil',
    components: {
      Nav
    },
     data() {
      return {
          user: "",
      };
    },
    created() {
      axios
        .get('http://localhost:3000/api/auth/user', {
            headers: { Authorization: "Bearer " +localStorage.getItem("authToken")}, 
        })
        .then((response) => (this.user = response.data.user))
        .catch((err) => console.log(err));
    }
}
</script>