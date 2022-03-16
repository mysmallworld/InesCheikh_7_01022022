<template>
  <div class="profile">
    <div class="d-flex flex-row">
        <div class="d-flex justify-content-between py-4 px-2 px-md-4">
        <img :src="require('../assets/logo.png')" alt="logo groupomania" class="col-6 col-sm-4 col-md-3 col-lg-2"/>
        </div>
        <div class="d-flex justify-content-between py-4 px-4 px-md-4">
            <i class="bi bi-mailbox" style="font-size: 2rem;"></i>
        </div>
    </div>

    <div class="fixed-bottom position-absolute">
    <div class="card body" style="border:1px solid rgba(0,0,0,.125); border-radius: 20px 20px 0 0">
    <div class="d-flex justify-content-around">
        <nav>
        <router-link to="/home" class="link">
    <div class="d-flex flex-row"><i class="bi bi-globe" style="font-size: 1.8rem; color:#F9D3D2"></i></div>
        </router-link>
        </nav>
        <nav>
        <router-link to="/profil" class="link">
    <div class="d-flex flex-row d-flex justify-content-center"><i class="bi bi-person-circle" style="font-size: 1.8rem;"></i></div>
        </router-link>
        </nav>
        <nav>
        <router-link to="/login" class="link">
    <div class="d-flex flex-row"><i class="bi bi-x-circle" style="font-size: 1.8rem; color:#EC3E1B"></i></div>
        </router-link>
        </nav>
        <router-view/>
    </div>
  </div>
 </div>
</div>
</template>