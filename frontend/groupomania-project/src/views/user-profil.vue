<template>
<div class="profil">
  <!-- Header -->
  <HomeNav/>

<div class="row py-3 px-3">
    <!-- Profile -->
    <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
        <!-- Avatar -->
        <div class="bg-white shadow rounded overflow-hidden">
            <div class="px-4 pt-4">
              <div class="d-flex justify-content-center pb-2">
                <img :src="user.avatar" alt="avatar" class="img-fluid border rounded-circle image-profile">
              </div>
              <div class="d-flex justify-content-center">
                <h2 class="firstname mx-1 fw-bold font-title">{{user.firstname}}</h2><h2 class="lastname mx-1 fw-bold font-title">{{user.lastname}}</h2>
              </div>
            </div>
          <!-- Nav -->
          <div class="d-flex bd-highlight py-3 mx-2">
            <a href="#posts" class="p-2 bd-highlight nav fs-4">Publications</a>
            <a href="#info" class="p-2 bd-highlight nav fs-4">Infos</a>
            <a href="#bio" class="p-2 bd-highlight nav fs-4">Biographie</a>
          
          <div class="ms-auto py-1 bd-highlight">
              <button type="submit" class="btn rounded shadow-sm btn-update font-btn" @click="showModal()">
                <i class="bi bi-pencil-fill me-1"></i> Modifier le profil</button>
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
                <p v-if="user.bio != null || user.bio != undefined">{{user.bio}}</p>
                <p class="text-muted text-center mb-0" v-else>
                  Ajoutez une biographie à votre profil en appuyant sur<br> "Modifier le profil"</p>
                </div>
            </div>
            <!-- Posts -->
            <div class="py-4 mb-2">
                <div class="d-flex justify-content-start px-4 mb-3">
                    <h4 id="posts">Publications</h4>
                </div>
                <div class="row">
                    <div class="mb-2">
                    <MyPost/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
import HomeNav from '../components/home-nav.vue'
import MyPost from '../components/my-post.vue'
import axios from "axios"

export default {
name: 'user-profil',
  components: {
      HomeNav,
      MyPost,
    },
  methods: {
    showModal() {
    this.$router.push({name: 'edit'});
  }
},
     data() {
      return {
          user: "",
      };
    },
    created() {
      axios
      .get("http://localhost:3000/api/auth/user", {
            headers: { Authorization: "Bearer " +localStorage.getItem("authToken")}, 
        })
        .then((response) => (this.user = response.data.user))
        .catch((err) => console.log(err));
    }
}
</script>