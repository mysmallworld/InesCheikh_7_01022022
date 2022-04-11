<template>
<div class="edit">
    <Nav/>
    <div class="row py-3 px-3">
    <!-- Profile -->
    <div class="col-md-8 col-lg-6 mx-auto">
      <div class="bg-white shadow rounded-3 overflow-hidden">
        <i class="bi bi-x d-flex justify-content-end fs-2 me-1 mt-1 close-profile" @click="close()"></i>
          <div class="fs-5 fw-bold font-title d-flex justify-content-center title pb-2">Modifier le profil</div>
        <!-- Avatar -->
            <div class="px-4">
              <div class="d-flex justify-content-center">
                <img src="http://localhost:3000/images/avatar.png" alt="avatar" width="130">
                <div class="d-flex justify-content-end align-items-end pb-2" @click="updated"><i class="bi bi-camera-fill position-absolute btn rounded-circle icon-camera"></i></div>
              </div>

        <!-- Name -->
              <div class="d-flex justify-content-center">
                <h2 class="firstname mx-1">{{user.firstname}}</h2><h2 class="mx-1 lastname">{{user.lastname}}</h2>
              </div>
            </div>

        <!-- Infos -->
            <div class="py-4 px-4 mb-2">
            <h4 id="info" class="mb-3">Infos</h4>
            <div class="rounded shadow-sm bg-light">
              <div class="d-flex justify-content-end p-1" @click="updated"><i class="bi bi-pencil-fill me-1 pencil-edit"> Modifier</i></div>
              <div class="px-4 py-2 d-flex flex-row">
                <i class="bi bi-envelope info-icons"></i> 
                <p class="text-muted mx-auto">{{user.email}}</p>
              </div>
              <div class="px-4 py-2 d-flex flex-row">
                <i class="bi bi-lock info-icons"></i>
                <p class="text-muted mx-auto">********</p>
              </div>
            </div>
          </div>

        <!-- Bio -->  
        <div class="py-4 px-4 mb-2">
            <h4 id="bio" class="mb-3">Biographie</h4>
        <div class="rounded shadow-sm bg-light">
            <div class="d-flex justify-content-end p-1" @click="updated"><i class="bi bi-pencil-fill me-1 pencil-edit"> Ajouter</i></div>
            <p class="p-4">{{user.bio}}</p>
        </div>
        </div>

        <div class="d-flex justify-content-center m-4">
        <button type="submit" class="btn rounded-pill shadow-sm px-2 btn-delete fs-6 font-btn" v-on:click="Delete(user)">
          <i class="bi bi-pencil-fill me-1"></i> Supprimer le profil</button>
        </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import Nav from '../components/home-nav.vue'
import axios from "axios";

  export default {
    name: 'user-home',
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
        .get("http://localhost:3000/api/auth/user", {
            headers: { Authorization: "Bearer " +localStorage.getItem("authToken") },
        })
        .then((response) => (this.user = response.data.user))
        .catch((err) => console.log(err));
    },
methods: { 
   close() {
      this.$router.push({name: 'profil'});
    },
    update(user) {
            axios
                .put("http://localhost:3000/api/auth/" + user.id, {
                    headers: { Authorization: "Bearer " +localStorage.getItem("authToken") },
                })
                .then((response) => console.log(response))
                .catch((err) => console.log(err));
    },
    Delete: function() {
            axios
                .delete("http://localhost:3000/api/auth/", {
                    headers: { Authorization: "Bearer " +localStorage.getItem("authToken") },
                })
                .then((response) => console.log(response))
                .catch((err) => console.log(err));
            localStorage.removeItem('authToken');
            this.$router.push({name: 'signup'});
},
}
}
</script>
