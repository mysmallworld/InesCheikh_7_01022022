<template>
<div class="edit">
    <Nav/>
    <div class="row py-3 px-3">
    <!-- Profile -->
    <div class="col-md-8 col-lg-6 mx-auto">
      <div class="bg-white shadow rounded-3 overflow-hidden">
        <div class="d-flex flex-row border-bottom pb-2">
            <h2 class="d-flex justify-content-center w-100 ms-4 mt-2 pt-2 fs-4 font-title">Modifier le profil</h2>
            <i class="bi bi-x-circle-fill fs-4 ms-auto me-1 close-profile" @click="close()"></i>
        </div>
            <div class="alert alert-success my-2 mx-4 text-center" role="alert" v-if="selectFileName">
                {{selectFileName}}
            </div>
        <!-- Avatar -->
            <div class="px-4 py-2">
              <div class="d-flex justify-content-center">
                
                <img :src="user.avatar" alt="avatar" class="img-fluid border rounded-circle image-profile">
                <div class="d-flex justify-content-end align-items-end pb-2">
                    <i class="bi bi-camera-fill position-absolute btn rounded-circle icon-camera">
                    <input type="file" name="file" class="btn-file" @change="onFileSelected"/>
                    </i>
                </div>
              </div>

        <!-- Name -->
              <div class="d-flex flex-row">
                <h2 class="d-flex justify-content-end mx-1 firstname font-title fw-bold w-100"><textarea v-model="user.firstname" placeholder="Prénom" class="form-control textarea-name w-50 h-50 text-center"></textarea></h2>
                <h2 class="d-flex justify-content-start mx-1 lastname font-title fw-bold w-100"><textarea v-model="user.lastname" placeholder="Nom" class="form-control textarea-name w-50 h-50 text-center"></textarea></h2>
              </div>
            </div>

        <!-- Infos -->
            <div class="py-4 px-4 mb-2">
            <h4 id="info" class="mb-3">Infos</h4>
            <div class="rounded shadow-sm bg-light">
              <div class="px-4 pt-3 d-flex flex-row">
                <i class="bi bi-envelope info-icons"></i>
                  <p class="text-center text-muted mx-auto">{{user.email}}</p>
              </div>
              <div class="px-4 py-3 d-flex flex-row">
                <i class="bi bi-lock info-icons"></i>
                  <p class="mx-auto text-center text-muted mb-0">*****</p>
              </div>
              <p class="text-center text-muted fs-6 pb-2 px-3">Par sécurité, l'email et le mot de passe ne peuvent pas être modifiés</p>
            </div>
          </div>

        <!-- Bio -->  
        <div class="py-4 px-4 mb-2">
            <h4 id="bio" class="mb-3">Biographie</h4>
        <div class="rounded shadow-sm bg-light pt-3">
            <div class="d-flex justify-content-center"><textarea v-model="user.bio" placeholder="Ajoutez une biographie à votre profil..." class="form-control textarea w-75 mb-4 mt-2 rounded"></textarea></div>
        </div>
        </div>

        <!-- Save btn -->
        <div class="d-flex justify-content-center m-4">
        <button type="submit" class="btn rounded-pill shadow-sm px-3 btn-save fs-6 font-btn" @click="updateUser(user)">
          <i class="bi bi-pencil-fill me-1"></i> Enregistrer les modifications</button>
        </div>

        <!-- Delete btn -->
        <div class="d-flex justify-content-center m-4">
        <button type="submit" class="btn rounded-pill shadow-sm px-3 btn-delete fs-6 font-btn" @click="deleteUser(user)">
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
          selectedFile: null,
          selectFileName: ""
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
     onFileSelected(event) {
        this.selectedFile = event.target.files[0];
        this.name = event.target.files[0].name;
        this.selectFileName = 'Le fichier "' + this.name + '" a été sélectionné.';
    }, 
    updateUser() {
        let fd = new FormData();
        fd.append('image', this.selectedFile),
        fd.append('firstname',this.user.firstname),
        fd.append('lastname',this.user.lastname),
        fd.append('email',this.user.email),
        fd.append('bio',this.user.bio),
        
        axios
          .put("http://localhost:3000/api/auth/" +localStorage.getItem("id"), fd, {
             headers: { Authorization: "Bearer " +localStorage.getItem("authToken"),'Content-Type': 'multipart/form-data'},
          })
            .then((response) => console.log(response), 
            this.$router.push({name: 'profil'}).$router.go())
            .catch((err) => console.log(err));
            
    },
    deleteUser() {
        axios
          .delete("http://localhost:3000/api/auth/" +localStorage.getItem("id"), 
            { headers: { Authorization: "Bearer " +localStorage.getItem("authToken") },
          })
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
            localStorage.removeItem("authToken");
            this.$router.push({name: 'signup'});
        },
    }
}
</script>
