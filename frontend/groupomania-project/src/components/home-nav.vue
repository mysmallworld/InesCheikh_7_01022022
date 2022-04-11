<template>
  <!-- Header -->
  <div class="card d-flex bd-highlight d-flex flex-row" style="border:none;">
    <div class="p-2 bd-highlight my-3 mx-2">
        <img :src="require('../assets/logo.png')" alt="logo groupomania" class="col-10 col-sm-7 col-md-6 col-lg-5"/>
    </div>
    <div class="ms-auto bd-highlight d-flex flex-row">
      <router-link to="/home" active="router-link-active">
        <nav class="links">
          <div class="my-3 mx-3 fs-1 underline"><i class="bi bi-house icons"></i></div>
        </nav>
      </router-link>

      <router-link to="/profil" active="router-link-active">  
        <nav class="links">
          <div class="my-3 mx-3 fs-1 underline"><i class="bi bi-person-bounding-box icons"></i></div>
        </nav>
      </router-link>
        
      <router-link to="/posts" active="router-link-active">
        <nav class="links">
          <div class="my-3 mx-3 fs-1 underline"><i class="bi bi-plus-square-dotted icons"></i></div>
        </nav>
      </router-link>
        
        <nav class="links">
          <div class="my-3 mx-3 fs-1 underline" @click="logout"><i class="bi bi-x-square icons"></i></div>
        </nav>
        <router-view/>
    </div>
  </div>
</template>

<script>

export default {
    name: 'home-nav',
    methods: {
      logout() {
        this.$store.dispatch('LOGOUT', this.user)
        .then (() => {
        this.$router.push({name: 'login'});
        })
        .catch((error) => { console.log(error)
        })
    },
  }
}
</script>

<style lang="scss">
.router-link-active {
  .icons {
    color: #EC3E1B;
  }
  .links {
    color: #EC3E1B;
    border-bottom: solid 3px;
  }
}
</style>