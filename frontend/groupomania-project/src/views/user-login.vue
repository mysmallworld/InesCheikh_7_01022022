<template>
<div class="login">
  <!-- Logo -->
  <div class="d-flex justify-content-center py-4 py-sm-2 py-md-1">
    <img :src="require('../assets/logo.png')" alt="logo groupomania" class="col-9 col-sm-7 col-md-6 col-lg-5 col-xl-4"/>
  </div>
<div class="container pt-5 pb-3">
  <div class="row d-flex justify-content-center h-100">
    <div class="col-10 col-md-7 col-lg-5 col-xl-4">
      <div class="card">
        <div class="card-body text-center mx-5">
          <!-- Form -->
          <form @submit.prevent="connect()">
            <div v-if="user.error" class="alert alert-danger py-3" role="alert">
              {{user.error}}
            </div>

            <div class="input-group d-flex flex-align-item mt-4 mb-3">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-envelope"></i></span>
              <input type="email" class="form-control" v-model="user.email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email@mail.com">
            </div>
            <div class="input-group d-flex flex-align-item mb-4">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-lock"></i></span>
              <input type="password" autocomplete="on" class="form-control" v-model="user.password" id="exampleInputPassword1" placeholder="mot de passe">
            </div>

            <div class="input-group d-flex justify-content-center mb-2">
              <!-- Btn login -->
              <button type="submit" class="btn btn-primary font-btn">Connexion</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  <div class="container">
    <!-- Link sign up-->
    <div class="row d-flex justify-content-center">
      <div class="col-10 col-md-7 col-lg-5 col-xl-4">
        <div class="card">
          <div class="card-body text-center">
          <nav>
          <router-link to="/signup" class="link font-btn">Vous n'avez pas de compte ? Inscrivez-vous</router-link>
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
      user : {
        email: '',
        password: '',
        error: ''
      },
      
  }),

  methods: {
      connect() {
        this.$store.dispatch('AUTH', this.user)
        .then ((res) => { console.log(res);
        this.$router.push({name: 'profil'});
        })
        .catch((error) => {error})
    }
  }
}
</script>