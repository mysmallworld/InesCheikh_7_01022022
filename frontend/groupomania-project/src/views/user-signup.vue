<template>
<div class="signup">
  <!-- Logo -->
  <div class="d-flex justify-content-center py-4 py-sm-2 py-md-1">
    <img :src="require('../assets/logo.png')" alt="logo groupomania" class="col-9 col-sm-7 col-md-6 col-lg-5 col-xl-4"/>
  </div>
  <div class="container pt-5 pb-3">
    <div class="row d-flex justify-content-center">
      <div class="col-10 col-md-7 col-lg-5 col-xl-4">
        <div class="card">
          <div class="card-body text-center mx-5">
            <!-- Form -->
            <form @submit.prevent="signup()">
              <div class="d-flex justify-content-center">
              <img src="http://localhost:3000/images/avatar.png" alt="avatar" class="w-50 w-md-25 mb-3"/>
            </div>
              <div class="input-group d-flex flex-align-item mb-1">
                <span class="input-group-text" id="basic-addon1"><i class="bi bi-person"></i></span>
                <input type="lastname" class="form-control" v-model="newUser.lastname" id="exampleInputLastname1" aria-describedby="lastnameHelp" placeholder="nom">
              </div>
              <div class="input-group d-flex flex-align-item mb-1">
                <span class="input-group-text" id="basic-addon1"><i class="bi bi-person"></i></span>
                <input type="firstname" class="form-control" v-model="newUser.firstname" id="exampleInputFirstname1" aria-describedby="firstnameHelp" placeholder="prénom">
              </div>
              <div class="input-group d-flex flex-align-item my-1">
                <span class="input-group-text" id="basic-addon1"><i class="bi bi-envelope"></i></span>
                <input type="email" class="form-control" v-model="newUser.email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email@mail.com">
              </div>
              <div class="input-group d-flex flex-align-item mt-1 mb-3">
                <span class="input-group-text" id="basic-addon1"><i class="bi bi-lock"></i></span>
                <input type="password" autocomplete="on" class="form-control" v-model="newUser.password" id="exampleInputPassword1" placeholder="mot de passe">
              </div>

              <div class="d-flex justify-content-center my-2">
                <!-- Btn sign up -->
                <button type="submit" class="btn btn-primary font-btn">Inscription</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div class="container">
      <!-- Link login -->
      <div class="row d-flex justify-content-center">
        <div class="col-10 col-md-7 col-lg-5 col-xl-4">
          <div class="card">
            <div class="card-body text-center">
            <nav>
              <router-link to="/" class="link font-btn">Vous avez un compte ? Connectez-vous</router-link>
            </nav>
              <router-view/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data : () => ({
    newUser : { 
      firstname: '',
      lastname:'',
      email: '',
      password: '',
    }
}),

  methods: {
      signup() {
        this.$store.dispatch('USER_SIGNUP', this.newUser)
        .then((res) => {console.log(res);
          this.$router.push({name: 'profil'});
        })
        .catch((error) => {error, alert("Une erreur est survenue, chaque utilisateur doit avoir un nom unique !")})
    }
  }
}
</script>